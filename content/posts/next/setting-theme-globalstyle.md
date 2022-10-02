---
title: 'Next.js에서 Globalstyle 적용하기'
date: '2020-7-15'
tags: ['next', css-in-js]
draft: false
---

GlobalStyle은 User agent stylesheet(웹 브라우저의 기본 속성값)을 제거하기 위해 많이 설정한다.

## Next.js에서 Globalstyle 적용하기

Next.js는 `_app.js`와 `_document.js`가 제일 처음에 실행된다. (참고: [Next.js 구동방식](https://howdy-mj.me/next/next-js-intro/#nextjs%EC%9D%98-ssr))

```
node_modules/
pages
├─ _app.js
├─ _document.js
└─ index.js
package.json
package-lock.json
```

Next.js의 기본 구조는 위와 같으며, GlobalStyle은 `_app.js`에서 설정하면 된다.

<span class="file-location">\_app.js</span>

```js
// external modules
import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'styled-components'

// internal modules
import GlobalStyle from '../components/GlobalStyle'
import theme from '../components/theme'

class WrappedApp extends App {
  render() {
    const { Component, ...other } = this.props
    return (
      <>
        <GlobalStyle>
          <ThemeProvider theme={theme}>
            <Component {...other} />
          </ThemeProvider>
        </GlobalStyle>
      </>
    )
  }
}

export default WrappedApp
```

구조는 React와 크게 다르지 않지만, 추가된 게 있다면 `Component, ...other`이다.

여기서 `Component`는 `pages` 폴더에 있는 것을 말하며, 모든 컴포넌트를 `ThemeProvider`와 `GlobalStyle`로 감싸주어 어디에서든 적용되게 하는 것이다.

### GlobalStyle

GlobalStyle의 기본 틀은 아래와 같다.

<span class="file-location">GlobalStyle.js</span>

```js
const GlobalStyle = props => {
  return (
    <div className="page-layout">
      {props.children}
      <style jsx global>
        {`
          * {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
            box-sizing: border-box;
          }
        `}
      </style>
    </div>
  )
}

export default GlobalStyle
```

### theme.js

필자의 경우 `theme.js`에는 반응형 breakpoint와 색상을 넣어두었다.

```js
const size = {
  mobile: '400px',
  tablet: '768px',
  laptopS: '1023px',
  laptopM: '1239px',
  desktop: '1240px',
}

const theme = {
  mainColor: '#0055b8',
  subColor: '#0a4297',
  mobile: `(max-width): ${size.mobile}`,
  tablet: `(max-width: ${size.tablet})`,
  laptopS: `(max-width: ${size.laptopS})`,
  laptopM: `(max-width: ${size.laptopM})`,
  desktop: `(min-width: ${size.desktop})`,
}

export default theme
```

이렇게 설정하고 바로 `npm run dev`를 하면 가끔 적용이 안 되는 경우가 있다.

이때는 `npm run build`로 먼저 정적 페이지를 생성하고 다시 `npm run dev`를 하면 정상적으로 적용되는 것을 볼 수 있다.

<br />

**참고**

<div style="font-size: 12px;">

- https://nextjs.org/docs/advanced-features/custom-app

</div>
