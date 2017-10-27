<!-- jQuery -->
{!!qjs('public/vendors/jquery/dist/jquery.min.js')!!}
<!-- Bootstrap -->
{!!qjs('public/vendors/bootstrap/dist/js/bootstrap.min.js')!!}
<!-- FastClick -->
{!!qjs('public/vendors/fastclick/lib/fastclick.js')!!}
<!-- NProgress -->
{!!qjs('public/vendors/nprogress/nprogress.js')!!}
<!-- Chart.js -->
{!!qjs('public/vendors/Chart.js/dist/Chart.min.js')!!}
<!-- gauge.js -->
{!!qjs('public/vendors/gauge.js/dist/gauge.min.js')!!}
<!-- bootstrap-progressbar -->
{!!qjs('public/vendors/bootstrap-progressbar/bootstrap-progressbar.min.js')!!}
<!-- iCheck -->
{!!qjs('public/vendors/iCheck/icheck.min.js')!!}
<!-- Skycons -->
{!!qjs('public/vendors/skycons/skycons.js')!!}
<!-- Flot -->
{!!qjs('public/vendors/Flot/jquery.flot.js')!!}
{!!qjs('public/vendors/Flot/jquery.flot.pie.js')!!}
{!!qjs('public/vendors/Flot/jquery.flot.time.js')!!}
{!!qjs('public/vendors/Flot/jquery.flot.stack.js')!!}
{!!qjs('public/vendors/Flot/jquery.flot.resize.js')!!}
<!-- Flot plugins -->
{!!qjs('public/vendors/flot.orderbars/js/jquery.flot.orderBars.js')!!}
{!!qjs('public/vendors/flot-spline/js/jquery.flot.spline.min.js')!!}
{!!qjs('public/vendors/flot.curvedlines/curvedLines.js')!!}
<!-- DateJS -->
{!!qjs('public/vendors/DateJS/build/date.js')!!}
<!-- JQVMap -->
{!!qjs('public/vendors/jqvmap/dist/jquery.vmap.js')!!}
{!!qjs('public/vendors/jqvmap/dist/maps/jquery.vmap.world.js')!!}
{!!qjs('public/vendors/jqvmap/examples/js/jquery.vmap.sampledata.js')!!}
<!-- bootstrap-daterangepicker -->
{!!qjs('public/vendors/moment/min/moment.min.js')!!}
{!!qjs('public/vendors/bootstrap-daterangepicker/daterangepicker.js')!!}
{!!qjs('public/vendors/jquery-validation/dist/jquery.validate.min.js')!!}
{!!qjs('public/vendors/jquery-validation/dist/additional-methods.js')!!}
{!!qjs('public/vendors/lockscreen/js/lockscreen.js')!!}
{!!qjs('public/vendors/lockscreen/js/lockscreen-icon.js')!!}
<!-- Ben Alman deparam-->
{!!qjs('public/vendors/jquery-bbq/jquery.ba-bbq.min.js')!!}


<!-- js for pages -->
@yield('js_plugin')

<!-- Custom Theme Scripts -->
{!!qjs('public/js/helpers.js')!!}
{!!qjs('public/js/utilities.js')!!}
{!!qjs(module_asset('admin:build/js/custom.js'))!!}
{!!qjs(module_asset('admin:js/app.js'))!!}