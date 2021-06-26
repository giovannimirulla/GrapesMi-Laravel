@extends('layouts.smallBar')
@section('headerClass', 'shadow')
@section('title', 'Search')
@section('script')
    <script src='{{ url("js/search/index.js") }}' defer="true"></script>
@endsection
@section('contents')
    <section class="whiteSection large" id="searchSection">
        <div class="notify search">
            <h2>Wait a moment</h2>
            <p>I'm loading data for you...</p>
        </div>
        <div class="main cards" id="contents"></div>
    </section>
@endsection
