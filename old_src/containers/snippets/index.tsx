import React from 'react';
import Link from 'next/link';
import Layout from '@components/Layout';
import { Title } from '@components/Typography.style';
import styled from 'styled-components';
import { ROUTES } from '@constants/routes';
import { Content } from '@utils/getFiles';
import Snippets from '@containers/snippets/components/Snippets';
import NoticeText from '@components/NoticeText';

type SnippetsContainerProps = {
  snippets: Content[];
};

const SnippetsContainer = ({ snippets }: SnippetsContainerProps) => {
  return (
    <Layout>
      <TitleWrapper>
        <Title>Snippets</Title>
      </TitleWrapper>
      {snippets.length > 0 ? (
        <Snippets snippets={snippets} />
      ) : (
        <NoticeText notice="No Snippets Yet." />
      )}
    </Layout>
  );
};

export default SnippetsContainer;

const TitleWrapper = styled.div`
  padding-bottom: 2rem;
`;
