"use client";

import { useActionState } from "react";
import { crearBajo } from "@/app/actions";

const estadoInicial = { mensaje: "", errores: {}, valores: {} };

// Muestra el primer error que mandó Laravel para ese campo
function Error({ errores, campo }) {
  if (!errores?.[campo]) return null;
  return <p className="error-campo">{errores[campo][0]}</p>;
}

export default function FormularioBajo() {
  const [estado, accion, pendiente] = useActionState(crearBajo, estadoInicial);
  const v = estado.valores || {};
  const hoy = new Date().toISOString().slice(0, 10);

  // "key" hace que React vuelva a pintar los valores por defecto después de cada envío con error
  return (
    <form action={accion} className="formulario" key={JSON.stringify(v)} noValidate>
      {estado.mensaje && <p className="alerta alerta-error" role="alert">{estado.mensaje}</p>}

      <div className="fila">
        <label>
          Marca
          <input name="marca" defaultValue={v.marca ?? ""} placeholder="Fender" />
          <Error errores={estado.errores} campo="marca" />
        </label>
        <label>
          Modelo
          <input name="modelo" defaultValue={v.modelo ?? ""} placeholder="Jazz Bass" />
          <Error errores={estado.errores} campo="modelo" />
        </label>
      </div>

      <div className="fila">
        <label>
          Cuerdas
          <select name="cuerdas" defaultValue={v.cuerdas ?? 4}>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          <Error errores={estado.errores} campo="cuerdas" />
        </label>
        <label>
          Precio (US$)
          <input name="precio" type="number" step="0.01" min="0" defaultValue={v.precio ?? ""} />
          <Error errores={estado.errores} campo="precio" />
        </label>
        <label>
          Stock
          <input name="stock" type="number" min="0" defaultValue={v.stock ?? 1} />
          <Error errores={estado.errores} campo="stock" />
        </label>
      </div>

      <div className="fila">
        <label>
          Fecha de ingreso
          <input name="fecha_ingreso" type="date" max={hoy} defaultValue={v.fecha_ingreso ?? hoy} />
          <Error errores={estado.errores} campo="fecha_ingreso" />
        </label>
        <label className="check">
          <input name="fretless" type="checkbox" defaultChecked={v.fretless ?? false} />
          Es fretless (sin trastes)
        </label>
      </div>

      <label>
        Descripción (opcional)
        <textarea name="descripcion" rows={3} defaultValue={v.descripcion ?? ""} />
        <Error errores={estado.errores} campo="descripcion" />
      </label>

      <button type="submit" className="boton" disabled={pendiente}>
        {pendiente ? "Guardando…" : "Guardar bajo"}
      </button>
    </form>
  );
}
