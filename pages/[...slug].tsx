import React, { useMemo } from 'react';
import metaData from '@config/metaData';
import { removeHtmlTagFromString } from '@utils/parseData';
import { Content, getFilePath, getSlugContents, getSlugPaths } from '@utils/getFiles';
import BlogSlugContainer from '@containers/blog/[slug]';
import MdxComponent, { MdxComponentProps } from '@components/MarkdownElements/MdxComponent';
import { BlogSEO } from '@components/SEO';

type BlogSlugProps = { slug: string; content: string } & MdxComponentProps & Content;

const BlogSlug = ({ frontMatter, mdxSource, slug, content }: BlogSlugProps) => {
  const description = useMemo(
    () => (content ? `${removeHtmlTagFromString(content).slice(0, 150)}...` : ''),
    [content]
  );

  return (
    <>
      <BlogSEO
        canonicalUrl={`${metaData.siteUrl}/${slug}`}
        summary={frontMatter.summary || description}
        {...frontMatter}
      />
      <BlogSlugContainer
        frontMatter={frontMatter}
        contentSection={<MdxComponent mdxSource={mdxSource} />}
      />
    </>
  );
};

export default BlogSlug;

export const getStaticPaths = () => {
  const paths = getSlugPaths('posts');

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
  const { frontMatter, mdxSource, content } = await getSlugContents('posts', filePath);

  return {
    props: {
      frontMatter,
      mdxSource,
      slug,
      content,
    },
  };
};
