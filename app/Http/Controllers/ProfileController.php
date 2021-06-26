<?php

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\Project;
use App\Models\Collaboration;

class ProfileController extends Controller{
    public function index(){
        if (Auth::check()) return view("profile");
        else return redirect("/");
    }

    public function createProject($user, Request $request){
           $request->validate([
                'nameProject'=>'required|unique:projects,name|max:255',
                'description'=>'max:255',
                'logo' => 'required|image|mimes:png|max:2048',
            ]);
            
            $imageName =  $request->nameProject . '.' . $request->logo->extension();
            $request->logo->move(public_path('img/projects'), $imageName);

            $project = Project::create([
                'name' => $request->nameProject,
                'description' => ($request->has('description')) ? $request->description : null,
                'logo' => $imageName,
            ]);

             Collaboration::create([
                'user_id' => $user,
                'project_id' => $project->id,
            ]);
            
            return redirect()->back()->withInput();
        

    }
}
