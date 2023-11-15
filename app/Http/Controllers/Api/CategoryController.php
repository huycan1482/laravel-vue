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

    public function store (CreateRequest $request)
    {
        $data = $request->only('name');

        if ($request->has('image')) {
            $imageName = time().'-'.$request->image->getClientOriginalName();
            $res = Storage::disk('public')->putFileAs('uploads/category', $request->image, $imageName);
            $data['image'] = 'uploads/category/'.$imageName;
        }
        
        // $category->name = $data['name'];
        // $category->slug = Str::slug($request->input('name'));
        // $category->parent_id = 0;
        // $category->is_active = 1;
        // $category->save();

        $data['slug'] = Str::slug($request->input('name'));
        $data['parent_id'] = 0;
        $data['active'] = intval(!!$request->input('active'));

        $category = Category::create($data);

        return response()->json(['success' => true, 'data' => $category]);
    }

    public function update (CreateRequest $request, $id)
    {
        $data = $request->only('name');
        $category = Category::find($id);
        if (!empty($category)) {
            if ($request->has('image')) {
                $imageName = time().'-'.$request->image->getClientOriginalName();

                $res = Storage::disk('public')->delete($category->image);
                //Xoá file cũ
                Storage::disk('public')->putFileAs('uploads/category', $request->image, $imageName);
                //Thêm file mới
                $data['image'] = 'uploads/category/'.$imageName;
            }
            $data['slug'] = Str::slug($request->input('name'));
            $data['parent_id'] = 0;
            $data['active'] = intval(!!$request->input('active'));
            
            $category->update($data);
        }
        return response()->json(['success' => true, 'data' => $category]);
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
