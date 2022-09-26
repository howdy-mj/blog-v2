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
    margin: 1.5rem 0;

    > p {
      text-align: center;
      font-size: 1.2rem;
      color: gray;
      margin-top: 5px;
    }
  }
`;
