<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeLocation extends Model
{
    protected $fillable = [
        'title',
        'latitude',
        'longitude',
        'btn_text',
        'btn_link',
        'message',
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

    // Message Accessor
    public function getMessageAttribute($value)
    {
        $messages = json_decode($value, true);
        return $messages[$this->getCurrentLocale()] ?? null;
    }
}
