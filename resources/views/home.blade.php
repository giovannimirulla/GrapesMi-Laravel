@extends('layouts.app')
@section('script')
<script src='{{ url("js/randomProjects.js") }}' defer="true"></script>
<script src='{{ url("js/home.js") }}' defer="true"></script>
@endsection
@section('title', 'Home')
@section('dropDownMenu')
<div class="option centered mobile"><a href="#projects">Explore</a></div>
@endsection
@section('dropDownMenuMobile')
<div class="option centered"> <a href="#projects">Explore</a></div>
<div class="option centered"> <a href="#plans">Plans</a></div>
@endsection
@section('leftNavButtons')
<a href="#projects">Explore</a>
@guest
<a href="#plans">Plans</a>
@endguest
@endsection
@section('init')
<div id="init">
    <h1>Look&nbspfor&nbspa</br>project...</h1>
    <p>Your device may already have an operating system with an IoT project</p>
    <form name='search' method='get' action="{{ route('search') }}" id="searchProjectsBar" enctype="multipart/form-data" autocomplete="off">
       <div id="search">
       <div class="textBar leftCorner bordered">
        <div class="input">
            <input type="text" id="search" name="q" placeholder="Search...">
        </div>
        <button class="button" type="submit">
        <img src="{{ asset('img/icon/search.svg') }}" height="25" width="25" />
        </button>
        </div>
        </div>
    </form>
</div>
@endsection
@section('contents')
<section class="whiteSection hidden" id="projects">
    <div class="title">
        <h1>Projects you may already<br>have on your device:</h1>
    </div>
    <div class="containerCards">
    <div class="main random cards">
    </div>
    </div>
    </div>
</section>
@guest
<section class="blackSection oneLine" id="plans">
    <div class="title">
        <h1>Choose a plan that suits your needs</h1>
    </div>
    <div class="main plans">
        <div class="plan" id="starter">
            <div class="top">
                <h1>STARTER</h1>
            </div>
            <div class="center">
                <h2>Free</h2>
                <p>For first <b>10</b> devices</p>
            </div>
            <div class="bottom">
                <a href="{{ route('signup') }}"><b>GET STARTED</b></a>
            </div>
        </div>
        <div class="plan highlined" id="pro">
            <div class="top">
                <h1>PRO</h1>
            </div>
            <div class="center">
                <h2>$29/month</h2>
                <p>For first <b>20</b> devices</p>
            </div>
            <div class="bottom">
                <a href="{{ route('signup') }}"><b>GET STARTED</b></a>
            </div>
        </div>
        <div class="plan" id="enterprise">
            <div class="top">
                <h1>ENTERPRISE</h1>
            </div>
            <div class="center">
                <h2>$249/month</h2>
                <p>For first <b>50</b> devices</p>
            </div>
            <div class="bottom">
                <a href="{{ route('signup') }}"><b>GET STARTED</b></a>
            </div>
        </div>
    </div>
</section>
@endguest
@endsection