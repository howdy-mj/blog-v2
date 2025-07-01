import generateRss, { RssContent } from '@utils/generateRss';
import { filterDraftInProduction, getAllFiles, getBasicContentInfo } from '@utils/getFiles';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const allPosts = filterDraftInProduction(getAllFiles('posts'));

  const rssContent = await Promise.all(
    allPosts.map(async (post) => {
      const { frontMatter, content } = await getBasicContentInfo('posts', post.slug);
      return {
        frontMatter,
        content,
        slug: post.slug,
      };
    })
  );

  const rss = generateRss(rssContent as RssContent[]);

  res.writeHead(200, {
    'Content-Type': 'application/xml',
    'Cache-Control': 's-maxage=3600, stale-while-revalidate',
  });
  return res.end(rss);
}
