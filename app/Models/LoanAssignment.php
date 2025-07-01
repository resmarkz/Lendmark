<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LoanAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'loan_id',
        'collector_profile_id',
    ];

    public function loan()
    {
        return $this->belongsTo(Loan::class);
    }

    public function collectorProfile()
    {
        return $this->belongsTo(CollectorProfile::class);
    }
}