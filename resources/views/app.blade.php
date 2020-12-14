<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- <meta name="base-url" content="{{ url('/') }}"> -->
    <base href="/">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>PSPSOP</title>
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link href="{{ asset('css/bootstrap.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
</head>
<body>
    <div id="root"></div>
    <script src="{{asset('/js/app.js')}}"></script>
</body>
</html>
