@extends('admin::layouts.master')
@section('content')
<div class="main_container">
    <!-- page content -->
    <div class="col-md-12">
        <div class="col-middle">
            <div class="text-center text-center">
                <h1 class="error-number">403</h1>
                <h2>Access denied</h2>
                <p>{{$exception->getMessage()}}</a>
                </p>
            </div>
        </div>
    </div>
    <!-- /page content -->
</div>
@endsection
