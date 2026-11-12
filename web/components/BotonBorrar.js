"use client";

import { useState, useTransition } from "react";
import { borrarBajo } from "@/app/actions";

export default function BotonBorrar({ id }) {
  const [pendiente, iniciar] = useTransition();
  const [error, setError] = useState(null);

  function borrar() {
    if (!confirm("¿Seguro que querés borrar este bajo?")) return;
    iniciar(async () => {
      const resultado = await borrarBajo(id); // si sale bien, redirige al inicio
      if (resultado?.error) setError(resultado.error);
    });
  }

  return (
    <div className="zona-borrar">
      <button type="button" onClick={borrar} disabled={pendiente} className="boton boton-peligro">
        {pendiente ? "Borrando…" : "Borrar bajo"}
      </button>
      {error && <p className="error-campo">{error}</p>}
    </div>
  );
}
