"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { API_URL } from "@/lib/api";

// Server Action del formulario de alta. Recibe el estado anterior (useActionState) y el FormData.
export async function crearBajo(estadoAnterior, formData) {
  const bajo = {
    marca: formData.get("marca"),
    modelo: formData.get("modelo"),
    cuerdas: Number(formData.get("cuerdas")),
    precio: formData.get("precio"),
    stock: formData.get("stock"),
    fretless: formData.get("fretless") === "on",
    fecha_ingreso: formData.get("fecha_ingreso"),
    descripcion: formData.get("descripcion") || null,
  };

  let res;
  try {
    res = await fetch(`${API_URL}/bajos`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(bajo),
    });
  } catch {
    return { mensaje: "No se pudo conectar con la API.", errores: {}, valores: bajo };
  }

  if (res.status === 422) {
    // Errores de validación de Laravel: { message, errors: { campo: [mensajes] } }
    const cuerpo = await res.json();
    return { mensaje: "Revisá los campos marcados.", errores: cuerpo.errors, valores: bajo };
  }

  if (!res.ok) {
    return { mensaje: `La API respondió con un error (código ${res.status}).`, errores: {}, valores: bajo };
  }

  const creado = await res.json(); // 201
  revalidatePath("/");
  redirect(`/bajos/${creado.id}`);
}

// Server Action para borrar. El id viene "atado" con .bind() desde el botón.
export async function borrarBajo(id) {
  try {
    const res = await fetch(`${API_URL}/bajos/${id}`, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });
    if (!res.ok && res.status !== 404) {
      return { error: `No se pudo borrar (código ${res.status}).` };
    }
  } catch {
    return { error: "No se pudo conectar con la API." };
  }

  revalidatePath("/");
  redirect("/");
}
