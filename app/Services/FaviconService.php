<?php
namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class FaviconService
{
    public function processFavicon(UploadedFile $file, ?string $oldFaviconPath = null): string
    {
        try {
            // Delete old favicon from storage
            if ($oldFaviconPath && Storage::disk('public')->exists($oldFaviconPath)) {
                Storage::disk('public')->delete($oldFaviconPath);
            }

            // Ensure directory exists
            if (! Storage::disk('public')->exists('favicons')) {
                Storage::disk('public')->makeDirectory('favicons');
            }

            // Generate unique filename
            $filename    = 'favicon_' . time() . '.' . $file->getClientOriginalExtension();
            $storagePath = 'favicons/' . $filename;

            // Save to storage
            Storage::disk('public')->putFileAs('favicons', $file, $filename);

            // Update public favicon.ico
            $this->updatePublicFavicon($file);

            return $storagePath;
        } catch (\Exception $e) {
            Log::error('Favicon processing failed: ' . $e->getMessage());
            throw $e;
        }
    }

    protected function updatePublicFavicon(UploadedFile $file): void
    {
        try {
            $publicFaviconPath = public_path('favicon.ico');
            $pngFaviconPath    = public_path('favicon.png');

            // Remove old favicon files if they exist
            if (file_exists($publicFaviconPath)) {
                unlink($publicFaviconPath);
            }
            if (file_exists($pngFaviconPath)) {
                unlink($pngFaviconPath);
            }

            // Copy the uploaded file as favicon.ico
            copy($file->getPathname(), $publicFaviconPath);

            // Also create a PNG version for modern browsers
            copy($file->getPathname(), $pngFaviconPath);

            Log::info('Favicon successfully updated in public folder');
        } catch (\Exception $e) {
            Log::error('Failed to update public favicon: ' . $e->getMessage());
            throw $e;
        }
    }
}
