import { createGlobalStyle, css } from 'styled-components';
import { codeStyle } from './code.style';
import { aboutStyle } from './about.style';
import { contentStyle } from './content.style';

const lightTheme = css`
  --bg-primary: #fcfcff;
  --bg-secondary: #e5e5e5;
  --bg-button: #262738;
  --text-basic: #000000;
  --text-primary: #2f2fff;
  --text-description: #7d7d7d;
  --text-button: #e0e0e0;
  --text-info: #9e9e9e;
  --text-black: #000000;
  --text-link: #3c63f0;
  --border1: #262738;
  --border2: #e0e0e0;
  --hover1: #eff9ff;
`;

const darkTheme = css`
  --bg-primary: #141d26;
  --bg-secondary: #363636;
  --bg-button: #f5f5f5;
  --text-basic: #efefef;
  --text-primary: #8282f8;
  --text-description: #586c81;
  --text-button: #141d26;
  --text-info: #586c81;
  --text-black: #000000;
  --text-link: #7474fc;
  --border1: #efefef;
  --border2: #a7a7a7;
  --hover1: #212c37;
`;

const GlobalStyle = createGlobalStyle`
  body, body[data-theme='light'] {
    ${lightTheme}
  }
  body[data-theme='dark'] {
    ${darkTheme}
  }
  @media (prefers-color-scheme: dark) {
    body {
      ${darkTheme}
    }
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    font-size: 10px;
    height: 100vh;
    width: 100%;
  }
  body {
    background-color: var(--bg-primary);
    color: var(--text-basic);
    font-size: 1.6rem;
    font-family: 'Roboto', sans-serif, monospace;
    transition: all 0.5s ease-in-out;
  }
  a {
    &:link,
    &:visited,
    &:hover,
    &:active {
      color: inherit;
      text-decoration: inherit;
    }
  }
  input,
  select,
  button {
    -webkit-appearance: none;
    background: none;
    border: none;
    font-size: inherit;
    color: inherit;
    &:focus {
      outline: none;
    }
    &:disabled {
      cursor: not-allowed;
    }
  }
  a, button {
    cursor: pointer;
  }
  pre {
    white-space: pre-line;
  }
  ul, li {
    list-style: none;
  }
  img {
    max-width: 100%;
  }

  ${codeStyle};
  ${aboutStyle};
  ${contentStyle};
`;

export default GlobalStyle;
