import { css } from 'styled-components';

export const contentStyle = css`
  // 메서드 (주로 영문)
  .variable {
    font-family: 'Times New Roman';
  }

  // 이미지
  .img-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem 0;

    > p {
      text-align: center;
      font-size: 1.2rem;
      color: gray;
      margin-top: 5px;
    }
  }
`;

export const blogV1ContentStyle = css`
  // 서두
  .intro {
    font-style: italic;
    font-size: 13px;
    color: gray;

    > p {
      margin-bottom: 0;
    }
  }

  // 메서드 (주로 영문)
  .variable {
    font-family: 'Times New Roman';
  }
  // 정의된 객체..?
  .object {
    font-family: Consolas, Monaco, monospace;
  }
  // 반환 값
  .return {
    font-family: monospace;
  }

  // 단어 정의
  .definition {
    font-family: Roboto;
    font-weight: bold;
    line-height: 1;
  }

  // ecmascript
  .terminal {
    display: inline-block;
    font-family: monospace;
    font-weight: bold;
    white-space: no-wrap;
  }
  .nonterminal {
    font-family: 'Times New Roman';
    font-style: italic;
  }
  .opt {
    font-family: monospace;
    color: #b58900;
  }
  .notation {
    font-family: 'Times New Roman';
    color: #2aa198;
  }

  /* 이미지 */
  // 내부 이미지
  .img {
    &-div {
      margin: 0 auto;
      width: 100%;

      > p {
        text-align: center;
        font-size: 12px;
        color: gray;
        margin-top: 5px;
      }
    }
  }
  // 외부 이미지
  .img {
    &-refer {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      > img {
        display: block;
        max-width: 100%;
        margin-bottom: 0;
      }

      > p {
        text-align: center;
        font-size: 12px;
        color: gray;
        margin-top: 5px;
      }
    }
  }

  // 중간 설명
  .explain {
    font-size: 14px;
    > p {
      margin-bottom: 0;
    }
  }

  // 파일 이름
  .file-location {
    margin-top: 10px;
    display: inline-block;
    background-color: #0b6e99;
    color: #fdfdfd;
    font-family: monospace;
    font-size: 13px;
    padding: 4px 5px;
    border-radius: 5px;

    &::before {
      content: '> ';
    }
  }

  .post-link {
    color: #0687f0;
    font-style: italic;
    text-decoration: underline;
  }

  // 참조
  .refer {
    font-size: 12px;
    color: #ced4da;
  }

  .callout {
    padding-left: 20px;
    margin-left: 20px;
    border-left: 5px solid #e5e5e5;
  }

  .bold {
    font-weight: bold;
    line-height: 1;
  }

  .italic {
    font-style: italic;
  }
  .normal {
    font-style: normal;
  }

  .underline {
    text-decoration: underline;
  }

  .small {
    font-size: 14px;
  }
  .big {
    font-size: 18px;
  }

  .center {
    text-align: center;
  }

  .fix {
    text-decoration: line-through;
  }

  // 용어 정리
  details {
    summary {
      cursor: pointer;
      margin-bottom: 10px;
      font-weight: bold;

      //&::before {
      //  content: '▶︎ ';
      //}
      //
      //@media not all and (min-resolution: 0.001dpcm) {
      //  @supports (-webkit-appearance: none) {
      //    &::before {
      //      content: '';
      //    }
      //  }
      //}

      &:hover {
        animation-duration: 3s;
        animation-name: rainbowLink;
        animation-iteration-count: infinite;
      }
    }
  }

  @keyframes rainbowLink {
    0% {
      color: #ff2a2a;
    }
    15% {
      color: #ff7a2a;
    }
    30% {
      color: #ffc52a;
    }
    45% {
      color: #43ff2a;
    }
    60% {
      color: #2a89ff;
    }
    75% {
      color: #202082;
    }
    90% {
      color: #6b2aff;
    }
    100% {
      color: #e82aff;
    }
  }
`;
