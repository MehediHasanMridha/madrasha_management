<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class showStaffData extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                      => $this->id,
            'name'                    => $this->name,
            'unique_id'               => $this->unique_id,
            'image'                   => $this->img,
            'phone'                   => $this->phone,
            'blood_group'             => $this->academics->blood,
            'designation'             => $this->academics->designation,
            'salary'                  => $this->academics->salary,
            'address'                 => [
                'district' => $this->address->district,
                'upazilla' => $this->address->upazilla,
                'location' => $this->address->location,
            ],
            'guardian'                => [
                'father_name'    => $this->guardians->father_name,
                'mother_name'    => $this->guardians->mother_name,
                'contact_number' => json_decode($this->guardians->numbers)[0] ?? null,
            ],
            'reference'               => $this->academics->reference,
            'reference_mobile_number' => $this->academics->reference_number,
        ];
    }
}
