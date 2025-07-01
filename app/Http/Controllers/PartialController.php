<?php
namespace App\Http\Controllers;

use App\Models\Department;

class PartialController extends Controller
{
    public function getAllDepartments()
    {
        $departments = Department::with(['classes', 'classes.feeTypes'])->get();
        if ($departments->isEmpty()) {
            return response()->json(['message' => 'No departments found'], 404);
        }
        return response()->json([
            'message' => 'Departments retrieved successfully',
            'data'    => $departments,
        ], 200);
    }
}
