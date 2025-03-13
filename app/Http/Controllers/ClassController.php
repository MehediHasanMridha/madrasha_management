<?php
namespace App\Http\Controllers;

use App\Models\Classes;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ClassController extends Controller
{
    public function classCreateView()
    {
        return Inertia::render('Class/AddClass');
    }

    public function classStore(Request $request)
    {
        $request->validate([
            'name'       => 'required|string|max:255',
            'department' => 'required|string|max:255',
        ]);

        $class                = new Classes();
        $class->name          = $request->input('name');
        $class->department_id = $request->input('department');
        $class->slug          = Str::slug($request->input('name') . '-' . $request->input('department'), '-');

        $class->save();

        return redirect()->route('class')->with('success', 'Class created successfully.');
    }
}
