<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = new User();
        $admin->name = 'Administrator';
        $admin->email = 'admin@domain.com';
        $admin->password = Hash::make('admin');
        $admin->email_verified_at = now();
        $admin->save();
    }
}
