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
                Route::post('/setting/save', 'SettingController@store')->name('admin/setting_save');
                Route::post('/setting/delete', 'SettingController@delete')->name('admin/setting_delete');
                Route::get('/admin-permission' , 'AdminPermissionController@index')->name('admin/admin_permission');
                Route::get('/admin-permission/grant' , 'AdminPermissionController@grant')->name('admin/admin_permission_grant');
                Route::get('/user' , 'UserController@index')->name('admin/user');
                Route::get('/role' , 'RoleController@index')->name('admin/role');
                Route::get('/group' , 'GroupController@index')->name('admin/group');
                Route::get('/group/create' , 'GroupController@create')->name('admin/group_create');
                Route::get('/group/update/{id}' , 'GroupController@update')->name('admin/group_update');
                Route::get('/group/view/{id}' , 'GroupController@view')->name('admin/group_view');
                Route::post('/group/save/{id?}' , 'GroupController@save')->name('admin/group_save');
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
        Route::get('user/get/{id?}', 'UserController@get')
            ->name('admin/user_get');
        Route::get('role/get/{id?}', 'RoleController@get')
            ->name('admin/role_get');
        Route::get('group/get/{id?}', 'GroupController@get')
            ->name('admin/group_get');
    }
);
