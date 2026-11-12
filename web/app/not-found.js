import Link from "next/link";

export default function NoEncontrado() {
  return (
    <div className="alerta">
      <strong>Esta página no existe.</strong>
      <p><Link href="/">Volver al catálogo</Link></p>
    </div>
  );
}
