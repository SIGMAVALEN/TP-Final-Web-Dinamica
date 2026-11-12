"use client";

import { useEffect } from "react";

// Registra el Service Worker (public/sw.js) apenas carga la app.
export default function RegistrarServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((reg) => console.log("Service Worker registrado:", reg.scope))
        .catch((err) => console.error("No se pudo registrar el Service Worker:", err));
    }
  }, []);

  return null;
}
