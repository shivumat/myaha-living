import { notFound } from 'next/navigation';
import { getData, saveData } from '../../../../lib/db/firebaseUtil';

export const POST = async (req: Request) => {
  try {
    const { uuid, email } = await req.json();
    console.log('uuid:', uuid);
    let userDetails = await getData('user_details', uuid);
    if (!userDetails) {
      await saveData('user_details', { uuid, email }, uuid);
      userDetails = await getData('user_details', uuid);
    }
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
