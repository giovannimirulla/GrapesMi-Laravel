@extends('layouts.dashboard')
@section('title', 'Profile')
@section('script')
<script src='{{ url("js/check.js") }}' defer="true"></script>
<script src='{{ url("js/randomProjects.js") }}' defer="true"></script>
<script src='{{ url("js/profile/scriptBoard.js") }}' defer="true"></script>
<script src='{{ url("js/profile/scriptGitHub.js") }}' defer="true"></script>
<script src='{{ url("js/profile/scriptProjects.js") }}' defer="true"></script>
<script src='{{ url("js/profile/scriptRestDB.js") }}' defer="true"></script>
<script src='{{ url("js/profile/profile.js") }}' defer="true"></script>
<script src='{{ url("js/profile/dashboard.js") }}' defer="true"></script>
<script src='{{ url("js/profile/index.js") }}' defer="true"></script>
@if($errors->any())<script src='{{ url("js/profile/error.js") }}' defer="true"></script>@endif
@endsection
@section('dashboardID','profile')
@section('menu')
<div class="dataProfile">
    <img class="propic @if(!Auth::user()->propic) hidden @endif" src="{{ Auth::user()->propic}}"></img>
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

    <div class="info">
        <h3 class="bold dataUser @if(!Auth::user()->datauser->name && !Auth::user()->datauser->surname) username @endif">@if(Auth::user()->datauser->name || Auth::user()->datauser->surname) {{Auth::user()->datauser->name . " ".  Auth::user()->datauser->surname}} @else {{'@'.Auth::user()->username}} @endif</h3>
        <p class="email">{{Auth::user()->email}}</p>
    </div>

</div>
<form method="POST" action="{{ route('logout') }}" class="button">
                            @csrf
                           <button type="submit">Logout</button>
                        </form>
@endsection

@section('container')
<div class="title">
<div class="hamburger mobile menuDown">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <div class="dropdown">

                        </div>
</div>
<h1>Dashboard</h1>
</div>
<div id="Dashboard" class="page hidden">

    <div class="main cards" id="dashboard"></div>
    <div class="notify search">
        <h2>Wait a moment</h2>
        <p>I'm loading data for you...</p>
    </div>
</div>
<div id="Deploy" class="page hidden">
    <div class="stepsBar" id="stepsBar"></div>
    <div class="containerDeploy">
        <div class="hidden" id="selected">
            <div class="cards">
                <a class="nextButton" id="selectedNext"><img src="{{ asset('img/icon/right-arrow.svg')}}" height="25" width="25" /></a>
            </div>
        </div>
        <div>
            <div class="textBar leftCorner  bordered" id="searchContentsBar">
                <div class="input">
                    <input type="text" id="searchDeploy" name="project">
                </div>
                <div class="button">
                    <a>
                        <img src="{{ asset('img/icon/search.svg')}}" height="25" width="25" />
                    </a>
                </div>
            </div>
        </div>

        <div >
            <div class="notify search">
                <h2>Wait a moment</h2>
                <p>I'm loading data for you...</p>
            </div>
            <div class="main cards hidden"></div>
            <div class="containerCards" id="randomProjects">
            <h2>Projects you may already have on your device:</h2>
            <div class="main random cards"></div>
            </div>
            <div class="title hidden" id="easterEgg">
                <h2>I think you should close some description</h2>
            </div>
        </div>
    </div>
