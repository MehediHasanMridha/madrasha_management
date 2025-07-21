<?php
namespace App\Http\Controllers;

use App\Http\Requests\BrandingRequest;
use App\Models\Setting;
use App\Models\User;
use App\Services\FaviconService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class SettingsController extends Controller
{
    public function branding()
    {
        $brandingSettings = Setting::getSettings([
            'institute_name',
            'institute_name_bangla',
            'logo_path',
            'institute_address',
            'favicon_path',
        ]);

        return Inertia::render('admin::settings/branding/index', [
            'settings' => $brandingSettings,
        ]);
    }

    public function updateBranding(BrandingRequest $request, FaviconService $faviconService)
    {

        try {
            // Update institute name
            if ($request->has('institute_name')) {
                Setting::setValue('institute_name', $request->input('institute_name'));
            }

            // Update institute name bangla
            if ($request->has('institute_name_bangla')) {
                Setting::setValue('institute_name_bangla', $request->input('institute_name_bangla'));
            }

            // Update institute address
            if ($request->has('institute_address')) {
                Setting::setValue('institute_address', $request->input('institute_address'));
            }

            // Handle logo upload
            if ($request->hasFile('logo')) {
                $data     = Setting::getValue('logo_path'); // Get old logo path
                $logoPath = uploadImage($data, $request->file('logo'), null, name: 'logo' . '-' . time());
                Setting::setValue('logo_path', $logoPath);
            }

            // Handle favicon upload
            if ($request->hasFile('favicon')) {
                $oldFaviconPath    = Setting::getValue('favicon_path');
                $faviconPath       = uploadImage($oldFaviconPath, $request->file('favicon'), '/', name: 'favicon', type: 'png', width: 32, height: 32);
                $publicFaviconPath = public_path('favicon.ico');
                // Delete old favicon.ico if it exists
                if (file_exists($publicFaviconPath)) {
                    unlink($publicFaviconPath);
                }
                // Copy the uploaded file as favicon.ico
                copy(public_path($faviconPath), $publicFaviconPath);
                Setting::setValue('favicon_path', $faviconPath);
            }

            return redirect()->back()->with('success', 'Branding settings updated successfully!');

        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to update branding settings: ' . $e->getMessage()]);
        }
    }

    public function operator()
    {
        // Fetch all users with the 'editor' role
        $operators = User::whereHas('roles', function ($query) {
            $query->where('name', 'editor');
        })->get();
        return Inertia::render('admin::settings/operator', [
            'operators' => $operators,
        ]);
    }

    public function addOperator(Request $request)
    {
        $request->validate([
            'user_id'  => 'required|exists:users,id',
            'password' => 'required|string|min:6',
            'phone'    => 'nullable|string|max:20',
            'email'    => 'nullable|email|max:255',
        ]);

        try {
            $user = User::find($request->input('user_id'));

            if (! $user) {
                return redirect()->back()->withErrors(['user_id' => 'User not found.']);
            }

            if ($request->input('email')) {
                $user->email = $request->input('email');
            }

            if ($request->input('phone')) {
                $user->phone = $request->input('phone');
            }

            if ($request->input('password')) {
                $user->password = Hash::make($request->input('password'));
            }
            $user->save();
            // Find or create editor role
            $role = Role::firstOrCreate(['name' => 'editor']);

            // Assign role to user
            $user->assignRole($role);

            return redirect()->back()->with('success', 'User assigned as an operator successfully!');

        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to assign operator: ' . $e->getMessage()]);
        }

    }

    public function updateOperatorData(Request $request, $id)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'nullable|email|max:255|unique:users,email,' . $id,
            'phone'    => 'nullable|string|max:20',
            'password' => 'nullable|string|min:6',
        ]);

        try {
            $user = User::find($id);

            if (! $user) {
                return redirect()->back()->withErrors(['error' => 'User not found.']);
            }

            // Check if user has editor role
            if (! $user->hasRole('editor')) {
                return redirect()->back()->withErrors(['error' => 'User is not an operator.']);
            }

            $user->name = $request->input('name');

            if ($request->input('email')) {
                $user->email = $request->input('email');
            }

            if ($request->input('phone')) {
                $user->phone = $request->input('phone');
            }

            if ($request->input('password')) {
                $user->password = Hash::make($request->input('password'));
            }

            $user->save();

            return redirect()->back()->with('success', 'Operator updated successfully!');

        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to update operator: ' . $e->getMessage()]);
        }
    }

    public function deleteOperator($id)
    {
        try {
            $user = User::find($id);

            if (! $user) {
                return redirect()->back()->withErrors(['error' => 'User not found.']);
            }

            // Check if user has editor role
            if (! $user->hasRole('editor')) {
                return redirect()->back()->withErrors(['error' => 'User is not an operator.']);
            }

            // Remove editor role instead of deleting user
            $user->removeRole('editor');

            return redirect()->back()->with('success', 'Operator role removed successfully!');

        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to remove operator: ' . $e->getMessage()]);
        }
    }

}
