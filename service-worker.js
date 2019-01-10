/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "b7cd315281e8add57eab6c513ee7e9cf"
  },
  {
    "url": "about/index.html",
    "revision": "79e4b70dade7ea515669d95757a64b33"
  },
  {
    "url": "assets/css/0.styles.93a375f5.css",
    "revision": "2ffb460b30293e46681424992feb6fe9"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.68040249.js",
    "revision": "1915a5da1fb1afbdf2288b82f9568db4"
  },
  {
    "url": "assets/js/11.6700061c.js",
    "revision": "ad7f014b775d5d1b576d8957bb8be655"
  },
  {
    "url": "assets/js/12.57c09601.js",
    "revision": "47ae557baaaac90f7bcc4f72624a9273"
  },
  {
    "url": "assets/js/13.504084f5.js",
    "revision": "b89b2adfe5fa3bad90bf2dfc1d23f860"
  },
  {
    "url": "assets/js/2.d28e8f4a.js",
    "revision": "8ace7a35283a23e64ae96240f5f46cfb"
  },
  {
    "url": "assets/js/3.075cd7a7.js",
    "revision": "0d10de7964a086623c046f4af53f81ff"
  },
  {
    "url": "assets/js/4.b31d9669.js",
    "revision": "ece409040512dabd89b6915afa89379a"
  },
  {
    "url": "assets/js/5.c59c052e.js",
    "revision": "b2d1ef17bf8aa1f39efe3491fd55e96c"
  },
  {
    "url": "assets/js/6.c0e444d8.js",
    "revision": "bca350a0a2a7b6400958120ffaee7fe5"
  },
  {
    "url": "assets/js/7.9b7d567e.js",
    "revision": "745cca652a8ecf03d4ba7999b80f26fb"
  },
  {
    "url": "assets/js/8.c1f5a099.js",
    "revision": "611af3fb3d6395dd9ff76dc0046f6e63"
  },
  {
    "url": "assets/js/9.03120c31.js",
    "revision": "e692e67803f2d7d3ca4d2e1bf6b56a0e"
  },
  {
    "url": "assets/js/app.3d4c17af.js",
    "revision": "75bf4c31f3591b167c249f7cfe592f13"
  },
  {
    "url": "changelog/index.html",
    "revision": "c3738c258a9f9469fadbf59c3652f01c"
  },
  {
    "url": "code/index.html",
    "revision": "61c655f087299f1ed4de6037d8f221c6"
  },
  {
    "url": "guide/index.html",
    "revision": "43cc55e13ac5d7bc5cad6ece38b5c3f8"
  },
  {
    "url": "img/chrome-icon.png",
    "revision": "d8cce0decd8c1642f5fa4ca643e9a9a3"
  },
  {
    "url": "img/crown.png",
    "revision": "a894ae1dbdad44b0f09404f9bae42518"
  },
  {
    "url": "img/crown.svg",
    "revision": "d25987c68a10e63552ec46b5f13a7455"
  },
  {
    "url": "img/Github.png",
    "revision": "a677a89ffec222b71d64aea8ecce5011"
  },
  {
    "url": "index.html",
    "revision": "03985174e365653c01a41756cbda683f"
  },
  {
    "url": "zh/about/index.html",
    "revision": "edc2b39ee74b69067b9d13d0ea3dd82a"
  },
  {
    "url": "zh/changelog/index.html",
    "revision": "22c99cfda58d82b01eb77cba08ff82b8"
  },
  {
    "url": "zh/code/index.html",
    "revision": "fe131aa947b403d5d7629f392df6b1f5"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "638e80d938e94921028b557de387e579"
  },
  {
    "url": "zh/index.html",
    "revision": "857a82da94130f4b45eaf61493e64455"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
