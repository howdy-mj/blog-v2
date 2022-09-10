import React, { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

type NoticeTextProps = {
  notice: string;
} & ComponentPropsWithoutRef<'div'>;

const NoticeText = ({ notice }: NoticeTextProps) => {
  return <Container>{notice}</Container>;
};

export default NoticeText;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 5rem 0;
`;
