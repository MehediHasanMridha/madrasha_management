<?php
namespace App\Http\Controllers;

use App\Actions\SMS\AllDueStudentNumbers;
use App\Actions\SMS\AllStaffNumbers;
use App\Actions\SMS\AllStudentWithGuardianNumbers;
use App\Actions\SMS\SelectedDepartmentClassesStudentNumbers;
use App\Actions\SMS\SelectedStudentNumbers;
use App\Actions\SMS\SMSAction;
use App\Actions\SMS\SpecificPhoneNumbers;
use App\Models\Department;
use App\Models\NotificationToken;
use App\Models\SMSBalance;
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
            'sms_message'           => 'required|string',
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
            $phoneNumbers = $phoneNumbers->merge(AllStudentWithGuardianNumbers::run());
        }

        // 2. All Staff
        if ($allStaff) {
            $phoneNumbers = $phoneNumbers->merge(AllStaffNumbers::run());
        }

        // 3. Due Students
        if ($allDueStudents) {
            $phoneNumbers = $phoneNumbers->merge(AllDueStudentNumbers::run());
        }

        // 4. Selected Departments
        if ($selectedDepartments && ! empty($departmentSelections)) {
            foreach ($departmentSelections as $selection) {
                $departmentId  = $selection['departmentId'] ?? null;
                $selectedClass = $selection['selectedClass'] ?? 'all';
                if ($departmentId) {
                    $phoneNumbers = $phoneNumbers->merge(SelectedDepartmentClassesStudentNumbers::run($departmentId, $selectedClass));
                }
            }
        }

        // 5. Selected Student IDs
        if (! empty($selectedStudentIds)) {
            $phoneNumbers = $phoneNumbers->merge(SelectedStudentNumbers::run($selectedStudentIds));
        }

        // 6. Extra Numbers
        if (! empty($extraNumbers)) {
            $phoneNumbers = $phoneNumbers->merge(SpecificPhoneNumbers::run($extraNumbers));
        }
        // Remove duplicates and filter out empty numbers
        $uniquePhoneNumbers = $phoneNumbers
            ->filter(function ($number) {
                return ! empty(trim($number));
            })
            ->unique()
            ->values();

        // calculate message character wise cost and total number of messages cost so 140 characters sms .50 tk
        $messageLength = strlen($smsMessage);
        if ($messageLength < 140) {
            $messageLength = 140; // Adjust length to 160 for cost calculation
        }
        $totalMessagesPart = ceil($messageLength / 140);
        $totalCost         = $totalMessagesPart * $uniquePhoneNumbers->count() * 0.45; // Assuming 0.50 tk per 160 characters

        $smsBalance = SMSBalance::first();
        if (! $smsBalance || $smsBalance->balance < $totalCost) {
            return redirect()->back()->with('error', 'Insufficient SMS balance. Please recharge your balance. Current balance: ' . $smsBalance->balance . ' tk' . ' Required balance: ' . $totalCost . ' tk');
        } else {
            $res = SMSAction::run($uniquePhoneNumbers, $smsMessage);
            $res = json_decode($res, true);
            if ($res['success_message']) {
                $smsBalance->balanceDecrement($totalCost);
                return redirect()->back()->with('success', 'SMS sent successfully to ' . $uniquePhoneNumbers->count() . ' recipients.');
            } else {
                return redirect()->back()->with('error', $res['error_message']);
            }
        }
    }

}
