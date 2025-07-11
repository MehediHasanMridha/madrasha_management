<?php
namespace App\Http\Controllers;

use App\Http\Requests\BrandingRequest;
use App\Models\Setting;
use App\Services\FaviconService;
use Inertia\Inertia;

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
}
