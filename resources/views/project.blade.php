@extends('layouts.dashboard')
@section('title',$project)
@section('script')
<script src='{{ url("js/project/index.js") }}' defer="true"></script>
@endsection
@section('dashboardDimension', 'large')
@section('menuClass','centered')