</div>
<div id="Profile" class="page hidden">
    <div class="theme-switch-wrapper">
        <label class="theme-switch" for="checkbox">
            <input type="checkbox" id="checkbox" />
            <div class="slider round"></div>
        </label>
    </div>
    <div class="allSpace centered">
        <div class="oneLine allSpace">
            <div class="leftDiv">

                <form>
                    <div class="oneLine">
                        <div id="name">
                            <div class="textBar rightCorner bordered">
                                <div class="icon">
                                    <img src="{{ asset('img/icon/name.svg')}}" height="25" width="25" />
                                </div>
                                <div class="input">
                                    <input type='text' name='name' placeholder="Name" value="@if(Auth::user()->datauser->name){{Auth::user()->datauser->name}}@endif">
                                </div>
                            </div>
                        </div>
                        <div id="surname">
                            <div class="textBar rightCorner bordered">
                                <div class="icon">
                                    <img src="{{ asset('img/icon/name.svg')}}" height="25" width="25" />
                                </div>
                                <div class="input">
                                    <input type='text' name='surname' placeholder="Surname" value="@if(Auth::user()->datauser->surname){{Auth::user()->datauser->surname}}@endif">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="email" class="column">
                        <div class="textBar rightCorner bordered">
                            <div class="icon">
                                <img src="{{ asset('img/icon/arroba.svg')}}" height="25" width="25" />
                            </div>
                            <div class="input">
                                <input type='text' name='email' placeholder="Email" value="{{Auth::user()->email}}">
                            </div>
                        </div>
                        <span></span>
                    </div>

                    <div id="username" class="column">
                        <div class="textBar rightCorner bordered">
                            <div class="icon">
                                <img src="{{ asset('img/icon/profile.svg')}}" height="25" width="25" />
                            </div>
                            <div class="input">
                                <input type='text' name='username' placeholder="Username" value="{{Auth::user()->username}}">
                            </div>
                        </div>
                        <span></span>
                    </div>
                </form>
            </div>
            <div class="dropZone menuDown" id="profileImage">
                <input type="file" name="myFile" class="dropZoneInput" accept='.jpg, .jpeg, image/gif, image/png' id="uploadOriginal">
                <div class="dropZoneThumb @if(!Auth::user()->propic) hidden @endif" style='background-image: url("{{Auth::user()->propic}}")'> </div>
                <span class="dropZonePrompt @if(Auth::user()->propic) hidden @endif">Drop image here or click to upload</span>
                <div class="dropdown">
                    <div class="option choose centered"><a>Choose an image</a></div>
                    <div class="option centered red"><a>Remove image</a></div>
                </div>
            </div>

        </div>
    </div>
</div>
<div id="New-project" class="page hidden">
    <a class="submit" id="github">
        <img src="{{ asset('img/icon/github.svg')}}" height="50" width="50" />
        <p>...with GitHub</p>
    </a>

    <div class="allSpace">
        <form class="allSpace oneLine centered" method='post' enctype="multipart/form-data" action="{{ route('profile.create.project', Auth::user()->id) }}">
            @csrf
            <div class="leftDiv">
                <div id="nameProject" class="column @error('nameProject') error @enderror">
                    <div class="textBar rightCorner bordered">
                        <div class="icon">
                            <img src="{{ asset('img/icon/layers.svg')}}" height="25" width="25" />
                        </div>
                        <div class="input">
                            <input type='text' name='nameProject' placeholder="Name" value="{{ old('nameProject') }}">
                        </div>
                    </div>
                    <span>@error('nameProject') {{ $message }} @enderror</span>
                </div>
                <div class="textArea rightCorner bordered" id="descriprionProjectArea">
                    <div class="icon">
                        <img src="{{ asset('img/icon/font.svg')}}" height="25" width="25" />
                    </div>
                    <div class="input">
                        <textarea type='text' name='description' placeholder="Description">{{ old('description') }}</textarea>
                    </div>
                </div>
            </div>
            <div class="dropZone  @error('logo') error @enderror">
                <span class="dropZonePrompt">@error('logo') {{ $message }} @else Drop image here or click to upload @enderror</span>
                <input type="file" name="logo" class="dropZoneInput" accept='image/png' id="uploadOriginal">

                <div class="dropZoneThumb hidden"> </div>

            </div>
            <div class="submit">
                <input type='submit' value="Add project" id="submit">
            </div>
        </form>
        <div class="main cards hidden"></div>
    </div>
</div>
<div id="Logout" class="page hidden">
    <div class="notify jobs">
        <h2>084 104 101 032 111 110 108 121 032 119 097 121 032 116 111 032 100 111 032 103 114 101 097 116 032 119 111 114 107 032 105 115 032 116 111 032 108 111 118 101 032 119 104 097 116 032 121 111 117 032 100 111 032</h2>
        <p>- Steve Jobs</p>
    </div>
</div>
@endsection