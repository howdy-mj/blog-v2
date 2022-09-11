import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as gtag from '@utils/gtag';

import { isProd } from '@constants/isProd';
import GlobalStyle from '@styles/global.style';
import theme from '@styles/theme.style';
import '@styles/prism-dracula.css';
import '@styles/about.style.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (isProd) {
        gtag.pageview({ url, title: document.title });
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
