const admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require("./../googleServices.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

class Firestore {
    constructor() {
        this.db = getFirestore();
    }

    async getSchedule(device) {
        const docRef = this.db.collection('devices').doc(device).collection('schedule');
        const snap = await docRef.get();

        const result = [];
        snap.forEach(e => result.push(e.data()));

        return result;
    }

    async getHistory(device) {
        const docRef = this.db.collection('devices').doc(device).collection('logs');
        const snap = await docRef.get();

        const result = [];
        snap.forEach(e => result.push(e.data()));

        return result;
    }

    async createLog(device, log) {
        const docRef = this.db.collection('devices').doc(device).collection('logs');
        await docRef.add({
            message: log
        });
    }

    async insertSchedule(device, name, cron, operation) {
        const docRef = this.db.collection('devices').doc(device).collection('schedule');
        await docRef.add({
            title: name,
            time: cron,
            operation: operation
        });
    }

    async updateSchedule(device, id, name, cron, operation) {
        const docRef = this.db.collection('devices').doc(device).collection('schedule').doc(id);
        await docRef.set({
            title: name,
            time: cron,
            operation: operation
        });
    }

    async deleteSchedule(device, id) {
        const docRef = this.db.collection('devices').doc(device).collection('schedule').doc(id);
        await docRef.delete();
    }

    getDB() {
        return this.db;
    }

}

module.exports = new Firestore();