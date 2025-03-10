import { notFound } from 'next/navigation';
import { saveData } from '../../../../lib/db/firebaseUtil';

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const { firstName, lastName, mobile, pincode, address, email, uuid } = data;
    if (!email) {
      // Render the closest `not-found.js` Error Boundary
      return new Response(
        JSON.stringify({ status: false, message: 'Wrong Payload' }),
        {
          status: 400,
        },
      );
    }
    await saveData(
      'user_details',
      {
        firstName,
        lastName,
        mobile,
        pincode,
        address,
        email,
        uuid,
      },
      uuid,
    );
    return new Response(
      JSON.stringify({
        status: true,
        message: 'User added',
        userDetails: {
          firstName,
          lastName,
          mobile,
          pincode,
          address,
          email,
          uuid,
        },
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error adding user:', error);
    notFound();
  }
};
