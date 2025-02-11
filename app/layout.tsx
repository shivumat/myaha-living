import '#/styles/globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Myaha Living',
    template: '%s',
  },
  description:
    'Elevate your indoor or outdoor greenery with our Sage Green Ceramic Planter. Its soft, soothing hue and clean lines add a touch of elegance to any space, blending seamlessly with a variety of decor styles.',
  openGraph: {
    title: 'Myaha Living',
    description:
      'Elevate your indoor or outdoor greenery with our Sage Green Ceramic Planter. Its soft, soothing hue and clean lines add a touch of elegance to any space, blending seamlessly with a variety of decor styles.',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full w-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full w-full overflow-y-scroll">{children}</body>
    </html>
  );
}
