<?php
namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\NotificationToken;
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
        return Inertia::render('admin::notification/sms-section',
            [
                'departments' => $department,
            ]
        );
    }

    public function sendSms(Request $request)
    {
        // Validate the request
        $request->validate([
            'sms_message'   => 'required|string|max:160',
            'all_students'  => 'boolean',
            'department_id' => 'nullable|exists:departments,id',
        ]);

        // Logic to send SMS goes here
        // This is a placeholder for actual SMS sending logic

        return redirect()->back()->with('success', 'SMS sent successfully.');
    }
}
