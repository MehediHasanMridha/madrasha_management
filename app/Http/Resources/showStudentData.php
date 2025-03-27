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
        // return parent::toArray($request);
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'unique_id'   => $this->unique_id,
            'image'       => $this->img,
            'class'       => $this->academics->class->name,
            'father_name' => $this->guardians->father_name,
        ];
    }
}
