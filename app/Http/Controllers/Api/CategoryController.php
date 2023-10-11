<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function getAll (Request $request)
    {
        $categories = Category::all();
        return response()->json(['success' => true, 'data' => $categories]);
    }

    public function show ($id)
    {
        $category = Category::find($id);
        return response()->json(['success' => true, 'data' => $category]);
    }

    public function store (Request $request)
    {
        $user = Category::create($request->all());
        return response()->json(['success' => true, 'data' => $user]);
    }

    public function update (Request $request, $id)
    {
        $user = Category::find($id);
        if (!empty($user)) {
            $user->update($request->all());
        }
        return response()->json(['success' => true, 'data' => $user]);
    }

    public function destroy ($id) 
    {
        $user = Category::find($id);
        if (!empty($user)) {
            $user->delete();
            return response()->json(['success' => true, 'data' => 'Destroy completed']);
        }
        return response()->json(['success' => false, 'data' => 'Category not found']);
    }
}
