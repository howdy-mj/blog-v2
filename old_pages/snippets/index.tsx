import React from 'react';
import metaData from '@config/metaData';
import SnippetsContainer from '@containers/snippets';
import { PageSEO } from '@components/SEO';
import { Content, getAllFiles } from '@utils/getFiles';
import { sortByLastModDate } from '@utils/sortByDate';

type SnippetsProps = {
  snippets: Content[];
};

const Snippets = ({ snippets }: SnippetsProps) => {
  return (
    <>
      <PageSEO title={`Snippets | ${metaData.title}`} />
      <SnippetsContainer snippets={snippets} />
    </>
  );
};

export default Snippets;

export const getStaticProps = () => {
  const snippets = sortByLastModDate(getAllFiles('snippets'));

  return {
    props: {
      snippets,
    },
  };
};
