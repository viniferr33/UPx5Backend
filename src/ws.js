const CronJob = require('cron').CronJob;
const fs = require('./db/db');

function checkFrequency(freq) {
    const today = new Date();
    const now = `${today.getHours()}:${today.getMinutes()}`;
    
    const weekdays = JSON.parse(JSON.stringify(freq));
    delete weekdays.time;

    return freq[Object.keys(weekdays)[today.getDay()]] && now === freq.time;
}

module.exports = async (ws, req) => {
    ws.id = req.url.split('=')[1];
    await fs.createDoc('ws', {
        url: req.url,
        datetime: new Date(),
        message: "Connected"
    });

    const ping = new CronJob('* */1 * * * *', async () => {
        const data = await fs.getCollection(`users/${ws.id}/feeding`);
        data.forEach(e => {
            if(checkFrequency(e.frequency)) ws.send(JSON.stringify({
                id: e.id,
                operation: `${e.operation}:${e.mealSize}`
            }));
        });
    });
    ping.start();

    ws.on('message', async (message) => {
        await fs.createDoc(`users/${ws.id}/device`, JSON.parse(message));
    });
};