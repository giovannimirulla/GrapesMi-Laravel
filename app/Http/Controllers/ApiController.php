<?php

use App\Models\Collaboration;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Project;
use App\Models\Board;
use App\Models\GithubRepo;
use App\Models\BoardsForProject;
use App\Models\Registration;
use App\Models\User;
use App\Models\RegisteredDevice;

class ApiController extends Controller
{

    public function searchProjects($query)
    {
        return Project::where('name', 'like', '%' . $query . '%')->get();
    }

    public function allProjects()
    {
        return Project::all();
    }

    public function randomProjects($number)
    {
        return Project::all()->random($number);
    }

    public function project($project)
    {
        $returnData = Project::where("name", $project)->with('collaborations.datauser')->first();
        $devices = Registration::with("device")->where("project_id", $returnData->id);

        $returnData["devicesNumber"] = $devices->count();

        $OSarray = array();
        $arrayBase = $devices->with("device.otaInstallation.compiledOperatingSystem.base")->get()->pluck("device");
        foreach ($arrayBase as $base) {
            if ($base->toArray()["ota_installation"]) {
                $name = $base->toArray()["ota_installation"][0]["compiled_operating_system"]["base"];
                if (!in_array($name, $OSarray)) {
                    $OSarray[] = $name;
                }
            }
        }
        $returnData["OS"] = $OSarray;

        $distinctDevices = $devices->with("device.board")->groupBy('model_number_device')->get();
        $percentageArray = array();
        foreach ($distinctDevices as $distinctDevice) {
            $result = DB::select('call percentageUpdatedDevices(?, ?, NULL, NULL)', array($project, $distinctDevice->device->board->name));
            $percentageArray[$distinctDevice->device->board->name] = reset($result[0]);
        }
        $returnData["updatedPercentages"] = $percentageArray;

        $boardArray = array();
        $boardBaseArray = $devices->get();
        foreach ($boardBaseArray as $base) {
            $name = $base->toArray()["device"]["board"];
            if (!in_array($name, $boardArray)) {
                $boardArray[] = $name;
            }
        }
        $returnData["OS"] = $OSarray;
        $returnData["devices"] = $boardArray;
        return $returnData;
    }

    public function collaboration($user)
    {
        return  Project::whereHas('collaborations', function ($query) use ($user) {
            $query->where('user_id', '=', $user);
        })->get();
    }

    public function toogleCollaboration($project, $user)
    {
        $projectID = Project::where("name", $project)->first()->id;
        if ($this->checkCollaboration($project, $user)["exists"]) {
            $deleted = Collaboration::where("user_id", $user)->where("project_id", $projectID)->delete();
            if ($deleted)  return Project::where("id", $projectID)->with('collaborations.datauser')->first();
            else return ['Error' => "Not deleted"];
        } else {
            return ['Created' => Collaboration::create([
                'user_id' => $user,
                'project_id' => $projectID,
            ])];
        }
    }
    public function allBoards()
    {
        return Board::with("compatibilities")->with("data")->get();
    }

    public function checkProfile($column ,$query,Request $request)
    {
        $user = $request->user;
        $exist = User::where($column, $query)->exists();
        $isMine = null;
        if($user) $isMine = User::where($column, $query)->where("id", $user)->exists();
        return ['value'=>$query,'input'=> $column ,'exists' => $exist, 'isMine' => $isMine];
    }

    public function checkDarkMode($user)
    {
        $status = User::find($user)->darkMode;
        return ['darkMode' => $status];
    }

    public function checkProject($column ,$query)
    {
        $exist = Project::where('name', $query)->exists();
        return ['value'=>$query,'input'=> $column ,'exists' => $exist];
    }

    public function checkCollaboration($project, $user)
    {
        $exist = Project::whereHas('collaborations', function ($query) use ($user) {
            $query->where('user_id', '=', $user);
        })->where("name", $project)->exists();
        return ['exists' => $exist];
    }

    public function githubRepos($user)
    {
        return GithubRepo::where("user_id", $user)->get();
    }

    public function setDarkMode($user, $darkModeStatus)
    {
        $user = User::find($user);
        $user->darkMode =  $darkModeStatus;
        $user->save();
    }
   
    public function updateProfile($user, Request $request)
    {
        $column = $request->get("column");
        $value = $request->get($column);
        $user = User::join("data_users", "id", "data_users.user_id")->where("id", $user)->update([$column => $value]);
        return ['Success' => array($column => $value)];
    }

    public function imageUpload($userID, Request $request)
    {
        $user = User::find($userID);
        $imageName = null;
        if ($request->image) {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:4096',
            ]);
            $imageName = $userID . '.' . $request->image->extension();
            $request->image->move(public_path('img/propics'), $imageName);

            $user->propic =  url("/img/propics/{$imageName}");
        } else $user->propic =  null;
        $user->save();
        return ['Success' => "Image changed"];
    }
    public function dashboard($user)
    {
        $returnData =  BoardsForProject::where("user_id", $user)->get();
        if ($returnData)  return $returnData;
        else return ['Error' => "Not board registered"];
    }

    public function updateOperatingSystem($project, $os){
        $result = DB::select('call updateDevices(?, ?)', array($project,$os));
        if ($result) return ['Success' => "All updated"];
        else return ['Error' => "Error updating"];
    }

    public function updateBoards($project, $boardName, $boardVersion){
        $boards = RegisteredDevice::where("nameProject", $project)->where("nameDevice", $boardName)->where("versionDevice", $boardVersion)->get();
        foreach($boards as $board){
            $this->updateOperatingSystem($project, $board->nameOS);
        }
        $updatedBoards = BoardsForProject::where("nameProject", $project)->where("name", $boardName)->where("version", $boardVersion)->with('user:id,email')->get();
        return $updatedBoards;
    }
}
