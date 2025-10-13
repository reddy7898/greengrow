<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fertilizer;
use App\Http\Resources\FertilizerResource;

class FertilizerController extends Controller
{
    public function __construct()
    {
        // Protect write routes
        $this->middleware('auth:sanctum')->only(['store', 'update', 'destroy']);
    }

    /**
     * GET /api/fertilizers
     */
    public function index()
    {
        // Return all fertilizers. For larger datasets add pagination.
        return FertilizerResource::collection(Fertilizer::orderBy('name')->get());
    }

    /**
     * GET /api/fertilizers/{fertilizer}
     */
    public function show(Fertilizer $fertilizer)
    {
        return new FertilizerResource($fertilizer);
    }

    /**
     * POST /api/fertilizers
     */
    public function store(Request $request)
    {
        // simple admin check
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $fert = Fertilizer::create($data);

        return new FertilizerResource($fert);
    }

    /**
     * PUT /api/fertilizers/{fertilizer}
     */
    public function update(Request $request, Fertilizer $fertilizer)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $fertilizer->update($data);

        return new FertilizerResource($fertilizer);
    }

    /**
     * DELETE /api/fertilizers/{fertilizer}
     */
    public function destroy(Request $request, Fertilizer $fertilizer)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $fertilizer->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
