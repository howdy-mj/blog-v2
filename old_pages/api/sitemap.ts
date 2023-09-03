import { NextApiRequest, NextApiResponse } from 'next';

import metaData from '@config/metaData';
import { filterDraftInProduction, getAllFiles } from '@utils/getFiles';

const siteUrl = metaData.siteUrl;

export default function sitemapHandler(req: NextApiRequest, res: NextApiResponse) {
  const allPosts = filterDraftInProduction(getAllFiles('posts'));
  const allSnippets = filterDraftInProduction(getAllFiles('snippets'));

  const postPaths = allPosts.map((post) => `/${post.slug}`);
  const snippetPaths = allSnippets.map((snippet) => `/snippets/${snippet.slug}`);
  const allPaths = [...postPaths, ...snippetPaths];

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${allPaths.map((pathname) => {
              return `
                <url>
                  <loc>${siteUrl}${pathname}</loc>
                </url>
              `;
            })}
        </urlset>
    `.trim();

  res.writeHead(200, {
    'Content-Type': 'application/xml',
  });
  return res.end(sitemap);
}
