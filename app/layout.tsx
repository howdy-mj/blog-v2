import { ReactNode } from 'react';
import metaData from '@config/metaData';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={metaData.language}>
      <body>{children}</body>
    </html>
  );
}
