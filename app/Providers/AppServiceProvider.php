<?php
namespace App\Providers;

use App\Models\Setting;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        try {
            Storage::extend('google', function ($app, $config) {
                $options = [];

                if (! empty($config['teamDriveId'] ?? null)) {
                    $options['teamDriveId'] = $config['teamDriveId'];
                }

                if (! empty($config['sharedFolderId'] ?? null)) {
                    $options['sharedFolderId'] = $config['sharedFolderId'];
                }

                $client = new \Google\Client();
                $client->setClientId($config['clientId']);
                $client->setClientSecret($config['clientSecret']);
                $client->refreshToken($config['refreshToken']);

                $service = new \Google\Service\Drive($client);
                $adapter = new \Masbug\Flysystem\GoogleDriveAdapter($service, $config['folder'] ?? '/', $options);
                $driver  = new \League\Flysystem\Filesystem($adapter);

                return new \Illuminate\Filesystem\FilesystemAdapter($driver, $adapter);
            });
            if (DB::connection()->getPdo()) {
                $brandingSettings = Setting::getSettings([
                    'institute_name',
                    'institute_name_bangla',
                    'logo_path',
                ]);
                Inertia::share([
                    'institute' => [
                        'name'        => $brandingSettings['institute_name'] ?? config('app.institute_name'),
                        'name_bangla' => $brandingSettings['institute_name_bangla'] ?? config('app.institute_name_bangla'),
                        'logo'        => $brandingSettings['logo_path'] ?? config('app.logo_path'),
                    ],
                ]);
            }
        } catch (\Exception $e) {
            // your exception handling logic
        }

    }
}
