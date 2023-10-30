'use client';

import { useEffect, useState } from 'react';
import TagList from '@containers/blog/components/TagList';
import SearchBar from './SearchBar';
import PostList from '@containers/blog/components/PostList';
import Pagination from '@components/Pagination';
import styled from 'styled-components';
import { Content } from '@utils/getFiles';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@constants/routes';
import { searchBlogPosts } from '@utils/searchBlog';
import NoticeText from '@components/NoticeText';
import { getTotalPage } from '@utils/getTotalPage';

type BlogPostsProps = {
  originPosts: Content[];
  tags: string[];
  totalPosts: number;
  currentPage?: number;
};

const BlogPosts = ({ originPosts, tags, totalPosts, currentPage = 1 }: BlogPostsProps) => {
  const router = useRouter();
  const totalPage = getTotalPage(totalPosts);
  const changePage = (page: number) => {
    router.push(page === 1 ? ROUTES.BLOG : `${ROUTES.BLOG_PAGE}/${page}`);
  };

  const [value, setValue] = useState('');
  const [posts, setPosts] = useState(originPosts);
  const onSearch = (value: string) => {
    setValue(value);
    setPosts(searchBlogPosts(value, originPosts));
  };

  useEffect(() => {
    setPosts(originPosts);
  }, [originPosts]);

  return (
    <>
      {!!tags && <TagList searchedValue={value} tags={tags} onClick={onSearch} />}
      <SearchBar value={value} onChange={(value) => onSearch(value)} />
      {value ? (
        posts.length === 0 ? (
          <NoticeText notice="No Posts found." />
        ) : (
          <PostList posts={posts} />
        )
      ) : (
        <PostListWrapper>
          <PostList posts={posts} />
          {totalPage > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              onChangeCurrent={(page) => changePage(page)}
            />
          )}
        </PostListWrapper>
      )}
    </>
  );
};

export default BlogPosts;

const PostListWrapper = styled.div``;
