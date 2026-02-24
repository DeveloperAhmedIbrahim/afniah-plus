<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\ProjectGallery;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ProjectGalleryController extends Controller
{
    /**
     * List gallery items for a project
     */
    public function list($projectId)
    {
        $gallery = ProjectGallery::where('project_id', $projectId)->get();
        return response()->json([
            'status' => true,
            'gallery' => $gallery,
            'message' => NULL
        ]);
    }

    /**
     * Insert a new gallery item
     */
    public function insert(Request $request, $projectId)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => NULL,
                'errors' => $validator->errors()->all()
            ], 200);
        }


        $titles = ["en" => "", "ar" => ""];
        $images = ["en" => "", "ar" => ""];
        
        $titles[$request->lang] = $request->title;

        $galleryItem = new ProjectGallery();
        $galleryItem->project_id = $projectId;
        $galleryItem->title = json_encode($titles);
        // Image upload
        if($request->hasFile('image')) {
            $uploadPath = public_path("uploads/projects/{$projectId}/gallery/");
            
            if (!File::exists($uploadPath)) {
                File::makeDirectory($uploadPath, 0755, true);
            }

            $imageName = time() . '.' . $request->file('image')->getClientOriginalExtension();
            $request->file('image')->move($uploadPath, $imageName);
            
            // Image column update karenge
            $images[$request->lang] = "uploads/projects/{$projectId}/gallery/" . $imageName;
            $galleryItem->image = json_encode($images);
        }
        
        $galleryItem->save();

        return response()->json([
            'status' => true,
            'message' => 'Gallery item added successfully',
            'gallery' => $galleryItem,
            'resetForm' => true
        ]);
    }

    /**
     * Update a gallery item
     */
    public function update(Request $request, $projectId, $id)
    {
        if ($request->method() === 'GET') {
            $lang = $request->lang ?? 'en';
            App::setLocale($lang);
            $galleryItem = ProjectGallery::find($id);
            return response()->json([
                'status' => true,
                'gallery' => $galleryItem,
                'message' => null,
            ]);
        } 
        
        elseif ($request->method() === 'POST') {
            $validator = Validator::make($request->all(), [
                'title' => 'required',
                'image' => 'nullable|mimes:jpeg,png,jpg,gif,webp,svg',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()->all(),
                    'message' => null,
                ], 200);
            }

            $lang = $request->lang ?? 'en';
            $galleryItem = DB::table('project_galleries')->where('id', $id)->first();

            if (!$galleryItem) {
                return response()->json([
                    'status' => false,
                    'errors' => ['Gallery item not found'],
                    'message' => null,
                ], 404);
            }

            $titleData = json_decode($galleryItem->title, true) ?? ['en' => '', 'ar' => ''];
            $imageData = json_decode($galleryItem->image, true) ?? ['en' => '', 'ar' => ''];

            $titleData[$lang] = $request->title;

            if ($request->hasFile('image')) {
                $uploadPath = public_path("uploads/projects/{$projectId}/gallery/");
                
                if (!File::exists($uploadPath)) {
                    File::makeDirectory($uploadPath, 0755, true);
                }

                $imageName = time() . '.' . $request->file('image')->getClientOriginalExtension();
                $request->file('image')->move($uploadPath, $imageName);
                
                if (!empty($imageData[$lang])) {
                    $oldImagePath = public_path($imageData[$lang]);
                    if (File::exists($oldImagePath)) {
                        File::delete($oldImagePath);
                    }
                }

                $imageData[$lang] = "uploads/projects/{$projectId}/gallery/" . $imageName;
            }

            DB::table('project_galleries')
            ->where('id', $id)
            ->update([
                'title' => json_encode($titleData),
                'image' => json_encode($imageData),
                'updated_at' => now(),
            ]);

            App::setLocale($lang);

            return response()->json([
                'status' => true,
                'gallery' => ProjectGallery::find($id),
                'message' => 'Gallery item updated successfully!',
            ]);
        }
    }

    /**
     * Delete a gallery item
     */
    public function delete($projectId, $id)
    {
        $galleryItem = ProjectGallery::where('project_id', $projectId)->findOrFail($id);

        if ($galleryItem->image) {
            $oldImagePath = str_replace(url('/'), public_path(), "uploads/projects/{$projectId}/gallery/$galleryItem->image");
            if (File::exists($oldImagePath)) {
                File::delete($oldImagePath);
            }
        }

        $galleryItem->delete();

        return response()->json([
            'status' => true,
            'message' => 'Gallery item deleted successfully'
        ]);
    }    
}
