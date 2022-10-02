---
title: Styled Components를 Global에서 사용하기(w/반응형)
date: '2020-9-16'
tags: [css, css-in-js]
draft: false
---

_해당 글은 React를 기준으로 작성되었습니다._

## Styled Components란?

Styled Components는 CSS-in-JS의 하나로, CSS를 하나의 컴포넌트로 만들어 주는 것이다.

**Styled Components 설치**

```shell
$ npm install --save styled-components
```

<iframe src="https://codesandbox.io/embed/styled-components-intro-1tk8k?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="styled-components-intro"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

Button 자체가 하나의 Component가 되어 props도 바로 넘겨줄 수 있다.

더 자세한 내용은 공식 [홈페이지](https://styled-components.com/)를 참고하길 바란다.

<br>

프로젝트를 진행하다보면 공통적으로 사용해야 하는 스타일이 있다.

대표적인 예로는 색상, 폰트, padding/margin 그리고 반응형 breakpoint 등이 존재한다.

물론 컴포넌트 수가 몇 개 없고, 추가 할 스타일도 별로 없다면 각 컴포넌트에서 코딩해도 전혀 문제 없다. 하지만 프로젝트 규모가 커지면 여러 곳에서 해당 스타일을 반복적으로 작성해야 하며, 하는 도중에 숫자를 잘못 적는다던지, 오타가 있어 스타일이 제대로 적용되지 않을 수도 있다.

이러한 실수를 방지하고 더 편하게 코딩하고자 전역에서 사용할 수 있는 스타일을 만드는 것이 좋다.

## Global에서 사용될 style 생성 및 적용

아래 예제에서는 메인컬러와 반응형을 다뤄보겠다.

<span class="file-location">src/style/theme.js</span>

```js
const size = {
  mobile: '600px',
  tablet: '900px',
  laptop: '1200px',
  desktop: '1800px',
}

const theme = {
  mainColor: '#0a4297',
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  desktop: `(min-width: ${size.desktop})`,
}

export default theme
```

Breakpoint는 기기의 크기보다는 비슷한 종류를 묶어 정하는 것이 좋다. 예를 들면 핸드폰, 태블릿, 노트북 등 비슷한 그룹을 생각하면 된다.

웹 화면을 중심으로 모바일 화면을 조절한다면 `max-width`를 쓰고, 모바일 중점인 웹 화면을 조절하면 `min-width`를 사용한다. 본 글에서는 1200 ~ 1800px을 중점으로 작은 기기의 화면을 맞추는 것이기에 `max-width`를 썼다.

그리고 브라우저에 존재하는 기본 CSS 스타일(user agent stylesheet)을 제거해주기 위해 `global.js`도 만들어 보자.

<span class="file-location">src/style/global.js</span>

```js
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;  
  }

  body {
    box-sizing: border-box;
  }
`

export default GlobalStyle
```

이제 만든 두개의 `.js` 파일을 전역에 적용시켜 보자.

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ThemeProvider } from 'styled-components'
import theme from './style/theme'
import GlobalStyle from './style/global'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
      <GlobalStyle />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

그리고 이제 어느 컴포넌트에서든 스타일을 적용할 수 있다.

```js
// 반응형

const MainWrap = styled.main`
  width: 1200px;

  @media ${props => props.theme.tablet} {
    width: 100%;
    margin: 0 auto;
  }
`

// 색상
const MainText = styled.div`
  color: ${props => props.theme.mainColor};
`
```
