<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::call(function () {
    Artisan::call("backup:run");
})->everySixHours();
Schedule::call(function () {
    Artisan::call("queue:work --stop-when-empty");
})->everySecond();
