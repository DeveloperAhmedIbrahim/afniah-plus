<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactForm extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'smtp_mailer',
        'smtp_host',
        'smtp_port',
        'smtp_username',
        'smtp_password',
        'smtp_from_name',
        'smtp_from_address',
        'smtp_encryption',
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
}
