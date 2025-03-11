import { notFound } from 'next/navigation';

export const POST = async () => {
  try {
    return new Response(
      JSON.stringify({
        status: true,
        message: 'Piconde info',
        estimatedTime: 3,
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
