import React, { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

type TagItemProps = {
  tag: string;
  onClick: (value: string) => void;
} & Omit<ComponentPropsWithoutRef<'div'>, 'onClick'>;

const TagItem = ({ tag, onClick, ...restProps }: TagItemProps) => {
  return (
    <Container onClick={() => onClick(tag)} {...restProps}>
      {tag}
    </Container>
  );
};

export default TagItem;

const Container = styled.div`
  color: var(--text-primary);
  cursor: pointer;
`;
