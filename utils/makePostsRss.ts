import { Content, getSlugContents } from '@utils/getFiles';
import generateRss, { RssContent } from '@utils/generateRss';
import fs from 'fs';

export const makePostsRss = async (allPosts: Content[]) => {
  const allSlugs = allPosts.map((post) => post.slug);

  const frontMatterWithContent = (await Promise.all(
    allSlugs.map(async (slug) => {
      const slugContents = await getSlugContents('posts', slug);
      return {
        frontMatter: slugContents.frontMatter,
        content: slugContents.content,
        slug,
      };
    })
  )) as RssContent[];

  const rss = generateRss(frontMatterWithContent);
  fs.writeFileSync('./public/rss.xml', rss);
};
