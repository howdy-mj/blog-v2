---
title: emotion.js 소개 및 사용법 (feat. CSS-in-JS)
date: '2020-6-9'
tags: [css, css-in-js]
draft: false
---

<div style="font-size: 12px; font-style: italic; ">
업데이트: 2021.05.12 <br />
- 주요 내용: @emotion/core 10.0.28 => @emotion/react 11.4.0
<br />
<br />
업데이트: 2021.05.19 <br />
- 주요 내용: Global에서 사용하기, type 설정
</div>

## emotion.js란?

<span class="return">emotion.js</span>는 CSS-in-JS의 종류 중 하나로 JavaScript 안에서 스타일을 작성할 수 있게 해준다.

<span class="return">emotion.js</span>는 주로 <span class="variable bold">Framework Agnostic</span><span style="font-size: 14px;">(\*쉽게 말하면 프레임워크를 사용하지 않는 것)</span>과 <span class="variable bold">React</span> 두 가지 방식으로 사용된다.

## emotion.js 설치

```shell
# Framework Agnostic
$ npm install @emotion/css

# React
$ npm install @emotion/react
```

```json
// 해당 글에서 사용된 버전
"dependencies": {
    "@emotion/react": "^11.4.0",
    "@emotion/styled": "^11.3.0",
    "react": "^17.0.2",
    "@emotion/babel-plugin": "^11.3.0"
}
```

## import 하기

<span class="return">emotion.js</span>를 사용해야 할 컴포넌트에 먼저 import를 해야 한다.

```js{1}
/** @jsx jsx */
import { jsx, css } from '@emotion/react'
```

