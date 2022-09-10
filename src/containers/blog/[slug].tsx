import React from 'react';
import styled from 'styled-components';
import metaData from '@config/metaData';
import { formatDate } from '@utils/formatDate';
import { FrontMatter } from '@utils/getFiles';
import Layout from '@components/Layout';
import Utterances from '@components/Utterances';
import ContentFooter from '@components/ContentFooter';

interface BlogSlugContainerProps {
  frontMatter: FrontMatter;
  contentSection: React.ReactNode;
}

const BlogSlugContainer = ({ frontMatter, contentSection }: BlogSlugContainerProps) => {
  return (
    <Layout>
      <HeaderWrapper>
        <Title>{frontMatter.title}</Title>
        {frontMatter.date && <Date>{formatDate(frontMatter.date)}</Date>}
        {frontMatter.lastMod && (
          <LastModDate>Last Updated: {formatDate(frontMatter.lastMod)}</LastModDate>
        )}
      </HeaderWrapper>
      <Section>{contentSection}</Section>
      {metaData.comment.utterances.repo && <Utterances />}
      <ContentFooter />
    </Layout>
  );
};

export default BlogSlugContainer;

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

const Date = styled.div`
  margin-top: 2rem;
  text-align: center;
  color: var(--text-info);
`;

const LastModDate = styled.div`
  margin-top: 1rem;
  font-style: italic;
  text-align: right;
  color: var(--text-info);
`;

const Section = styled.section`
  line-height: 1.5;
`;
