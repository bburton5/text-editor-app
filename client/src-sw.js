const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst, NetworkOnly } = require("workbox-strategies");
const { registerRoute, setDefaultHandler } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");
// import {setDefaultHandler} from 'workbox-routing';
// import {NetworkOnly} from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === "navigate", pageCache);

// TODO: Implement asset caching
setDefaultHandler(new NetworkOnly());

offlineFallback();
registerRoute();
