import Link from "next/link";
import { obtenerBajo, formatearPrecio, formatearFecha } from "@/lib/api";
import BotonFavorito from "@/components/BotonFavorito";
import BotonBorrar from "@/components/BotonBorrar";

// Ruta dinámica: /bajos/1, /bajos/2, ...
export default async function DetalleBajo({ params }) {
  const { id } = await params;
  const { datos: bajo, error } = await obtenerBajo(id);

  if (error) {
    return (
      <>
        <div className="alerta alerta-error" role="alert">
          <strong>Ups.</strong>
          <p>{error}</p>
        </div>
        <Link href="/" className="volver">← Volver al catálogo</Link>
      </>
    );
  }

  return (
    <article className="detalle">
      <Link href="/" className="volver">← Volver al catálogo</Link>

      <div className="detalle-cabecera">
        <div>
          <p className="marca">{bajo.marca}</p>
          <h1>{bajo.modelo}</h1>
        </div>
        <BotonFavorito id={bajo.id} />
      </div>

      <p className="precio precio-grande">{formatearPrecio(bajo.precio)}</p>

      <dl className="ficha">
        <div><dt>Cuerdas</dt><dd>{bajo.cuerdas}</dd></div>
        <div><dt>Trastes</dt><dd>{bajo.fretless ? "Fretless (sin trastes)" : "Con trastes"}</dd></div>
        <div>
          <dt>Stock</dt>
          <dd className={bajo.stock === 0 ? "sin-stock" : ""}>
            {bajo.stock === 0 ? "Sin stock" : `${bajo.stock} unidad${bajo.stock === 1 ? "" : "es"}`}
          </dd>
        </div>
        <div><dt>Ingresó</dt><dd>{formatearFecha(bajo.fecha_ingreso)}</dd></div>
      </dl>

      {bajo.descripcion && <p className="descripcion">{bajo.descripcion}</p>}

      <BotonBorrar id={bajo.id} />
    </article>
  );
}
