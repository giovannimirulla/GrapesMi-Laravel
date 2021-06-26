<?php

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Session;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Models\User;
use App\Models\DataUser;

class JoinController extends Controller{
    public function join(){
        if (Auth::check()) {
            return redirect("/");
        } else {
            return view('login')
                ->with('csrf_token', csrf_token());
        }
    }

    public function handleProviderCallback($provider){
        $user = Socialite::driver($provider)->user();
        $authUser = User::where('email', $user->email)->first();
        if(!$authUser){
            $authUser = User::create([
                'username' => $user->getNickname(),
                'password' => null,
                'email'=> $user->getEmail(),
                'propic' => $user->getAvatar(),
            ]);
            DataUser::create([
                "user_id" => $authUser->id
            ]);
        }
        if (!$authUser->provider) {
            $authUser->provider = $provider;
            $authUser->provider_id = $user->id;
            $authUser->save();
         GitHubController::addUserRepos($user);
        }
        Auth::login($authUser, true);
        return redirect("/");
    }

    public function redirectToProvider($provider){
        $socialite =  Socialite::driver($provider);
        if ($provider == "github")  $socialite = $socialite->scopes(['user', 'repo']);
        return  $socialite->redirect();
    }

    public function checkLogin(Request $request){
        $login = $request->input('username');
        $fieldType = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        $request->merge([$fieldType => $login]);
        $data = $request->only($fieldType, 'password');
        if (Auth::attempt($data, $request->allow)) {
            return redirect('/');
        } else {
            return redirect('login')->withInput()->withErrors(['error' => 'Wrong username, email or password ']);
        }
    }

    public function checkSignup(Request $request){
        $request->validate([
            'username'=>'required|unique:users,username|min:6',
            'password'=>'required|min:8',
            'email' => 'required',
        ]);

        $user =  User::create([
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'email' => $request->email
        ]);

        DataUser::create([
            "user_id" => $user->id
        ]);

        Auth::login($user, true);
        return redirect("/");
    }

    public function logout(){
        Session::flush();
        Auth::logout();
        return redirect("/");
    }
}