`/** @jsx jsx */`는 babel에게 `React.createElement` 대신 jsx를 jsx라는 함수로 변환하라는 뜻이다. <span style="font-size: 14px;">(출처: [jsx-pragma](https://emotion.sh/docs/css-prop#jsx-pragma))</span>

단순히 주석이라 생각하고 쓰지 않는다면 `@emotion/react`가 적용되지 않는다.

### 에러 발생

위의 코드를 따라 치면 `SyntaxError: ... pragma and pragmaFrag cannot be set when runtime is automatic.`와 같은 에러가 뜬다.
이는 리액트가 런타임에서 해당 줄을 인식하지 못하기 때문에 발생하는 에러이다.

가장 쉬운 방법은 <a href="https://emotion.sh/docs/css-prop#jsx-pragma" target="_blank">공식 문서</a>에 나온 것처럼 import문을 바꾸는 것이다.

```js
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
```

혹은, <a href="https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html" target="_blank">the new JSX runtimes</a>을 지원하는 리액트에서는 런타임에 import가 가능하다고 나와있다. 필자는 현재 CRA 4+를 사용함에도 불구하고 자동으로 안돼서 babel을 설정해보았다.

```shell
$ npm install -D @babel/preset-react @emotion/babel-plugin
```

```json
// .babelrc
{
  "presets": [
    [
      "@babel/preset-react",
      { "runtime": "automatic", "importSource": "@emotion/react" }
    ],
    ["@emotion/babel-preset-css-prop"]
  ],
  "plugins": ["@emotion/babel-plugin"]
}
```

하지만 이것도 제대로 작동하지 않아서 우선 공식 문서에 나온 방법대로 진행한다. _(+추후 추가)_

만약 `@emotion/styled`를 사용한다면, 위의 import를 하지 않아도 바로 사용할 수 있다.

```js
import styled from '@emotion/styled'
```

그리고 Global Theme으로 설정한 변수를 바로 사용하기에는 `@emotion/styled`가 훨씬 편하다. 사용법은 `styled-components`와 똑같다.

### 기본 구조

공식 문서에 있는 예문을 같이 살펴보자.

<iframe
src="https://codesandbox.io/embed/emotionjs-intro-1ysvo?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:200px; border:0; border-radius: 4px; overflow:hidden;"
title="emotion.js intro"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-autoplay allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

```jsx
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'

const divStyle = css`
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  padding: 32px;
  text-align: center;
  &:hover {
    color: white;
  }
`

export default function App() {
  return <div css={divStyle}>Hover to change color.</div>
}
```

기존에 <span class="return">styled-components</span>를 써본 사람이라면 익숙한 구조일 것이다.

```jsx
import styled from 'styled-components'

const DivStyle = styled.div`
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  padding: 32px;
  text-align: center;
  &:hover {
    color: white;
  }
`

export default function App() {
  return <DivStyle>Hover to change color.</DivStyle>
}
```

개인적으로 <span class="return">emotion.js</span>가 더 편하다고 느낀 점은, jsx안에서 이게 어떤 태그인지 바로 알 수 있다는 점이다.

<span class="return">styled-components</span>는 component 이름에 `div`, `p`등을 써놓지 않으면 이게 어떤 태그인지 바로 알 수 없다. 만약 해당 js파일에 내용이 많아 일일히 찾아야 한다면 엄청 번거롭다.

만약 <span class="return">styled-components</span>처럼 사용하고 싶다면, @emotion/styled를 설치하면 된다.

```shell
$ npm install @emotion/styled @emotion/react
```

```js
import styled from '@emotion/styled'

const DivStyle = styled.div`
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  padding: 32px;
  text-align: center;
  &:hover {
    color: white;
  }
`

export default function App() {
  return <DivStyle>Hover to change color.</DivStyle>
}
```

### 라벨링

`emotion.js`는 <span class="return">styled-components</span>처럼 브라우저에서 열었을 때 className을 임의로 생성해준다.

<p style="text-align: center;"><img src="https://user-images.githubusercontent.com/58619071/193414808-8b2d42a5-8a95-409b-85fa-3d6e21fcd43a.PNG" /></p>

이는 <a href="https://emotion.sh/docs/@emotion/babel-plugin" target="_blank">@emotion/babel-plugin</a>을 사용하면 커스터마이징이 가능하다.

```shell
$ npm install --save-dev @emotion/babel-plugin
# or
$ yarn add --dev @emotion/babel-plugin
```

```jsx{10}
const divStyle = css`
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  padding: 32px;
  text-align: center;
  &:hover {
    color: white;
  }
  label: divStyle;
`
```

```html
<div class="css-mfy11-divStyle">
  ...
</div>
```

이렇게 바로 `css`에 label을 넣어 변경하는 방법도 있지만, 이는 매번 label 값을 넣어줘야 하고, 다른 개발자들과 같이 일하기에도 불편하기 때문에 `.babelrc`를 만들어 저장하는 것을 권장한다.

<span class="file-location">.babelrc</span>

```json
{
  "plugins": [
    [
      "@emotion",
      {
        "autoLabel": "dev-only", // 기본값 'dev-only'
        "labelFormat": "mj-[dirname]-[filename]-[local]"
      }
    ]
  ]
}
```

_음.. 이번에도 바로 적용이 안된다. 추후 수정 필요_

이 방법 외에도, CRA 2.0+에서 <a href="https://emotion.sh/docs/babel-macros" target="_blank">Babel Macros</a>를 지원하고 있다.

이는 Babel config없이 babel를 전환할 수 있는 것인데, <span class="return">styled-components</span>도 이를 통해 className 라벨을 수정할 수 있다. 하지만 Babel Macros는 몇 최적화 작업이 불가능하기 때문에 `babel-plugin-emotion` 사용을 권장하고 있다.

### 재사용

스타일을 입힌 것을 component로 만들어서 어느 곳에서든 재사용이 가능하다.

<iframe
src="https://codesandbox.io/embed/great-pare-czppt?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:200px; border:0; border-radius: 4px; overflow:hidden;"
title="emotion component"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-autoplay allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

```jsx
/** @jsxImportSource @emotion/react */

const P = props => (
  <p
    css={{
      margin: 0,
      fontSize: 12,
      lineHeight: '1.5',
      fontFamily: 'sans-serif',
      color: 'blue',
    }}
    {...props}
  />
)

const ArticleText = props => (
  <P
    css={{
      fontSize: 20,
      fontFamily: 'Georgia, serif',
      color: 'darkgray',
    }}
    {...props}
  />
)

export default function App() {
  return (
    <div>
      <P>Using P component</P>
      <ArticleText>Using ArticleText component</ArticleText>
    </div>
  )
}
```

같은 CSS 속성이 있다면, 제일 최근 것으로 덮어씌워진다. (ex. `ArticleText`의 fontSize, fontFamily, color로 대체)

만약 component로 사용하여, CSS 속성을 inline으로 쓴다면 따로 `css`를 써줄 필요도 없으며, 속성명을 `camelCase`로 작성해야 한다. (ex. fontSize, fontFamily, backgroundColor 등)

### Nested

<span class="return">emotion.js</span>에서 Nested도 사용가능하다.

```jsx
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'

const paragraph = css`
  color: turquoise;

  a {
    border-bottom: 1px solid red;
    cursor: pointer;
  }
`
render(
  <p css={paragraph}>
    Some text.
    <a>A link with a bottom border.</a>
  </p>
)
```

### 미디어 쿼리

반응형은 일반적으로 사용하는 미디어 쿼리와 사용법이 동일하다.

```jsx
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'

render(
  <p
    css={css`
      font-size: 30px;
      @media (min-width: 420px) {
        font-size: 50px;
      }
    `}
  >
    Some text!
  </p>
)
```

이 외에도, 미리 breakpoint를 선언하여 재사용 가능하게 만드는 법과 `facepaint` 패키지를 설치하여 더 쉽게 breakpoints를 만들 수도 있다.

<a href="https://emotion.sh/docs/media-queries" target="_blank">emotion - Media Queries</a>

## Global Theme 및 Typescript 설정

`styled-components`와 매우 비슷하다. (<a href="https://www.howdy-mj.me/css/styled-components-with-global-style/" target="_blank" class="post-link small">Styled Components를 Global에서 사용하기(w/반응형)</a>)

<span class="file-location">src/styles/global.tsx</span>

```ts
import { Global, css } from '@emotion/react'

const style = css`
  * {
    margin: 0;
    padding: 0;
  }

  body {
    box-sizing: border-box;
  }
`

const GlobalStyle = () => {
  return <Global styles={style} />
}

export default GlobalStyle
```

<span class="file-location">src/styles/theme.ts</span>

```ts
export const size = {
  largest: '75em', // 1200px
  large: '56.25em', // 900px
  medium: '37.5em', // 600px
  small: '31.25em', // 500px
  smallest: '25em', // 400px
}

const theme = {
  mainColor: '#0000ff',
  mq: {
    laptop: `@media only screen and (min-width: ${size.largest})`,
    tablet: `@media only screen and (min-width: ${size.large})`,
    mobile: `@media only screen and (min-width: ${size.small})`,
  },
}

export default theme
```

<span class="file-location">src/styles/emotion.d.ts</span>

```ts
import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    mainColor: string
    mq: {
      laptop: string
      tablet: string
      mobile: string
    }
  }
}
```

타입스크립트를 사용할 경우, theme에 대한 타입 지정이 필요하다. `theme.ts`에서 설정한 것과 동일한 구조의 타입을 넣어주며, 파일 이름은 `emotion.d.ts`여야 한다.

<span class="file-location">src/index.tsx</span>

```jsx
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from '@emotion/react'
import theme from '@styles/theme' // 위치한 경로 설정
import GlobalStyle from '@styles/global' // 위치한 경로 설정

import App from './App'

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
```

잘 설정 되었다면, 어느 컴포넌트에서는 props로 꺼내 사용할 수 있다.

```jsx
// 1. @emotion/styled
import styled from '@emotion/styled'

interface LayoutProps {
  children: React.ReactChild;
}

const Layout = ({ children }: LayoutProps) => {
  return <LayoutWrap>{children}</LayoutWrap>
}

const LayoutWrap = styled.div`
  margin: 0 auto;
  max-width: 1200px;

  ${props => props.theme.mq.tablet} {
    max-width: 800px;
  }
`

export default Layout
```

```jsx
// 2. @emotion/react
/** @jsxImportSource @emotion/react */

const Login = () => {
  return <div css={theme => ({ color: theme.mainColor })}>Login</div>
}

export default Login
```

<br>

## 번외) 왜 CSS-in-JS를 사용할까?

위에 작성된 내용과 종합하여 정리하면 아래와 같다.

- component로 만들어 재사용
- 중복되는 className 해결 (Global namespace)
- 자바스크립트에서 쓰이는 상수, props, 함수 공유하기
- 상속에 의한 영향이 없도록 격리 (Isolation)
- 미사용 코드 처리 (Dead Code Elimination)

어떤 글을 보면 CSS-in-JS로 '디자이너와 협업을 더 원활하게 할 수 있다'고 되어있다. 하지만 개인적으로 CSS-in-JS는 단순히 개발자들이 더 편하게 쓰기 위해 생긴 것이지, 디자이너와 협업을 위해 만들어진 것이 아닌 것 같다. 디자이너에게 가서 CSS-in-JS를 보여주면 어떻게 사용하는지 모르는 사람이 대부분일 것이라 생각한다.

또한, className을 짓지 않아도 된다는 장점이 있다고 하지만, 결국 사용해야 할 이름을 지어야 하는 건 똑같다. 하지만 scope가 있어서 다른 곳에서 중복으로 이름을 사용가능한 장점은 있다.

<br>

**참고**

<div>

- https://cssinjs.org/?v=v10.2.0
- https://d0gf00t.tistory.com/22
- https://medium.com/@okys2010/%EB%AA%A8%EB%8D%98-css-1-css-in-js-c1c53d9bbbc9
- https://medium.com/@oleg008/jss-is-css-d7d41400b635
- https://orezytivarg.github.io/css-evolution-from-css-sass-bem-css-modules-to-styled-components/
- https://ideveloper2.dev/blog/2019-05-05--thinking-about-emotion-js-vs-styled-component/

</div>
