<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Auth;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {   
        $user = Auth::user();
        $user->load('promoter');
        if ($user->is_admin === 1) {
            return $next($request);
        } else {
            return response()->json('Unauthorized', 500);
        }
    }
}
