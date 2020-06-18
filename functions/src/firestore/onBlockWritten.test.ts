// initialize test database
import * as functions from 'firebase-functions-test';
import * as admin from 'firebase-admin';

import { WrappedFunction } from 'firebase-functions-test/lib/main';
import onBlockWritten from './onBlockWritten.function';

// First set up unique project id for these tests, so that any other test files run in parallel
// is not collapsing with this one.
const projectId = 'onBlockWritten';
process.env.GCLOUD_PROJECT = projectId;
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
admin.initializeApp({ projectId }, 'test-project');

const testEnv = functions();

describe('onBlockWritten', () => {
  let wrapped: WrappedFunction;
  beforeAll(() => {
    wrapped = testEnv.wrap(onBlockWritten);
  });

  afterAll(() => {
    testEnv.cleanup();
  });

  it('sample tests', async () => {
    const path = 'users/someUserId/blocks/someTestBlockId'; // Not sure the correct way to do this
    const data = { title: 'test', kind: 'Database', slug: 'test' };
    const snap = testEnv.firestore.makeDocumentSnapshot(data, path);
    // const snap = testEnv.makeChange() // I have also tried makeChange which didn't work
    await wrapped(snap);
    const after = await admin.firestore().doc('users/someUserId').get();
    expect(after).toBeTruthy();
  });
});