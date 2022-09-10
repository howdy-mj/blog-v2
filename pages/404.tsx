import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import metaData from '@config/metaData';
import { PageSEO } from '@components/SEO';
import Layout from '@components/Layout';
import Button from '@components/Button';
import useHeight from '@hooks/useHeight';
import { GNB_HEIGHT } from '@components/Layout/Navigation';

const NotFoundPage = () => {
  const router = useRouter();
  const height = useHeight();
  return (
    <>
      <PageSEO title={`Oops... | ${metaData.title}`} />
      <Layout noPaddingBottom>
        <DescriptionWrapper height={height}>
          <TextWrapper>
            <ErrorCodeText>404</ErrorCodeText>
            <PageNonFoundText>Page Not Found</PageNonFoundText>
          </TextWrapper>

          <ButtonWrapper>
            <StyledButton onClick={() => router.back()}>Go Back</StyledButton>
          </ButtonWrapper>
        </DescriptionWrapper>
      </Layout>
    </>
  );
};

export default NotFoundPage;

const DescriptionWrapper = styled.div<{ height: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: ${(p) => p.height - GNB_HEIGHT}rem;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 0;
`;

const ErrorCodeText = styled.h1`
  font-size: 15rem;
`;

const PageNonFoundText = styled.h2`
  font-size: 5rem;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 5rem 0;

  ${(p) => p.theme.media.mobile} {
    width: 100%;
    padding: 5rem 2rem;
  }
`;

const StyledButton = styled(Button)`
  width: 50rem;
  height: 6rem;
  font-size: 2rem;
`;
