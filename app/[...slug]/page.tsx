import { Metadata } from 'next';
import metaData from '@config/metaData';
import { Content, getFilePath, getSlugContents, getSlugPaths } from '@utils/getFiles';
import MdxComponent, { MdxComponentProps } from '@components/MarkdownElements/MdxComponent';
import BlogPostContainer from 'components/BlogPostContainer';

// TODO: SEO
export const metadata: Metadata = {
  title: `Blog | ${metaData.title}`,
};

type BlogPostPageProps = {
  params: {
    slug: string[];
  };
};
export default async function BlogPostPage({ params: { slug } }: BlogPostPageProps) {
  const { frontMatter, mdxSource } = await getPostData(slug);
  console.log(frontMatter);
  return (
    <>
      {/*<BlogPostContainer*/}
      {/*  frontMatter={frontMatter}*/}
      {/*  contentSection={<MdxComponent mdxSource={mdxSource} />}*/}
      {/*/>*/}
      BlogPostPage
    </>
  );
}

export async function generateStaticParams() {
  const paths = getSlugPaths('posts');
  return [...paths];
}

const getPostData = async (slug: string[]) => {
  const filePath = getFilePath(slug);
  const { frontMatter, mdxSource, content } = await getSlugContents('posts', filePath);

  return {
    frontMatter,
    mdxSource,
    slug,
    content,
  };
};
