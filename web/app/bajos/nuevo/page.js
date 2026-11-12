import Link from "next/link";
import FormularioBajo from "@/components/FormularioBajo";

export const metadata = { title: "Nuevo bajo — Bajos & Graves" };

export default function NuevoBajo() {
  return (
    <>
      <Link href="/" className="volver">← Volver al catálogo</Link>
      <h1>Cargar un bajo nuevo</h1>
      <FormularioBajo />
    </>
  );
}
