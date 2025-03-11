import { notFound } from 'next/navigation';

export const POST = async (req: Request) => {
  try {
    const { pincode } = await req.json();
    const result = pincode.startsWith('302') ? '1' : '3';
    return new Response(
      JSON.stringify({
        status: true,
        message: 'Piconde info',
        estimatedTime: result,
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
