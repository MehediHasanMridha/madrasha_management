<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class showStudentData extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id,
            'name'      => $this->name,
            'unique_id' => $this->unique_id,
            'image'     => $this->img,
            'phone'     => $this->phone,
            'gender'    => $this->gender,
            'address'   => [
                'district' => $this->address->district,
                'upazilla' => $this->address->upazilla,
                'location' => $this->address->location,
            ],
            'guardian'  => [
                'father_name' => $this->guardians->father_name,
                'mother_name' => $this->guardians->mother_name,
                'numbers'     => json_decode($this->guardians->numbers),
            ],
            'academic'  => [
                'blood'            => $this->academics->blood,
                'class_id'         => $this->academics->class_id,
                'boarding_fee'     => $this->academics->boarding_fee,
                'academic_fee'     => $this->academics->academic_fee,
                'reference'        => $this->academics->reference,
                'reference_number' => $this->academics->reference_number,
                'department_id'    => $this->academics->department_id,
            ],
            'class'     => $this->academics->class->name,
        ];
    }
}
