// Funciones para hablar con la API de Laravel.
// Se usan desde Server Components y Server Actions (corren en el servidor de Next).

export const API_URL = process.env.API_URL || "http://127.0.0.1:8000/api";

// Devuelve { datos, error }. Nunca lanza excepción, así la página no se rompe.
async function pedir(ruta) {
  try {
    const res = await fetch(`${API_URL}${ruta}`, {
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return { datos: null, error: "No encontramos ese bajo. Puede que lo hayan borrado.", status: 404 };
      }
      return { datos: null, error: `La API respondió con un error (código ${res.status}).`, status: res.status };
    }

    return { datos: await res.json(), error: null, status: res.status };
  } catch {
    // fetch tira error si la API está apagada o no hay red
    return {
      datos: null,
      error: "No se pudo conectar con la API. ¿Está corriendo php artisan serve?",
      status: 0,
    };
  }
}

export function obtenerBajos() {
  return pedir("/bajos");
}

export function obtenerBajo(id) {
  return pedir(`/bajos/${id}`);
}

export function formatearPrecio(valor) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "USD" }).format(valor);
}

export function formatearFecha(fecha) {
  // fecha viene como "2026-03-10"
  const [anio, mes, dia] = fecha.split("-");
  return `${dia}/${mes}/${anio}`;
}
