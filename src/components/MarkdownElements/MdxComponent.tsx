import React from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXComponents } from 'mdx/types';
import Image from "next/image";
import CustomLink from '@components/MarkdownElements/CustomLink';
import Pre from '@components/MarkdownElements/Pre';
import BlockQuote from '@components/MarkdownElements/BlockQuote';
import { H1, H2, H3, H4, P } from '@components/MarkdownElements/TextComponent';
import { Li, Ol, Ul } from '@components/MarkdownElements/ListComponent';
import { Table } from '@components/MarkdownElements/Table';

const components: MDXComponents = {
  Image,
  a: (props) => <CustomLink {...props} />,
  pre: (props) => <Pre {...props} />,
  blockquote: (props) => <BlockQuote {...props} />,
  p: (props) => <P {...props} />,
  h1: (props) => <H1 {...props} />,
  h2: (props) => <H2 {...props} />,
  h3: (props) => <H3 {...props} />,
  h4: (props) => <H4 {...props} />,
  ol: (props) => <Ol {...props} />,
  ul: (props) => <Ul {...props} />,
  li: (props) => <Li {...props} />,
  table: (props) => <Table {...props} />,
};

export type MdxComponentProps = {
  mdxSource: MDXRemoteSerializeResult;
};

const MdxComponent = ({ mdxSource }: MdxComponentProps) => {
  return <MDXRemote {...mdxSource} components={components} />;
};

export default MdxComponent;
