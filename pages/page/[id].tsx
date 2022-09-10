import React from 'react';
import metaData from '@config/metaData';
import { PageSEO } from '@components/SEO';
import BlogContainer from '@containers/blog';
import { Content, filterDraftInProduction, getAllFiles } from '@utils/getFiles';
import { BlogPagePathsReturn, getCurrentPagePosts, makeBlogPagePaths } from '@utils/makeBlogPage';
import { getAllTags } from '@utils/getAllTags';
import { getTotalPage } from '@utils/getTotalPage';

type BlogPageProps = {
  originPosts: Content[];
  tags: string[];
  totalPosts: number;
  currentPage: number;
};

const BlogPage = ({ originPosts, tags, totalPosts, currentPage }: BlogPageProps) => {
  return (
    <>
      <PageSEO title={`Blog | ${metaData.title}`} />
      <BlogContainer
        originPosts={originPosts}
        tags={tags}
        totalPosts={totalPosts}
        currentPage={currentPage}
      />
    </>
  );
};

export default BlogPage;

export const getStaticPaths = () => {
  const allPosts = filterDraftInProduction(getAllFiles('posts'));
  const totalPosts = getTotalPage(allPosts.length);
  const paths = makeBlogPagePaths(totalPosts);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }: BlogPagePathsReturn) => {
  const currentPage = Number(id);
  const allPosts = filterDraftInProduction(getAllFiles('posts'));
  const posts = getCurrentPagePosts(allPosts, currentPage);

  return {
    props: {
      originPosts: posts,
      tags: getAllTags(),
      totalPosts: allPosts.length,
      currentPage,
    },
  };
};
