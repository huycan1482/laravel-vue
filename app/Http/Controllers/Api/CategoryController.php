<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        // dd(asset('storage/'));
        // dd($request->all());
        if ($request->has('image')) {
            $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $request->input('image')));

            // $image_64 = $request->input('image'); //your base64 encoded data

            // $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // .jpg .png .pdf

            // $replace = substr($image_64, 0, strpos($image_64, ',')+1); 

            // // find substring fro replace here eg: data:image/png;base64,

            // $image = str_replace($replace, '', $image_64); 

            // $image = str_replace(' ', '+', $image); 

            // $imageName = 'image'.'.jpg'.$extension;

            
            // $res = Storage::disk('public')->put('image.jpg', $imageData);
            $res = Storage::disk('google')->put('image.jpg', $imageData);
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
