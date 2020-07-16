
importScripts('/js/sw-utils.js');


const SHELL_CACHE     = 'shell-v1.1';
const INMUTABLE_CACHE = 'inmutable-v1.1';
const DYNAMIC_CACHE   = 'dynamic-v1.1';

const APP_SHELL   = ['/',
                     '/js/app.js',
                     '/index.html',
                     '/css/style.css',
                     '/img/avatars/hulk.jpg',
                     '/img/avatars/ironman.jpg',
                     '/img/avatars/spiderman.jpg',
                     '/img/avatars/thor.jpg',
                     '/img/avatars/wolverine.jpg',
                     '/img/favicon.ico',
                     '/js/sw-utils.js'
                    ];
const APP_INMUTABLE = ['/css/animate.css',
                       '/js/libs/jquery.js',
                       'https://fonts.googleapis.com/css?family=Quicksand:300,400',
	                   'https://fonts.googleapis.com/css?family=Lato:400,300',
	                   'https://use.fontawesome.com/releases/v5.3.1/css/all.css'];


self.addEventListener('install', event =>{
    const shellInstall = caches.open(SHELL_CACHE).then(cache => {
                         cache.addAll(APP_SHELL);
                        } );
     const inmutableInstall = caches.open(INMUTABLE_CACHE).then(cache => {
                         cache.addAll(APP_INMUTABLE);
                        } );

    event.waitUntil(Promise.all( [shellInstall, inmutableInstall]));
});

self.addEventListener('activate', event =>{
          
    const respActivate = caches.keys().then( keys =>{
               keys.forEach(key => { 
                 if(/(:?shell)/i.test(key) && key !== SHELL_CACHE ){
                                caches.delete(key);
                                    }
                 else if(/(:?inmutable)/i.test(key) && key !== INMUTABLE_CACHE){
                                caches.delete(key);
                                    }
                 else if(/(:?dynamic)/i.test(key) && key !== DYNAMIC_CACHE){
                                caches.delete(key);  
                                    }
                            } );
                      });
                event.waitUntil( respActivate );
          } );

self.addEventListener('fetch', event => {

  const resp = caches.match( event.request).then( cacheResp =>{
                                                   return saveCache(event.request,DYNAMIC_CACHE,cacheResp);                 
                                                 } );
          event.respondWith( resp );
    } );
