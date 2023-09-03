import React, { useMemo } from 'react';
import MdxComponent, { MdxComponentProps } from '@components/MarkdownElements/MdxComponent';
import { Content, getFilePath, getSlugContents, getSlugPaths } from '@utils/getFiles';
import metaData from '@config/metaData';
import { BlogSEO } from '@components/SEO';
import { removeHtmlTagFromString } from '@utils/parseData';
import SnippetsSlugContainer from '@containers/snippets/[slug]';

type SnippetsSlugProps = { slug: string; content: string } & MdxComponentProps & Content;

const SnippetsSlug = ({ frontMatter, mdxSource, slug, content }: SnippetsSlugProps) => {
  const description = useMemo(
    () => `${removeHtmlTagFromString(content).slice(0, 150)}...`,
    [content]
  );

  return (
    <>
      <BlogSEO
        canonicalUrl={`${metaData.siteUrl}/snippets/${slug}`}
        summary={frontMatter.summary || description}
        {...frontMatter}
      />
      <SnippetsSlugContainer
        frontMatter={frontMatter}
        contentSection={<MdxComponent mdxSource={mdxSource} />}
      />
    </>
  );
};

export default SnippetsSlug;

export const getStaticPaths = () => {
  const paths = getSlugPaths('snippets');

  return {
    paths,
    fallback: false,
  };
};

type GetStaticPropsArgs = {
  params: {
    slug: string[];
  };
};

export const getStaticProps = async ({ params: { slug } }: GetStaticPropsArgs) => {
  const filePath = getFilePath(slug);
  const { frontMatter, mdxSource, content } = await getSlugContents('snippets', filePath);

  return {
    props: {
      frontMatter,
      mdxSource,
      slug,
      content,
    },
  };
};
