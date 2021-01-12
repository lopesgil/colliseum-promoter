<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Promoter;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function create($request) {
        $this->name = $request->name;
        $this->email = $request->email;
        $this->password = Hash::make($request->password);
        $this->birthdate = $request->birthdate;
        $this->gender = $request->gender;
        
        $this->save();

        if ($request->role == 'promoter') {
            $promoter = new Promoter;
            $promoter->create($request, $this);
            $this->role = 'promoter';
            $this->load('promoter');
            $this->save();
        }


        return $this;
    }

    public function updateUser($request) {
        if ($request->name) {
            $this->name = $request->name;
        }
        if ($request->email) {
            $this->email = $request->email;
        }
        if ($request->birthdate) {
            $this->birthdate = $request->birthdate;
        }
        if ($request->gender) {
            $this->gender = $request->gender;
        }

        $this->save();

        return $this;
    }

    public function promoter() {
        return $this->hasOne(Promoter::class);
    }
}
