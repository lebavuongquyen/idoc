<!-- Bootstrap -->
{!!qcss('public/vendors/bootstrap/dist/css/bootstrap.min.css')!!}
<!-- Font Awesome -->
{!!qcss('public/vendors/font-awesome/css/font-awesome.min.css')!!}
<!-- NProgress -->
{!!qcss('public/vendors/nprogress/nprogress.css')!!}
<!-- iCheck -->
{!!qcss('public/vendors/iCheck/skins/flat/green.css')!!}

<!-- bootstrap-progressbar -->
{!!qcss('public/vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css')!!}
<!-- JQVMap -->
{!!qcss('public/vendors/jqvmap/dist/jqvmap.min.css')!!}
 <!--bootstrap-daterangepicker--> 
{!!qcss('public/vendors/bootstrap-daterangepicker/daterangepicker.css')!!}  
{!!qcss('public/vendors/lockscreen/css/lockscreen.css')!!}

<!-- css for pages -->
@yield('css_plugin')

<!-- Custom Theme Style -->
{!!qcss(module_asset_url('admin').'/build/css/custom.min.css')!!}
{!!qcss(module_asset_url('admin').'/css/app.css')!!}

