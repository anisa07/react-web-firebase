import firebase from 'firebase';
import { firebaseConfig } from '../config/config';

const configuration = {
    apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    databaseURL: firebaseConfig.databaseURL
};

firebase.initializeApp(configuration);

export const auth = firebase.auth;

export const db = firebase.database();
