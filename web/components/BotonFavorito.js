"use client";

import { useEffect, useState } from "react";

// Client Component con estado propio: marca un bajo como favorito.
// Los favoritos se guardan en localStorage para que no se pierdan al recargar.
function leerFavoritos() {
  try {
    return JSON.parse(localStorage.getItem("favoritos")) || [];
  } catch {
    return [];
  }
}

export default function BotonFavorito({ id, chico = false }) {
  const [esFavorito, setEsFavorito] = useState(false);

  // Al montar, nos fijamos si ya estaba guardado
  useEffect(() => {
    setEsFavorito(leerFavoritos().includes(id));
  }, [id]);

  function alternar(evento) {
    evento.preventDefault(); // por si el botón está dentro de un <Link>
    const favoritos = leerFavoritos();
    const nuevos = esFavorito ? favoritos.filter((f) => f !== id) : [...favoritos, id];
    try {
      localStorage.setItem("favoritos", JSON.stringify(nuevos));
    } catch {
      // si el navegador no deja guardar, igual cambiamos el estado en pantalla
    }
    setEsFavorito(!esFavorito);
  }

  return (
    <button
      type="button"
      onClick={alternar}
      className={`favorito ${esFavorito ? "activo" : ""} ${chico ? "favorito-chico" : ""}`}
      aria-pressed={esFavorito}
      title={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      {esFavorito ? "★" : "☆"}
      {!chico && <span>{esFavorito ? " Favorito" : " Marcar favorito"}</span>}
    </button>
  );
}
