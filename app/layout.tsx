import { SearchProvider } from '#/context/SearchContext';
import '#/styles/globals.css';
import Colors from '#/ui/colors/colors';
import LayoutWrapper from '#/ui/LayoutWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Myaha Living',
    template: '%s',
  },
  description:
    'Crafting emotions, not just essentials – where every design tells your story',
  openGraph: {
    title: 'Myaha Living',
    description:
      'Crafting emotions, not just essentials – where every design tells your story',
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
          src="https://static.elfsight.com/platform/platform.js"
          async
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '629855199812466');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=629855199812466&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body
        className="h-full w-full overflow-y-scroll"
        style={{ backgroundColor: Colors.white }}
      >
        <SearchProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </SearchProvider>
      </body>
    </html>
  );
}
