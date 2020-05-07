import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { collection, doc } from 'rxfire/firestore';

import config from './firestore.config';
import { Entities } from '../types';

const app = firebase.initializeApp(config);

export const db = app.firestore();

export function snapToData(snapshot: firebase.firestore.DocumentSnapshot): {} {
    return {
        ...snapshot.data(),
        $key: snapshot.ref.path,
    };
}

export const list = <T>(entity: Entities): Observable<T[]> => {
    return collection(db.collection(entity)).pipe(map((docs) => docs.map((doc) => snapToData(doc) as T)));
};

export const listAll = <T extends { $key: string }>(entity: Entities): Observable<T[]> => {
    return collection(db.collectionGroup(entity)).pipe(map((docs) => docs.map((doc) => snapToData(doc) as T)));
};

export const get = <T>(entity: Entities, $key: string): Observable<T> => {
    return doc(db.doc($key)).pipe(map((doc) => snapToData(doc) as T));
};

export const update = async <T>(entity: Entities, $key: string, data: T): Promise<void> => {
    const docRef = db.doc($key);

    await docRef.update({ ...data, $key: null });

    return;
};

export const add = async <T>(entity: Entities, data: T): Promise<void> => {
    const collectionRef = db.collection(entity);

    await collectionRef.add(data);

    return;
};
