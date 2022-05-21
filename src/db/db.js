const admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require("../../googleServices.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

class Firestore {
    constructor() {
        this.db = getFirestore();
    }

    async getDoc(path) {
        const docRef = this.db.doc(path);
        const data = await docRef.get();
        return data.data();
    }

    async getCollection(path) {
        const docRef = this.db.collection(path);
        const snap = await docRef.get();
        const data = [];
        snap.forEach(e => data.push(e.data()));
        return data;
    }

    async createDoc(path, doc) {
        const docRef = this.db.collection(path);
        await docRef.add(doc);
    }

    async updateDoc(path, doc) {
        const docRef = this.db.collection(path);
        await docRef.update(doc);
    }

    async deleteDoc(path) {
        const docRef = this.db.collection(path);
        await docRef.delete();
    }
}

module.exports = new Firestore();