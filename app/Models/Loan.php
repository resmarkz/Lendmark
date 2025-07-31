<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Loan extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'term',
        'interest_rate',
        'status',
        'client_profile_id',
        'collector_profile_id',
        'disbursement_date', // Added disbursement_date to fillable
    ];

    protected $casts = [
        'term' => 'integer',
        'disbursement_date' => 'datetime', // Changed due_date to disbursement_date
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($loan) {
            $prefix = 'LM';
            $loan->marketing_id = $prefix . str_pad($loan->id, 6, '0', STR_PAD_LEFT);
            // Removed: $loan->due_date = now()->addMonths($loan->term);
            $loan->save();
        });
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function clientProfile()
    {
        return $this->belongsTo(ClientProfile::class);
    }

    public function collectorProfile()
    {
        return $this->belongsTo(CollectorProfile::class);
    }
}
