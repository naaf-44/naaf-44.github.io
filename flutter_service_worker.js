'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "954787e80f74095b83fe82e375eb4aa2",
"assets/AssetManifest.bin.json": "c07331fc295e5b735ab6ece792e72a03",
"assets/AssetManifest.json": "7ade883b8a9116882d96070dff61042a",
"assets/assets/fonts/cinzel/Cinzel-Regular.ttf": "36e3287473aad3878156ae4983ffb79a",
"assets/assets/fonts/merriweather/Merriweather-Bold.ttf": "79ea53fed59f391498dfc6f2fbea97c2",
"assets/assets/fonts/philosopher/Philosopher-Regular.ttf": "adecfc2c94249849655f0af9e7972c22",
"assets/assets/images/contact/email.svg": "f4aa6d560b9974823a486e4f404fbdfb",
"assets/assets/images/contact/github.svg": "c23a95fcb4b1d25765107e4e73b06438",
"assets/assets/images/contact/indeed.svg": "c9d5aec4f32c87be54107d4c46ba9bc0",
"assets/assets/images/contact/instagram.svg": "abfe70361d37471fb39f7967cc33ed16",
"assets/assets/images/contact/linkedin.svg": "05a86a0c4dfa89a3370294d478045963",
"assets/assets/images/contact/mobile.svg": "667af6129bb0be1658d8ccd3e62010dd",
"assets/assets/images/contact/naukri.svg": "ed90e83e8c2aab9cb49f874a76aa467f",
"assets/assets/images/contact/whatsapp.svg": "b39ff32cdcba88c8cd3131aeafb87778",
"assets/assets/images/profile.png": "b20945929bc7cb86166e8312e0e363bb",
"assets/assets/images/skill/android.svg": "0a06bbe3de0a2033f060fdf641cfca77",
"assets/assets/images/skill/apple.svg": "702a44203a4506f1b3ca73126b7cc51f",
"assets/assets/images/skill/aws.svg": "e626e0ffb032a2f6fbef879e5548a767",
"assets/assets/images/skill/firebase.svg": "7f1bf2795e067daf4ac3b42a2a140496",
"assets/assets/images/skill/flutter.svg": "749737f954a8acaae1b3d389b3fc857f",
"assets/assets/images/skill/git.svg": "f26802b8dbef596268dd36546a50a0b0",
"assets/assets/images/skill/iot.svg": "4b7d3bba16dddc70cdd51649425af912",
"assets/assets/images/skill/java.svg": "2ae4636a86ab462bdd844e0bfd2835f5",
"assets/assets/images/skill/playstore.svg": "bd8f2843df647e82df054df459b65bb1",
"assets/FontManifest.json": "8f393169ea48d00e4d9a2d1be26319b6",
"assets/fonts/MaterialIcons-Regular.otf": "83cad8a623ea1f4c9b07191b65bcdb7a",
"assets/NOTICES": "5e6cb7589893f820d66c9263b6c84417",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "241b05a91d9568f5760b964387178c3a",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"flutter_bootstrap.js": "f818e8358736e1bf174f72e4be35ff1f",
"icons/Icon-192.png": "cc4f3da4f2fa62617622c671814a2640",
"icons/Icon-512.png": "9284c7c5c1f1dfefcfa6c90512bc9624",
"icons/Icon-maskable-192.png": "cc4f3da4f2fa62617622c671814a2640",
"icons/Icon-maskable-512.png": "9284c7c5c1f1dfefcfa6c90512bc9624",
"index.html": "5cc201e5a13d538d0841d70f429cd47c",
"/": "5cc201e5a13d538d0841d70f429cd47c",
"main.dart.js": "6fec7239c05ce8899a79382a5cf1bb06",
"manifest.json": "d8fe34f7ae4c072a77b924e01dac8a50",
"version.json": "9b818ca9511483c901bed1545384376c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
