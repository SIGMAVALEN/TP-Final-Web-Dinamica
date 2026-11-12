import { obtenerBajos } from "@/lib/api";
import ListadoBajos from "@/components/ListadoBajos";

// Server Component: el fetch se hace en el servidor de Next, no en el navegador.
export default async function Inicio() {
  const { datos: bajos, error } = await obtenerBajos();

  return (
    <>
      <section className="portada">
        <h1>Catálogo de bajos</h1>
        <p>Eléctricos de 4, 5 y 6 cuerdas. Con y sin trastes.</p>
      </section>

      {error ? (
        <div className="alerta alerta-error" role="alert">
          <strong>No pudimos cargar el catálogo.</strong>
          <p>{error}</p>
        </div>
      ) : (
        <ListadoBajos bajos={bajos} />
      )}
    </>
  );
}
