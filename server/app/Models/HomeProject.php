<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeProject extends Model
{
    protected $fillable = [
        'title',
        'btn_text',
        'btn_link',
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

    // Button Text Accessor
    public function getBtnTextAttribute($value)
    {
        $btnTexts = json_decode($value, true);
        return $btnTexts[$this->getCurrentLocale()] ?? null;
    }

    // Button Link Accessor
    public function getBtnLinkAttribute($value)
    {
        $btnLinks = json_decode($value, true);
        return $btnLinks[$this->getCurrentLocale()] ?? null;
    }     
}
