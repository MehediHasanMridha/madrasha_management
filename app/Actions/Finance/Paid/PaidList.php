<?php
namespace App\Actions\Finance\Paid;

use App\Models\User;
use Illuminate\Support\Facades\Log;
use Lorisleiva\Actions\Concerns\AsAction;

class PaidList
{
    use AsAction;

    public function handle($filter = 'today', $gender = null, $class = null, $department = null)
    {
        try {
            // Determine the date range based on filter
            $dateCondition = $this->getDateCondition($filter);

            // Get all student users who have income logs (payments) for the specified period
            $paidStudents = User::with(['academics.class', 'academics.department', 'incomeLogs.feeType'])
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
                ->whereHas('incomeLogs', function ($q) use ($dateCondition) {
                    $q->where('status', 'paid')
                        ->whereHas('feeType', function ($feeTypeQuery) {
                            $feeTypeQuery->where('slug', 'like', '%academic-fee%')
                                ->orWhere('slug', 'like', '%boarding-fee%');
                        });

                    // Apply the appropriate date condition
                    if ($dateCondition['column'] === 'created_at') {
                        $q->where($dateCondition['column'], $dateCondition['operator'], $dateCondition['value']);
                    } else {
                        $q->where($dateCondition['column'], $dateCondition['operator'], $dateCondition['value']);
                    }
                })
                ->paginate(request()->input('per_page', 10), ['*'], 'page', request()->input('page', 1))
                ->through(function ($item) use ($dateCondition) {
                    // Calculate total paid amount for the period
                    $logsQuery = $item->incomeLogs()
                        ->where('status', 'paid')
                        ->whereHas('feeType', function ($feeTypeQuery) {
                            $feeTypeQuery->where('slug', 'like', '%academic-fee%')
                                ->orWhere('slug', 'like', '%boarding-fee%');
                        });

                    // Apply the appropriate date condition for totals
                    if ($dateCondition['column'] === 'created_at') {
                        $logsQuery->where($dateCondition['column'], $dateCondition['operator'], $dateCondition['value']);
                    } else {
                        $logsQuery->where($dateCondition['column'], $dateCondition['operator'], $dateCondition['value']);
                    }

                    $totalPaid = $logsQuery->sum('amount');

                    // Get payment details for the period
                    $payments = $logsQuery->with('feeType')->get();

                    return [
                        'id'            => $item->id,
                        'name'          => $item->name,
                        'phone'         => $item->phone,
                        'gender'        => $item->gender,
                        'image'         => $item->img,
                        'unique_id'     => $item->unique_id,
                        'class'         => $item->academics->class->name ?? null,
                        'department'    => $item->academics->department->name ?? null,
                        'total_paid'    => $totalPaid,
                        'payment_count' => $payments->count(),
                        'payments'      => $payments->map(function ($payment) {
                            return [
                                'amount'         => $payment->amount,
                                'fee_type'       => $payment->feeType->name ?? 'Unknown',
                                'payment_period' => $payment->payment_period,
                                'created_at'     => $payment->created_at->format('Y-m-d H:i:s'),
                            ];
                        }),
                    ];
                })->withQueryString();

            return $paidStudents;
        } catch (\Exception $e) {
            // Log the error for debugging
            Log::error('PaidList Action Error: ' . $e->getMessage());

            // Return empty paginated collection in case of error
            return new \Illuminate\Pagination\LengthAwarePaginator(
                collect([]),
                0,
                request()->input('per_page', 10),
                request()->input('page', 1),
                ['path' => request()->url(), 'pageName' => 'page']
            );
        }
    }

    private function getDateCondition($filter)
    {
        switch ($filter) {
            case 'today':
                return [
                    'column'   => 'created_at',
                    'operator' => '>=',
                    'value'    => now()->startOfDay(),
                ];
            case 'this_month':
                return [
                    'column'   => 'payment_period',
                    'operator' => 'like',
                    'value'    => now()->format('Y-m') . '%',
                ];
            default:
                // Default to today
                return [
                    'column'   => 'created_at',
                    'operator' => '>=',
                    'value'    => now()->startOfDay(),
                ];
        }
    }
}
