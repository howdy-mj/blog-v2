import React from 'react';
import styled from 'styled-components';
import TagItem from '@containers/blog/components/TagItem';

type TagListProps = {
  searchedValue: string;
  tags: string[];
  onClick: (value: string) => void;
};

const TagList = ({ searchedValue, tags, onClick }: TagListProps) => {
  const isActiveTag = (tag: string): boolean => {
    const keywords = searchedValue.split(' ').filter((keyword) => keyword);
    return keywords.includes(tag);
  };

  return (
    <Container>
      {tags.map((tag) => (
        <StyledTagItem key={tag} tag={tag} onClick={onClick} $isActive={isActiveTag(tag)} />
      ))}
    </Container>
  );
};

export default TagList;

const Container = styled.div`
  display: flex;
  margin-bottom: 1rem;
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }

  & > * {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

const StyledTagItem = styled(TagItem)<{ $isActive: boolean }>`
  white-space: nowrap;
  color: ${(p) => (p.$isActive ? `var(--text-primary)` : `var(--text-description)`)};
  &:hover {
    color: var(--text-primary);
  }
`;
