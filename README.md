# 𝄢 Bajos & Graves — Tienda de bajos

TP Integrador · Programación Web Dinámica · 6° 1° · EPET Nº 30 · 2026
Alumno/a: Valentisigma Michanie

Aplicación web para administrar el catálogo de una tienda de **bajos eléctricos**.
Tiene una API en **Laravel** que guarda los datos en una base SQLite, un frontend en **Next.js** que la consume y es una **PWA**: se puede instalar y abre sin conexión.

---

## Tema y entidad: `Bajo`

| Campo           | Tipo        | Ejemplo                       | Notas                           |
|-----------------|-------------|-------------------------------|---------------------------------|
| `marca`         | texto       | `Fender`                      | obligatorio, máx. 100           |
| `modelo`        | texto       | `Player II Precision Bass`    | obligatorio, máx. 100           |
| `cuerdas`       | número      | `4`                           | solo 4, 5 o 6                   |
| `precio`        | número      | `899.99`                      | en dólares, no puede ser < 0    |
| `stock`         | número      | `3`                           | entero, no puede ser < 0        |
| `fretless`      | booleano    | `false`                       | `true` = sin trastes            |
| `fecha_ingreso` | fecha       | `2026-03-10`                  | no puede ser una fecha futura   |
| `descripcion`   | texto largo | `El clásico P-Bass...`        | opcional                        |

---

## Estructura

```
tienda-bajos/
├── api/    → proyecto Laravel (modelo, migración, controlador, seeder)
├── web/    → proyecto Next.js (páginas, componentes, manifest y service worker)
└── README.md
```

Archivos principales:

- `api/app/Models/Bajo.php`: modelo con `$fillable`
- `api/database/migrations/..._create_bajos_table.php`: migración
- `api/app/Http/Controllers/BajoController.php`: CRUD + validación
- `api/routes/api.php`: `Route::apiResource('bajos', ...)`
- `api/database/seeders/BajoSeeder.php`: 8 bajos de ejemplo
- `web/app/page.js`: listado (Server Component)
- `web/app/bajos/[id]/page.js`: detalle (ruta dinámica)
- `web/app/bajos/nuevo/page.js` y `web/app/actions.js`: alta con Server Action
- `web/components/BotonFavorito.js`: Client Component con estado (`'use client'`)
- `web/public/manifest.json`, `web/public/sw.js`, `web/public/offline.html`: PWA

---

## Cómo correr el proyecto

### Requisitos

- **PHP 8.3 o superior** con la extensión `pdo_sqlite` habilitada (en XAMPP: en `php.ini` sacar el `;` de `extension=pdo_sqlite` y `extension=sqlite3`)
- **Composer**
- **Node.js 20 o superior** y npm

### 1. API (Laravel)

Abrir una terminal en la carpeta del proyecto:

```bash
cd api
composer install
cp .env.example .env              # en Windows (CMD): copy .env.example .env
php artisan key:generate
php -r "touch('database/database.sqlite');"
php artisan migrate --seed
php artisan serve
```

La API queda en **http://127.0.0.1:8000/api/bajos**. **Dejar esta terminal abierta.**

> `migrate --seed` crea la tabla `bajos` y carga 8 bajos de ejemplo.
> Para volver a empezar con los datos originales: `php artisan migrate:fresh --seed`.

### 2. Frontend (Next.js)

En **otra** terminal:

```bash
cd web
npm install
npm run dev
```

Abrir **http://localhost:3000**.

> El frontend busca la API en `http://127.0.0.1:8000/api`. Si la API corre en otra dirección, crear `web/.env.local` copiando `web/.env.example` y cambiar `API_URL`.

### 3. Probar la PWA (instalación y modo offline)

La PWA anda también con `npm run dev`, pero se prueba mejor con la versión de producción:

```bash
cd web
npm run build
npm start
```

