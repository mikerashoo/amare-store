@extends('layouts.app')

@section('content')
<div class="container">
    <h1>some h1</h1>
    <div id="admin_app"></div>
</div>
<script src="{{ asset('js/admin.js') }}" defer></script>

@endsection
