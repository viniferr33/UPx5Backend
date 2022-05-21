const CronJob = require('cron').CronJob;

// wss.on('connection', function connection(ws, req) {
//     ws.id = req.url.split('=')[1];
//     console.log(`New device connected! - ${ws.id}`);
    
//     const ping = new CronJob('*/15 * * * * *', async () => {
//         const data = await FS.getSchedule(ws.id);
//         data.forEach(e => {
//             if(compareDateCron) ws.send(e.operation);
//             console.log(e);
//         })
        
//     });
//     ping.start();
  
//     ws.on('message', async function incoming(message) {
//         await FS.createLog(ws.id, message);
//         console.log(`New log! - ${ws.id} - ${message}`);
//     });
//   });

module.exports = (ws, req) => {

};