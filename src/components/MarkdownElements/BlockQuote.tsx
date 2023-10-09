import React from 'react';
import styled from 'styled-components';

type BlockQuoteProps = {} & JSX.IntrinsicElements['blockquote'];
// TODO: 삭제
const BlockQuote = ({ children }: BlockQuoteProps) => {
  return <Container>{children}</Container>;
};

export default BlockQuote;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0 2rem;
  padding: 1.4rem 2rem;

  border: 1px solid var(--border1);
  border-left: 1rem solid var(--border1);
  border-top-right-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;

  > p {
    margin-bottom: 0;
  }
`;
