<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return '';
});
Route::get('/test', function () {
    return \Modules\User\Models\User::first();
    return view('welcome');
});



//php artisan optimize:clear