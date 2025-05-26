<?php

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function (Response $response) {
            if ($response->getStatusCode() === 419) {
                return back()->with([
                    'message' => 'The page expired, please try again.',
                ]);
            }

            return $response;
        });
        // app()->environment('production')
        // if (! config('app.debug')) {
        //     $exceptions->respond(using: function (Response $response) {
        //         if ($response->getStatusCode() === 404) {
        //             return Inertia::render("errors/404");
        //         } elseif ($response->getStatusCode() === 500) {
        //             $exception = $response->exception;
        //             return Inertia::render("errors/500", [
        //                 'message' => $exception ? $exception->getMessage() : 'An error occurred',
        //             ]);
        //         }
        //     });
        // }
    })->create();
