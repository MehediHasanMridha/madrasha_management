<?php
namespace App\Http\Controllers;

use Inertia\Inertia;

class SettingsController extends Controller
{
    public function branding()
    {
        return Inertia::render('admin::settings/branding/index');
    }
}
