<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\ProjectGallery;
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
            'title' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => NULL,
                'errors' => $validator->errors()->all()
            ], 200);
        }

        $galleryItem = new ProjectGallery();
        $galleryItem->project_id = $projectId;
        $galleryItem->title = $request->title;
        // Image upload
        if($request->hasFile('image')) {
            $uploadPath = public_path("uploads/projects/{$projectId}/gallery/");
            
            if (!File::exists($uploadPath)) {
                File::makeDirectory($uploadPath, 0755, true);
            }

            $imageName = time() . '.' . $request->file('image')->getClientOriginalExtension();
            $request->file('image')->move($uploadPath, $imageName);
            
            // Image column update karenge
            $galleryItem->image = "uploads/projects/{$projectId}/gallery/" . $imageName;
        }
        
        $galleryItem->save();

        return response()->json([
            'status' => true,
            'message' => 'Gallery item added successfully',
            'item' => $galleryItem,
            'resetForm' => true
        ]);
    }

    /**
     * Update a gallery item
     */
    public function update(Request $request, $projectId, $id)
    {
        $galleryItem = ProjectGallery::where('project_id', $projectId)->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:255',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()->all()
            ], 200);
        }

        if ($request->hasFile('image')) {
            $uploadPath = public_path("uploads/projects/{$projectId}/gallery/");
            
            if (!File::exists($uploadPath)) {
                File::makeDirectory($uploadPath, 0755, true);
            }

            $imageName = time() . '.' . $request->file('image')->getClientOriginalExtension();
            $request->file('image')->move($uploadPath, $imageName);
            
            // Purani image ko delete kar sakte hain
            if (!empty($galleryItem->image)) {
                $oldImagePath = public_path("uploads/projects/{$projectId}/gallery/$galleryItem->image");
                if (File::exists($oldImagePath)) {
                    File::delete($oldImagePath);
                }
            }
            
            $galleryItem->image = "uploads/projects/{$projectId}/gallery/" . $imageName;
        }

        $galleryItem->title = $request->title ?? $galleryItem->title;
        $galleryItem->save();

        return response()->json([
            'status' => true,
            'message' => 'Gallery item updated successfully',
            'item' => $galleryItem,
            'resetForm' => true
        ]);
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
