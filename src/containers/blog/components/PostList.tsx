import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { Content } from '@utils/getFiles';
import { ROUTES } from '@constants/routes';
import { formatDate } from '@utils/formatDate';

type PostListProps = {
  posts: Content[];
};

const PostList = ({ posts }: PostListProps) => {
  return (
    <PostContentWrapper>
      {posts.map((post) => {
        const { tags, summary, date, title, draft } = post.frontMatter;
        return (
          <PostWrapper key={post.slug}>
            {tags && (
              <TagsWrapper>
                {tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagsWrapper>
            )}
            <Link href={`${ROUTES.BLOG}${post.slug}`} passHref>
              <PostTitleWrapper>
                {draft && <DraftText>Draft</DraftText>}
                <PostTitle>{title}</PostTitle>
              </PostTitleWrapper>
            </Link>
            {date && <DateText>{formatDate(date)}</DateText>}
            {summary && <SummaryText>{summary}</SummaryText>}
          </PostWrapper>
        );
      })}
    </PostContentWrapper>
  );
};

export default PostList;

const PostContentWrapper = styled.div``;

const PostWrapper = styled.div`
  padding: 3rem 0;
  border-bottom: 1px solid var(--border2);
`;

const TagsWrapper = styled.div`
  display: flex;

  & > * {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

const Tag = styled.div`
  color: var(--text-primary);
`;

const PostTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DraftText = styled.span`
  font-size: 1.4rem;
  background-color: var(--bg-secondary);
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-right: 1rem;
`;

const PostTitle = styled.h3`
  font-size: 2.4rem;
  margin: 0.5rem 0;
  cursor: pointer;
`;

const DateText = styled.p`
  margin-bottom: 0.5rem;
  color: var(--text-description);
  font-size: 1.4rem;
`;

const SummaryText = styled.p``;
