import { Firebase } from './firebase';
export const saveData = async (
  collectionName: string,
  data: Record<string, any>,
  id: string,
) => {
  try {
    const firebaseInstance = Firebase.getInstance();
    const db = firebaseInstance.getDb();

    console.log(process.env.FIREBASE_PROJECT_ID);
    await db.doc(`${collectionName}/${id}`).set(data);
    console.log('Document saved successfully');
  } catch (error) {
    console.error('Error saving document:', error);
    return null;
  }
};
