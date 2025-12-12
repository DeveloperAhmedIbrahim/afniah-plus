<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeAboutBullet extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
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

    // Description Accessor
    public function getDescriptionAttribute($value)
    {
        $descriptions = json_decode($value, true);
        return $descriptions[$this->getCurrentLocale()] ?? null;
    }

    // Image Accessor
    public function getImageAttribute($value)
    {
        $images = json_decode($value, true);
        return $images[$this->getCurrentLocale()] ?? null;
    }
}
