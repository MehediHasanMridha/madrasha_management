<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

Route::get('/migrate_database', function () {
    Artisan::call('migrate:fresh');
    return redirect('/');
});
