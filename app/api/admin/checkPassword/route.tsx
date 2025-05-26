import { notFound } from 'next/navigation';

export const POST = async (req: Request) => {
  try {
    const { password } = await req.json();

    // ✅ Check password first
    if (password !== process.env.DASHBOARD_STATIC_PASSWORD) {
      return new Response(
        JSON.stringify({
          status: false,
          authorised: false,
          message: 'Wrong Password',
        }),
        { status: 401 },
      );
    }
    return new Response(
      JSON.stringify({
        status: true,
        authorised: true,
        message: 'Password is correct',
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
