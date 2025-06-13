<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $statusInfo = $this->getStatusWithTime();

        return [
            'id'                   => $this->id,
            'name'                 => $this->name,
            'slug'                 => $this->slug,
            'description'          => $this->description,
            'type'                 => $this->type,
            'status'               => $this->status,
            'display_status'       => $statusInfo['status'],
            'time_left'            => $statusInfo['timeLeft'],
            'start_date'           => $this->start_date?->toISOString(),
            'end_date'             => $this->end_date?->toISOString(),
            'registration_start'   => $this->registration_start?->toISOString(),
            'registration_end'     => $this->registration_end?->toISOString(),
            'exam_fee'             => $this->exam_fee,
            'is_fee_required'      => $this->is_fee_required,
            'instructions'         => $this->instructions,
            'total_marks'          => $this->total_marks,
            'pass_marks'           => $this->pass_marks,
            'duration_minutes'     => $this->duration_minutes,
            'published_at'         => $this->published_at?->toISOString(),
            'created_at'           => $this->created_at?->toISOString(),
            'updated_at'           => $this->updated_at?->toISOString(),

            // Relationships
            'department'           => $this->whenLoaded('department', function () {
                return [
                    'id'   => $this->department->id,
                    'name' => $this->department->name,
                    'slug' => $this->department->slug,
                ];
            }),

            'classes'              => $this->whenLoaded('classes', function () {
                return $this->classes->map(function ($class) {
                    return [
                        'id'   => $class->id,
                        'name' => $class->name,
                        'slug' => $class->slug,
                    ];
                });
            }),

            'exam_subjects'        => $this->whenLoaded('examSubjects', function () {
                return $this->examSubjects->map(function ($examSubject) {
                    return [
                        'id'           => $examSubject->id,
                        'exam_date'    => $examSubject->exam_date?->toISOString(),
                        'start_time'   => $examSubject->start_time,
                        'end_time'     => $examSubject->end_time,
                        'total_marks'  => $examSubject->total_marks,
                        'pass_marks'   => $examSubject->pass_marks,
                        'instructions' => $examSubject->instructions,
                        'status'       => $examSubject->status,
                        'subject'      => $examSubject->whenLoaded('subject', [
                            'id'   => $examSubject->subject->id,
                            'name' => $examSubject->subject->name,
                            'code' => $examSubject->subject->code,
                        ]),
                        'class'        => $examSubject->whenLoaded('class', [
                            'id'   => $examSubject->class->id,
                            'name' => $examSubject->class->name,
                        ]),
                    ];
                });
            }),

            'creator'              => $this->whenLoaded('creator', function () {
                return [
                    'id'   => $this->creator->id,
                    'name' => $this->creator->name,
                ];
            }),

            // Computed properties
            'is_ongoing'           => $this->isOngoing(),
            'is_registration_open' => $this->isRegistrationOpen(),
            'formatted_start_date' => $this->start_date?->format('M d, Y'),
            'formatted_end_date'   => $this->end_date?->format('M d, Y'),
            'formatted_exam_fee'   => $this->exam_fee ? number_format($this->exam_fee, 2) : null,
        ];
    }
}
