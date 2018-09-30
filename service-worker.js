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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.2/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "ad19e05d41f4f9eb3ec489eb07228498"
  },
  {
    "url": "about/index.html",
    "revision": "c7bc0144bcd0fd799f084fca5e853e70"
  },
  {
    "url": "assets/css/1.styles.f0641d8e.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/css/2.styles.ae1866e6.css",
    "revision": "df7c35ec8029dbbde0735a45f875eaf7"
  },
  {
    "url": "assets/css/styles.ae6b6c51.css",
    "revision": "30812960dede2f9bd14000f6b54f1ce8"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.f0641d8e.js",
    "revision": "bcda428e0360427cccd2a111d33e25f5"
  },
  {
    "url": "assets/js/10.5d1934db.js",
    "revision": "9370c2afe06600786dd1cc04d2dd3fa9"
  },
  {
    "url": "assets/js/11.592bbfdc.js",
    "revision": "f2dcd82ba9d0dd68ec3469b0504b547c"
  },
  {
    "url": "assets/js/12.2772e431.js",
    "revision": "acf98b060acd7300d2f04fbedf2abd30"
  },
  {
    "url": "assets/js/2.ae1866e6.js",
    "revision": "bd178522a6dcd7f7c48b251f1f9fd884"
  },
  {
    "url": "assets/js/3.9a9aa7f1.js",
    "revision": "8a8b6f045c3e8c8f06055383a099cb86"
  },
  {
    "url": "assets/js/4.2227d984.js",
    "revision": "b2db60231c51a14ea37d04db462c9830"
  },
  {
    "url": "assets/js/5.dee3f396.js",
    "revision": "2f9edd6d5911df6a43779075dbcd9505"
  },
  {
    "url": "assets/js/6.1d0ef145.js",
    "revision": "d06e9292c2afb43cfefd1c4f107d0091"
  },
  {
    "url": "assets/js/7.20578ccd.js",
    "revision": "20ee2b942eb78b53eb57b280c9edd7fc"
  },
  {
    "url": "assets/js/8.f8ee9c81.js",
    "revision": "68c0cf334fcc99ba52484f692237de98"
  },
  {
    "url": "assets/js/9.29b457e1.js",
    "revision": "6aefd183397ac8efb821ef792d2d43e4"
  },
  {
    "url": "assets/js/app.ae6b6c51.js",
    "revision": "6fdf395ef5a25b9f6746b75ec5cb8295"
  },
  {
    "url": "changelog/index.html",
    "revision": "247d19f86714ec4be642bb6f4106932a"
  },
  {
    "url": "code/index.html",
    "revision": "03ea78ca71e4f50ee853d3d874d8c019"
  },
  {
    "url": "guide/index.html",
    "revision": "b83817fd3559d441662a04dd5212e2b1"
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
    "revision": "d813511cbceb420ff2a312c98d603aa6"
  },
  {
    "url": "zh/about/index.html",
    "revision": "61b5260e3b3441fbbf7ad396fc30e22b"
  },
  {
    "url": "zh/changelog/index.html",
    "revision": "07899dad41a4cffaabe2dc6e2cc83a2f"
  },
  {
    "url": "zh/code/index.html",
    "revision": "c0181292b9ac547982bde0517eb8254d"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "a54a80dcdbaf90f7cdda0e9317170e7b"
  },
  {
    "url": "zh/index.html",
    "revision": "0fcdec87e4457aac8c1672a6695802e4"
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
