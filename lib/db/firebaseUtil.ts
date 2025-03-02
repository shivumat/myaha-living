import { db } from './firebase';

export const saveData = async (
  collectionName: string,
  data: Record<string, any>,
  id: string,
) => {
  try {
    await db.doc(`${collectionName}/${id}`).set(data);
    console.log('Document saved successfully');
  } catch (error) {
    console.error('Error saving document:', error);
    return null;
  }
};
