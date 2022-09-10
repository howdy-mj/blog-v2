import { Content } from '@utils/getFiles';
import metaData from '@config/metaData';

export const getCurrentPagePosts = (posts: Content[], page: number) => {
  return posts.slice(metaData.postsPerPage * (page - 1), metaData.postsPerPage * page);
};

export type BlogPagePathsReturn = {
  params: {
    id: string;
  };
};
export const makeBlogPagePaths = (totalPosts: number): BlogPagePathsReturn[] => {
  return Array.from(Array(totalPosts)).map((_, index) => ({
    params: { id: (index + 1).toString() },
  }));
};
