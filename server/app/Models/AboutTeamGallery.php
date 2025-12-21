<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutTeamGallery extends Model
{
    protected $fillable = [
        'name',
        'designation',
        'image',
    ]; 

    // Helper method to get current locale
    protected function getCurrentLocale()
    {
        return app()->getLocale();
    }

    // Name Accessor
    public function getNameAttribute($value)
    {
        $names = json_decode($value, true);
        return $names[$this->getCurrentLocale()] ?? null;
    }

    // Designation Accessor
    public function getDesignationAttribute($value)
    {
        $designations = json_decode($value, true);
        return $designations[$this->getCurrentLocale()] ?? null;
    }

    // Image Accessor
    public function getImageAttribute($value)
    {
        $images = json_decode($value, true);
        return $images[$this->getCurrentLocale()] ?? null;
    } 
}
