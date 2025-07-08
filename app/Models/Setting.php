<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['key', 'value'];

    /**
     * Get a setting value by key
     */
    public static function getValue($key, $default = null)
    {
        $setting = self::where('key', $key)->first();
        return $setting ? $setting->value : $default;
    }

    /**
     * Set a setting value by key
     */
    public static function setValue($key, $value)
    {
        return self::updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );
    }

    /**
     * Get multiple settings
     */
    public static function getSettings($keys)
    {
        $settings = self::whereIn('key', $keys)->pluck('value', 'key');
        $result   = [];

        foreach ($keys as $key) {
            $result[$key] = $settings->get($key);
        }

        return $result;
    }
}
