const express = require('express');
const app = express();
app.use(express.json());

const server = require('http').createServer(app);

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server:server });

const CronJob = require('cron').CronJob;

const FS = require('./db');
const compareDateCron = require('./utils');

app.get('/getSchedule', async (req, res) => {
    const data = await FS.getSchedule(req.query.id);
    res.status(200).json(data);
});

app.get('/manualFeed', async (req, res) => {
    res.status(501).send('Not implemented yet!');
});

app.get('/getHistory', async (req, res) => {
    const data = await FS.getHistory(req.query.id);
    res.status(200).json(data);
});

app.post('/addSchedule', async (req, res) => {
    try {
        await FS.insertSchedule(req.body.id, req.body.name, req.body.cron, req.body.op);
        res.status(200).json({message: "Ok"});
    } catch (e) {
        res.status(400).json({
            message: "Bad request",
            error: String(e)
        });
    }
});

app.post('/updateSchedule', async (req, res) => {
    try {
        await FS.updateSchedule(req.body.id, req.body.schId, req.body.name, req.body.cron, req.body.op);
        res.status(200).json({message: "Ok"});
    } catch (e) {
        res.status(400).json({
            message: "Bad request",
            error: String(e)
        });
    }
}); 

app.delete('/deleteSchedule', async (req, res) => {
    try {
        await FS.deleteSchedule(req.body.id, req.body.schId);
        res.status(200).json({message: "Ok"});
    } catch (e) {
        res.status(400).json({
            message: "Bad request",
            error: String(e)
        });
    }
});

wss.on('connection', function connection(ws, req) {
    ws.id = req.url.split('=')[1];
    console.log(`New device connected! - ${ws.id}`);
    
    const ping = new CronJob('*/15 * * * * *', async () => {
        const data = await FS.getSchedule(ws.id);
        data.forEach(e => {
            if(compareDateCron) ws.send(e.operation);
            console.log(e);
        })
        
    });
    ping.start();
  
    ws.on('message', async function incoming(message) {
        await FS.createLog(ws.id, message);
        console.log(`New log! - ${ws.id} - ${message}`);
    });
  });

module.exports = server;
