<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\User\CreateRequest;
use App\Http\Requests\Api\User\EditRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getAll ()
    {
        // $users = UserResource::collection(User::all());
        $users = User::all();

        return response()->json(['success' => true, 'data' => $users]);
    }

    public function search (Request $request)
    {
        // dd($request->all());

        $users = User::paginate(1);

        $data = [
            'data' => $users->items(),
            'totalCount' => $users->count(),
            'currentCount' => $users->perPage(),
            'page' => $users->currentPage(),
            'lastPage' => $users->lastPage(),
        ];

        return response()->json(['success' => true, 'data' => $data]);
    }

    public function show ($id) 
    {
        $user = User::find($id);
        return response()->json(['success' => true, 'data' => $user]);
    }

    public function store (CreateRequest $request)
    {
        // dd($request->all());
        $user = User::create($request->all());
        return response()->json(['success' => true, 'data' => $user]);
    }

    public function update (EditRequest $request, $id)
    {
        // dd($request->all(), $id);
        $user = User::find($id);
        if (!empty($user)) {
            $user->update($request->all());
        }
        return response()->json(['success' => true, 'data' => $user]);
    }

    public function destroy ($id) 
    {
        $user = User::find($id);
        if (!empty($user)) {
            $user->delete();
            return response()->json(['success' => true, 'data' => 'Destroy completed']);
        }
        return response()->json(['success' => false, 'data' => 'User not found']);
    }
}
