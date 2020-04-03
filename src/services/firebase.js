import firebase from 'firebase';
import * as config from '../config/config';

const configuration = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    databaseURL: config.databaseURL
};

firebase.initializeApp(configuration);

export const auth = firebase.auth;

export const db = firebase.database();
