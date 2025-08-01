<?php
namespace App\Http\Middleware;

use App\Models\User;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
             ...parent::share($request),
            'name'  => config('app.name'),
            'mode'  => env('IS_DEV_SERVER', false) ? 'development' : 'production',
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth'  => [
                'user'        => $request->user(),
                'permissions' => [
                    'viewAny' => $request->user()?->can('viewAny', User::class),
                ],
            ],
            'flash' => [
                'success'       => Session::get('success'),
                'error'         => Session::get('error'),
                'message'       => Session::get('message'),
                'data'          => Session::get('data'),
                'queue_success' => Session::get('queue_success'),
                'queue_error'   => Session::get('queue_error'),
            ],
        ];
    }
}
