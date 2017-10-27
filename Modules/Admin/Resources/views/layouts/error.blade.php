<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!-- Meta, title, CSS, favicons, etc. -->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Error </title>
        <!-- Bootstrap -->
        {!!qcss('public/vendors/bootstrap/dist/css/bootstrap.min.css')!!}
        <!-- Font Awesome -->
        {!!qcss('public/vendors/font-awesome/css/font-awesome.min.css')!!}
        <!-- Custom Theme Style -->
        {!!qcss(module_asset('admin:build/css/custom.css'))!!}
    </head>

    <body class="nav-md">
        <div class="container body">
            <div class="main_container">
                <!-- page content -->
                <div class="col-md-12">
                    @yield('content')
                </div>
                <!-- /page content -->
            </div>
        </div>

        <!-- jQuery -->
        {!!qjs('public/vendors/jquery/dist/jquery.min.js')!!}
        <!-- Bootstrap -->
        {!!qjs('public/vendors/bootstrap/dist/js/bootstrap.min.js')!!}
    </body>
</html>