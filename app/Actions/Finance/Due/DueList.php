<?php
namespace App\Actions\Finance\Due;

use App\Models\User;
use Lorisleiva\Actions\Concerns\AsAction;

class DueList
{
    use AsAction;
    public function handle($date = null, $gender = null, $class = null, $department = null)
    {

        // get date format 2025-01 of current year&month
        // Get all student users who do NOT have an incomeLog for the current month
        $usersWithNoIncomeLogOrDue = User::with(['academics.class', 'academics.department', 'incomeLogs.studentDue'])
            ->whereHas('roles', fn($q) => $q->where('name', 'student'))
            ->when($gender, function ($query, $gender) {
                $query->where('gender', $gender);
            })
            ->when($class, function ($query, $class) {
                $query->whereHas('academics.class', function ($q) use ($class) {
                    $q->where('slug', $class);
                });
            })
            ->when($department, function ($query, $department) {
                $query->whereHas('academics.department', function ($q) use ($department) {
                    $q->where('slug', $department);
                });
            })
            ->where(function ($query) use ($date) {
                // Users who do not have an incomeLog for the current month
                $query->whereDoesntHave('incomeLogs', function ($q) use ($date) {
                    $q->where('payment_period', $date)
                        ->whereHas('feeType', function ($feeTypeQuery) {
                            $feeTypeQuery->where('slug', 'like', '%academic-fee%')
                                ->orWhere('slug', 'like', '%boarding-fee%');
                        });
                })
                // Or users who have a due for the current month
                    ->orWhereHas('incomeLogs', function ($q) use ($date) {
                        $q->where('payment_period', $date)
                            ->whereHas('studentDue', function ($dueQuery) {
                                $dueQuery->where('due_amount', '>', 0);
                            });
                    });
            })
            ->paginate(request()->input('per_page', 10), ['*'], 'page', request()->input('page', 1))
            ->through(fn($item) => [
                'id'         => $item->id,
                'name'       => $item->name,
                'phone'      => $item->phone,
                'gender'     => $item->gender,
                'image'      => $item->img,
                'unique_id'  => $item->unique_id,
                'class'      => $item->academics->class->name ?? null,
                'department' => $item->academics->department->name ?? null,
                // get the total due amount from incomeLogs other wise show monthly fee
                'due_amount' => $item->incomeLogs->sum('studentDue.due_amount') > 0 ? $item->incomeLogs->sum('studentDue.due_amount') : getStudentFee($item->academics, 'academic') +
                getStudentFee($item->academics, 'boarding'),
            ])->withQueryString();
        // Build base query with eager loading

        return $usersWithNoIncomeLogOrDue;
    }
}
