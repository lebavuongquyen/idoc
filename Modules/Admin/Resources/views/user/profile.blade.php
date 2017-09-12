@extends('admin::layouts.master')
@section('content')
@include('admin::layouts.page')
<div class="row">
    <div class="col-md-4 col-sm-12 col-xs-12">
        <div class="x_panel">
            <div class="x_content">
                <div class="col-md-12 col-sm-3 col-xs-12 profile_left">
                    <div class="profile_img">
                        <div id="crop-avatar">
                            <!-- Current avatar -->
                            <img class="img-responsive avatar-view" src="{{$user->avatar_link}}" alt="Avatar" title="Change the avatar">
                        </div>
                        <a class="btn btn-success"><i class="fa fa-edit m-right-xs"></i>Edit Avatar</a>
                        <br />
                    </div>
                    <h3>{{$user->name}}</h3>
                    <ul class="list-unstyled user_data">
                        <li>
                            <i class="fa fa-users user-profile-icon"></i> {{$user->group->name}}
                        </li>
                        <li>
                            <i class="fa fa-graduation-cap user-profile-icon"></i> {{$user->school}}
                        </li>
                        <li>
                            <i class="fa fa-map-marker user-profile-icon"></i> {{$user->address}}
                        </li>
                        <li class="m-top-xs">
                            <i class="fa fa-phone user-profile-icon"></i> {{$user->phone}}
                        </li>
                    </ul>

                    <a class="btn btn-success"><i class="fa fa-edit m-right-xs"></i>Edit Profile</a>
                    <br />

                    <!-- start messages -->
                    <a href="{{route('admin/user_message')}}"><h4>Messages</h4></a>
                    <ul class="list-unstyled user_data msg_list">
                    </ul>
                    <!-- end of messages -->

                </div>
            </div>
        </div>
    </div>
    <!-- start right content -->
    <div class="col-md-8 col-sm-12 col-xs-12">
        <div class="x_panel">
            <div class="x_title">
                <h2>Basic info</h2>
                <ul class="nav navbar-right panel_toolbox dynamic-width">
                    <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                    </li>
                </ul>
                <div class="clearfix"></div>
            </div>
            <div class="x_content">
                <br>
                <form class="form-horizontal form-label-left">
                    <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="item[name]">Name <span class="required">*</span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <input type="text" id="item[name]" name="item[name]" required="required" class="form-control col-md-7 col-xs-12">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Gender</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <div id="gender" class="btn-group" data-toggle="buttons">
                                <label class="btn btn-primary active" data-toggle-class="btn-primary" data-toggle-passive-class="btn-default">
                                    <input type="radio" name="item[gender]" value="Male" checked> &nbsp; Male &nbsp;
                                </label>
                                <label class="btn btn-primary" data-toggle-class="btn-primary" data-toggle-passive-class="btn-default">
                                    <input type="radio" name="item[gender]" value="Female"> Female
                                </label>
                                <label class="btn btn-primary" data-toggle-class="btn-primary" data-toggle-passive-class="btn-default">
                                    <input type="radio" name="item[gender]" value="other"> &nbsp;  Other &nbsp;
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="item[birthday]">Date Of Birth <span class="required">*</span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <input id="item[birthday]" name="item[birthday]" class="daterangepicker-singledate form-control col-md-7 col-xs-12" required="required" type="text">
                        </div>
                    </div>
                    <div class="ln_solid"></div>
                    <div class="form-group">
                        <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                            <button class="btn btn-primary" type="button">Cancel</button>
                            <button class="btn btn-primary" type="reset">Reset</button>
                            <button type="submit" class="btn btn-success">Submit</button>
                        </div>
                    </div>

                </form>
            </div>
            <!-- end of right content -->
        </div>
    </div>
</div>
<!-- /page content -->
@endsection

@section('css_plugin')
{!!qcss('public/vendors/google-code-prettify/bin/prettify.min.css' )!!}
{!!qcss('public/vendors/select2/dist/css/select2.min.css' )!!}
{!!qcss('public/vendors/starrr/dist/starrr.css' )!!}
{!!qcss('public/vendors/switchery/dist/switchery.min.css' )!!}
@endsection

@section('js_plugin')
{!!qjs('public/vendors/google-code-prettify/src/prettify.js' )!!}
{!!qjs('public/vendors/autosize/dist/autosize.min.js' )!!}
{!!qjs('public/vendors/bootstrap-wysiwyg/js/bootstrap-wysiwyg.min.js' )!!}
{!!qjs('public/vendors/devbridge-autocomplete/dist/jquery.autocomplete.min.js' )!!}
{!!qjs('public/vendors/jquery.hotkeys/jquery.hotkeys.js' )!!}
{!!qjs('public/vendors/jquery.tagsinput/src/jquery.tagsinput.js' )!!}
{!!qjs('public/vendors/parsleyjs/dist/parsley.min.js' )!!}
{!!qjs('public/vendors/select2/dist/js/select2.full.min.js' )!!}
{!!qjs('public/vendors/starrr/dist/starrr.js' )!!}
{!!qjs('public/vendors/switchery/dist/switchery.min.js' )!!}
{!!qjs('public/vendors/morris.js/morris.min.js' )!!}
{!!qjs('public/vendors/raphael/raphael.min.js' )!!}
@endsection