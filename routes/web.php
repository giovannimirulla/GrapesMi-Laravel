<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

$searchController = SearchController::class;
$joinController = JoinController::class;
$apiController = ApiController::class;
$profileController = ProfileController::class;
$projectController = ProjectController::class;
$emailController = EmailController::class;

Route::get('/', function(){
    return view("home");
})->name("home");

Route::get('/search',                                   [$searchController, "index"])                 ->name("search");

Route::get("/login",                                    [$joinController, "join"])                    ->name("login");
Route::post("/login",                                   [$joinController, "checkLogin"]);
Route::get("/signup",                                   [$joinController, "join"])                    ->name("signup");
Route::post("/signup",                                  [$joinController, "checkSignup"]);
Route::post("/logout",                                  [$joinController, "logout"])                  ->name("logout");
Route::get('login/{provider}',                          [$joinController, "redirectToProvider"]);
Route::get('{provider}/callback',                       [$joinController, "handleProviderCallback"]);

Route::get("/project/{project}",                        [$projectController, "index"])                ->name("project");

Route::get("/profile",                                  [$profileController, "index"])                ->name("profile");
Route::post("/profile/create/project/{user}",           [$profileController, "createProject"])        ->name("profile.create.project");

Route::get('/api/search/projects/{q}',                  [$apiController, "searchProjects"])           ->name("api.search.projects");
Route::get('/api/projects',                             [$apiController, "allProjects"]);
Route::get('/api/projects/{number}',                    [$apiController, "randomProjects"])           ->name("api.projects");
Route::get('/api/project/{project}',                    [$apiController, "project"])                  ->name("api.project");
Route::get('/api/collaboration/{user}',                 [$apiController, "collaboration"])            ->name("api.collaboration");
Route::get('/api/github/repos/{user}',                  [$apiController, "githubRepos"])              ->name("api.github.repos");
Route::get('/api/boards',                               [$apiController, "allBoards"])                ->name('api.boards');
Route::get('/api/dashboard/{user}',                     [$apiController, "dashboard"])                ->name('api.dashboard');
Route::post('/api/update/profile/{user}',               [$apiController, "updateProfile"])            ->name('api.update.profile');
Route::get('/api/update/os/{project}/{deviceName}',     [$apiController, 'updateOperatingSystem'])    ->name('api.update.os');
Route::get('/api/update/boards/{project}/{boardName}/{boardVersion}',              [$apiController, 'updateBoards'])             ->name('api.update.boards');
Route::post('/api/upload/image/{user}',                 [$apiController, 'imageUpload'])              ->name('api.upload.image');
Route::get('/api/check/project/{column}/{query}',       [$apiController, 'checkProject'])             ->name('api.check.project');
Route::get('/api/check/darkmode/{user}',                [$apiController, 'checkDarkMode'])            ->name('api.check.darkMode');
Route::get('/api/check/profile/{column}/{query}',       [$apiController, 'checkProfile'])             ->name('api.check.profile');
Route::get('/api/check/collaboration/{project}/{user}', [$apiController, 'checkCollaboration'])       ->name('api.check.collaboration');
Route::get('/api/toogle/collaboration/{project}/{user}',[$apiController, 'toogleCollaboration'])      ->name('api.toogle.collaboration');
  
Route::post('/api/send/mail',                           [$emailController, 'sendMail'])              ->name('api.send.mail');

Route::get('/api/test', 'ApiController@test')->name('api.test');

Route::get('/clear-cache', function() {
    $run = Artisan::call('route:cache');
    if($run == 0) $run = Artisan::call('route:clear');
    if($run == 0) $run = Artisan::call('config:cache');
    if($run == 0) $run = Artisan::call('config:clear');
    if($run == 0)  $run = Artisan::call('optimize');
    return ($run) ? "Errore" :  "Pulito";  
});