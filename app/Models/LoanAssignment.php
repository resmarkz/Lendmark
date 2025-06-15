<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LoanAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'loan_id',
        'agent_profile_id',
        'role', // telemarketer or collector
    ];

    public function loan()
    {
        return $this->belongsTo(Loan::class);
    }

    public function agentProfile()
    {
        return $this->belongsTo(AgentProfile::class);
    }
}
