<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceSection02 extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
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

    // Subtitle Accessor
    public function getSubtitleAttribute($value)
    {
        $subtitles = json_decode($value, true);
        return $subtitles[$this->getCurrentLocale()] ?? null;
    }
}
