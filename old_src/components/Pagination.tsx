import React from 'react';
import styled, { css } from 'styled-components';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

type PaginationProps = {
  currentPage: number;
  totalPage: number;
  onChangeCurrent: (page: number) => void;
};

const Pagination = ({ currentPage, totalPage, onChangeCurrent }: PaginationProps) => {
  return (
    <Container>
      <ArrowButton disabled={currentPage === 1} onClick={() => onChangeCurrent(currentPage - 1)}>
        <StyledArrowLeft />
      </ArrowButton>
      <CurrentPageText>{currentPage}</CurrentPageText> <TotalPageText>{totalPage}</TotalPageText>
      <ArrowButton
        disabled={currentPage === totalPage}
        onClick={() => onChangeCurrent(currentPage + 1)}
      >
        <StyledArrowRight />
      </ArrowButton>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 2rem;
`;

const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  margin: 0 1rem;
  cursor: pointer;

  &:hover {
    background-color: var(--hover1);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const iconStyle = css`
  font-size: 2.5rem;
`;

const StyledArrowLeft = styled(RiArrowLeftSLine)`
  ${iconStyle};
`;

const StyledArrowRight = styled(RiArrowRightSLine)`
  ${iconStyle};
`;

const CurrentPageText = styled.span``;

const TotalPageText = styled.span`
  &:before {
    content: '/';
  }
`;
