import { getContentWithFrontMatter, getFileNameWithExtension } from '@utils/getFiles';
import matter from 'gray-matter';
import { isProd } from '@constants/isProd';

const getTagWithLowerCase = (tags: string[]) => {
  return tags?.map((tag: string) => tag.toLowerCase()) || [];
};

export const getAllTags = (): string[] => {
  const fileNameWithExtension = getFileNameWithExtension('posts');

  const filterDraftInProduction = fileNameWithExtension.map((filename) => {
    const contentWithFrontMatter = getContentWithFrontMatter('posts', filename);
    const { data } = matter(contentWithFrontMatter);
    if (isProd) {
      return data.draft ? [] : getTagWithLowerCase(data.tags);
    }
    return getTagWithLowerCase(data.tags);
  });

  const tags =
    filterDraftInProduction.length > 0
      ? filterDraftInProduction.reduce((prev, current) => {
          return [...current, ...prev];
        })
      : [];

  return Array.from(new Set(tags));
};