1. Abrir **http://localhost:3000** en Chrome o Edge y esperar a que cargue el catálogo.
2. **Instalar:** aparece el ícono de instalar en la barra de direcciones (o en el menú ⋮, "Instalar Bajos&Graves").
3. **Offline:** F12 → pestaña *Application* → *Service Workers* (tiene que figurar `sw.js` como *activated*). Tildar **Offline** (o en *Network* elegir "Offline") y recargar:
   - El catálogo sigue apareciendo, con la última versión guardada.
   - Los detalles que ya visitaste también se ven.
   - Una página que nunca abriste muestra la página propia de **"Sin conexión"**.

---

## Endpoints de la API

| Método    | Ruta               | Qué hace          | Respuesta OK |
|-----------|--------------------|-------------------|--------------|
| GET       | `/api/bajos`       | Lista todos       | 200          |
| GET       | `/api/bajos/{id}`  | Muestra uno       | 200 / 404    |
| POST      | `/api/bajos`       | Crea uno          | 201 / 422    |
| PUT/PATCH | `/api/bajos/{id}`  | Actualiza uno     | 200 / 404 / 422 |
| DELETE    | `/api/bajos/{id}`  | Borra uno         | 200 / 404    |

En Thunder Client hay que mandar el header `Accept: application/json`. En POST y PUT el body va en JSON, por ejemplo:

```json
{
  "marca": "Squier",
  "modelo": "Classic Vibe 70s Jazz",
  "cuerdas": 4,
  "precio": 499,
  "stock": 2,
  "fretless": false,
  "fecha_ingreso": "2026-11-01"
}
```

---

## Pruebas en Thunder Client

Pruebas hechas con la base recién cargada (`migrate:fresh --seed`), en este orden:

| #  | Petición | Body | Esperaba | Obtuve |
|----|----------|------|----------|--------|
| 1  | `GET /api/bajos` | — | 200 | 200 |
| 2  | `GET /api/bajos/1` | — | 200 | 200 |
| 3  | `GET /api/bajos/999` | — | 404 | 404 |
| 4  | `POST /api/bajos` | bajo completo y válido (el ejemplo de arriba) | 201 | 201 |
| 5  | `POST /api/bajos` | `{}` (vacío) | 422 | 422 |
| 6  | `POST /api/bajos` | `cuerdas: 7`, `precio: -5`, `fretless: "no"`, `fecha_ingreso: "2030-01-01"` | 422 | 422 |
| 7  | `PUT /api/bajos/9` | `{"precio": 459.99, "stock": 5}` | 200 | 200 |
| 8  | `PUT /api/bajos/9` | `{"precio": "barato"}` | 422 | 422 |
| 9  | `PUT /api/bajos/999` | `{"precio": 1}` | 404 | 404 |
| 10 | `DELETE /api/bajos/9` | — | 200 | 200 |
| 11 | `DELETE /api/bajos/9` (otra vez) | — | 404 | 404 |

Ejemplos de respuesta:

```json
// 404 → GET /api/bajos/999
{ "message": "No existe ningún bajo con id 999." }

// 422 → POST con cuerdas 7 y precio negativo
{
  "message": "El campo cuerdas tiene que ser 4, 5 o 6. (y 3 errores más)",
  "errors": {
    "cuerdas": ["El campo cuerdas tiene que ser 4, 5 o 6."],
    "precio": ["El campo precio no puede ser menor a 0."],
    "fretless": ["El campo fretless tiene que ser verdadero o falso."],
    "fecha_ingreso": ["La fecha de ingreso no puede ser una fecha futura."]
  }
}
```

---

## Qué tiene la app

### Requisitos
- **Backend:** proyecto nuevo, modelo + migración con `$fillable`, `Route::apiResource`, validación con `$request->validate()` y mensajes en castellano, códigos 200/201/404 (`findOrFail`)/422, seeder con 8 registros.
- **Frontend:** listado desde la API, detalle con `[id]`, manejo de errores con `res.ok` (si la API está apagada o el bajo no existe se muestra un mensaje y la página no se rompe), `Link` + layout con encabezado, y el Client Component `BotonFavorito` con `useState` (los favoritos se guardan en `localStorage`).
- **PWA:** `manifest.json` completo (nombre, íconos 192/512 + maskable, colores, `display: standalone`), Service Worker registrado, instalable, y abre offline.

