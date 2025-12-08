<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectHero extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'image'
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

    // Sub Title Accessor
    public function getSubtitleAttribute($value)
    {
        $subtitles = json_decode($value, true);
        return $subtitles[$this->getCurrentLocale()] ?? null;
    }

    // Location Accessor
    public function getImageAttribute($value)
    {
        $images = json_decode($value, true);
        return $images[$this->getCurrentLocale()] ?? null;
    }

}
