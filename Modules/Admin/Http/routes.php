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
                Route::get('/', 'DashboardController@index')->name('admin/dashboard');
                Route::get('/setting', 'SettingController@index')->name('admin/setting');
                Route::get('/setting/list', 'SettingController@getList')->name('admin/setting_list');
                Route::post('/setting/save', 'SettingController@save')->name('admin/setting_save');
            }
        );
        Route::get('lastest-message/{id}', 'UserMessageController@getLastestByUser')
            ->name('admin/message_by_user');
        Route::get('lastest-message-current-user', 'UserMessageController@getLastestByCurrentUser')
            ->name('admin/message_by_current_user');
        Route::get('user/profile', 'UserController@profile')
            ->name('admin/user_profile');
        Route::get('user/message', 'UserController@message')
            ->name('admin/user_message');
    }
);
