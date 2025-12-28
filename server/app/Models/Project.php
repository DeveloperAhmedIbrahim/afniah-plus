<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'category',
        'location',
        'description',
        'case_study',
        'featured_image',
        'banner_image',
        'case_study_image',
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

    // Category Accessor
    public function getCategoryAttribute($value)
    {
        $categories = json_decode($value, true);
        return $categories[$this->getCurrentLocale()] ?? null;
    }

    // Location Accessor
    public function getLocationAttribute($value)
    {
        $locations = json_decode($value, true);
        return $locations[$this->getCurrentLocale()] ?? null;
    }

    // Description Accessor
    public function getDescriptionAttribute($value)
    {
        $descriptions = json_decode($value, true);
        return $descriptions[$this->getCurrentLocale()] ?? null;
    }

    // Case Study Accessor
    public function getCaseStudyAttribute($value)
    {
        $caseStudies = json_decode($value, true);
        return $caseStudies[$this->getCurrentLocale()] ?? null;
    }

    // Featured Image Accessor
    public function getFeaturedImageAttribute($value)
    {
        $featuredImages = json_decode($value, true);
        return $featuredImages[$this->getCurrentLocale()] ?? null;
    }

    // Banner Image Accessor
    public function getBannerImageAttribute($value)
    {
        $bannerImages = json_decode($value, true);
        return $bannerImages[$this->getCurrentLocale()] ?? null;
    }
    
    // Case Study Image Accessor
    public function getCaseStudyImageAttribute($value)
    {
        $caseStudyImages = json_decode($value, true);
        return $caseStudyImages[$this->getCurrentLocale()] ?? null;
    }    

    // Optional: Method to get all translations for a field
    public function getAllTranslations($field)
    {
        return json_decode($this->attributes[$field], true) ?? [];
    }

    // Optional: Method to get specific language data
    public function getTranslation($field, $locale)
    {
        $data = json_decode($this->attributes[$field], true);
        return $data[$locale] ?? null;
    }
}