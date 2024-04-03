import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { getCurrentTheme } from '@hooks/useTheme';
import metaData from '@config/metaData';

const src = 'https://giscus.app/client.js';
const lightTheme = 'light';
const darkTheme = 'dark_dimmed';
const GISCUS_CLASSNAME = '.giscus-frame';

export const changeGiscusTheme = (mode: 'light' | 'dark') => {
  const giscusElement = document?.querySelector<HTMLIFrameElement>(GISCUS_CLASSNAME);
  if (giscusElement) {
    const theme = mode === 'light' ? lightTheme : darkTheme;
    const message = {
      giscus: {
        setConfig: { theme },
      },
    };
    giscusElement.contentWindow?.postMessage(message, 'https://giscus.app');
  }
};

const Giscus = () => {
  const giscusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const theme = getCurrentTheme();
    const scriptElement = document.createElement('script');
    scriptElement.src = src;
    scriptElement.async = true;
    scriptElement.crossOrigin = 'anonymous';
    scriptElement.setAttribute('data-repo', metaData.comment.giscus.repo);
    scriptElement.setAttribute('data-repo-id', metaData.comment.giscus.repoId);
    scriptElement.setAttribute('data-category', metaData.comment.giscus.category);
    scriptElement.setAttribute('data-category-id', metaData.comment.giscus.categoryId);
    scriptElement.setAttribute('data-strict', '0');
    scriptElement.setAttribute('data-reactions-enabled', '1');
    scriptElement.setAttribute('data-emit-metadata', '0');
    scriptElement.setAttribute('data-input-position', 'bottom');
    scriptElement.setAttribute('data-mapping', 'pathname');
    scriptElement.setAttribute('data-theme', theme === 'light' ? lightTheme : darkTheme);
    scriptElement.setAttribute('data-lang', metaData.language);

    giscusRef.current?.appendChild(scriptElement);
  }, []);

  return <Container ref={giscusRef} />;
};

export default Giscus;

const Container = styled.div`
  margin-top: 3rem;
`;
