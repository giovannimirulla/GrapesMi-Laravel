@extends('layouts.smallBar')
@section('contents')
<section class="dashboard @yield('dashboardDimension')" id="@yield('dashboardID')">
    <div class="menu @yield('menuClass')">
       @yield("menu")
    </div>
    <div class="container">
        @yield('container')
    </div>
</section>
@endsection