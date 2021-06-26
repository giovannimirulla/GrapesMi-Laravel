<?php

use Illuminate\Routing\Controller;

class ProjectController extends Controller
{
    public function index($project){
        return view("project")->with("project", $project);
    }
}
