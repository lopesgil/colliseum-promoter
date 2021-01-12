<?php

namespace App\Http\Controllers;

use App\Models\Promoter;
use Illuminate\Http\Request;

class PromoterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $promoters = Promoter::with('user')->get();
        return response()->json($promoters, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $promoter = new Promoter;
        $promoter = $promoter->create($request);

        return response()->json($promoter, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $promoter = Promoter::with('user')->where('id', $id)->get()->first();
        if ($promoter){
            return response()->json($promoter, 200);
        } else {
            return response()->json('promoter not found', 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $promoter = Promoter::findOrFail($id);
        $promoter = $promoter->updatePromoter($request);

        return response()->json($promoter, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $promoter = Promoter::findOrFail($id);
        $promoter->delete();

        return response()->json('promoter deletado', 200);    
    }
}
