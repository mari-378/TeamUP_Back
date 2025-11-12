import admin from "firebase-admin";

const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
if (!raw) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON ausente no .env");
}
const serviceAccount = JSON.parse(raw);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id
  });
}

export const db = admin.firestore();
export const auth = admin.auth();
