import * as admin from 'firebase-admin';
import path from 'path';
import { readFileSync } from 'fs';

if (!admin.apps.length) {
  const serviceAccountPath = path.join(process.cwd(), 'lib/credentials/firebase-service-account.json');
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export { admin };
