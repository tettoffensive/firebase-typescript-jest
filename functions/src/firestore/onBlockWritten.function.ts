import * as functions from 'firebase-functions';
import { pullAllBy, isEmpty, get, pickBy } from 'lodash';
import { db, firebase } from '../admin';

export default functions.firestore.document(`/users/{userId}/blocks/{blockId}`).onWrite(async (change, context) => {
  const { userId, blockId } = context.params;
  
  const { exists } = change.after; // Change appears to be null
  const data = change.after.data();
  const previousData = change.before.data();

  /** Do more stuff here */
  return null;
});
