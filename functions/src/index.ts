import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);

import * as elo from 'ratings';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.writeMatch = functions.firestore
    .document('leagues/{league}/matches/{match}')
    .onWrite((snap, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = snap.data();

      const leagueId = context.params.league;
      const leagueRef = admin.firestore().collection('leagues').doc(leagueId);

      const adjustment = elo.adjustment(newValue.white.score, newValue.black.score, newValue.result);

      // perform desired operations ...
      const playerCollection = leagueRef.collection('players');
      let white = playerCollection.doc(newValue.white.id);
      let black = playerCollection.doc(newValue.black.id);

      white.set({'score': adjustment.white}).then(_ => console.log('set!'));
      black.set({'score': adjustment.black}).then(_ => console.log('set!'));
    });
