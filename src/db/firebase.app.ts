import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';

const config = {
    apiKey: 'AIzaSyCkoZ62oBDvzCMKo5zxSp34SZsheoG-yVU',
    appId: '1:637061636597:web:18a09d5f19eaf7b7d0c0bc',
    authDomain: 'medico-virtual-latam.firebaseapp.com',
    databaseURL: 'https://medico-virtual-latam.firebaseio.com',
    projectId: 'medico-virtual-latam',
};

const app = firebase.initializeApp(config);

export default app;
