const fs = require('../db/db');

class Feeding {
    async list(req, res) {
        let err;
        try {
            const data = req.query.id ? await fs.getDoc(`users/${req.query.user}/feeding/${req.query.id}`) : await fs.getCollection(`users/${req.query.user}/feeding`);
            res.status(200).json(data);
        } catch (e) {
            err = e;
            res.status(500).json({
                message: String(e)
            });
        } finally {
            await fs.createDoc('log', {
                url: req.url,
                body: req.query,
                datetime: new Date(),
                message: err ? String(err) : "Okay"
            });
        }
    }

    async create(req, res) {
        let err;
        try {
            const obj = JSON.parse(JSON.stringify(req.body));
            delete obj.user;
            await fs.createDoc(`users/${req.body.user}/feeding`, obj);
            res.status(200).json({message: "Created!"});
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

    async update(req, res) {
        let err;
        try {
            const obj = JSON.parse(JSON.stringify(req.body));
            delete obj.user;
            await fs.createDoc(`users/${req.body.user}/feeding/${req.body.id}`, obj);
            res.status(200).json({message: "Updated!"});
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

    async delete() {
        let err;
        try {
            await fs.deleteDoc(`users/${req.body.user}/feeding/${req.body.id}`);
            res.status(200).json({message: "Deleted!"});
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

module.exports = new Feeding();