import { Firebase } from './firebase';
export const saveData = async (
  collectionName: string,
  data: Record<string, any>,
  id: string,
) => {
  try {
    const firebaseInstance = Firebase.getInstance();
    const db = firebaseInstance.getDb();

    return await db.doc(`${collectionName}/${id}`).set(data);
  } catch (error) {
    console.error('Error saving document:', error);
    return null;
  }
};

export const getData = async (collectionName: string, id: string) => {
  try {
    const firebaseInstance = Firebase.getInstance();
    const db = firebaseInstance.getDb();

    return (await db.doc(`${collectionName}/${id}`).get()).data();
  } catch (error) {
    console.error('Error saving document:', error);
    return null;
  }
};
