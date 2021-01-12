<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Auth;
use DB;

class PassportController extends Controller
{
    /**
     * registers an user in our platform
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
            'birthdate' => 'required',
            'gender' => 'required'        ]
        );
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 401);
        }
        $user = new User;
        $user = $user->create($request);
        $data['token'] = $user->createToken('MyApp')->accessToken;
        $data['user'] = $user;
        return response()->json($data, 200);
    }

    /**
     * logins an already existing user
     */
    public function login(Request $request)
    {
      if (Auth::attempt(['email' => request('email'), 'password' => request('password')])){
        $user = Auth::user();
        if ($user->role === 'promoter') {
            $user->load('promoter');
        }
        $token = $user->createToken('MyApp')->accessToken;
        $name = $user->name;
        return response()->json([
          "message" => "login realizado com sucesso!",
          "user" => $user,
          "token" => $token
          ], 200);
      }
      else{
        return response()->json([
          "message" => "email e senha invalidos!",
          ], 500);
        }

    }

    /**
     * get the details of a logged in user
     */
    public function getDetails() {
        $user = Auth::user();
        $user->load('promoter');
        return response()->json($user, 200);
    }

    /**
     * logs an user out
     */
    public function logout() {
        $token = Auth::user()->token();
        DB::table('oauth_refresh_tokens')->where('access_token_id', $token->id)->update(['revoked' => true]);
        $token->revoke();
        return response()->json(null, 204);
    }

}
