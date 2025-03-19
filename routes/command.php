<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::get('/migrate_database', function () {
    Artisan::call('migrate:fresh');
    return redirect('/');
});

// import sql file into database
Route::get('/import_database', function () {
    DB::unprepared(file_get_contents(base_path('db.sql')));
    return redirect('/');
});
