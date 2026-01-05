<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectGallery extends Model
{
    protected $fillable = [
        'title',
        'project_id',
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
    
    // Image Accessor
    public function getImageAttribute($value)
    {
        $images = json_decode($value, true);
        return $images[$this->getCurrentLocale()] ?? null;
    }    
}
