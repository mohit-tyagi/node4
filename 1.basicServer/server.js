'use strict';

const http = require('http');

http
    .createServer((req, res)=> {
        console.log('Here');
        res.writeHead(200, {'contant-type' : 'text/html'});
        res.end('<h1>hello</h1>');
    })
    .listen(3000, ()=>{console.log('server running on port 3000!')});