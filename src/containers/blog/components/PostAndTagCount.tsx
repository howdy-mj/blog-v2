import React from 'react';
import styled from 'styled-components';

type PostAndTagCountProps = {
  totalPosts: number;
  totalTags: number;
};

const PostAndTagCount = ({ totalPosts, totalTags }: PostAndTagCountProps) => {
  return (
    <Container>
      <span>{totalPosts} posts</span>
      <span>{totalTags} tags</span>
    </Container>
  );
};

export default PostAndTagCount;

const Container = styled.div`
  > span:first-child {
    margin-right: 1rem;
  }
`;
