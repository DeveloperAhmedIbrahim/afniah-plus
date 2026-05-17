<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceSection02Bullet extends Model
{
    protected $fillable = [
        'title',
        'icon',
        'description',
        'service_id',
    ];

    // Helper method to get current locale
    protected function getCurrentLocale()
    {
        return app()->getLocale();
    }    

    // Title Accessor
    public function getTitleAttribute($value)
    {
        $titles = json_decode($value, true);    
        return $titles[$this->getCurrentLocale()] ?? null;
    }

    // Icon Accessor
    public function getIconAttribute($value)
    {
        $icons = json_decode($value, true);
        return $icons[$this->getCurrentLocale()] ?? null;
    }

    // Description Accessor
    public function getDescriptionAttribute($value)
    {
        $descriptions = json_decode($value, true);
        return $descriptions[$this->getCurrentLocale()] ?? null;
    }    
}
