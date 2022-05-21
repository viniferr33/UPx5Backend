const express = require('express');
const app = express();
app.use(express.json());

const routes = require('./routes');
app.use(routes);

const server = require('http').createServer(app);

module.exports = server;
