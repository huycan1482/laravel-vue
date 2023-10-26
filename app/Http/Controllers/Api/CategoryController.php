<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Category\CreateRequest;
use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
        // dd($request->all(), intval($request->input('active') == 'true'));
        $data = $request->only('name');

        if ($request->has('image')) {
            $imageName = time().'-'.$request->image->getClientOriginalName();
            $res = Storage::disk('public')->putFileAs('uploads/category', $request->image, $imageName);
            $data['image'] = 'storage/uploads/category/'.$imageName;
        }
        
        // $category->name = $data['name'];
        // $category->slug = Str::slug($request->input('name'));
        // $category->parent_id = 0;
        // $category->is_active = 1;
        // $category->save();

        $data['slug'] = Str::slug($request->input('name'));
        $data['parent_id'] = 0;
        $data['active'] = intval($request->input('active'));
        $category = Category::create($data);

        return response()->json(['success' => true, 'data' => $category]);
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
