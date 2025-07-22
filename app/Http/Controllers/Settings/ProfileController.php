<?php
namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('admin::settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status'          => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user      = $request->user();
        $validated = $request->validated();
        // Handle image upload using the helper function

        try {
            DB::beginTransaction();
            $userData = collect($validated)->except('img')->toArray();
            $user->fill($userData);

            if ($request->hasFile('img')) {
                $validated['img'] = uploadImage($user->img, $request->file('img'), 'uploads/staff_images/');
                $user->img        = $validated['img'];
            }

            if ($user->isDirty('email')) {
                $user->email_verified_at = null;
            }

            $user->save();

            DB::commit();
            return back()->with('success', 'Profile updated successfully!');

        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            if ($th->getCode() === '23000') {
                return back()->with(['error' => 'Phone number or email already exists'])->withInput();
            }
            return back()->with(['error' => 'Failed to update profile. Please try again later.'])->withInput();
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
