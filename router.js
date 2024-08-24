function route(pathname, handle, res, productId){
    console.log('1. pathname' + pathname);
    if (typeof handle[pathname] == 'function'){
        handle[pathname](res, productId);
    } else {
        res.writeHead(404, {'Content-Type':'text/html'});
        res.write('Not Found');
        res.end();
    }
    
}    

exports.route = route;