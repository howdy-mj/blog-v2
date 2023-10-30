import React, { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import styled from 'styled-components';

type ButtonProps = {} & ComponentPropsWithoutRef<'button'>;

const Button = ({ children, ...restProps }: PropsWithChildren<ButtonProps>) => {
  return <Container {...restProps}>{children}</Container>;
};

export default Button;

const Container = styled.button`
  background-color: var(--bg-button);
  padding: 1rem 2rem;
  width: 100%;
  color: var(--text-button);
  border: 1px solid transparent;
  border-radius: 0.4rem;

  &:hover {
    background-color: var(--bg-primary);
    color: var(--border1);
    border-color: var(--border1);
  }
`;
