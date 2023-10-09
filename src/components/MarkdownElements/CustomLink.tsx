import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

type AnchorProps = {} & JSX.IntrinsicElements['a'];
// TODO: 삭제
const CustomLink = ({ href, children }: AnchorProps) => {
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');

  if (isInternalLink) {
    return (
      <Link href={href} passHref>
        <LinkText>{children}</LinkText>
      </Link>
    );
  }
  if (isAnchorLink) {
    return <LinkText href={href}>{children}</LinkText>;
  }

  if (href?.match('http')) {
    return (
      <LinkText href={href} target="_blank" rel="noreferrer noopener">
        {children}
      </LinkText>
    );
  }
  return (
    <LinkText href={href} target="_blank">
      {children}
    </LinkText>
  );
};

export default CustomLink;

const LinkText = styled.a`
  color: var(--text-link) !important;

  &:hover {
    text-decoration: underline;
  }
`;
