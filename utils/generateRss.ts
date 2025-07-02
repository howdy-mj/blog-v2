import metaData from '@config/metaData';
import { removeHtmlTagFromString } from '@utils/parseData';
import { FrontMatter } from '@utils/getFiles';

export type RssContent = {
  frontMatter: FrontMatter;
  content: string;
  slug: string;
};

const escapeXml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

const escapeCdata = (text: string) => {
  return text.replaceAll(']]>', ']]]]><![CDATA[>');
};

const safeContent = (content: string) => {
  const wrapped = `<p>${content}</p>`;
  return escapeCdata(wrapped)
    .replace(/\$\{[^}]+\}/g, '')
    .replace(/src="\/([^"]+)"/g, `src="${metaData.siteUrl}/$1"`)
    .replace(/style="[^"]*"/g, '')
    .replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;');
};

const generateRssItem = (content: RssContent) => {
  const { title, summary, date, tags } = content.frontMatter;
  const description = summary || title || 'No description';

  return `
    <item>
      <guid>${escapeXml(`${metaData.siteUrl}/${content.slug}`)}</guid>
      <title>${escapeXml(removeHtmlTagFromString(title))}</title>
      <link>${escapeXml(`${metaData.siteUrl}/${content.slug}`)}</link>
      <description>${escapeXml(removeHtmlTagFromString(description))}</description>
      <pubDate>${new Date(date).toUTCString()}</pubDate>
      <author>${escapeXml(`${metaData.email} (${metaData.name})`)}</author>
      ${tags && tags.length > 0 && tags.map((tag) => `<category>${tag}</category>`).join('')}
      ${
        content.content &&
        `<content:encoded><![CDATA[${safeContent(content.content)}]]></content:encoded>`
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
