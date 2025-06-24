<?php
namespace App\Http\Controllers;

use App\Models\NotificationToken;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
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
}
