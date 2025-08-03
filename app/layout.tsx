import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Luxurious Items',
  description: 'Buy high-quality products online',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        {children}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1325267672936174"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}