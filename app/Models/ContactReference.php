<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ContactReference extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_profile_id',
        'name',
        'contact_number',
        'relationship',
        'source_of_income',
    ];

    public function clientProfile()
    {
        return $this->belongsTo(ClientProfile::class);
    }
}
