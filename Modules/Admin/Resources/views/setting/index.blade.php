@extends('admin::layouts.master')
@include('admin::layouts.datatable')
@section('content')
@include('admin::layouts.page')
<div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="x_panel">
            <div class="x_title">
                <h2>List</h2>
                <ul class="nav navbar-right panel_toolbox dynamic-width">
                    <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
                </ul>
                <div class="clearfix"></div>
            </div>
            <div class="x_content">
                <p class="text-muted font-13 m-b-30">
                    List all settings
                </p>
                <table id="datatable" class="table table-striped table-bordered" style="width: 100%">
                </table>
            </div>
        </div>
    </div>
</div>
<form id="frm" class="form-horizontal" style="display: none;">
    <div class="form-group">
        <label class="col-md-6">Name</label>
        <div class="col-md-6">
            <input type="text" name="name" class="form-control">
        </div>
    </div>
</form>
<!-- /page content -->
@endsection
@section('css_plugin')
@yield('css_datatable')
@endsection

@section('js_plugin')
@yield('js_datatable')
@endsection
@section('script')
<script>
    var dataSource = {!!json_encode($list)!!} ; 
</script>
{!! qjs(module_asset('admin:app/setting/script.js')) !!}
@endsection