import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// create a singleton firebase class that provides the db object

export class Firebase {
  private static instance: Firebase;
  private db: FirebaseFirestore.Firestore; // db object
  private constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: 'myaha-waitlist',
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PROVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
    }

    this.db = getFirestore();
  }

  public static getInstance(): Firebase {
    if (!Firebase.instance) {
      Firebase.instance = new Firebase();
    }
    return Firebase.instance;
  }

  public getDb(): FirebaseFirestore.Firestore {
    return this.db;
  }
}
