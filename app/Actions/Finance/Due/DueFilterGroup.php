<?php
namespace App\Actions\Finance\Due;

use App\Models\Classes;
use App\Models\Department;
use Lorisleiva\Actions\Concerns\AsAction;

class DueFilterGroup
{
    // Add properties here
    use AsAction;
    public function handle()
    {

        $result = [
            'gender'     => ['male', 'female', 'other'],
            'class'      => Classes::get(),
            'department' => Department::get(),
            // 'fee_type'   => FeeType::pluck('name')->unique()->values()->all(),
        ];

        $data = $result;

        return $data;

    }

    // Add methods here
}
