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
    "revision": "37ca0ad1e9753e4fd3bcfe41498e8d85"
  },
  {
    "url": "about/index.html",
    "revision": "6b0284bfcf7220f45bcd593f466b2f47"
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
    "url": "assets/js/app.a9a92fd0.js",
    "revision": "55d6c280642f41a89e1b422a086c5f0c"
  },
  {
    "url": "changelog/index.html",
    "revision": "44a5ed9d5e5af6ba07ce86e10e0d0ab1"
  },
  {
    "url": "code/index.html",
    "revision": "05490fd93a7e65efc01e5719d038cba9"
  },
  {
    "url": "guide/index.html",
    "revision": "1f5402c98d653b131e0b5e7877f422c1"
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
    "revision": "f372d5b79233d1b01b4caf0e7c9cfb36"
  },
  {
    "url": "zh/about/index.html",
    "revision": "a58d0f101a083df7ea20d306de4fbd03"
  },
  {
    "url": "zh/changelog/index.html",
    "revision": "43f9723a5ceab9ba2dd07a40404480c6"
  },
  {
    "url": "zh/code/index.html",
    "revision": "503e95168d657245ce77bcc84c3c2bc7"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "a3ac189878711c99035d6868592ae4bf"
  },
  {
    "url": "zh/index.html",
    "revision": "c4c7e38aabf5762710fbb460ae28d781"
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
