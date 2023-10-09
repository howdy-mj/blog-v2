import styled from 'styled-components';

// TODO: 삭제
export const Ol = ({ children }: JSX.IntrinsicElements['ol']) => {
  return <StyledOl>{children}</StyledOl>;
};

const StyledOl = styled.ol`
  padding: 0 1rem;
  list-style-type: decimal;

  > li {
    list-style-type: decimal;
    line-height: 2;
  }
`;

export const Ul = ({ children }: JSX.IntrinsicElements['ul']) => {
  return <StyledUl>{children}</StyledUl>;
};

const StyledUl = styled.ul`
  padding: 0 1rem;
  list-style-type: disc;
`;

export const Li = ({ children }: JSX.IntrinsicElements['li']) => {
  return <StyledLi>{children}</StyledLi>;
};

const StyledLi = styled.li`
  list-style: circle inside;
  line-height: 1.7;
`;
