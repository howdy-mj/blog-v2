import React from 'react';
import metaData from '@config/metaData';
import BlogContainer from '@containers/blog';
import { PageSEO } from '@components/SEO';
import { Content, filterDraftInProduction, getAllFiles } from '@utils/getFiles';
import { getAllTags } from '@utils/getAllTags';
import { makePostsRss } from '@utils/makePostsRss';
import { getCurrentPagePosts } from '@utils/makeBlogPage';

type BlogMainProps = {
  originPosts: Content[];
  tags: string[];
  totalPosts: number;
};
// TODO: 삭제
const BlogMain = ({ originPosts, tags, totalPosts }: BlogMainProps) => {
  return (
    <>
      <PageSEO title={`Blog | ${metaData.title}`} />
      <BlogContainer originPosts={originPosts} tags={tags} totalPosts={totalPosts} />
    </>
  );
};

export default BlogMain;

export const getStaticProps = async () => {
  const allPosts = filterDraftInProduction(getAllFiles('posts'));
  const totalPosts = allPosts.length;
  const posts = getCurrentPagePosts(allPosts, 1);
  const tags = getAllTags();

  if (totalPosts > 0) {
    await makePostsRss(allPosts);
  }

  return {
    props: {
      originPosts: posts,
      tags,
      totalPosts,
    },
  };
};
