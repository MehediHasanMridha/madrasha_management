<?php
namespace App\Actions\Finance\Due;

use App\Models\Classes;
use App\Models\Department;
use App\Models\FeeType;
use Lorisleiva\Actions\Concerns\AsAction;

class DueFilterGroup
{
    // Add properties here
    use AsAction;
    public function handle()
    {

        $result = [
            'gender'     => ['male', 'female', 'other'],
            'class'      => Classes::pluck('name')->unique()->values()->all(),
            'department' => Department::pluck('name')->unique()->values()->all(),
            'fee_type'   => FeeType::pluck('name')->unique()->values()->all(),
        ];

        $data = $result;

        return $data;

    }

    // Add methods here
}
