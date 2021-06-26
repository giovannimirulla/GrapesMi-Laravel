<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @auth data-theme="{{(Auth::user() -> darkMode)?'dark':'light'}}" @endauth>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <link rel="stylesheet" href='{{ asset("css/style.css") }}'>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap" rel="stylesheet">
    <link rel="icon" type="image/png" href="{{ asset('img/favicon.png') }}">
    @yield('style')
    @routes
    <script src='{{ url("js/contents.js") }}' defer="true"></script>
    <script src='{{ url("js/notify.js") }}' defer="true"></script>
    <script src='{{ url("js/app.js") }}' defer="true"></script>
    @yield('script')
    <script>
        let user = @auth {{Auth::user()->id}} @else null @endauth;
        let currentThemeMode = @auth "{{(Auth::user() -> darkMode)?'dark':'light'}}" @else null @endauth;
        let APP_URL = {!!json_encode(url('/')) !!};
    </script>
    <title>@yield('title') - {{ config('app.name', 'Laravel') }}</title>
</head>

<body class="preload">
    <header class="@yield('headerDimension') @yield('headerClass')">
        <nav>
            <div class="navButtons">
                <a id="navLogo" href="{{ route('home') }}">
                    <img src="{{ asset('img/icon/logo.svg') }}" height="50" width="50" />
                    <h2>Grapes Mi</h2>
                </a>
                @yield('leftNavButtons')
            </div>
            @section('rightNavButtons')
            <div class="navButtons">
                @auth
                <div id='profileButton' class="menuDown">
                    <img class="propic @if(!Auth::user()->propic ) hidden @endif" src="{{Auth::user()->propic}}"></img>
                    <p class="propic @if(Auth::user()->propic) hidden @endif">
                        @if( Auth::user()->datauser->name || Auth::user()->datauser->surname)
                        @php $propic = "" @endphp
                        @if( Auth::user()->datauser->name) @php $propic .= strtoupper( Auth::user()->datauser->name[0]) @endphp @endif
                        @if( Auth::user()->datauser->surname)@php $propic .= strtoupper( Auth::user()->datauser->surname[0]) @endphp @endif
                        {{$propic}}
                        @else
                        {{ strtoupper(Auth::user()->username[0])}}
                        @endif
                    </p>
                    <p class='username'>{{'@'.Auth::user()->username}} </p>
                    <div class="dropdown">
                        @if (Route::has('profile'))
                        <div class="option centered"><a href="{{ route('profile') }}">Profile</a></div>
                        @endif
                        @yield('dropDownMenu')
                        @if (Route::has('logout'))
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <div class="option centered red"><button type="submit">Logout</button></div>
                        </form>
                        @endif
                    </div>
                </div>
                @else

                @if (Route::has('login'))
                <a href="{{ route('login') }}" id='login'>Login</a>
                @endif
                @if (Route::has('signup'))
                <a href="{{ route('signup') }}" class='highlined'><b>Sign up</b></a>
                @endif
                @endauth
            </div>
            @guest
            <div class="hamburger mobile menuDown">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <div class="dropdown">
@yield('dropDownMenuMobile')
                        <div class="option centered"> <a href="{{ route('login') }}">Login</a></div>
  <div class="option centered highlined"> <a href="{{ route('signup') }}"><b>Sign up</b></a></div>
                        </div>
</div>
@endguest
            @show
            </div>
            </div>
        </nav>
        @yield('init')
    </header>
    @yield('contents')
    <footer>
        <h4>Developed by Giovanni Mirulla</br>1000026838</h4>
        <a href="https://github.com/giovannimirulla">
            <img src="{{ asset('img/icon/github.svg') }}" height="30" width="30" />
        </a>
        <a href="https://www.instagram.com/giovannimirulla">
            <img src="{{ asset('img/icon/instagram.svg') }}" height="30" width="30" />
        </a>
        <a href="https://www.linkedin.com/in/giovannimirulla">
            <img src="{{ asset('img/icon/linkedin.svg') }}" height="30" width="30" />
        </a>
    </footer>
</body>

</html>