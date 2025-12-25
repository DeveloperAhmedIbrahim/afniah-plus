<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialDetail extends Model
{
    protected $fillable = [
        'tagline',
        'copyright_credits',
        'address',
        'email',
        'phone',
        'facebook',
        'twitter',
        'instagram',
        'linkedin',
    ]; 

    // Helper method to get current locale
    protected function getCurrentLocale()
    {
        return app()->getLocale();
    }

    // Taglines Accessor
    public function getTaglineAttribute($value)
    {
        $taglines = json_decode($value, true);
        return $taglines[$this->getCurrentLocale()] ?? null;
    }

    // Copyright Credits Accessor
    public function getCopyrightCreditsAttribute($value)
    {
        $copyrightCredits = json_decode($value, true);
        return $copyrightCredits[$this->getCurrentLocale()] ?? null;
    }    
}
