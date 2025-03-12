import { notFound } from 'next/navigation';

export const POST = async (req: Request) => {
  try {
    const { pincode } = await req.json();
    const result = pincode.startsWith('302') ? '1' : '3';

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: '9a0a1d6cbcafd89299b3f15ae097626cb7f877b2',
        'Content-Type': 'application/json',
      },
    };

    const res: any = await fetch(
      `https://track.delhivery.com/c/api/pin-codes/json/?filter_codes=${pincode}`,
      options,
    );

    const data = await res.json();

    return new Response(
      JSON.stringify({
        status: true,
        message: 'Piconde info',
        estimatedTime: result,
        isAvailable: data.delivery_codes?.length > 0,
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
