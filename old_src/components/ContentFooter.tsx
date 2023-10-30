import React from 'react';
import styled from 'styled-components';
import metaData from '@config/metaData';

const ContentFooter = () => {
  return (
    <Container>
      <CopyRightText>
        {metaData.name} • © 2022 •
        <a
          href="https://github.com/howdy-mj/howdy-nextjs-starter"
          target="_blank"
          rel="noreferrer noopener"
        >
          {' '}
          howdy-nextjs-starter
        </a>
      </CopyRightText>
    </Container>
  );
};

export default ContentFooter;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 7rem;
`;

const CopyRightText = styled.p`
  color: var(--text-description);
  font-size: 1.4rem;
`;
