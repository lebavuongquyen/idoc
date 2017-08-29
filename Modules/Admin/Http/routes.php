<?php

Route::group(
    [
        'middleware' => ['web', 'admin_view_variable', 'auth'],
        'prefix'     => 'admin',
        'namespace'  => 'Admin\Http\Controllers'
    ],
    function() {
        Route::group(
            ['middleware' => ['access_admin']],
            function() {
                Route::get('/', 'AdminController@index')->name('admin/dashboard');
            }
        );
        Route::get('lastest-message/{id}', 'UserMessageController@getLastestByUser')
            ->name('admin/message_by_user');
        Route::get('lastest-message-current-user', 'UserMessageController@getLastestByCurrentUser')
            ->name('admin/message_by_current_user');
        Route::get('user/profile', 'UserController@profile')
            ->name('admin/user_profile');
    }
);
