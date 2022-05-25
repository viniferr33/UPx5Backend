const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}));

const routes = require('./routes');
app.use(routes);

const server = require('http').createServer(app);

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server:server });
wss.on('connection', require('./ws'));


module.exports = server;
