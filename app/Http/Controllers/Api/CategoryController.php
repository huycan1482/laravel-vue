<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    private $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

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
        // dd($request->image->getClientOriginalExtension());
        if ($request->has('image')) {
            
            // dd($request->image);
            $res = Storage::disk('public')->putFileAs('uploads', $request->image, 'file-'.time().'-'.$request->image->getClientOriginalName());
            // $res = Storage::cloud();
            // $imageName = time().'.'.$request->image->extension();
            // dd($imageName);
        }
        dd($res);
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
