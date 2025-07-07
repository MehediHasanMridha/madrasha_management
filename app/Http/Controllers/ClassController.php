<?php
namespace App\Http\Controllers;

use App\Models\Classes;
use App\Models\Department;
use App\Models\FeeType;
use App\Models\Subject;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ClassController extends Controller
{

    public function classStore(Request $request)
    {

        $request->validate([
            'name'            => 'required|string|max:255',
            'department'      => 'required|exists:departments,slug',
            'description'     => 'nullable|string',
            'icon'            => 'nullable|string',
            'boarding_fee'    => 'required|numeric|min:0',
            'academic_fee'    => 'required|numeric|min:0',
            'admission_fee'   => 'required|numeric|min:0',
            'subjects'        => 'nullable|array',
            'subjects.*.name' => 'required_with:subjects|string|max:255',
            'subjects.*.code' => 'nullable|string|max:100',
        ]);

        try {
            DB::beginTransaction();
            // department info
            $department           = Department::where('slug', $request->input('department'))->firstOrFail();
            $class                = new Classes();
            $class->name          = $request->input('name');
            $class->department_id = $department->id;
            $class->slug          = Str::slug($request->input('name')) . '-' . $department->slug ?? uniqid();
            $class->des           = $request->input('description') ?? null;
            $class->img           = $request->input('icon') ?? null;

            $class->save();

            // Create fees for the class
            $feeTypes = [
                [
                    'name'          => 'Boarding Fee',
                    'slug'          => 'boarding-fee' . '-' . $class->slug,
                    'amount'        => $request->input('boarding_fee'),
                    'class_id'      => $class->id,
                    'department_id' => $department->id,
                ],
                [
                    'name'          => 'Academic Fee',
                    'slug'          => 'academic-fee' . '-' . $class->slug,
                    'amount'        => $request->input('academic_fee'),
                    'class_id'      => $class->id,
                    'department_id' => $department->id,
                ],
                [
                    'name'          => 'Admission Fee',
                    'slug'          => 'admission-fee' . '-' . $class->slug,
                    'amount'        => $request->input('admission_fee'),
                    'class_id'      => $class->id,
                    'department_id' => $department->id,
                ],
            ];

            foreach ($feeTypes as $feeType) {
                FeeType::create($feeType);
            }

            // Create subjects for the class
            if ($request->has('subjects') && is_array($request->input('subjects'))) {
                foreach ($request->input('subjects') as $subjectData) {
                    if (! empty($subjectData['name'])) {
                        Subject::create([
                            'name'     => $subjectData['name'],
                            'slug'     => Str::slug($subjectData['name']) . '-' . $class->slug,
                            'code'     => $subjectData['code'] ?? null,
                            'class_id' => $class->id,
                        ]);
                    }
                }
            }

            DB::commit();

            return redirect()->back()->with('success', 'Class created successfully.');
        } catch (QueryException $e) {
            DB::rollBack();
            return redirect()
                ->back()
                ->with('error', $e->getCode() === '23000' ? 'Class name or fee Slug already exists.' : 'An error occurred while creating the Class.');
        }
    }

    public function update(Request $request, $class_slug)
    {

        $request->validate([
            'name'            => 'required|string|max:255',
            'description'     => 'nullable|string',
            'icon'            => 'nullable|string',
            'boarding_fee'    => 'required|numeric|min:0',
            'academic_fee'    => 'required|numeric|min:0',
            'admission_fee'   => 'required|numeric|min:0',
            'subjects'        => 'nullable|array', // Limit to 50 subjects max
            'subjects.*.name' => 'required_with:subjects|string|max:255|distinct',
            'subjects.*.code' => 'nullable|string|max:100',
        ]);

        try {
            DB::beginTransaction();

            if (! $class_slug) {
                return redirect()->back()->with('error', 'Class slug is required.');
            }

            $class = Classes::where('slug', $class_slug)->first();
            if (! $class) {
                return throw new \Exception('Class not found.');
            }

            $class->name = $request->input('name');
            if ($class->name !== $request->input('name')) {
                $class->slug = Str::slug($request->input('name')) . '-' . ($class->department->slug ?? uniqid());
            }
            $class->des = $request->input('description') ?? null;
            $class->img = $request->input('icon') ?? null;

            $class->save();

            // Update fees for the class
            $feeTypes = [
                [
                    'name'   => 'Boarding Fee',
                    'slug'   => "boarding-fee-{$class->slug}",
                    'amount' => $request->input('boarding_fee'),
                ],
                [
                    'name'   => 'Academic Fee',
                    'slug'   => "academic-fee-{$class->slug}",
                    'amount' => $request->input('academic_fee'),
                ],
                [
                    'name'   => 'Admission Fee',
                    'slug'   => "admission-fee-{$class->slug}",
                    'amount' => $request->input('admission_fee'),
                ],
            ];

            foreach ($feeTypes as $feeType) {
                FeeType::updateOrCreate(
                    [
                        'class_id' => $class->id,
                        'name'     => $feeType['name'],
                    ],
                    [
                        'slug'          => $feeType['slug'],
                        'amount'        => $feeType['amount'],
                        'department_id' => $class->department_id,
                    ]
                );
            }

            // Update subjects for the class
            $existingSubjects    = Subject::where('class_id', $class->id)->get()->keyBy('id');
            $submittedSubjectIds = [];

            if ($request->has('subjects') && is_array($request->input('subjects'))) {
                foreach ($request->input('subjects') as $subjectData) {
                    if (! empty($subjectData['name'])) {
                        $subjectId = $subjectData['id'] ?? null;
                        if ($subjectId && $existingSubjects->has($subjectId)) {
                            // Update existing subject
                            $subject    = $existingSubjects->get($subjectId);
                            $updateData = [
                                'name' => $subjectData['name'],
                                'code' => $subjectData['code'] ?? null,
                            ];

                            if ($subjectData['name'] !== $subject->name) {
                                $updateData['slug'] = Str::slug($subjectData['name']) . '-' . $class->slug;
                            }

                            $subject->update($updateData);
                            $submittedSubjectIds[] = $subjectId;
                        } else {
                            // Create new subject
                            $newSubject = Subject::create([
                                'name'     => $subjectData['name'],
                                'slug'     => Str::slug($subjectData['name']) . '-' . $class->slug,
                                'code'     => $subjectData['code'] ?? null,
                                'class_id' => $class->id,
                            ]);
                            $submittedSubjectIds[] = $newSubject->id;
                        }
                    }
                }
            }

            // Delete subjects that were not submitted (removed from form)
            Subject::where('class_id', $class->id)
                ->whereNotIn('id', $submittedSubjectIds)
                ->delete();

            DB::commit();
            return redirect()->back()->with('success', 'Class updated successfully.');

        } catch (QueryException $e) {
            DB::rollBack();
            Log::info('Error updating class', [
                'error' => $e->getMessage(),
            ]);
            if ($e->getCode() === '23000') {
                return redirect()
                    ->back()
                    ->with('error', 'Class name or slug already exists.');
            }
            return redirect()
                ->back()
                ->with('error', 'An error occurred while updating the Class.');
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()
                ->back()
                ->with('error', 'An error occurred while updating the Class.');
        }
    }

    public function destroyClass($class_slug)
    {
        try {
            DB::beginTransaction();

            $class = Classes::where('slug', $class_slug)->firstOrFail();

            $class->delete();

            DB::commit();
            return redirect()->back()->with('success', 'Class and associated fees deleted successfully.');

        } catch (QueryException $e) {
            DB::rollBack();
            if ($e->errorInfo[1] === 1451) {
                return redirect()
                    ->back()
                    ->with('error', 'Cannot delete this Class because it has associated students or staff. Please remove all students and staff from this Class first.');
            }
            return redirect()
                ->back()
                ->with('error', 'An error occurred while deleting the Class.');
        }
    }

}
