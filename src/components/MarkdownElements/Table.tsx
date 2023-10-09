import React from 'react';
import styled from 'styled-components';

// TODO: 삭제
export const Table = ({ children }: JSX.IntrinsicElements['table']) => {
  return <StyledTable>{children}</StyledTable>;
};

const StyledTable = styled.table`
  width: 100%;
  margin-bottom: 2rem;
  border-collapse: collapse;

  thead {
    border-bottom: 1px solid var(--border2);
  }

  * {
    padding: 0.5rem 1rem;
  }
`;
