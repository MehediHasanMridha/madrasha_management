<?php
namespace App\Http\Controllers;

use App\Models\WelcomePageContent;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        $contents = WelcomePageContent::active()->ordered()->get();

        return Inertia::render('main::welcome', [
            'welcomeContent' => $contents,
        ]);
    }
}
