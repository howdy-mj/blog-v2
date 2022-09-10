import metaData from '@config/metaData';

export const getTotalPage = (totalPosts: number) => {
  return Math.ceil(totalPosts / metaData.postsPerPage);
};
