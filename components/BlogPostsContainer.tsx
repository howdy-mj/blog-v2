'use client';

import { Content } from '@utils/getFiles';
import PersonalInformation from '@components/PersonalInformation';
import metaData from '@config/metaData';
import BlogPosts from './BlogPosts';
import styled from 'styled-components';
import { Title } from '@components/Typography.style';
import PostAndTagCount from '@containers/blog/components/PostAndTagCount';
import NoticeText from '@components/NoticeText';

type BlogContainerProps = {
  originPosts: Content[];
  tags: string[];
  totalPosts: number;
  currentPage?: number;
};

const BlogPostsContainer = ({
  originPosts,
  tags,
  totalPosts,
  currentPage = 1,
}: BlogContainerProps) => {
  const hasPosts = originPosts.length > 0;
  return (
    <>
      {metaData.isActive.personalInformation && <PersonalInformation />}

      <TitleWrapper>
        <Title>Blog</Title>
        {hasPosts && <PostAndTagCount totalPosts={totalPosts} totalTags={tags.length} />}
      </TitleWrapper>

      {hasPosts ? (
        <BlogPosts
          originPosts={originPosts}
          tags={tags}
          totalPosts={totalPosts}
          currentPage={currentPage}
        />
      ) : (
        <NoticeText notice="No Posts Yet." />
      )}
    </>
  );
};

export default BlogPostsContainer;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 2rem;
`;
