<?php
namespace App\Http\Controllers;

use App\Jobs\FetchSelectedUserForSMSJob;
use App\Models\Department;
use App\Models\NotificationToken;
use App\Models\SMSBalance;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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

        FetchSelectedUserForSMSJob::dispatch(
            $allStudents,
            $allStaff,
            $allDueStudents,
            $selectedDepartments,
            $departmentSelections,
            $selectedStudentIds,
            $extraNumbers,
            $smsMessage
        );

        return redirect()->back()->with('success', "SMS prepared and queued successfully");
    }

    /**
     * Queue SMS for background processing
     *
     * @param array $phoneNumbers
     * @param string $message
     * @return bool
     */
    private function queueSmsForSending($phoneNumbers, $message)
    {
        try {
            // Here you would implement your SMS queue logic
            // For example, dispatching jobs to a queue

            foreach ($phoneNumbers as $phoneNumber) {
                // Dispatch SMS job to queue
                // \App\Jobs\SendSMSJob::dispatch($phoneNumber, $message);

                Log::info('SMS queued', [
                    'phone'          => $phoneNumber,
                    'message_length' => strlen($message),
                ]);
            }

            return true;
        } catch (\Exception $e) {
            Log::error('Failed to queue SMS: ' . $e->getMessage());
            return false;
        }
    }
}
