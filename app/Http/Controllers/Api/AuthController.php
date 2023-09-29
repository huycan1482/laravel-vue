<?php 

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller 
{
    public function login()
    {
        $credentials = request(['email', 'password']);
        if (! $accessToken = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $refreshToken = $this->createRefreshToken(auth('api')->user()->id, 30);

        return $this->respondWithToken($accessToken, $refreshToken);
    }

    public function user()
    {
        return response()->json(auth('api')->user());
    }

    public function logout()
    {
        auth('api')->logout();

        return response()->json(['success' => true, 'message' => 'Successfully logged out']);
    }

    public function refreshToken (Request $request) 
    {
        $refreshToken = $request->input('refreshToken');
        try {
            $decodedToken = JWTAuth::setToken($refreshToken);

            //kiểm tra token_type có p refresh hay ko
            if (in_array('refresh', $decodedToken->getPayload()->toArray())) {
                $newAccessToken = JWTAuth::refresh($refreshToken);
                return response(['success' => true, 'data' => ['accessToken' => $newAccessToken, 'refreshToken' => $refreshToken]]);
            }
            return response(['success' => false, 'message' => 'Refresh token invalid'], 403);

        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            // Xử lý lỗi khi refresh token không hợp lệ
            return response(['success' => false, 'message' => 'Refresh token invalid'], 403);
        }

    }

    protected function respondWithToken($accessToken, $refreshToken)
    {
        return response()->json([
            'success' => true, 
            'data' => [
                'payload' => ['accessToken' => $accessToken, 'refreshToken' => $refreshToken],
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

    private function createRefreshToken ($userId, $expiration) 
    {
        // Tính toán thời gian hết hạn (30 ngày)
        $expirationTime = Carbon::now()->addDays($expiration);

        // Tạo refresh token với thời gian hết hạn
        $refreshToken = JWTAuth::claims(['exp' => $expirationTime->timestamp, 'token_type' => 'refresh'])->fromUser(User::find($userId));

        return ($refreshToken);
    }

    public function test ()
    {
        dd(123);
    }
}