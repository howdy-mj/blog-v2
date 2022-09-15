import { NextApiRequest, NextApiResponse } from 'next';
import metaData from '@config/metaData';

const siteUrl = metaData.siteUrl;

export default function robotsHandler(req: NextApiRequest, res: NextApiResponse) {
  res.send(`
    User-agent: *
    Allow: /
    Disallow: /api
    Sitemap: ${siteUrl}/sitemap.xml
    Host: ${siteUrl}
  `);
}
