import { Content, getBasicContentInfo } from '@utils/getFiles';
import generateRss, { RssContent } from '@utils/generateRss';
import fs from 'fs';

export const makePostsRss = async (allPosts: Content[]) => {
  const allSlugs = allPosts.map((post) => post.slug);

  const frontMatterWithContent = (await Promise.all(
    allSlugs.map(async (slug) => {
      const { frontMatter, content } = await getBasicContentInfo('posts', slug);
      return {
        frontMatter,
        content,
        slug,
      };
    })
  )) as RssContent[];

  const rss = generateRss(frontMatterWithContent);
  fs.writeFileSync('./public/rss.xml', rss);
};
