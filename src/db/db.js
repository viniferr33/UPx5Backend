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
        const docRef = this.parsePath(path);
        const data = await docRef.get();
        return data.data();
    }

    async getCollection(path) {
        const docRef = this.parsePath(path);
        const snap = await docRef.get();
        const data = [];
        snap.forEach(e => data.push(Object.assign({ id: e.id }, e.data())));
        return data;
    }

    async createDoc(path, doc) {
        const docRef = this.parsePath(path);
        await docRef.add(doc);
    }

    async updateDoc(path, doc) {
        const docRef = this.parsePath(path);
        await docRef.update(doc);
    }

    async deleteDoc(path) {
        const docRef = this.parsePath(path);
        await docRef.delete();
    }

    parsePath(path) {
        let docRef = this.db;
        const pathSplitted = path.split('/');
        for(let i in pathSplitted) {
            if(i % 2 === 0) {
                docRef = docRef.collection(pathSplitted[i]);
            } else {
                docRef = docRef.doc(pathSplitted[i]);
            }
        }
        return docRef;
    }
}

module.exports = new Firestore();