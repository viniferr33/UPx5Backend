const fs = require('../db/db');

class Dashboard {
    async get(req, res) {
        let err;
        try {
            // const data = await fs.getCollection(`feeding/${req.body.user}`);
            const data = {
                feedingSuccess: 4,
                next: [
                    { id: 'y41g2ua222', time: '22:00 SUN', operation: 'feed', mealSize: 'Large', title: 'Janta'},
                    { id: 'hasuihifui', time: '09:00 MON', operation: 'feed', mealSize: 'Large', title: 'Café'},
                    { id: '4a5sf4a5a1', time: '14:00 MON', operation: 'feed', mealSize: 'Large', title: 'Almoço'},
                    { id: 'a545fa1322', time: '22:00 MON', operation: 'feed', mealSize: 'Large', title: 'Janta'}
                ],
                hist: [
                    { id: 'y41g2ua222', time: '22:00 SUN', operation: 'feed', mealSize: 'Large', title: 'Janta', status: 'Success!'},
                    { id: 'hasuihifui', time: '09:00 MON', operation: 'feed', mealSize: 'Large', title: 'Café',  status: 'Error! The recipient was full!'},
                    { id: '4a5sf4a5a1', time: '14:00 MON', operation: 'feed', mealSize: 'Large', title: 'Almoço', status: 'Success!'},
                    { id: 'a545fa1322', time: '22:00 MON', operation: 'feed', mealSize: 'Large', title: 'Janta', status: 'Success!'}
                ],
                weightHist: [
                    277.00, 500.00, 500.00, 421.00, 402.00
                ]
            }
            res.status(200).json(data);
        } catch (e) {
            err = e;
            res.status(500).json({
                message: String(e)
            });
        } finally {
            await fs.createDoc('log', {
                url: req.url,
                body: req.body,
                datetime: new Date(),
                message: err ? String(err) : "Okay"
            });
        }
    }
}

module.exports = new Dashboard();