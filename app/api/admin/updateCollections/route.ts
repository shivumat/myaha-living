import { notFound } from 'next/navigation';
import { Firebase } from '../../../../lib/db/firebase';

const db = Firebase.getInstance().getDb();

export const POST = async (req: Request) => {
  try {
    const { collection, id, updates } = await req.json();
    if (!collection && !id && !updates) {
      // Render the closest `not-found.js` Error Boundary
      return new Response(
        JSON.stringify({ status: false, message: 'Wrong Payload' }),
        {
          status: 400,
        },
      );
    }
    await db.collection(collection).doc(id).update(updates);
    const snapshot = await db.collection(collection).get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return new Response(
      JSON.stringify({
        data,
        message: 'Collection updated',
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error:', error);
    notFound();
  }
};
