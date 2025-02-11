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
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function rotateFavicon() {
              let angle = 0;
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              const img = new Image();
              img.src = "/favicon.ico";

              img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                setInterval(() => {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  ctx.save();
                  ctx.translate(canvas.width / 2, canvas.height / 2);
                  ctx.rotate((angle * Math.PI) / 180);
                  ctx.drawImage(img, -img.width / 2, -img.height / 2);
                  ctx.restore();
                  
                  const link = document.querySelector("link[rel='icon']") || document.createElement("link");
                  link.rel = "icon";
                  link.href = canvas.toDataURL("image/png");
                  document.head.appendChild(link);

                  angle += 180;
                }, 1000);
              };
            })();
          `,
          }}
        />
      </head>
      <body className="h-full w-full overflow-y-scroll">{children}</body>
    </html>
  );
}
