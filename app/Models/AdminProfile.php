<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AdminProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'position',
        'permissions',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
