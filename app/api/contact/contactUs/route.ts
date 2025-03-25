import { getCurrentTimeStamp } from '#/lib/util';
import { notFound } from 'next/navigation';
import { saveData } from '../../../../lib/db/firebaseUtil';

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const { email } = data;
    if (!email) {
      return new Response(
        JSON.stringify({ status: true, message: 'Email is mandatory' }),
        {
          status: 400,
        },
      );
    }
    await saveData(
      'contact-us-form',
      data,
      `${email}-${getCurrentTimeStamp()}`,
    );

    return new Response(
      JSON.stringify({ status: true, message: 'Email added' }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error adding email:', error);
    notFound();
  }
};
