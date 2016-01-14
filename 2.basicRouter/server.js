'use strict';

const http = require('http');
const url = require('url');
const qs = require('querystring');

let routes = {
    'GET' : {
        '/' : (req, res) => {
            res.writeHead(200, {'contant-type' : 'text/html'});
            res.end('<h1>hello</h1>');
        },
        '/about' : (req, res) => {
            res.writeHead(200, {'contant-type' : 'text/html'});
            res.end('This is to understand routing in nodejs.');
        }
    },
    'POST' : {
        '/api/login' : (req, res) => {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
                // check body.length ot restrict request data size
            });
            req.on('end', () => {
                let params = qs.parse(body);
                console.log('>>>>>>>>>>>>>>>>>>', params);
                res.end('done');
            });
        }

    },
    'NA' : (req, res) => {
        res.writeHead(400);
        res.end('Content not found !');
    }
};

http
    .createServer((req, res)=> {
        let baseUrl = url.parse(req.url, true);
        let resolveRoute = routes[req.method][baseUrl.pathname];
        if(resolveRoute){
            resolveRoute(req, res);
        }else{
            routes['NA'](req, res);
        }

    })
    .listen(3000, ()=>{console.log('server running on port 3000!')});