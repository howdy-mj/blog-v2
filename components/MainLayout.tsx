'use client';

import { PropsWithChildren } from 'react';
import styled from 'styled-components';

import useHeight from '@hooks/useHeight';
import Navigation, { GNB_HEIGHT } from './Navigation';

type LayoutProps = {
  noPaddingBottom?: boolean;
};

const MainLayout = ({ noPaddingBottom = false, children }: PropsWithChildren<LayoutProps>) => {
  const height = useHeight();

  return (
    <>
      <Navigation />
      <StyledMain minHeight={height}>
        <StyledArticle noPaddingBottom={noPaddingBottom}>{children}</StyledArticle>
      </StyledMain>
    </>
  );
};

export default MainLayout;

const StyledMain = styled.main<{ minHeight: number }>`
  min-height: ${({ minHeight }) => minHeight - GNB_HEIGHT}rem;
`;

const StyledArticle = styled.article<{ noPaddingBottom: boolean }>`
  margin: 0 auto;
  padding: ${(p) => (p.noPaddingBottom ? '0' : '3rem')} 3rem
    ${(p) => (p.noPaddingBottom ? '0' : '10rem')};

  ${(p) => p.theme.media.mobile} {
    padding: ${(p) => (p.noPaddingBottom ? '0' : '2rem')} 2rem
      ${(p) => (p.noPaddingBottom ? '0' : '10rem')};
  }

  ${(p) => p.theme.media.tablet} {
    max-width: 90rem;
  }

  ${(p) => p.theme.media.pc} {
    max-width: 100rem;
  }
`;
