<?php

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;

class SearchController extends Controller{

    public function index(Request $request){
        $q = $request->query('q');
        if(isset($q)) return view("search")->with("q",$q);
        return redirect("/");
    }   
}
?>
