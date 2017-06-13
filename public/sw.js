/**
 * Lors de l'installation du service worker,
 * on met en cache la page d'accueil et le formulaire pour pouvoir les afficher en hors-ligne
 */
this.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('v1')
      .then(cache => cache.addAll(['/', '/form']))
  );
});

/**
 * On intercepte tous les appels HTTP :
 * Si la requête correspond à une ressource déjà dans le cache, on la retourne directement
 * Sinon on effectue la requête HTTP et on ajoute ensuite dans le cache le résultat avant de le retourner
 */
this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .catch(() => fetch(event.request))

      .then(response => {
        caches.open('v1')
          .then(cache => cache.put(event.request, response));
        
        return response.clone();
      })
  );
});

