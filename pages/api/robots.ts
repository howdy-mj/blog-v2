import { NextApiRequest, NextApiResponse } from 'next';
import metaData from '@config/metaData';

const siteUrl = metaData.siteUrl;

const robotsTxt = `
User-agent: *
Allow: /
Disallow: /api/
Sitemap: ${siteUrl}/sitemap.xml
`;

export default function robotsHandler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(robotsTxt.trim());
}
