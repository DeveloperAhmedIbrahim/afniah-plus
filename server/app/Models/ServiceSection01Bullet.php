<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceSection01Bullet extends Model
{
    protected $fillable = [
        'bullet_text',
        'service_id',
    ];

    // Helper method to get current locale
    protected function getCurrentLocale()
    {
        return app()->getLocale();
    }
    
    // Bullet Text Accessor
    public function getBulletTextAttribute($value)
    {
        $bulletTexts = json_decode($value, true);   
        return $bulletTexts[$this->getCurrentLocale()] ?? null;

    }
}
