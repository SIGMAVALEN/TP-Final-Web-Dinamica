"use client";

import Link from "next/link";
import { useState } from "react";
import BotonFavorito from "./BotonFavorito";
import { formatearPrecio } from "@/lib/api";

// Recibe los bajos ya cargados por el Server Component y los filtra en el navegador.
export default function ListadoBajos({ bajos }) {
  const [busqueda, setBusqueda] = useState("");
  const [cuerdas, setCuerdas] = useState("todas");

  const texto = busqueda.trim().toLowerCase();
  const filtrados = bajos.filter((bajo) => {
    const coincideTexto = `${bajo.marca} ${bajo.modelo}`.toLowerCase().includes(texto);
    const coincideCuerdas = cuerdas === "todas" || bajo.cuerdas === Number(cuerdas);
    return coincideTexto && coincideCuerdas;
  });

  return (
    <>
      <div className="filtros">
        <input
          type="search"
          placeholder="Buscar por marca o modelo…"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          aria-label="Buscar"
        />
        <select value={cuerdas} onChange={(e) => setCuerdas(e.target.value)} aria-label="Cuerdas">
          <option value="todas">Todas las cuerdas</option>
          <option value="4">4 cuerdas</option>
          <option value="5">5 cuerdas</option>
          <option value="6">6 cuerdas</option>
        </select>
      </div>

      <p className="contador">
        {filtrados.length} de {bajos.length} bajos
      </p>

      {filtrados.length === 0 ? (
        <p className="alerta">No hay bajos que coincidan con la búsqueda.</p>
      ) : (
        <ul className="grilla">
          {filtrados.map((bajo) => (
            <li key={bajo.id}>
              <Link href={`/bajos/${bajo.id}`} className="tarjeta">
                <div className="tarjeta-arriba">
                  <span className="marca">{bajo.marca}</span>
                  <BotonFavorito id={bajo.id} chico />
                </div>
                <h2>{bajo.modelo}</h2>
                <div className="etiquetas">
                  <span className="etiqueta">{bajo.cuerdas} cuerdas</span>
                  {bajo.fretless && <span className="etiqueta etiqueta-acento">Fretless</span>}
                  {bajo.stock === 0 && <span className="etiqueta etiqueta-gris">Sin stock</span>}
                </div>
                <p className="precio">{formatearPrecio(bajo.precio)}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