### Extras
- ✅ **Formulario para crear** desde el frontend con **Server Action** (`app/actions.js` + `useActionState`), que muestra debajo de cada campo los errores 422 que devuelve Laravel.
- ✅ **Borrar** desde el frontend (botón en el detalle, con confirmación).
- ✅ **Buscador y filtro** en el listado (por marca/modelo y por cantidad de cuerdas).
- ✅ **Página "sin conexión" propia** (`public/offline.html`) y **caché network-first** en el Service Worker.
- ✅ Aviso en pantalla cuando el navegador pierde la conexión.

---

## Informe teórico

> ✏️ *Borrador: reescribirlo con mis palabras antes de entregar.*

**1. Códigos de estado.**
Si pido `GET /api/bajos/999`, el controlador hace `Bajo::findOrFail(999)`; como ese bajo no existe, Laravel corta y responde **404 Not Found**. Es el código correcto porque el pedido está bien hecho pero el recurso no existe. No es 400, porque la petición no tiene nada mal, ni 500, porque el servidor no falló.
Si mando `POST /api/bajos` con `cuerdas: 7` y `precio: -5`, `$request->validate()` falla y responde **422 Unprocessable Content** con la lista de errores por campo. El servidor entendió el JSON y la ruta existe, pero los datos no cumplen las reglas, así que no corresponde 404 ni 500. Y no es 201 porque no se creó nada.

**2. HTTPS.**
Con HTTP todo viaja en texto plano: alguien en la misma red (por ejemplo, el WiFi de la escuela) podría ver qué páginas visito y el contenido de las respuestas de la API, y también lo que mando en el formulario de "Nuevo bajo". Incluso podría modificar las respuestas en el camino. HTTPS cifra la conexión y garantiza que hablo con el servidor real.
El Service Worker exige HTTPS porque se queda en el navegador interceptando todas las peticiones del sitio. Si alguien pudiera inyectar un SW falso por HTTP, controlaría la app aunque después se cierre la pestaña. Por eso solo funciona en HTTPS o en `localhost`, que se considera seguro para desarrollar.

**3. CORS.**
CORS es una regla del **navegador**: bloquea que una página de un origen (`localhost:3000`) lea respuestas de otro origen (`127.0.0.1:8000`) si el servidor no lo permite. En mi app, el listado y el detalle hacen `fetch` desde **Server Components**, y la Server Action del formulario también corre en el servidor de Next. Ahí no hay navegador en el medio, así que CORS no aplica.
Aparecería si un Client Component (por ejemplo, el buscador) llamara directamente a `http://127.0.0.1:8000/api/bajos` desde el navegador. En ese caso Laravel tendría que mandar el header `Access-Control-Allow-Origin` (Laravel trae configurado CORS para `api/*`).

**4. PWA y TWA.**
No necesita estar en Google Play. Como PWA ya se instala desde el navegador, queda con ícono propio, abre en pantalla completa (`standalone`) y funciona sin conexión, que es lo que necesita una tienda como esta. Una TWA sirve para empaquetar la PWA y publicarla en Play Store. Valdría la pena si quisiera que la encuentren buscando en la tienda de apps, pero agrega costos y trámites (cuenta de desarrollador, firmar el APK, `assetlinks.json`) que para este proyecto no hacen falta.

**5. Decisiones: ¿qué fue lo que más me costó y cómo lo resolví?**
*[Completar con mi experiencia. Algunas ideas: hacer que los errores 422 de Laravel aparezcan debajo de cada campo del formulario, entender por qué el fetch del Server Component no tiene CORS, o lograr que el Service Worker guarde los archivos de Next para que la app abra offline.]*

---

## Problemas conocidos

- La lista de favoritos se guarda en el navegador (`localStorage`), no en la API: si cambiás de navegador no aparecen.
- En modo offline solo se pueden **ver** datos (lo último que se guardó). Crear o borrar necesita conexión con la API.
- Los precios están en dólares para no depender de la inflación.


Thunder Client me pedía iniciar sesión y no pude entrar, así que hice las pruebas con la extensión REST Client de VS Code. Están todas en api/pruebas.http y se pueden volver a ejecutar con un clic.