import { notFound } from 'next/navigation';
import { Firebase } from '../../../../lib/db/firebase';

const db = Firebase.getInstance().getDb();

export const POST = async (req: Request) => {
  try {
    const { collection } = await req.json();
    if (!collection) {
      // Render the closest `not-found.js` Error Boundary
      return new Response(
        JSON.stringify({ status: false, message: 'Wrong Payload' }),
        {
          status: 400,
        },
      );
    }
    const snapshot = await db.collection(collection).get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return new Response(
      JSON.stringify({
        data,
        message: 'Order added',
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
