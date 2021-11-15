@extends('layouts.app')

@section('content')
<div>
    <div id="superadmin_app" ></div>
</div>
<script>
    window.user = {
        id: {{Auth::user()->id}}
    }
</script>
<script src="{{ asset('js/superadmin.js') }}" defer></script>

@endsection
