<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Loan extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_profile_id',
        'amount',
        'interest_rate',
        'status',
    ];

    public function clientProfile()
    {
        return $this->belongsTo(ClientProfile::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function loanAssignments()
    {
        return $this->hasMany(LoanAssignment::class);
    }
}
