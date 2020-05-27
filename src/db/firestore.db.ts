import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { collection, doc } from 'rxfire/firestore';

import config from './firestore.config';

const app = firebase.initializeApp(config);

export const db = app.firestore();

export function snapToData(snapshot: firebase.firestore.DocumentSnapshot): {} {
    return {
        ...snapshot.data(),
        $key: snapshot.id,
        $path: snapshot.ref.path,
    };
}

export const list = <T>(path: string): Observable<T[]> => {
    return collection(db.collection(path)).pipe(map((docs) => docs.map((doc) => snapToData(doc) as T)));
};

export const listAll = <T>(path: string): Observable<T[]> => {
    return collection(db.collectionGroup(path)).pipe(map((docs) => docs.map((doc) => snapToData(doc) as T)));
};

export const get = <T>(path: string): Observable<T> => {
    return doc(db.doc(path)).pipe(map((doc) => snapToData(doc) as T));
};

export const update = async <T>(path: string, data: T): Promise<void> => {
    const docRef = db.doc(path);

    await docRef.update({ ...data, $key: null });

    return;
};

export const add = async <T>(path: string, data: T): Promise<void> => {
    const collectionRef = db.collection(path);

    await collectionRef.add(data);

    return;
};
