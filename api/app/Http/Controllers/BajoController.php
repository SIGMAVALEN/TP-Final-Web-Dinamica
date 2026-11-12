<?php

namespace App\Http\Controllers;

use App\Models\Bajo;
use Illuminate\Http\Request;

class BajoController extends Controller
{
    // Mensajes de validación en castellano
    private array $mensajes = [
        'required' => 'El campo :attribute es obligatorio.',
        'string' => 'El campo :attribute tiene que ser texto.',
        'max' => 'El campo :attribute no puede superar :max caracteres.',
        'integer' => 'El campo :attribute tiene que ser un número entero.',
        'numeric' => 'El campo :attribute tiene que ser un número.',
        'in' => 'El campo :attribute tiene que ser 4, 5 o 6.',
        'min' => 'El campo :attribute no puede ser menor a :min.',
        'boolean' => 'El campo :attribute tiene que ser verdadero o falso.',
        'date' => 'El campo :attribute tiene que ser una fecha válida (AAAA-MM-DD).',
        'before_or_equal' => 'La :attribute no puede ser una fecha futura.',
    ];

    private array $nombres = [
        'fecha_ingreso' => 'fecha de ingreso',
        'descripcion' => 'descripción',
    ];

    // Reglas compartidas por crear y actualizar
    private function reglas(bool $esActualizacion = false): array
    {
        // En PUT/PATCH los campos son opcionales, pero si vienen se validan igual
        $req = $esActualizacion ? 'sometimes|required' : 'required';

        return [
            'marca' => "$req|string|max:100",
            'modelo' => "$req|string|max:100",
            'cuerdas' => "$req|integer|in:4,5,6",
            'precio' => "$req|numeric|min:0",
            'stock' => "$req|integer|min:0",
            'fretless' => "$req|boolean",
            'fecha_ingreso' => "$req|date|before_or_equal:today",
            'descripcion' => 'nullable|string|max:1000',
        ];
    }

    // GET /api/bajos -> 200
    public function index()
    {
        return response()->json(Bajo::orderBy('marca')->orderBy('modelo')->get(), 200);
    }

    // POST /api/bajos -> 201 (o 422 si no valida)
    public function store(Request $request)
    {
        $datos = $request->validate($this->reglas(), $this->mensajes, $this->nombres);

        $bajo = Bajo::create($datos);

        return response()->json($bajo, 201);
    }

    // GET /api/bajos/{id} -> 200 (o 404 si no existe)
    public function show(string $id)
    {
        $bajo = Bajo::findOrFail($id);

        return response()->json($bajo, 200);
    }

    // PUT/PATCH /api/bajos/{id} -> 200 (o 404 / 422)
    public function update(Request $request, string $id)
    {
        $bajo = Bajo::findOrFail($id);

        $datos = $request->validate($this->reglas(true), $this->mensajes, $this->nombres);

        $bajo->update($datos);

        return response()->json($bajo, 200);
    }

    // DELETE /api/bajos/{id} -> 200 (o 404)
    public function destroy(string $id)
    {
        $bajo = Bajo::findOrFail($id);
        $bajo->delete();

        return response()->json(['message' => "Bajo {$id} eliminado correctamente."], 200);
    }
}
