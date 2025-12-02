<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $lang = '';
    public function __construct(array $attributes = [])
    {
        $this->lang = app()->getLocale();
    }

    public function getTitleAttribute($value)
    {
        $titles = json_decode($value, true);
        return $titles[$this->lang] ?? null;
    }

    public function getCategoryAttribute($value)
    {
        $categories = json_decode($value, true);
        return $categories[$this->lang] ?? null;
    }

    public function getLocationAttribute($value)
    {
        $locations = json_decode($value, true);
        return $locations[$this->lang] ?? null;
    }

    public function getDescriptionAttribute($value)
    {
        $descriptions = json_decode($value, true);
        return $descriptions[$this->lang] ?? null;
    }

    public function getCaseStudyAttribute($value)
    {
        $caseStudies = json_decode($value, true);
        return $caseStudies[$this->lang] ?? null;
    }

    public function getImageAttribute($value)
    {
        $images = json_decode($value, true);
        return $images[$this->lang] ?? null;
    }

}
