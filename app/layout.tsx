import { SearchProvider } from '#/context/SearchContext';
import '#/styles/globals.css';
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
      </head>
      <body className="h-full w-full overflow-y-scroll">
        <SearchProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </SearchProvider>
      </body>
    </html>
  );
}
