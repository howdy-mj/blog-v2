import { Content } from '@utils/getFiles';
import { posts as cachedPosts } from 'cache/posts-data';
import { isProd } from '@constants/isProd';

const posts: Content[] = cachedPosts;

const getSearchedResult = (value: string, filteredResult: Content[]) => {
  return value ? filteredResult : [];
};

export const searchBlogPosts = (searchValue: string, originPosts: Content[]) => {
  if (searchValue === '') {
    return originPosts;
  }

  const keywords = searchValue.split(' ');

  const findMatchedContent = (() => {
    return posts.filter((post) => {
      const matchedPost = keywords.map((keyword) => {
        const matchedTag = post.frontMatter.tags?.includes(keyword);
        const matchedTitle = post.frontMatter.title.toLowerCase().includes(keyword);
        const matchedSummary = post.frontMatter.summary?.includes(keyword);
        const nonDraft = post.frontMatter.draft === undefined || !post.frontMatter.draft;

        if (isProd) {
          return nonDraft && (matchedTag || matchedTitle || matchedSummary);
        }
        return matchedTag || matchedTitle || matchedSummary;
      });
      return matchedPost.every((match) => match);
    });
  })();

  return getSearchedResult(searchValue, findMatchedContent);
};
