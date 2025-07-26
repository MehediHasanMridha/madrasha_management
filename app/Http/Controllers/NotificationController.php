<?php
namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\NotificationToken;
use App\Models\SMSBalance;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use YieldStudio\LaravelExpoNotifier\Contracts\ExpoNotificationsServiceInterface;
use YieldStudio\LaravelExpoNotifier\Dto\ExpoMessage;

class NotificationController extends Controller
{

    public function index()
    {
        return Inertia::render('admin::notification/index');
    }

    /**
     * Store expo push token
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function storeToken(Request $request): JsonResponse
    {
        // Validate the request
        $request->validate([
            'token' => 'required|string|max:355',
        ]);

        $token = $request->input('token');

        // Check if token already exists in database
        $existingToken = NotificationToken::where('token', $token)->first();

        if ($existingToken) {
            return response()->json([
                'success' => true,
                'message' => 'Token already exists',
                'data'    => $existingToken,
            ], 200);
        }

        // Create new token record
        $notificationToken = NotificationToken::create([
            'token' => $token,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Token stored successfully',
            'data'    => $notificationToken,
        ], 201);
    }

    /**
     * Send push notification to all registered devices
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function sendNotification(Request $request)
    {
        // Validate the request
        $request->validate([
            'title' => 'required|string|max:255',
            'body'  => 'required|string|max:1000',
        ]);

        $title = $request->input('title');
        $body  = $request->input('body');

        // Get all notification tokens
        $tokens = NotificationToken::pluck('token')->toArray();

        if (empty($tokens)) {
            return redirect()->back()->with('error', 'No notification tokens found.');
        }

        try {
            // Create and send notification using Laravel Expo Notifier
            $expoMessage = (new ExpoMessage())
                ->to($tokens)
                ->title($title)
                ->body($body)
                ->channelId('default');

            // Use the service interface to send notifications
            $expoService = app(ExpoNotificationsServiceInterface::class);
            $expoService->notify($expoMessage);

            return redirect()->back()->with('success', 'Notifications sent successfully.');

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to send notifications: ' . $e->getMessage());
        }
    }

    public function smsSection()
    {
        $department = Department::with('classes')->get();
        $smsBalance = SMSBalance::first();

        return Inertia::render('admin::notification/sms-section',
            [
                'departments' => $department,
                'sms_balance' => $smsBalance->balance ?? 0, // Ensure balance is set
            ]
        );
    }

    public function sendSms(Request $request)
    {
        // Validate the request
        $request->validate([
            'sms_message'           => 'required|string|max:160',
            'all_students'          => 'boolean',
            'all_staff'             => 'boolean',
            'due_students'          => 'boolean',
            'selected_departments'  => 'boolean',
            'department_selections' => 'array',
            'selected_student_ids'  => 'array',
            'extra_numbers'         => 'nullable|string',
        ]);

        $smsMessage           = $request->input('sms_message');
        $allStudents          = $request->input('all_students', false);
        $allStaff             = $request->input('all_staff', false);
        $allDueStudents       = $request->input('due_students', false);
        $selectedDepartments  = $request->input('selected_departments', false);
        $departmentSelections = $request->input('department_selections', []);
        $selectedStudentIds   = $request->input('selected_student_ids', []);
        $extraNumbers         = $request->input('extra_numbers', '');

        // FetchSelectedUserForSMSJob::dispatch(
        //     $allStudents,
        //     $allStaff,
        //     $allDueStudents,
        //     $selectedDepartments,
        //     $departmentSelections,
        //     $selectedStudentIds,
        //     $extraNumbers,
        //     $smsMessage
        // );

        // Initialize phone numbers collection
        $phoneNumbers = collect();

        // 1. All Students
        if ($allStudents) {
            $students = User::whereHas('roles', function ($q) {
                $q->where('name', 'student');
            })->with('guardians')->get();

            $phoneNumbers = $phoneNumbers->merge($this->extractPhoneNumbers($students));
        }

        // 2. All Staff
        if ($allStaff) {
            $staff = User::whereHas('roles', function ($q) {
                $q->where('name', 'staff');
            })->get();

            $phoneNumbers = $phoneNumbers->merge($this->extractPhoneNumbers($staff));
        }

        // 3. Due Students
        if ($allDueStudents) {
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
        if ($selectedDepartments && ! empty($departmentSelections)) {
            foreach ($departmentSelections as $selection) {
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
        if (! empty($selectedStudentIds)) {
            $students = User::whereIn('unique_id', $selectedStudentIds)
                ->with('guardians')->get();
            $phoneNumbers = $phoneNumbers->merge($this->extractPhoneNumbers($students));
        }

        // 6. Extra Numbers
        if (! empty($extraNumbers)) {
            $extraNumbers = explode(',', $extraNumbers);
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
        $messageLength = strlen($smsMessage);
        if ($messageLength < 140) {
            $messageLength = 140; // Adjust length to 160 for cost calculation
        }
        $totalMessagesPart = ceil($messageLength / 140);
        $totalCost         = $totalMessagesPart * $validPhoneNumbers->count() * 0.45; // Assuming 0.50 tk per 160 characters

        $smsBalance = SMSBalance::first();
        if (! $smsBalance || $smsBalance->balance < $totalCost) {
            return redirect()->back()->with('error', 'Insufficient SMS balance. Please recharge your balance.');
        } else {
            $res = $this->sms_send($validPhoneNumbers, $smsMessage);
            $res = json_decode($res, true);
            if ($res['success_message']) {
                $smsBalance->balanceDecrement($totalCost);
                return redirect()->back()->with('success', 'SMS sent successfully to ' . $validPhoneNumbers->count() . ' recipients.');
            } else {
                return redirect()->back()->with('error', $res['error_message']);
            }
        }

        // return redirect()->back()->with('success', "SMS prepared and queued successfully");
    }

    private function extractPhoneNumbers($users)
    {
        $phoneNumbers = collect();
        foreach ($users as $user) {
            // Get user's own phone number
            if ($user->phone) {
                $phoneNumbers->push($user->phone);
            }

            // Get guardian phone numbers
            if ($user->hasRole('student') && $user->guardians && $user->guardians->numbers) {
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
