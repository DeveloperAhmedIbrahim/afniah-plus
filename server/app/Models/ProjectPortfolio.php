<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectPortfolio extends Model
{
    protected $fillable = [
        'title',
        'toptitle',
        'subtitle',
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

    // Top Title Accessor
    public function getToptitleAttribute($value)
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
}
