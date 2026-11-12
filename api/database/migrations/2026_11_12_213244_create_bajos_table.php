<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bajos', function (Blueprint $table) {
            $table->id();
            $table->string('marca');                       // texto
            $table->string('modelo');                      // texto
            $table->unsignedTinyInteger('cuerdas');        // número (4, 5 o 6)
            $table->decimal('precio', 10, 2);              // número (en dólares)
            $table->unsignedInteger('stock')->default(0);  // número
            $table->boolean('fretless')->default(false);   // booleano: sin trastes
            $table->date('fecha_ingreso');                 // fecha en que entró a la tienda
            $table->text('descripcion')->nullable();       // texto largo, opcional
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bajos');
    }
};
