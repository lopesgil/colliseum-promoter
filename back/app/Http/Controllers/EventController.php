<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Auth;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $events = Event::all();
        $events->load('user');
        if ($events) {
            return response()->json($events, 200);
        } else {
            return response()->json('no events found', 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $event = new Event;
        $event = $event->create($request);
        return response()->json($event, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $event = Event::findOrFail($id);
        $event->load('user');
        return response()->json($event, 200);
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
        $event = Event::findOrFail($id);
        $event = $event->updateEvent($request);

        return response()->json($event, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event = $event->delete();

        return response()->json('evento deletado', 200);
    }

    /**
     * Search for an event based on a query
     * 
     * @param Request $request
     * @return Event 
     */
    public function searchEvent(Request $request) {
        $events = Event::all();
        $results = [];
        $tolerance = (0.3)*strlen($request->search);
        foreach($events as $event){
            if($event->search(strtoupper($request->search), (int)$tolerance)){
                array_push($results, ['event' => $event]); 
            }
        }

        if ($results === []){
            return response()->json('no events match the search terms', 404);
        }
            return response()->json($results,200);

    }
}
