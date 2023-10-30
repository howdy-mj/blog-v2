import React from 'react';
import styled from 'styled-components';
import Layout from '@components/Layout';
import { Title } from '@components/Typography.style';

type AboutContainerProps = {
  contentSection: React.ReactNode;
};

const AboutContainer = ({ contentSection }: AboutContainerProps) => {
  return (
    <Layout>
      <TitleWrapper>
        <Title>About</Title>
      </TitleWrapper>
      {contentSection}
    </Layout>
  );
};

export default AboutContainer;

const TitleWrapper = styled.div`
  padding-bottom: 2rem;
`;
