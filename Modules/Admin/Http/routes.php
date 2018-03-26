<?php
Route::group(
    [
    'middleware' => ['web', 'admin_view_variable', 'auth'],
    'prefix' => 'admin',
    'namespace' => 'Admin\Http\Controllers'
    ], function() {
    Route::name('admin.')
        ->group(function() {
            Route::group(
                ['middleware' => ['access_admin']], function() {
                Route::get('/', 'DashboardController@index')->name('dashboard');
                Route::get('/setting', 'SettingController@index')->name('setting');
                Route::get('/setting/list', 'SettingController@getList')->name('setting_list');
                Route::post('/setting/save', 'SettingController@store')->name('setting_save');
                Route::post('/setting/delete', 'SettingController@delete')->name('setting_delete');
                Route::get('/admin-permission', 'AdminPermissionController@index')->name('admin_permission');
                Route::get('/admin-permission/grant', 'AdminPermissionController@grant')->name('admin_permission_grant');
                Route::get('/user', 'UserController@index')->name('user');
                /* Group routes*/
                Route::get('/group', 'GroupController@index')->name('group');
                Route::get('/group/create', 'GroupController@create')->name('group_create');
                Route::get('/group/update/{id}', 'GroupController@update')->name('group_update');
                Route::get('/group/view/{id}', 'GroupController@view')->name('group_view');
                Route::post('/group/save/{id?}', 'GroupController@save')->name('group_save');
                Route::post('/group/destroy', 'GroupController@destroy')->name('group_destroy');
                /*Role routes*/
                Route::get('/role', 'RoleController@index')->name('role');
                Route::get('/role/create', 'RoleController@create')->name('role_create');
                Route::get('/role/update/{id}', 'RoleController@update')->name('role_update');
                Route::get('/role/view/{id}', 'RoleController@view')->name('role_view');
                Route::post('/role/save/{id?}', 'RoleController@save')->name('role_save');
                Route::post('/role/destroy', 'RoleController@destroy')->name('role_destroy');
            }
            );
            Route::get('lastest-message/{id}', 'UserMessageController@getLastestByUser')
            ->name('message_by_user');
            Route::get('lastest-message-current-user', 'UserMessageController@getLastestByCurrentUser')
            ->name('message_by_current_user');
            Route::get('user/profile', 'UserController@profile')
            ->name('user_profile');
            Route::get('user/message', 'UserController@message')
            ->name('user_message');
            Route::get('user/get/{id?}', 'UserController@get')
            ->name('user_get');
            Route::get('role/get/{id?}', 'RoleController@get')
            ->name('role_get');
            Route::get('group/get/{id?}', 'GroupController@get')
            ->name('group_get');
            Route::get('/{controller}/validate-unique', function($controller , Illuminate\Http\Request $request){
                $controller = app()->make('\Admin\Http\Controllers' . '\\' . ucwords($controller) .'Controller' );
                return $controller->callAction('validateUnique' , [$request]);
            });
        }
    );
}
);

