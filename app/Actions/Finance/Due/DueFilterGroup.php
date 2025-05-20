<?php
namespace App\Actions\Finance\Due;

use App\Models\StudentDue;
use Lorisleiva\Actions\Concerns\AsAction;

class DueFilterGroup
{
    // Add properties here
    use AsAction;
    public function handle($year)
    {

        // [
        //     {
        //       "gender": "male",
        //       "class": "Class 1",
        //       "department": "Arts",
        //       "fee_type": "একাডেমিক ফি"
        //     },
        //     {
        //       "gender": "female",
        //       "class": "Class 1",
        //       "department": "Arts",
        //       "fee_type": "একাডেমিক ফি"
        //     }
        //   ]

        //   {
        //     "gender": ["male", "female"],
        //     "class": ["Class 1", "Class 2"],
        //     "department": ["Arts", "Science"],
        //     "fee_type": ["একাডেমিক ফি", "বই ফি"]
        //   }

        // Initialize properties here
        $data = StudentDue::with([
            'incomeLog.user',
            'incomeLog.feeType',
            'incomeLog.user.academics.class',
            'incomeLog.user.academics.department',
        ])
            ->whereHas('incomeLog', function ($q) use ($year) {
                $q->where('payment_period', 'like', $year . '%');
            })->get()->map(function ($item) {
            return [
                'gender'     => $item->incomeLog->user->gender ?? null,
                'class'      => $item->incomeLog->user->academics->class->name ?? null,
                'department' => $item->incomeLog->user->academics->department->name ?? null,
                'fee_type'   => $item->incomeLog->feeType->name ?? null,
            ];
        });

        $result = [
            'gender'     => $data->pluck('gender')->unique()->values()->all(),
            'class'      => $data->pluck('class')->unique()->values()->all(),
            'department' => $data->pluck('department')->unique()->values()->all(),
            'fee_type'   => $data->pluck('fee_type')->unique()->values()->all(),
        ];

        $data = $result;

        return $data;

    }

    // Add methods here
}
