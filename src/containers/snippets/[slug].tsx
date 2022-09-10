import React from 'react';
import styled from 'styled-components';
import { formatDate } from '@utils/formatDate';
import { FrontMatter } from '@utils/getFiles';
import Layout from '@components/Layout';
import ContentFooter from '@components/ContentFooter';

interface SnippetsSlugContainerProps {
  frontMatter: FrontMatter;
  contentSection: React.ReactNode;
}

const SnippetsSlugContainer = ({ frontMatter, contentSection }: SnippetsSlugContainerProps) => {
  return (
    <Layout>
      <HeaderWrapper>
        <Title>{frontMatter.title}</Title>
        <LastModDate>
          Last Updated: {formatDate(frontMatter.lastMod || frontMatter.date)}
        </LastModDate>
      </HeaderWrapper>
      <Section>{contentSection}</Section>
      <ContentFooter />
    </Layout>
  );
};

export default SnippetsSlugContainer;

const HeaderWrapper = styled.header`
  padding: 5rem 0;

  ${(p) => p.theme.media.mobile} {
    padding-top: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
`;

const LastModDate = styled.div`
  margin-top: 2rem;
  font-style: italic;
  text-align: right;
  color: var(--text-info);
`;

const Section = styled.section`
  line-height: 1.5;
`;
