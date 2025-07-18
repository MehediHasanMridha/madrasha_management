<?php
namespace App\Jobs;

use App\Models\SMSBalance;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Session;

class FetchSelectedUserForSMSJob implements ShouldQueue
{
    use Queueable;

    public $allStudents;
    public $allStaff;
    public $allDueStudents;
    public $selectedDepartments;
    public $departmentSelections;
    public $selectedStudentIds;

    public $extraNumbers; // New property to hold extra numbers
    public $smsMessage;
    /**
     * Create a new job instance.
     */
    public function __construct(
        $allStudents,
        $allStaff,
        $allDueStudents,
        $selectedDepartments,
        $departmentSelections,
        $selectedStudentIds,
        $extraNumbers,
        $smsMessage
    ) {
        $this->allStudents          = $allStudents;
        $this->allStaff             = $allStaff;
        $this->allDueStudents       = $allDueStudents;
        $this->selectedDepartments  = $selectedDepartments;
        $this->departmentSelections = $departmentSelections;
        $this->selectedStudentIds   = $selectedStudentIds;
        $this->smsMessage           = $smsMessage;
        $this->extraNumbers         = $extraNumbers; // Initialize extra numbers
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Initialize phone numbers collection
        $phoneNumbers = collect();

        // 1. All Students
        if ($this->allStudents) {
            $students = User::whereHas('roles', function ($q) {
                $q->where('name', 'student');
            })->with('guardians')->get();

            $phoneNumbers = $phoneNumbers->merge($this->extractPhoneNumbers($students));
        }

        // 2. All Staff
        if ($this->allStaff) {
            $staff = User::whereHas('roles', function ($q) {
                $q->where('name', 'staff');
            })->get();

            $phoneNumbers = $phoneNumbers->merge($this->extractPhoneNumbers($staff));
        }

        // 3. Due Students
        if ($this->allDueStudents) {
            $currentDate = date('Y-m');
            $dueStudents = User::with(['academics.class', 'academics.department', 'incomeLogs.studentDue', 'guardians'])
                ->whereHas('roles', fn($q) => $q->where('name', 'student'))
                ->where(function ($query) use ($currentDate) {
                    // Students who don't have income log for current month
                    $query->whereDoesntHave('incomeLogs', function ($q) use ($currentDate) {
                        $q->where('payment_period', $currentDate)
                            ->whereHas('feeType', function ($feeTypeQuery) {
                                $feeTypeQuery->where('slug', 'like', '%academic-fee%')
                                    ->orWhere('slug', 'like', '%boarding-fee%');
                            });
                    })
                    // Or students who have a due for current month
                        ->orWhereHas('incomeLogs', function ($q) use ($currentDate) {
                            $q->where('payment_period', $currentDate)
                                ->whereHas('studentDue', function ($dueQuery) {
                                    $dueQuery->where('due_amount', '>', 0);
                                });
                        });
                })->get();

            $phoneNumbers = $phoneNumbers->merge($this->extractPhoneNumbers($dueStudents));
        }

        // 4. Selected Departments
        if ($this->selectedDepartments && ! empty($this->departmentSelections)) {
            foreach ($this->departmentSelections as $selection) {
                $departmentId  = $selection['departmentId'] ?? null;
                $selectedClass = $selection['selectedClass'] ?? 'all';

                if ($departmentId) {
                    $query = User::whereHas('roles', function ($q) {
                        $q->where('name', 'student');
                    })->whereHas('academics', function ($q) use ($departmentId) {
                        $q->where('department_id', $departmentId);
                    })->with('guardians');

                    // Filter by class if specific class is selected
                    if ($selectedClass !== 'all') {
                        $query->whereHas('academics', function ($q) use ($selectedClass) {
                            $q->where('class_id', $selectedClass);
                        });
                    }

                    $students     = $query->get();
                    $phoneNumbers = $phoneNumbers->merge($this->extractPhoneNumbers($students));
                }
            }
        }

        // 5. Selected Student IDs
        if (! empty($this->selectedStudentIds)) {
            $students = User::whereIn('unique_id', $this->selectedStudentIds)
                ->with('guardians')->get();
            $phoneNumbers = $phoneNumbers->merge($this->extractPhoneNumbers($students));
        }

        // 6. Extra Numbers
        if (! empty($this->extraNumbers)) {
            $extraNumbers = explode(',', $this->extraNumbers);
            $extraNumbers = collect($extraNumbers)->map(function ($number) {
                return validateAndFormatPhoneNumber(trim($number));
            })->filter();
            $phoneNumbers = $phoneNumbers->merge($extraNumbers);
        }

        // Remove duplicates and filter out empty numbers
        $uniquePhoneNumbers = $phoneNumbers
            ->filter(function ($number) {
                return ! empty(trim($number));
            })
            ->unique()
            ->values();

        // Validate and format phone numbers
        $validPhoneNumbers = $uniquePhoneNumbers->map(function ($number) {
            return validateAndFormatPhoneNumber($number);
        })->filter();

        // calculate message character wise cost and total number of messages cost so 140 characters sms .50 tk

        $messageLength = strlen($this->smsMessage);
        if ($messageLength < 140) {
            $messageLength = 140; // Adjust length to 160 for cost calculation
        }
        $totalMessagesPart = ceil($messageLength / 140);
        $totalCost         = $totalMessagesPart * $validPhoneNumbers->count() * 0.45; // Assuming 0.50 tk per 160 characters

        $smsBalance = SMSBalance::first();
        if (! $smsBalance || $smsBalance->balance < $totalCost) {
            Session::put('queue_error', 'Insufficient SMS balance. Please recharge your balance.');
            return;
        } else {
            $res = $this->sms_send($validPhoneNumbers, $this->smsMessage);
            $res = json_decode($res, true);
            if ($res['success_message']) {
                $smsBalance->balanceDecrement($totalCost);
                Session::put('queue_success', 'SMS sent successfully to ' . $validPhoneNumbers->count() . ' recipients.');
            } else {
                Session::put('queue_error', 'Failed to send SMS. please set IP address to Whitelist in your SMS gateway settings.');
            }
        }

    }

    /**
     * Extract phone numbers from a collection of users
     *
     * @param \Illuminate\Support\Collection $users
     * @return \Illuminate\Support\Collection
     */
    private function extractPhoneNumbers($users)
    {
        $phoneNumbers = collect();

        foreach ($users as $user) {
            // Get user's own phone number
            if ($user->phone) {
                $phoneNumbers->push($user->phone);
            }

            // Get guardian phone numbers
            if ($user->guardians && $user->guardians->numbers) {
                $guardianNumbers = json_decode($user->guardians->numbers, true);
                if (is_array($guardianNumbers)) {
                    foreach ($guardianNumbers as $number) {
                        if ($number) {
                            $phoneNumbers->push($number);
                        }
                    }
                }
            }
        }

        return $phoneNumbers;
    }

    public function sms_send($validPhoneNumbers, $message)
    {
        $url      = "http://bulksmsbd.net/api/smsapi";
        $api_key  = "WqEMXtKIyUzdOiLrQyGm";
        $senderid = "8809617622335";
        $number   = $validPhoneNumbers;

        $data = [
            "api_key"  => $api_key,
            "senderid" => $senderid,
            "number"   => $number,
            "message"  => $message,
        ];
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;

    }

}
