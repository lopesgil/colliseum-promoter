<?php

namespace App\Models;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Promoter extends Model
{
    use HasFactory;
    
    public function user() {
        return $this->BelongsTo(User::class);
    }

    public function create(Request $request, User $user) {
        $this->phone = $request->phone;
        $this->user_id = $user->id;

        $this->save();

        return $this;
    }

    public function updatePromoter(Request $request){
        if($request->phone){
            $this->phone = $request->phone;
        }

        $this->save();

        return $this;
    }
}
