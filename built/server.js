"use strict";
const fs = require('fs');
const http = require('http');
const https = require('https');
const cluster = require('cluster');
const express = require('express');
const bodyParser = require('body-parser');
const gm = require('gm');
const config_1 = require('./config');
const app = express();
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'false'
    });
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
app.get('/', (req, res) => {
    res.send('Misskeyにアップロードされたファイルを保管・配信するサーバーです。https://misskey.xyz');
});
app.get('*', (req, res) => {
    const path = decodeURI(req.path);
    let g = null;
    if (path.indexOf('..') !== -1) {
        return res.status(400).send('invalid path');
    }
    if (req.query.download !== undefined) {
        res.header('Content-Disposition', 'attachment');
        res.sendFile(`${config_1.default.storagePath}/${path}`);
        return;
    }
    if (req.query.thumbnail !== undefined) {
        gm(`${config_1.default.storagePath}/${path}`)
            .resize(150, 150)
            .compress('jpeg')
            .quality('80')
            .toBuffer('jpeg', (genThumbnailErr, thumbnail) => {
            res.header('Content-Type', 'image/jpeg');
            res.send(thumbnail);
        });
        return;
    }
    if (req.query.size !== undefined) {
        if (g === null) {
            g = gm(`${config_1.default.storagePath}/${path}`);
        }
        g = g.resize(req.query.size, req.query.size);
    }
    if (req.query.quality !== undefined) {
        if (g === null) {
            g = gm(`${config_1.default.storagePath}/${path}`);
        }
        g = g.compress('jpeg')
            .quality(req.query.quality);
    }
    if (g !== null) {
        g.toBuffer('jpeg', (err, img) => {
            if (err !== undefined && err !== null) {
                console.error(err);
                res.status(500).send(err);
                return;
            }
            res.header('Content-Type', 'image/jpeg');
            res.send(img);
        });
    }
    else {
        res.sendFile(`${config_1.default.storagePath}/${path}`);
    }
});
let server;
let port;
if (config_1.default.https.enable) {
    port = config_1.default.port.https;
    server = https.createServer({
        key: fs.readFileSync(config_1.default.https.keyPath),
        cert: fs.readFileSync(config_1.default.https.certPath)
    }, app);
    http.createServer((req, res) => {
        res.writeHead(301, {
            Location: config_1.default.url + req.url
        });
        res.end();
    }).listen(config_1.default.port.http);
}
else {
    port = config_1.default.port.http;
    server = http.createServer(app);
}
server.listen(port, () => {
    const listenhost = server.address().address;
    const listenport = server.address().port;
    console.log(`\u001b[1;32m${cluster.worker.id} is now listening at ${listenhost}:${listenport}\u001b[0m`);
});
