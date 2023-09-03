import { Metadata } from 'next';
import metaData from '@config/metaData';
import { filterDraftInProduction, getAllFiles } from '@utils/getFiles';
import { getCurrentPagePosts } from '@utils/makeBlogPage';
import { getAllTags } from '@utils/getAllTags';
import { makePostsRss } from '@utils/makePostsRss';
import BlogPostsContainer from 'components/BlogPostsContainer';

// TODO: SEO
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata: Metadata = {
  title: `Blog | ${metaData.title}`,
};

export default async function MainPage() {
  const { originPosts, totalPosts, tags } = await getAllPostsAndTagsData();
  return <BlogPostsContainer originPosts={originPosts} tags={tags} totalPosts={totalPosts} />;
}

const getAllPostsAndTagsData = async () => {
  const allPosts = filterDraftInProduction(getAllFiles('posts'));
  const totalPosts = allPosts.length;
  const posts = getCurrentPagePosts(allPosts, 1);
  const tags = getAllTags();

  if (totalPosts > 0) {
    await makePostsRss(allPosts);
  }

  return {
    originPosts: posts,
    tags,
    totalPosts,
  };
};
