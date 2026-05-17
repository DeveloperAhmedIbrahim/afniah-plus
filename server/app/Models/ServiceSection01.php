<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceSection01 extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'stats_title',
        'stats_count',
        'stats_icon',
        'service_id'
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
    // Stats Title Accessor
    public function getStatsTitleAttribute($value)
    {   
        $statsTitles = json_decode($value, true);
        return $statsTitles[$this->getCurrentLocale()] ?? null;
    }
    // Stats Count Accessor
    public function getStatsCountAttribute($value)
    {   
        $statsCounts = json_decode($value, true);
        return $statsCounts[$this->getCurrentLocale()] ?? null;
    }
    // Stats Icon Accessor
    public function getStatsIconAttribute($value)
    {   
        $statsIcons = json_decode($value, true);
        return $statsIcons[$this->getCurrentLocale()] ?? null;  
    }
}
