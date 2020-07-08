#!/usr/bin/env node
import fs from 'fs';
import dotenv from 'dotenv';
import * as admin from 'firebase-admin';

import * as serviceAccount from '../../service-account.json';
import { SeedStory, generateSeed } from './seed';
import { Entities, Appointment } from '../types';

dotenv.config();

try {
    const localDotEnv = dotenv.parse(fs.readFileSync('.env.local'));
    for (const k in localDotEnv) {
        process.env[k] = localDotEnv[k];
    }
} catch (error) {}

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
});

const db = app.firestore();

if (process.env.REACT_APP_LOCAL) {
    db.settings({
        host: 'localhost:5002',
        ssl: false,
    });
}

const storiesColRef = db.collection(Entities.stories);
const appointmentsColGroupRef = db.collectionGroup(Entities.appointments);

const addAppointment = (
    seed: Appointment,
    storyRef: FirebaseFirestore.DocumentReference,
    transaction: FirebaseFirestore.Transaction,
) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { $key, $path, ...appointment } = seed;
    const appointmentDocRef = storyRef.collection(Entities.appointments).doc();

    transaction.create(appointmentDocRef, appointment);
};

const addStory = (seed: SeedStory, transaction: FirebaseFirestore.Transaction) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { appointments, $key, $path, ...story } = seed;
    const storyDocRef = storiesColRef.doc();

    transaction.create(storyDocRef, story);

    appointments.forEach((appointment) => addAppointment(appointment, storyDocRef, transaction));
};

const clearDatabase = async (transaction: FirebaseFirestore.Transaction) => {
    const storiesSnapshot = await transaction.get(storiesColRef);
    const appointmentsSnapshot = await transaction.get(appointmentsColGroupRef);

    if (storiesSnapshot.docs.length > 0) {
        storiesSnapshot.docs.forEach((doc) => transaction.delete(doc.ref));
    }

    if (appointmentsSnapshot.docs.length > 0) {
        appointmentsSnapshot.docs.forEach((doc) => transaction.delete(doc.ref));
    }

    return;
};

db.runTransaction(async (transaction) => {
    return clearDatabase(transaction).then(() => {
        Array.from({ length: 20 }).forEach(() => addStory(generateSeed(), transaction));
    });
});
