import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { collection, doc } from 'rxfire/firestore';

import config from './firestore.config';

const app = firebase.initializeApp(config);

const db = app.firestore();

export type FirestoreQuery = [string | firebase.firestore.FieldPath, firebase.firestore.WhereFilterOp, unknown];

export interface QueryOptions {
    queries?: FirestoreQuery[];
    sorters?: [string, 'desc' | 'asc' | undefined][];
}

const defaultQueryOptions: QueryOptions = {
    queries: [],
    sorters: [],
};

export function snapToData(snapshot: firebase.firestore.DocumentSnapshot): {} {
    return {
        ...snapshot.data(),
        $key: snapshot.id,
        $path: snapshot.ref.path,
    };
}

export const list = <T>(
    path: string,
    { queries = [], sorters = [] }: QueryOptions = defaultQueryOptions,
): Observable<T[]> => {
    let colRefQuery: firebase.firestore.Query = db.collection(path);

    queries.forEach((query) => {
        colRefQuery = colRefQuery.where(...query);
    });

    sorters.forEach(([field, order]) => {
        colRefQuery = colRefQuery.orderBy(field, order);
    });

    return collection(colRefQuery).pipe(map((docs) => docs.map((doc) => snapToData(doc) as T)));
};

export const listAll = <T>(
    path: string,
    { queries = [], sorters = [] }: QueryOptions = defaultQueryOptions,
): Observable<T[]> => {
    let colRefQuery: firebase.firestore.Query = db.collectionGroup(path);

    queries.forEach((query) => {
        colRefQuery = colRefQuery.where(...query);
    });

    sorters.forEach(([field, order]) => {
        colRefQuery = colRefQuery.orderBy(field, order);
    });

    return collection(colRefQuery).pipe(map((docs) => docs.map((doc) => snapToData(doc) as T)));
};

export const get = <T>(path: string): Observable<T> => {
    return doc(db.doc(path)).pipe(map((doc) => snapToData(doc) as T));
};

export const update = async <T>(path: string, data: T): Promise<void> => {
    try {
        const docRef = db.doc(path);

        return await docRef.update({ ...data, $key: null });
    } catch (error) {
        return error;
    }
};

export const add = <T>(path: string, data: T): Promise<firebase.firestore.DocumentReference> => {
    const collectionRef = db.collection(path);

    return collectionRef.add(data);
};
