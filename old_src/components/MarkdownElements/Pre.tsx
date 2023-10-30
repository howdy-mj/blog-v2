import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { HiCheck, HiOutlineClipboardCopy } from 'react-icons/hi';

type PreProps = {} & JSX.IntrinsicElements['pre'];

const Pre = (pre: PreProps) => {
  const preRef = useRef<HTMLDivElement | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);

  const onCopy = () => {
    setCodeCopied(true);
    navigator.clipboard.writeText(preRef.current?.textContent || '');
    setTimeout(() => {
      setCodeCopied(false);
    }, 2000);
  };

  return (
    <Container className="pre-wrapper" ref={preRef}>
      <PreWrapper>
        <CopyButton onClick={onCopy} isCopied={codeCopied}>
          {codeCopied ? <CheckedIcon isCopied={codeCopied} /> : <CopyIcon />}
        </CopyButton>
        <pre className={pre.className}>{pre.children}</pre>
      </PreWrapper>
    </Container>
  );
};

export default Pre;

const Container = styled.div`
  margin: 1rem 0;
`;

const PreWrapper = styled.div`
  position: relative;

  &:hover {
    & > button {
      display: block;
    }
  }
`;

const CopyButton = styled.button<{ isCopied: boolean }>`
  display: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.3rem 0.5rem;
  border: 1px solid ${(p) => (p.isCopied ? 'green' : '#9e9e9e')};
  border-radius: 0.5rem;

  &:hover {
    background-color: #9e9e9e;
  }
`;

const iconStyle = css`
  display: flex;
  align-items: center;
  color: white;
  font-size: 2rem;
`;

const CheckedIcon = styled(HiCheck)<{ isCopied: boolean }>`
  ${iconStyle};
  color: ${(p) => p.isCopied && 'green'};
`;

const CopyIcon = styled(HiOutlineClipboardCopy)`
  ${iconStyle}
`;
