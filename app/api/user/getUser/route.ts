import { notFound } from 'next/navigation';
import { getData } from '../../../../lib/db/firebaseUtil';

export const POST = async (req: Request) => {
  try {
    const { uuid } = await req.json();
    const userDetails = await getData('user_details', uuid);
    return new Response(
      JSON.stringify({ status: true, message: 'User added', userDetails }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error adding user:', error);
    notFound();
  }
};
