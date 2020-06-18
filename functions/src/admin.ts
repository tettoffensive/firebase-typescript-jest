import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const config = functions.config().firebase;
admin.initializeApp(config);

export const db = admin.firestore();
export const firebase = admin;
