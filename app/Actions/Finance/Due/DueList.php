<?php
namespace App\Actions\Finance\Due;

use App\Models\StudentDue;
use Lorisleiva\Actions\Concerns\AsAction;

class DueList
{
    use AsAction;
    public function handle(
        $year,
        $gender = null,
        $class = null,
        $department = null
    ) {
        // Build base query with eager loading
        $query = StudentDue::with([
            'incomeLog.user.academics.class',
            'incomeLog.user.academics.department',
            'incomeLog.feeType',
        ])->whereHas('incomeLog', function ($q) use ($year, $gender, $class, $department) {
            $q->where('payment_period', 'like', $year . '%')
                ->when($gender, fn($q) => $q->whereHas('user', fn($u) => $u->where('gender', $gender)))
                ->when($class, fn($q) => $q->whereHas('user.academics.class', fn($c) => $c->where('name', $class)))
                ->when($department, fn($q) => $q->whereHas('user.academics.department', fn($d) => $d->where('name', $department)));
        });

        // Get all dues for filter group
        // $dues = $query->get();

        // $filterGroup = [
        //     'gender'     => $dues->pluck('incomeLog.user.gender')->unique()->values()->all(),
        //     'class'      => $dues->pluck('incomeLog.user.academics.class.name')->unique()->values()->all(),
        //     'department' => $dues->pluck('incomeLog.user.academics.department.name')->unique()->values()->all(),
        //     'fee_type'   => $dues->pluck('incomeLog.feeType.name')->unique()->values()->all(),
        // ];

        // Paginate and transform data
        $data = $query->paginate(10, ['*'], 'page', request()->input('page', 1))
            ->through(function ($item) {
                $user      = $item->incomeLog->user ?? null;
                $academics = $user->academics ?? null;
                return [
                    'id'         => $item->id,
                    'user_id'    => $user->id ?? null,
                    'name'       => $user->name ?? null,
                    'email'      => $user->email ?? null,
                    'phone'      => $user->phone ?? null,
                    'gender'     => $user->gender ?? null,
                    'image'      => $user->img ?? null,
                    'fee_type'   => $item->incomeLog->feeType->name ?? null,
                    'period'     => isset($item->incomeLog->payment_period) ? date('F', strtotime($item->incomeLog->payment_period)) : null,
                    'unique_id'  => $user->unique_id ?? null,
                    'class'      => $academics->class->name ?? null,
                    'department' => $academics->department->name ?? null,
                    'due_amount' => round($item->due_amount, 2),
                ];
            })->withQueryString();

        return $data;
    }
}
