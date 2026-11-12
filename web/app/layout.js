import Link from "next/link";
import "./globals.css";
import RegistrarServiceWorker from "@/components/RegistrarServiceWorker";
import AvisoConexion from "@/components/AvisoConexion";

export const metadata = {
  title: "Bajos & Graves — Tienda de bajos",
  description: "Catálogo de bajos eléctricos: marcas, cuerdas, precio y stock.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/favicon.png",
    apple: "/icons/icon-192.png",
  },
};

export const viewport = {
  themeColor: "#14121f",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <header className="encabezado">
          <Link href="/" className="logo">
            <span className="logo-icono" aria-hidden="true">𝄢</span>
            Bajos &amp; Graves
          </Link>
          <nav>
            <Link href="/">Catálogo</Link>
            <Link href="/bajos/nuevo" className="boton boton-chico">+ Nuevo bajo</Link>
          </nav>
        </header>

        <AvisoConexion />

        <main className="contenedor">{children}</main>

        <footer className="pie">TP Integrador · Programación Web Dinámica · EPET Nº 30 · 2026</footer>

        <RegistrarServiceWorker />
      </body>
    </html>
  );
}
