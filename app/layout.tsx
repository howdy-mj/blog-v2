import { ReactNode } from 'react';
import metaData from '@config/metaData';
import StyledComponentsRegistry from '@lib/registry';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={metaData.language}>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
