<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bajo extends Model
{
    protected $table = 'bajos';

    protected $fillable = [
        'marca',
        'modelo',
        'cuerdas',
        'precio',
        'stock',
        'fretless',
        'fecha_ingreso',
        'descripcion',
    ];

    protected function casts(): array
    {
        return [
            'cuerdas' => 'integer',
            'precio' => 'float',
            'stock' => 'integer',
            'fretless' => 'boolean',
            'fecha_ingreso' => 'date:Y-m-d',
        ];
    }
}
