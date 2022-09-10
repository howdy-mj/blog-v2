import React, { useEffect, useMemo, useRef } from 'react';
import metaData from '@config/metaData';
import styled from 'styled-components';
import { getCurrentTheme } from '@hooks/useTheme';

const src = 'https://utteranc.es/client.js';
const lightTheme = 'github-light';
const darkTheme = 'dark-blue';
const UTTERANCES_CLASSNAME = '.utterances-frame';

export const changeUtterancesTheme = (mode: 'light' | 'dark') => {
  const utterancesElement = document?.querySelector<HTMLIFrameElement>(UTTERANCES_CLASSNAME);
  if (utterancesElement) {
    const theme = mode === 'light' ? lightTheme : darkTheme;
    const message = {
      type: 'set-theme',
      theme: theme,
    };
    utterancesElement.contentWindow?.postMessage(message, 'https://utteranc.es');
  }
};

const Utterances = () => {
  const utterancesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const theme = getCurrentTheme();
    const scriptElement = document.createElement('script');
    scriptElement.src = src;
    scriptElement.async = true;
    scriptElement.crossOrigin = 'anonymous';
    scriptElement.setAttribute('repo', metaData.comment.utterances.repo);
    scriptElement.setAttribute('issue-term', 'pathname');
    scriptElement.setAttribute('theme', theme === 'light' ? lightTheme : darkTheme);
    scriptElement.setAttribute('label', 'comment');
    utterancesRef.current?.appendChild(scriptElement);
  }, []);

  return <Container ref={utterancesRef} />;
};

export default Utterances;

const Container = styled.div`
  margin-top: 3rem;
`;
