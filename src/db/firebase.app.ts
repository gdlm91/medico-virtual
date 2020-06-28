import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';

const config = {
    apiKey: process.env.REACT_APP_APIKEY,
    appId: process.env.REACT_APP_APPID,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
};

const app = firebase.initializeApp(config);

export default app;
