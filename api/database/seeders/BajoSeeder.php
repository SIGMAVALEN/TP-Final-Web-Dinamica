<?php

namespace Database\Seeders;

use App\Models\Bajo;
use Illuminate\Database\Seeder;

class BajoSeeder extends Seeder
{
    public function run(): void
    {
        $bajos = [
            [
                'marca' => 'Fender', 'modelo' => 'Player II Precision Bass', 'cuerdas' => 4,
                'precio' => 899.99, 'stock' => 3, 'fretless' => false, 'fecha_ingreso' => '2026-03-10',
                'descripcion' => 'El clásico P-Bass: sonido grueso y con mucho cuerpo. Ideal para rock y funk.',
            ],
            [
                'marca' => 'Fender', 'modelo' => 'American Professional II Jazz Bass', 'cuerdas' => 4,
                'precio' => 1799.00, 'stock' => 1, 'fretless' => false, 'fecha_ingreso' => '2026-05-22',
                'descripcion' => 'Dos micrófonos single coil y mástil fino. Muy versátil, de los más usados en estudio.',
            ],
            [
                'marca' => 'Music Man', 'modelo' => 'StingRay Special', 'cuerdas' => 4,
                'precio' => 2499.00, 'stock' => 2, 'fretless' => false, 'fecha_ingreso' => '2026-01-15',
                'descripcion' => 'Humbucker con preamp activo de 3 bandas. Ataque potente, perfecto para slap.',
            ],
            [
                'marca' => 'Ibanez', 'modelo' => 'SR505E', 'cuerdas' => 5,
                'precio' => 749.50, 'stock' => 4, 'fretless' => false, 'fecha_ingreso' => '2026-07-03',
                'descripcion' => 'Cinco cuerdas, cuerpo liviano y mástil rápido. Electrónica activa Bartolini.',
            ],
            [
                'marca' => 'Yamaha', 'modelo' => 'TRBX304', 'cuerdas' => 4,
                'precio' => 399.00, 'stock' => 6, 'fretless' => false, 'fecha_ingreso' => '2026-08-19',
                'descripcion' => 'Muy buena relación precio/calidad para empezar. Tiene 5 presets de ecualización.',
            ],
            [
                'marca' => 'Ibanez', 'modelo' => 'SRF700 Fretless', 'cuerdas' => 4,
                'precio' => 1099.00, 'stock' => 1, 'fretless' => true, 'fecha_ingreso' => '2026-04-28',
                'descripcion' => 'Sin trastes, con piezo en el puente. Sonido "mwah" para jazz y fusión.',
            ],
            [
                'marca' => 'Sire', 'modelo' => 'Marcus Miller V7 Vintage', 'cuerdas' => 5,
                'precio' => 629.00, 'stock' => 0, 'fretless' => false, 'fecha_ingreso' => '2026-02-07',
                'descripcion' => 'Estilo Jazz Bass con preamp activo diseñado con Marcus Miller. Sin stock por ahora.',
            ],
            [
                'marca' => 'Warwick', 'modelo' => 'RockBass Corvette $$', 'cuerdas' => 6,
                'precio' => 1199.00, 'stock' => 1, 'fretless' => false, 'fecha_ingreso' => '2026-09-30',
                'descripcion' => 'Seis cuerdas con dos humbuckers MEC. Rango enorme para tocar acordes y solos.',
            ],
        ];

        foreach ($bajos as $bajo) {
            Bajo::create($bajo);
        }
    }
}
