import { ReactNode } from 'react';
import metaData from '@config/metaData';
import StyledComponentsRegistry from '@lib/registry';
import MainLayout from 'components/MainLayout';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={metaData.language}>
      <body>
        <StyledComponentsRegistry>
          <MainLayout>{children}</MainLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
