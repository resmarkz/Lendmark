<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'loan_id',
        'paid_at',
        'amount_paid',
        'status',
    ];

    public function loan()
    {
        return $this->belongsTo(Loan::class);
    }
}
