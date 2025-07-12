<?php
namespace App\Http\Controllers;

use App\Models\WelcomePageContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomePageController extends Controller
{
    public function index()
    {
        return Inertia::render('admin::settings/welcome-page/index', [
            'contents' => WelcomePageContent::ordered()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'section_key' => 'required|string|unique:welcome_page_contents',
            'title'       => 'nullable|string',
            'content'     => 'nullable|string',
            'data'        => 'nullable|array',
            'sort_order'  => 'nullable|integer',
            'is_active'   => 'boolean',
        ]);
        try {
            $content = WelcomePageContent::create($request->all());
            return redirect()->back()->with('success', 'Content created successfully')->with('data', $content);
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Failed to create content: ' . $th->getMessage());
        }

    }

    public function update(Request $request, WelcomePageContent $welcomePageContent)
    {
        $request->validate([
            'title'      => 'nullable|string',
            'content'    => 'nullable|string',
            'data'       => 'nullable|array',
            'sort_order' => 'nullable|integer',
            'is_active'  => 'boolean',
        ]);

        try {
            $welcomePageContent->update($request->all());
            return redirect()->back()->with('success', 'Content updated successfully');

        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Failed to update content: ' . $th->getMessage());
        }

    }

    public function updateOrder(Request $request)
    {
        try {
            $request->validate([
                'items'              => 'required|array',
                'items.*.id'         => 'required|exists:welcome_page_contents,id',
                'items.*.sort_order' => 'required|integer',
            ]);

            foreach ($request->items as $item) {
                WelcomePageContent::where('id', $item['id'])
                    ->update(['sort_order' => $item['sort_order']]);
            }

            return redirect()->back()->with('success', 'Order updated successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update order: ' . $e->getMessage());
        }
    }

    public function destroy(WelcomePageContent $welcomePageContent)
    {
        try {
            $welcomePageContent->delete();
            return redirect()->back()->with('success', 'Content deleted successfully');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Failed to delete content: ' . $th->getMessage());
        }
    }
}
