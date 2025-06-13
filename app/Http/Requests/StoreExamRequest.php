<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreExamRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name'                    => 'required|string|max:150',
            'description'             => 'nullable|string|max:1000',
            'department_id'           => 'required|exists:departments,id',
            'type'                    => 'required|in:midterm,final,quiz,assessment,other',
            'start_date'              => 'required|date|after:now',
            'end_date'                => 'required|date|after:start_date',
            'registration_start'      => 'nullable|date|before:start_date',
            'registration_end'        => 'nullable|date|after:registration_start|before:start_date',
            'exam_fee'                => 'nullable|numeric|min:0|max:999999.99',
            'is_fee_required'         => 'boolean',
            'instructions'            => 'nullable|string|max:2000',
            'total_marks'             => 'required|integer|min:1|max:1000',
            'pass_marks'              => 'required|integer|min:1|lte:total_marks',
            'duration_minutes'        => 'nullable|integer|min:1|max:1440', // Max 24 hours
            'classes'                 => 'required|array|min:1',
            'classes.*'               => 'exists:classes,id',
            'subjects'                => 'nullable|array',
            'subjects.*.subject_id'   => 'required_with:subjects|exists:subjects,id',
            'subjects.*.class_id'     => 'required_with:subjects|exists:classes,id',
            'subjects.*.exam_date'    => 'required_with:subjects|date|after_or_equal:start_date|before_or_equal:end_date',
            'subjects.*.start_time'   => 'required_with:subjects|date_format:H:i',
            'subjects.*.end_time'     => 'required_with:subjects|date_format:H:i|after:subjects.*.start_time',
            'subjects.*.total_marks'  => 'nullable|integer|min:1|max:1000',
            'subjects.*.pass_marks'   => 'nullable|integer|min:1',
            'subjects.*.instructions' => 'nullable|string|max:1000',
        ];
    }

    /**
     * Get custom validation messages.
     */
    public function messages(): array
    {
        return [
            'name.required'                        => 'Exam name is required.',
            'name.max'                             => 'Exam name cannot exceed 150 characters.',
            'department_id.required'               => 'Please select a department.',
            'department_id.exists'                 => 'Selected department is invalid.',
            'type.required'                        => 'Please select an exam type.',
            'type.in'                              => 'Invalid exam type selected.',
            'start_date.required'                  => 'Exam start date is required.',
            'start_date.after'                     => 'Exam start date must be in the future.',
            'end_date.required'                    => 'Exam end date is required.',
            'end_date.after'                       => 'Exam end date must be after start date.',
            'registration_start.before'            => 'Registration start must be before exam start date.',
            'registration_end.after'               => 'Registration end must be after registration start.',
            'registration_end.before'              => 'Registration end must be before exam start date.',
            'exam_fee.numeric'                     => 'Exam fee must be a valid number.',
            'exam_fee.min'                         => 'Exam fee cannot be negative.',
            'exam_fee.max'                         => 'Exam fee cannot exceed 999,999.99.',
            'total_marks.required'                 => 'Total marks is required.',
            'total_marks.min'                      => 'Total marks must be at least 1.',
            'total_marks.max'                      => 'Total marks cannot exceed 1000.',
            'pass_marks.required'                  => 'Pass marks is required.',
            'pass_marks.min'                       => 'Pass marks must be at least 1.',
            'pass_marks.lte'                       => 'Pass marks cannot exceed total marks.',
            'duration_minutes.min'                 => 'Duration must be at least 1 minute.',
            'duration_minutes.max'                 => 'Duration cannot exceed 24 hours.',
            'classes.required'                     => 'Please select at least one class.',
            'classes.min'                          => 'Please select at least one class.',
            'classes.*.exists'                     => 'One or more selected classes are invalid.',
            'subjects.*.subject_id.required_with'  => 'Subject is required.',
            'subjects.*.subject_id.exists'         => 'Selected subject is invalid.',
            'subjects.*.class_id.required_with'    => 'Class is required for subject.',
            'subjects.*.class_id.exists'           => 'Selected class is invalid.',
            'subjects.*.exam_date.required_with'   => 'Exam date is required for subject.',
            'subjects.*.exam_date.after_or_equal'  => 'Subject exam date must be within exam period.',
            'subjects.*.exam_date.before_or_equal' => 'Subject exam date must be within exam period.',
            'subjects.*.start_time.required_with'  => 'Start time is required for subject.',
            'subjects.*.start_time.date_format'    => 'Start time must be in HH:MM format.',
            'subjects.*.end_time.required_with'    => 'End time is required for subject.',
            'subjects.*.end_time.date_format'      => 'End time must be in HH:MM format.',
            'subjects.*.end_time.after'            => 'End time must be after start time.',
            'subjects.*.total_marks.min'           => 'Subject marks must be at least 1.',
            'subjects.*.total_marks.max'           => 'Subject marks cannot exceed 1000.',
            'subjects.*.pass_marks.min'            => 'Subject pass marks must be at least 1.',
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            // Validate that selected classes belong to the selected department
            if ($this->department_id && $this->classes) {
                $departmentClassIds = \App\Models\Classes::where('department_id', $this->department_id)
                    ->pluck('id')
                    ->toArray();

                $invalidClasses = array_diff($this->classes, $departmentClassIds);

                if (! empty($invalidClasses)) {
                    $validator->errors()->add('classes', 'Some selected classes do not belong to the selected department.');
                }
            }

            // Validate that subjects belong to their respective classes
            if ($this->subjects) {
                foreach ($this->subjects as $index => $subject) {
                    if (isset($subject['subject_id']) && isset($subject['class_id'])) {
                        $subjectExists = \App\Models\Subject::where('id', $subject['subject_id'])
                            ->where('class_id', $subject['class_id'])
                            ->exists();

                        if (! $subjectExists) {
                            $validator->errors()->add("subjects.{$index}.subject_id", 'Subject does not belong to the selected class.');
                        }
                    }

                    // Validate pass marks against total marks for subjects
                    if (isset($subject['pass_marks']) && isset($subject['total_marks'])) {
                        if ($subject['pass_marks'] > $subject['total_marks']) {
                            $validator->errors()->add("subjects.{$index}.pass_marks", 'Pass marks cannot exceed total marks.');
                        }
                    }
                }
            }
        });
    }
}
