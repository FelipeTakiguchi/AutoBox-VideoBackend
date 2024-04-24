const express = require('express');
const cors = require('cors');
const http = require('http');
const url = require('url');
const fs = require('fs');

const htmlPort = 6749;
const htmlServer = http.createServer((req, res) => {
    const pathname = url.parse(req.url, true).pathname;

    if (pathname === '/') {
        fs.readFile("./index.html", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (pathname === '/car.glb') {
        fs.readFile("./car.glb", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading car.glb');
            } else {
                res.writeHead(200, { 'Content-Type': 'model/gltf-binary' });
                res.end(data);
            }
        });
    } else {
        const pathSegment = pathname.substr(1);

        fs.readFile("./index.html", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
            } else {
                const htmlContent = data.toString().replace('{{pathVariable}}', pathSegment);

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(htmlContent);
            }
        });
    }
});

htmlServer.listen(htmlPort, () => {
    console.log(`Server is running at http://localhost:${htmlPort}/`);
});

module.exports = htmlServer;