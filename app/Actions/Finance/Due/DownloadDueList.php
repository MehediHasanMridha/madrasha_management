<?php
namespace App\Actions\Finance\Due;

use App\Models\User;
use Lorisleiva\Actions\Concerns\AsAction;

class DownloadDueList
{
    use AsAction;
    public function handle($date = null, $gender = null, $class = null, $department = null)
    {

        // get date format 2025-01 of current year&month
        // Get all student users who do NOT have an incomeLog for the current month
        $usersWithNoIncomeLogOrDue = User::with(['academics.class', 'academics.department', 'incomeLogs.studentDue', 'guardians'])
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
            ->get()->map(function ($user) {
            return [
                'id'          => $user->id,
                'name'        => $user->name,
                'phone'       => $user->phone,
                'gender'      => $user->gender,
                'image'       => $user->img,
                'unique_id'   => $user->unique_id,
                'father_name' => $user->guardians->father_name ?? null,
                'class'       => $user->academics->class->name ?? null,
                'department'  => $user->academics->department->name ?? null,
                'due_amount'  => $user->incomeLogs->sum('studentDue.due_amount') > 0
                ? $user->incomeLogs->sum('studentDue.due_amount')
                : getStudentFee($user->academics, 'academic') + getStudentFee($user->academics, 'boarding'),
            ];

        });
        // Build base query with eager loading
        return $usersWithNoIncomeLogOrDue;
    }
}
