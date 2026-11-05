// Кеш файлов с хешем в имени: повторный вход не нагружает канал Raspberry Pi.
const CACHE = 'twin-a19d5a35b8';
const URLS = ["models/drive.47221de0ed.glb","models/feeder.7f2d57b3f8.glb","models/module.321695bd3e.glb","models/rail.b9a7a48c05.glb","textures/brick_color.792bafbcbe.webp","textures/brick_normal.ec6e9a0b95.webp","textures/brick_rough.eb70188c2c.webp","textures/concrete_color.782fd2bb34.webp","textures/concrete_normal.28b194f7aa.webp","textures/concrete_rough.3a5f3d69a5.webp","textures/floor_color.f6dd910aaf.webp","textures/floor_normal.754e47bb92.webp","textures/floor_rough.ceb7863bf6.webp","textures/metal_color.b6824cdf43.webp","textures/metal_normal.14f322634b.webp","textures/metal_rough.3f77fa853d.webp","textures/pig_color.7313193604.webp","textures/pig_color_1k.b109c15a02.webp","textures/pig_normal.37326246b4.webp","textures/roof_color.f3ea47e241.webp","textures/roof_normal.2a19d4e314.webp","textures/roof_rough.b5f1f8e1a8.webp","vat/pig.294f6c8e29.json","vat/pig_lod0.93ba48759e.bin","vat/pig_lod1.9be8df989b.bin","vat/pig_lod2.838f8c3b5d.bin","assets/app-BT5hjRS9.js","assets/index-BSuBJMoK.js","assets/index-qCl8-dLM.css"];

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  if (!Array.isArray(URLS) || !URLS.some((p) => u.pathname.endsWith('/' + p))) return;
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const hit = await c.match(e.request);
    if (hit) return hit;
    const res = await fetch(e.request);
    if (res.ok) c.put(e.request, res.clone());
    return res;
  })());
});
