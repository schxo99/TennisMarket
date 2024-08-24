let server = require('./server');
let router= require('./router');
let requestHandler = require('./requestHandler');
const mariadb = require('./database/connect/mariadb');
server.start(router.route, requestHandler.handle);