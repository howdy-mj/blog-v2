import { css } from 'styled-components';

export const codeStyle = css`
  .remark-code-title {
    padding: 0.5rem 1rem;
    font-weight: 500;
    border: 1px solid var(--border1);
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;

    & + .pre-wrapper {
      margin-top: 0;

      > div > pre {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        margin-top: 0;
      }
    }
  }

  :where(code):not(:where([class~='pre-wrapper'] *)) {
    padding: 0.3rem 0.5rem;
    font-size: 1.5rem;
    background-color: var(--bg-secondary);
    border-radius: 0.6rem;
  }

  .code-highlight {
    display: inline-block;
    min-width: 100%;
  }

  .highlight-line {
    display: block;
    margin: 0 -1.5rem;
    padding: 0 1.6rem;
    background-color: rgba(224, 224, 224, 0.2);
  }
`;
