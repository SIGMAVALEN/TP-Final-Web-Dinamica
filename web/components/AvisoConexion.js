"use client";

import { useEffect, useState } from "react";

// Muestra una franja cuando el navegador se queda sin conexión.
export default function AvisoConexion() {
  const [enLinea, setEnLinea] = useState(true);

  useEffect(() => {
    setEnLinea(navigator.onLine);
    const on = () => setEnLinea(true);
    const off = () => setEnLinea(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  if (enLinea) return null;
  return (
    <div className="aviso-offline" role="status">
      Estás sin conexión: ves la última versión guardada del catálogo.
    </div>
  );
}
