'use client';

import React from 'react';
import styled from 'styled-components';
import metaData from '@config/metaData';
import { formatDate } from '@utils/formatDate';
import { FrontMatter } from '@utils/getFiles';
import Utterances from '@components/Utterances';
import Giscus from '@components/Giscus';

interface BlogPostContainerProps {
  frontMatter: FrontMatter;
  contentSection: React.ReactNode;
}

const BlogPostContainer = ({ frontMatter, contentSection }: BlogPostContainerProps) => {
  return (
    <>
      <HeaderWrapper>
        <Title>{frontMatter.title}</Title>
        {frontMatter.date && <Date>{formatDate(frontMatter.date)}</Date>}
        {frontMatter.lastMod && (
          <LastModDate>Last Updated: {formatDate(frontMatter.lastMod)}</LastModDate>
        )}
      </HeaderWrapper>
      <Section>{contentSection}</Section>
      {metaData.comment.utterances.repo && <Utterances />}
      {metaData.comment.giscus.repo && <Giscus />}
    </>
  );
};

export default BlogPostContainer;

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
