import * as functions from 'firebase-functions';
import * as express from 'express';

import * as data from './data.json';

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/cie', (req, res) => {
    const { term } = req.query;

    if (!term) {
        res.status(500).json({ type: 'error', message: 'Error: no term specified' });
    }

    const results = data.filter((record: { id: number; code: string }) =>
        record.code.includes((term as string).toUpperCase()),
    );

    try {
        res.json(results);
    } catch (error) {
        res.status(500).json({ type: 'error', message: error.message });
    }
});

export const api = functions.https.onRequest(app);
