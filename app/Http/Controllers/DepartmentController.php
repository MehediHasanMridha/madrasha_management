<?php
namespace App\Http\Controllers;

use Inertia\Inertia;

class DepartmentController extends Controller
{
    public function view($department_slug)
    {
        return Inertia::render('Department/Dashboard');
    }
}
