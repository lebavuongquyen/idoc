<script type="text/javascript">
    var global = {
        base:'{{qurl("/admin")}}',
        module:'Admin',
        domain:'{{qurl("")}}',
        asset:'{{module_asset_url("Admin")}}',
        _token: '{{csrf_token()}}'
    };
</script>