<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CollectorProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'contact_number',
        'date_of_birth',
        'source_of_income',
    ];

    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}