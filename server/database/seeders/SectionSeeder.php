<?php

namespace Database\Seeders;

use App\Models\Section;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sections = [
            'home_hero',
            'home_about',
            'home_projects',
            'home_location',
        
            'about_hero',
            'about_whoWeAre',
            'about_vision',
            'about_team',

            'projects_hero',
            'projects_overview',
            'projects_caseStudy',
            'projects_gallery',

            'services_hero',
            'services_overview',
            'services_approach',
            'services_process',
        ];

        foreach ($sections as $section) {
            $sectionModel = new Section();
            $sectionModel->name = $section;
            $sectionModel->save();
        }        
    }
}
