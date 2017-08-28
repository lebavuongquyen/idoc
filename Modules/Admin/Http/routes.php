<?php

Route::group(
    [
    'middleware' => ['web', 'auth', 'access_admin', 'admin_view_variable'],
    'prefix'     => 'admin',
    'namespace'  => 'Admin\Http\Controllers'
    ], function() {
    Route::get('/', 'AdminController@index')->name('dashboard');
}
);
