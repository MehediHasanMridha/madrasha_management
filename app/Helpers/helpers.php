<?php
use Intervention\Image\Laravel\Facades\Image;

//image processing & uploading function
if (! function_exists('uploadImage')) {
    function uploadImage($modelAttribute, $image, $path, $width = 300, $height = 300, $quality = 90, $type = 'webp')
    {
        if ($modelAttribute && file_exists(public_path($path . $modelAttribute))) {
            unlink(public_path($path . $modelAttribute));
        }
        $imageProcessed = Image::read($image->getRealPath());
        $imageProcessed->resize($width, $height);
        if ($type == 'webp') {
            $filename = time() . '.' . 'webp';
            $imageProcessed->toWebp($quality);
        }
        if ($type == 'jpeg') {
            $filename = time() . '.' . 'jpeg';
            $imageProcessed->toJpeg($quality);
        }

        if ($type == 'png') {
            $filename = time() . '.' . 'png';
            $imageProcessed->toPng();
        }

        $imageUrl = public_path($path . $filename);
        $imageProcessed->save($imageUrl);

        return $filename;
    }
}
