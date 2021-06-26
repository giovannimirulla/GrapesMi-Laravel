@extends('layouts.app')
@section('headerDimension', 'small')
@section('leftNavButtons')

<form  id="searchProjectsBar" action="{{ route('search') }}">
    <div id="search">
        <div class="textBar leftCorner  bordered">
            <div class="input">
                <input type="text" id="search" name="q" placeholder="Search...">
            </div>
            <button class="button" type="submit">
                <img src="{{ asset('img/icon/search.svg') }}" height="25" width="25" />
            </button>
        </div>
    </div>

</form>
@endsection