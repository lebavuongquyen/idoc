<form class="form-horizontal" action="{{qurl('admin/group/save' , [$model->id])}}" method="post">
    <div class="form-group">
        <label class="col-md-3">Name</label>
        <div class="col-md-9">
            <input type="text" name="name" class="form-control" required value="{{$model->name}}">
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-3">Short Name</label>
        <div class="col-md-9">
            <input type="text" name="short_name" class="form-control" required value="{{$model->short_name}}">
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-3">Parent</label>
        <div class="col-md-9">
            <select name="parent_id" class="form-control">
                <option value=""> -- Select -- </option>
                @foreach($parents as $val)
                <option value="{{$val->id}}" {{$val->id == $model->parent_id ? 'selected' : ''}}>{{$val->name}}</option>
                @endforeach
            </select>
        </div>
    </div>
</form>