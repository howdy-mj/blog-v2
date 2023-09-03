import React from 'react';
import styled from 'styled-components';

export const H1 = ({ children }: JSX.IntrinsicElements['h1']) => {
  return <H1Text>{children}</H1Text>;
};

const H1Text = styled.h1`
  font-size: 2.8rem;
  margin-top: 8rem;
  margin-bottom: 3rem;
  border-bottom: 1px solid var(--border2);
`;

export const H2 = ({ children }: JSX.IntrinsicElements['h2']) => {
  return <H2Text>{children}</H2Text>;
};

const H2Text = styled.h2`
  font-size: 2.4rem;
  margin-top: 5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border2);
`;

export const H3 = ({ children }: JSX.IntrinsicElements['h3']) => {
  return <H3Text>{children}</H3Text>;
};

const H3Text = styled.h3`
  font-size: 2rem;
  margin-top: 3.5rem;
  margin-bottom: 1.5rem;
`;

export const H4 = ({ children }: JSX.IntrinsicElements['h4']) => {
  return <H4Text>{children}</H4Text>;
};

const H4Text = styled.h3`
  font-size: 2rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

export const P = ({ children }: JSX.IntrinsicElements['p']) => {
  return <PText>{children}</PText>;
};

const PText = styled.p`
  line-height: 1.8;
  margin-bottom: 0.8rem;
`;
