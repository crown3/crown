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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "ee517238796fbcdc03def8deb7e9d0ba"
  },
  {
    "url": "assets/css/2.styles.589380f8.css",
    "revision": "1e9cb367eeac8acd7c8fe8c1fb326a9f"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/0.7128c6a3.js",
    "revision": "0a0daf82509007a52574585268b53d89"
  },
  {
    "url": "assets/js/1.e3b1740d.js",
    "revision": "b041e69385470d7c6717039767fefc35"
  },
  {
    "url": "assets/js/app.68c6d94d.js",
    "revision": "7110192a52370057532372d74ea1b3e8"
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
    "revision": "ab4bd4939a46f2827d43afb690987d8a"
  },
  {
    "url": "zh/index.html",
    "revision": "0b26171f822c5cd7d749271569b01923"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
