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
                    List all permissions
                </p>
                <table id="datatable" class="table table-striped table-bordered" style="width: 100%">
                </table>
            </div>
        </div>
    </div>
</div>
<form id="frm" class="form-horizontal" style="display: none;">
    <div class="form-group">
        <label class="col-md-3">Name</label>
        <div class="col-md-9">
            <input type="text" name="name" class="form-control">
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-3">Type</label>
        <div class="col-md-9">
            <div class="btn-group btn-group-sm">
                <button class="btn default-type" type="button" value="default">Default</button>
                <button class="btn array-type" type="button" value="array">Array</button>
                <button class="btn object-type" type="button" value="object">Object</button>
            </div>
        </div>
    </div>
    <div class="value value-default">
        <div class="form-group">
            <label class="col-md-3">Value</label>
            <div class="col-md-9">
                <input type="text" name="value" class="form-control input">
            </div>
        </div>
    </div>
    <div class="value value-array">
        <div class="form-group">
            <label class="col-md-3">Value</label>
            <div class="col-md-12">
                <input type="text" name="value" class="form-control" placeholder="Add a value">
            </div>
        </div>
    </div>
    <div class="value value-object">
        <div class="form-group">
            <label class="col-md-3">Value</label>
        </div>
        <div class="value-object-container">

        </div>
    </div>
</form>
<div id="object_key" class="form-group" style="display: none;">
    <div class="col-xs-6">
        <input type="text" name="keys[0]" class="form-control input object-keys" value="" placeholder="key">
    </div>
    <div class="col-xs-6">
        <input type="text" name="values[0]" class="form-control input object-values" value="" placeholder="value">
    </div>
</div>
<!-- /page content -->
@endsection 

@section('css_plugin') 
<!--{!!qcss('public/vendors/bootstrap-tagsinput/src/bootstrap-tagsinput.css') !!}--> 
@yield('css_datatable') 
@endsection 
@section('js_plugin') 
<!--{!!qjs('public/vendors/bootstrap-tagsinput/src/bootstrap-tagsinput.js') !!}--> 
@yield('js_datatable') 
@endsection
@section('script')
<script>
    var dataSource = {!!json_encode($list)!!};
</script>
{!! qjs(module_asset('admin:app/user/script.js')) !!} 
@endsection