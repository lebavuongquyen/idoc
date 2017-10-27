<form id="frm" class="form-horizontal" method="post" action="{{qurl('admin/group/save' , [$model->id])}}">
    <div class="form-group">
        <label class="col-md-3">Name</label>
        <div class="col-md-9">
            <input type="text" name="name" class="form-control" required>
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-3">Short Name</label>
        <div class="col-md-9">
            <input type="text" name="short_name" class="form-control" required>
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-3">Parent</label>
        <div class="col-md-9">
            <select name="parent_id" class="form-control">
                <option value=""> -- Select -- </option>
                @foreach($parents as $val)
                <option value="{{$val->id}}">{{$val->name}}</option>
                @endforeach
            </select>
        </div>
    </div>
</form>