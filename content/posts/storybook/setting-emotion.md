---
title: 'Storybook에서 Emotion 설정하기'
date: '2021-10-12'
tags: ['storybook']
draft: false
---

> 해당 글에서 사용된 packages 버전은 아래와 같습니다.

<span class="file-location">package.json</span>

```json
{
  // ...생략
  "dependencies": {
    "@emotion/babel-preset-css-prop": "^11.2.0",
    "@emotion/react": "^11.4.0",
    "@emotion/styled": "^11.3.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.3",
    "typescript": "^4.1.2"
  },
  "devDependencies": {
    "@babel/preset-react": "^7.13.13",
    "@emotion/babel-plugin": "^11.3.0",
    "@storybook/addon-actions": "^6.3.8",
    "@storybook/addon-essentials": "^6.3.8",
    "@storybook/addon-links": "^6.3.8",
    "@storybook/node-logger": "^6.3.8",
    "@storybook/preset-create-react-app": "^3.2.0",
    "@storybook/react": "^6.3.8",
    "babel-loader": "8.1.0"
  }
}
```

만약 react와 storybook의 babel-loader가 상충되어 에러가 뜬다면, `package-lock.json` 혹은 `yarn.lock` 그리고 `node_modules`를 삭제 후 재설치한다.

그 다음에도 에러가 뜬다면 `npm ls babel-loader`로 가장 낮은 babel-loader 버전을 프로젝트에 설치한다. 해당 프로젝트는 8.1.0 버전으로 설치했다.

## Cannot read properties of undefined 에러 해결하기

스토리북을 설치하고, `yarn storybook`으로 스토리북 서버까지 잘 실행되지만, 막상 작성한 Button.stories.index를 열려니 emotion으로 설정한 값을 제대로 불러오지 못했다.

<div class="img-div">
  <img src="https://user-images.githubusercontent.com/58619071/193443064-621396bc-8f0c-4220-9de7-5d75470127e4.png" alt="error">
  <p>Cannot read properties of undefined (reading 'mobile')</p>
</div>

<span class="file-location">src/styles/theme.ts</span>

```ts
const theme: Theme = {
  // ...생략
  mq: {
    laptop: `only screen and (min-width: ${size.largest})`,
    tablet: `only screen and (max-width: ${size.large})`,
    mobile: `only screen and (max-width: ${size.small})`,
  },
}
```

이는 로컬서버에서는 emotion으로 정의한 theme이 잘 적용되었지만, 스토리북에서는 해당 설정을 찾지 못해 뜨는 에러였다.

<br>

스토리북 설정은 `.storybook/main.js`와 `.storybook/preview.js`에서 가능하며, 해결 방법은 아래와 같다.

<span class="file-location">.storybook/main.js</span>

```js
const path = require('path')

const toPath = _path => path.join(process.cwd(), _path)

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  webpackFinal: async config => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@emotion/core': toPath('node_modules/@emotion/react'),
      },
    },
  }),
}
```

따로 설정한 emotion 전역 스타일이 있을 경우, 프로젝트의 `App.tsx`에 설정하는 것처럼, 스토리북에서는 `preview.js`에서 설정해준다.

<span class="file-location">.storybook/preview.js</span>

```js
import { ThemeProvider } from '@emotion/react'

import theme from '../src/styles/theme'
import GlobalStyle from '../src/styles/global'

export const decorators = [
  Story => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Story /> // Canvas 영역을 뜻함
    </ThemeProvider>
  ),
]
```

위처럼 decorators를 통해서 stories 컴포넌트에 공통으로 사용할 스타일이나 요소를 설정할 수 있다. `preview.js`는 모든 stories에 전역으로 설정하는 것이고, 개별 stories내에서도 설정이 가능하다.

```js
// 예시: YourComponent.stories.js | YourComponent.stories.jsx
export default {
  component: YourComponent,
  decorators: [
    Story => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
}
```

## What & Why

### @emotion/core

해당 프로젝트에서는 `@emotion/core` 패키지가 없는데 왜 넣었는지 궁금했다.

그래서 해당 줄을 지우고 다시 켜봤더니, 작동은 하지만, Docs를 들어가보면 에러가 뜬다.

<div class="img-div" style="width: 500px;">
  <img src="https://user-images.githubusercontent.com/58619071/193443062-0b5cc541-93b3-4f17-9f51-8bc54a73197c.png" alt="docs error" >
  <p>Uncaught TypeError: Cannot read properties of undefined (reading 'content')</p>
</div>

해당 버전의 Storybook에서는 `@storybook/addon-essentials` 안에 `@storybook/addon-docs`가 포함되어 있다. 그리고 addon-docs의 package.json을 보니 emotion을 보니 `@emotion/core 10.1.1` 버전이었다. (<a href="https://github.com/storybookjs/storybook/blob/next/addons/docs/package.json#L108:L109" target="_blank">참조</a>)

따라서 스토리북이 구동할 때 필요한 패키지가 무엇인지 알려줘야 한다. 그리고 그 일을 도와주는 것이 <span class="return">resolve</span>의 역할이다.

### webpackFinal

Storybook은 webpack을 통해서 프로젝트에서 만든 컴포넌트들을 우리가 만든 웹 어플리케이션에 보여준다. 그리고 관련 webpack 설정은 `.storybook/main.js` 파일에서 가능하다. (<a href="https://storybook.js.org/docs/react/configure/webpack" target="_blank">참조</a>)

위처럼 Storybook 설정을 변경하기 위해서는 webpack config를 따로 설정해줘야 한다.

<a href="https://webpack.js.org/configuration/resolve/#resolvealias" target="_blank" class="return">resolve.alias</a>는 모듈 내에서 import를 쉽게 생성해주는 것이다. 사용법은 아래와 같다.

```js
const path = require('path')

module.exports = {
  //...
  resolve: {
    alias: {
      Utilities: path.resolve(__dirname, 'src/utilities/'),
      Templates: path.resolve(__dirname, 'src/templates/'),
    },
  },
}
```

해당 글에서는 `toPath`라는 함수를 만들어 사용했다.

```js
const toPath = _path => path.join(process.cwd(), _path)
```

`process.cws()`는 현재 프로젝트의 최상단 폴더를 뜻하고, `__dirname`는 현재 연 파일이 위치한 폴더를 뜻하는 것이다. 만약 여기서도 `__dirname`을 썼더라면, 상대경로로 해당 패키지가 어디 있는지 설정해줘야 한다.

<br />

**참고**

<div style="font-size: 12px;">

- <a href="https://github.com/storybookjs/storybook/issues/13277#issuecomment-751747964" target="_blank">Github: Storybook throw error if used emotion 11</a>
- <a href="https://storybook.js.org/" target="_blank">Storybook</a>

</div>
