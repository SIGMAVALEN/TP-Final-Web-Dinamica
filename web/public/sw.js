// Service Worker de Bajos & Graves
// Estrategia: network-first (primero intenta la red; si falla, usa lo que está en caché).

const CACHE = "bajos-v1";
const PAGINA_OFFLINE = "/offline.html";
const PRECACHE = ["/", PAGINA_OFFLINE, "/manifest.json", "/icons/icon-192.png", "/icons/icon-512.png"];

// INSTALL: guardamos la página principal, la página offline y los íconos.
// También buscamos dentro del HTML de "/" los archivos JS/CSS de Next para guardarlos.
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await cache.addAll(PRECACHE);

      try {
        const res = await cache.match("/");
        const html = await res.text();
        const recursos = [...new Set(html.match(/\/_next\/static\/[^"'\s)\\]+/g) || [])];
        await Promise.all(recursos.map((url) => cache.add(url).catch(() => {})));
      } catch {
        // si falla no pasa nada: se van a guardar cuando se usen
      }

      self.skipWaiting(); // activar la versión nueva sin esperar
    })()
  );
});

// ACTIVATE: borramos cachés viejas y tomamos el control de las pestañas abiertas.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const nombres = await caches.keys();
      await Promise.all(nombres.filter((n) => n !== CACHE).map((n) => caches.delete(n)));
      await self.clients.claim();
    })()
  );
});

// FETCH: interceptamos los pedidos GET de nuestro propio sitio.
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/_next/webpack-hmr") || url.pathname.startsWith("/__nextjs")) return;
  // Los pedidos internos de navegación de Next (RSC) van directo a la red:
  // si fallan, Next hace una navegación normal y cae en el caso de abajo.
  if (req.headers.get("RSC") || url.searchParams.has("_rsc")) return;

  event.respondWith(redPrimero(req));
});

async function redPrimero(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone()); // guardamos la copia más nueva
    return res;
  } catch {
    // Sin conexión: devolvemos lo guardado
    const guardado = await cache.match(req, { ignoreSearch: req.mode === "navigate" });
    if (guardado) return guardado;
    if (req.mode === "navigate") return cache.match(PAGINA_OFFLINE);
    return Response.error();
  }
}
