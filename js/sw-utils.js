
 function saveCache(req,cache_name,cacheResp) {

     if(cacheResp){ return cacheResp; }
     else { const fetchResp = fetch( req ).then( newResp => {
            if (newResp){
                    caches.open(cache_name).then( cache =>{ 
                                cache.put(req, newResp ); 
//                              return newResp.clone();
                         }) ; 
                            return newResp.clone();
                        }             
            else {
                    caches.open(cache_name).then( cache =>{ 
                    cache.put(event.request, '/offline.html' ); 
                    return '/offline.html';
                    } );
                 } 
            } ); 
        return fetchResp; } 
    }