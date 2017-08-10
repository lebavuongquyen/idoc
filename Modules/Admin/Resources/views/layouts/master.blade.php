<!DOCTYPE html>
<html lang="en">
    <head>
        @include('admin::layouts.meta')

        <title>@yield('title')</title>
        @include('admin::layouts.css')

    </head>

    <body class="nav-md">
        <div class="container body">
            <div class="main_container">
                <div class="col-md-3 left_col">
                    @include('admin::layouts.left_col')
                </div>

                @include('admin::layouts.top_navigation')

                <!-- page content -->
                <div class="right_col" role="main">
                    <div>
                        @yield('content')
                    </div>
                </div>
                <!-- /page content -->

                @yield('admin::layouts.footer')
            </div>
        </div>
    </body>
    @include('admin::layouts.js')
    @yield('script')
</html>
