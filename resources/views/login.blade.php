@extends('layouts.app')
@section('script')
<script src='{{ url("js/check.js") }}' defer="true"></script>
<script src='{{ url("js/join/index.js") }}' defer="true"></script>
@endsection
@section('title', 'Login')
@section('rightNavButtons','')
@section('init')
<div class="login">
    <form name="login" class="card" method="post" novalidate>
        @csrf
        <div class="title centered">
            <h2>Log in to your account</h2>
        </div>

        @if(session('errors'))
        <div class="error"><span>{{session('errors')->first('error')}} </span>
        </div>
        @endif

        <div id="username" class="column @error('username') error @enderror">
            <div class="textBar rightCorner bordered">
                <div class="icon">
                    <img src="{{ asset('/img/icon/profile.svg') }}" height="25" width="25" />
                </div>
                <div class="input">
                    <input type='text' name='username' placeholder="username or email" value="{{ old('username') }}">
                </div>
            </div>
            <span>@error('username') {{ $message }} @enderror</span>
        </div>

        <div id="email" class="@if(Route::current()->getName() == 'login') hidden @endif column  @error('email') error @enderror">
            <div class="textBar rightCorner bordered">
                <div class="icon">
                    <img src="{{ asset('/img/icon/arroba.svg') }}" height="25" width="25" />
                </div>
                <div class="input">
                    <input type='email' name='email' placeholder="email" value="{{ old('email') }}">
                </div>
            </div>
            <span> @error('email') {{ $message }} @enderror</span>
        </div>

        <div id="password" class="column  @error('username') error @enderror">
            <div class="textBar rightCorner bordered">
                <div class="icon">
                    <img src="{{ asset('/img/icon/password.svg') }}" height="25" width="25" />
                </div>
                <div class="input">
                    <input type='password' name='password' placeholder="password">
                </div>
            </div>
            <span> @error('password') {{ $message }} @enderror</span>
        </div>

        <div id="confirmPassword" class="@if(Route::current()->getName() == 'login') hidden @endif column">
            <div class="textBar rightCorner bordered" id="confirmPasswordBar">
                <div class="icon">
                    <img src="{{ asset('/img/icon/confirmPassword.svg') }}" height="25" width="25" />
                </div>
                <div class="input">
                    <input type='password' name='confirmPassword' placeholder="confirm password">
                </div>
            </div>
            <span></span>
        </div>

        <div class="allow">
            <input type='checkbox' name='allow'>
            <label for='allow'>I agree to the Terms of Service and our Privacy Policy</label>
        </div>

        <div class="oneLine">
            <div class="submit">
                <input type='submit' value="Login" id="submit">
            </div>
            <a class="submit" id="github" href="{{ url('/login/github') }}">
                <img src="{{ asset('/img/icon/github.svg') }}" height="50" width="50" />
                <p>...with GitHub</p>
            </a>
        </div>

        @if (Route::has('signup'))
        <div class="bottom centered oneLine" id="switch">
            <p>Don't have an account? </p><a><b>Create!</b></a>
        </div>
        @endif
    </form>
</div>
@endsection