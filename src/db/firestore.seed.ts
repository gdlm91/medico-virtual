#!/usr/bin/env node
import * as admin from 'firebase-admin';

import config from './firestore.config';
import * as serviceAccount from '../../service-account.json';
import { SeedStory, seedStory1, seedStory2 } from './seed';
import { Entities, Appointment } from '../types';

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    ...config,
});

const db = app.firestore();

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
        addStory(seedStory1, transaction);
        addStory(seedStory2, transaction);
    });
});
