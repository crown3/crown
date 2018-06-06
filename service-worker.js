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
    "revision": "2a86bb1d4579f0227f56adb911cef9f7"
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
    "url": "assets/js/0.21614f5f.js",
    "revision": "b95cdf15cc5675b02052b3811ddb0d03"
  },
  {
    "url": "assets/js/1.25a7834d.js",
    "revision": "16ac090a4344cd553ba099d4dc68f495"
  },
  {
    "url": "assets/js/app.d419bac0.js",
    "revision": "00f956f70d9be78be96f2fe96e7ca50b"
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
    "revision": "572c1e6e3b6e130c53eb921e5ab7726b"
  },
  {
    "url": "zh/index.html",
    "revision": "d12912a4988fbaee0344aed05c3677e0"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
