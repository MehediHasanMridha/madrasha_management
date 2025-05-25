<?php

use App\Models\FeeType;
use App\Models\User;
use Illuminate\Support\Str;
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

// generate unique id for student and teacher
if (! function_exists('generateUniqueId')) {
    function generateUniqueId($type)
    {
        // বর্তমান বছর বের করুন
        $year = date('Y');

        // সর্বশেষ আইডি বের করুন
        $lastUser = User::where('unique_id', 'like', "$year-$type%")
            ->orderBy('id', 'desc')
            ->first();

        // যদি কোনো আইডি না থাকে, তাহলে প্রথম আইডি সেট করুন
        if (! $lastUser) {
            return "$year-$type" . '0001';
        }

        // সর্বশেষ আইডি থেকে সংখ্যা বের করুন
        $lastIdNumber = (int) substr($lastUser->unique_id, 6);

        // নতুন আইডি তৈরি করুন
        $newIdNumber = str_pad($lastIdNumber + 1, 4, '0', STR_PAD_LEFT);

        // যদি 4 ডিজিট পূর্ণ হয়ে যায়, তাহলে 5 বা তার বেশি ডিজিট ব্যবহার করুন
        if (strlen($newIdNumber) > 4) {
            $newIdNumber = str_pad($lastIdNumber + 1, strlen($lastIdNumber + 1), '0', STR_PAD_LEFT);
        }

        return "$year-$type" . $newIdNumber;
    }
}

// get student fee
if (! function_exists('getStudentFee')) {
    function getStudentFee($academicInfo = null, $feeSlug = null)
    {

        if ($academicInfo && $feeSlug) {
            $name = $feeSlug === 'academic' ? 'Academic Fee' : 'Boarding Fee';
            if ($feeSlug === 'academic') {
                return intval($academicInfo->academic_fee);
            } elseif ($feeSlug === 'boarding') {
                return intval($academicInfo->boarding_fee);
            }
            $feeType = FeeType::firstOrCreate(
                [
                    'class_id' => $academicInfo->class_id,
                    'slug'     => Str::slug($name) . '-' . $academicInfo->class->slug,
                ],
                [
                    'name'          => $name,
                    'amount'        => 0,
                    'department_id' => $academicInfo->department_id,
                ]
            );
            if ($feeType->amount === null) {
                $feeType->amount = 0;
                $feeType->save();
            }
            return intval($feeType->amount);
        }

    }

}
