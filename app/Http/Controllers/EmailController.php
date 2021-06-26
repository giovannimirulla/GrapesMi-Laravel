<?php

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Http;
use App\Models\Board;
use Illuminate\Http\Request;

class EmailController extends Controller
{
    public function sendMail(Request $request)
    {
        $email = $request->input('email');
        $subject = $request->input('subject');
        $html = $request->input('html');

        $json = Http::asForm()->withHeaders([
            'Content-Type' => ' application/json',
            'Cache-Control' => 'no-cache',
            'x-apikey' => env('RESTDB_APIKEY'),
            'X-Requested-With' => 'XMLHttpRequest',
        ])->post("https://" . env('RESTDB_USERNAME') . ".restdb.io/mail", [
            "to" =>  $email,
            "subject" => $subject." - Grapes Mi",
            "html" => $html,
            "company" => "Grapes Mi",
            "sendername" => "Grapes Mi"
        ]);
        if ($json->failed()) abort(500);
        return $json;
    }
}
