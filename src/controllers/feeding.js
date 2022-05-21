const fs = require('../db/db');

class Feeding {
    async list(req, res) {
        try {
            const data = req.body.id ? await fs.getDoc(`users/${req.body.user}/${req.body.id}`) : await fs.getCollection(`users/${req.body.user}`);
            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({
                message: String(e)
            });
        }
    }

    async create(req, res) {
        try {
            const obj = JSON.parse(JSON.stringify(req.body));
            delete obj.user;
            await fs.createDoc(`users/${req.body.user}`, obj);
            res.status(200).json({message: "Created!"});
        } catch (e) {
            res.status(500).json({
                message: String(e)
            });
        }
    }

    async update(req, res) {
        try {
            const obj = JSON.parse(JSON.stringify(req.body));
            delete obj.user;
            await fs.createDoc(`users/${req.body.user}/${req.body.id}`, obj);
            res.status(200).json({message: "Updated!"});
        } catch (e) {
            res.status(500).json({
                message: String(e)
            });
        }
    }

    async delete() {
        try {
            await fs.deleteDoc(`users/${req.body.user}/${req.body.id}`);
            res.status(200).json({message: "Deleted!"});
        } catch (e) {
            res.status(500).json({
                message: String(e)
            });
        }
    }
}

module.exports = new Feeding();