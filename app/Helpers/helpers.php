<?php

use App\Models\FeeType;
use App\Models\User;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;

//image processing & uploading function
if (! function_exists('uploadImage')) {
    function uploadImage($modelAttribute, $image, $path, $name = null, $width = 300, $height = 300, $quality = 90, $type = 'webp')
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
        if ($name) {
            $filename = $name . '.' . $type;
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

// get student fee - optimized version
if (! function_exists('getStudentFee')) {
    function getStudentFee($academicInfo = null, $feeSlug = null, $feeTypes = null, $classes = null)
    {
        if (! $academicInfo || ! $feeSlug) {
            return 0;
        }

        $name = $feeSlug === 'academic' ? 'Academic Fee' : 'Boarding Fee';

        if ($feeSlug === 'academic' && $academicInfo->academic_fee) {
            return intval($academicInfo->academic_fee);
        } elseif ($feeSlug === 'boarding' && $academicInfo->boarding_fee) {
            return intval($academicInfo->boarding_fee);
        }

        // If optimized collections are provided, use them
        if ($feeTypes && $classes) {
            // Get class from pre-loaded collection
            $class = $classes->get($academicInfo->class_id);
            if (! $class) {
                return 0;
            }

            $slug = Str::slug($name) . '-' . $class->slug;
            $key  = $academicInfo->class_id . '-' . $slug;

            // Check if fee type exists in pre-loaded collection
            $feeType = $feeTypes->get($key);

            if (! $feeType) {
                // Create new fee type if not exists
                $feeType = FeeType::firstOrCreate(
                    [
                        'class_id' => $academicInfo->class_id,
                        'slug'     => $slug,
                    ],
                    [
                        'name'          => $name,
                        'amount'        => 0,
                        'department_id' => $academicInfo->department_id,
                    ]
                );

                // Add to collection for future use
                $feeTypes->put($key, $feeType);
            }
        } else {
            // Fallback to original logic for backward compatibility
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
        }

        if ($feeType->amount === null) {
            $feeType->amount = 0;
            $feeType->save();
        }

        return intval($feeType->amount);
    }
}

// validate and format Bangladeshi phone number
if (! function_exists('validateAndFormatPhoneNumber')) {
    function validateAndFormatPhoneNumber($phoneNumber)
    {
        // Remove all non-digit characters
        $cleaned = preg_replace('/[^0-9]/', '', $phoneNumber);

        // Check if it's a valid Bangladeshi mobile number
        if (preg_match('/^(?:\+88|88)?01[3-9]\d{8}$/', $phoneNumber) ||
            preg_match('/^01[3-9]\d{8}$/', $cleaned)) {

            // Format to standard +88 prefix
            if (strlen($cleaned) === 11 && substr($cleaned, 0, 2) === '01') {
                return '+88' . $cleaned;
            } elseif (strlen($cleaned) === 13 && substr($cleaned, 0, 3) === '880') {
                return '+' . $cleaned;
            } elseif (strlen($cleaned) === 14 && substr($cleaned, 0, 4) === '8801') {
                return '+' . $cleaned;
            }
        }

        return null;
    }
}
