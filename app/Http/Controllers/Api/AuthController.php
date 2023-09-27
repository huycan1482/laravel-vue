<?php 

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller 
{
    public function login()
    {
        $credentials = request(['email', 'password']);
        if (! $token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function user()
    {
        return response()->json(auth('api')->user());
    }

    public function logout()
    {
        auth('api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'success' => true, 
            'data' => [
                'payload' => ['accessToken' => $token],
                'user' => $this->guard(),
                'tokenType' => 'bearer',
                'expiresIn' => auth('api')->factory()->getTTL() * 60
            ]
        ]);
    }

    public function guard()
    {
        return Auth::Guard('api')->user();
    }

    public function testLogin(Request $request)
    {
        dd(Auth::user(), 3333);
    }
}