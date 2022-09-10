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

  const tag = searchValue.slice(1);
  return getSearchedResult(
    searchValue,
    posts.filter((post) => {
      const matchedTag = post.frontMatter.tags?.includes(tag);
      const matchedTitle = post.frontMatter.title.toLowerCase().includes(searchValue);
      const matchedSummary = post.frontMatter.summary?.includes(searchValue);
      const nonDraft = post.frontMatter.draft === undefined || !post.frontMatter.draft;

      if (isProd) {
        return nonDraft && (matchedTag || matchedTitle || matchedSummary);
      }
      return matchedTag || matchedTitle || matchedSummary;
    })
  );
};
