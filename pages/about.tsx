import React from 'react';
import AboutContainer from '@containers/about';
import metaData from '@config/metaData';
import { PageSEO } from '@components/SEO';
import { getSlugContents } from '@utils/getFiles';
import MdxComponent, { MdxComponentProps } from '@components/MarkdownElements/MdxComponent';

type AboutPageProps = {} & MdxComponentProps;

const AboutPage = ({ mdxSource }: AboutPageProps) => {
  return (
    <>
      <PageSEO title={`About | ${metaData.title}`} />
      <AboutContainer contentSection={<MdxComponent mdxSource={mdxSource} />} />
    </>
  );
};

export default AboutPage;

export const getStaticProps = async () => {
  const { mdxSource } = await getSlugContents('about', 'about');

  return {
    props: {
      mdxSource,
    },
  };
};
