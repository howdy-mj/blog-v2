import metaData from '@config/metaData';
import { removeHtmlTagFromString } from '@utils/parseData';
import { FrontMatter } from '@utils/getFiles';

export type RssContent = {
  frontMatter: FrontMatter;
  content: string;
  slug: string;
};

const generateRssItem = (content: RssContent) => {
  const { title, summary, date, tags } = content.frontMatter;
  return `
    <item>
      <guid>${metaData.siteUrl}/${content.slug}</guid>
      <title>${removeHtmlTagFromString(title)}</title>
      <link>${metaData.siteUrl}/${content.slug}</link>
      ${summary && `<description>${removeHtmlTagFromString(summary)}</description>`}
      <pubDate>${new Date(date).toUTCString()}</pubDate>
      <author>${metaData.email} (${metaData.name})</author>
      ${tags && tags.map((tag) => `<category>${tag}</category>`).join('')}
      ${
        content.content &&
        `<content:encoded>${removeHtmlTagFromString(content.content)}</content:encoded>`
      }
    </item>
  `;
};

const generateRss = (contents: RssContent[], page = 'rss.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="http://search.yahoo.com/mrss/">
    <channel>
      <title>${removeHtmlTagFromString(metaData.title)}</title>
      <link>${metaData.siteUrl}</link>
      <description>${removeHtmlTagFromString(metaData.description)}</description>
      <language>${metaData.language}</language>
      <managingEditor>${metaData.email} (${metaData.name})</managingEditor>
      <webMaster>${metaData.email} (${metaData.name})</webMaster>
      <lastBuildDate>${new Date(contents[0].frontMatter.date).toUTCString()}</lastBuildDate>
      <atom:link href="${metaData.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${contents.map(generateRssItem).join('')}
    </channel>
  </rss>
`;
export default generateRss;
