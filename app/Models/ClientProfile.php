<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ClientProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'address',
        'contact_number',
        'date_of_birth',
        'source_of_income',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function contactReferences()
    {
        return $this->hasMany(ContactReference::class);
    }

    public function loans()
    {
        return $this->hasMany(Loan::class, 'client_profile_id');
    }
}
