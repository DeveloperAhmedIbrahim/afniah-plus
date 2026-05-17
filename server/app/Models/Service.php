<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'title',
        'icon',
        'description',      
        'featured_image',
        'banner_image',
    ];

    /**
     * Helper method to get current app locale
     */
    protected function getCurrentLocale()
    {
        return app()->getLocale();
    }

    // Title Accessor
    public function getTitleAttribute($value)
    {
        $titles = $value ? json_decode($value, true) : [];
        return $titles[$this->getCurrentLocale()] ?? null;
    }

    // Icon Accessor (SVG code ya URL)
    public function getIconAttribute($value)
    {
        $icons = $value ? json_decode($value, true) : [];
        return $icons[$this->getCurrentLocale()] ?? null;
    }

    // Description Accessor
    public function getDescriptionAttribute($value)
    {
        $descriptions = $value ? json_decode($value, true) : [];
        return $descriptions[$this->getCurrentLocale()] ?? null;
    }

    // Featured Image Accessor
    public function getFeaturedImageAttribute($value)
    {
        $images = $value ? json_decode($value, true) : [];
        return $images[$this->getCurrentLocale()] ?? null;
    }

    // Banner Image Accessor
    public function getBannerImageAttribute($value)
    {
        $images = $value ? json_decode($value, true) : [];
        return $images[$this->getCurrentLocale()] ?? null;
    }
}