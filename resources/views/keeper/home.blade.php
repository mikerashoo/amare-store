@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div id="keeper_app" ></div>
</div> 
<script>
    window.user = {
        id: {{Auth::user()->id}}
    }
</script>
<script src="{{ asset('js/keeper.js') }}" defer></script>

@endsection
