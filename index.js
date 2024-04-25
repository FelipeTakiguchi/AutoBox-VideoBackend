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
                console.log('Error loading index.html');
                console.log(err);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
                console.log('Accepted a request without parameters');
            }
        });
    } else if (pathname === '/car.glb') {
        fs.readFile("./car.glb", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading car.glb');
                console.log('Error loading vehicle');
                console.log(err);
            } else {
                res.writeHead(200, { 'Content-Type': 'model/gltf-binary' });
                res.end(data);
                console.log('Accepted a request');
            }
        });
    } else {
        const pathSegment = pathname.substr(1);

        fs.readFile("./index.html", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
                console.log('Error loading and car not found');
                console.log(err);
            } else {
                const htmlContent = data.toString().replace('{{pathVariable}}', pathSegment);

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(htmlContent);
                console.log('Accepted request and car not found');
            }
        });
    }
});

htmlServer.listen(htmlPort, () => {
    console.log(`Server is running at http://localhost:${htmlPort}/`);
});

module.exports = htmlServer;