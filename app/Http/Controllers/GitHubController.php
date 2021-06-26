<?php

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Http;

use App\Models\User;
use App\Models\GithubRepo;


class GitHubController extends Controller
{
    public static  function addUserRepos($user){
        $token = $user->token;
        $user = User::where("email", $user->email)->first();
        $output = Http::withHeaders([
            'User-Agent'=> 'Awesome-Octocat-App',
            'Authorization' => 'token '.$token,
        ])->get('https://api.github.com/user/repos?type=owner')->json();
      
        foreach ($output as $repo) {
          GithubRepo::firstOrCreate([
                'id' => $repo["id"],
                'user_id' => $user->id,
                'name' => $repo["name"],
                'description' => $repo["description"],
                'private' => $repo["private"],
                'url' => $repo["html_url"],
                'language' => $repo["language"],
            ]);
        }
    }
}
