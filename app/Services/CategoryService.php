<?php

namespace App\Services;

class CategoryService 
{
    public function handleImgBase64 ($img) 
    {
        return base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $img));

        // $image_64 = $request->input('image'); //your base64 encoded data

        // $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // .jpg .png .pdf

        // $replace = substr($image_64, 0, strpos($image_64, ',')+1); 

        // // find substring fro replace here eg: data:image/png;base64,

        // $image = str_replace($replace, '', $image_64); 

        // $image = str_replace(' ', '+', $image); 

        // $imageName = 'image'.'.jpg'.$extension;
    }
}
