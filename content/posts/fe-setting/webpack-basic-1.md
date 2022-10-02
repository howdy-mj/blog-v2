---
title: 'Webpack 웹팩 알아보기(1): entry/output, loader'
date: '2020-6-14'
tags: ['fe-setting']
draft: false
---

<div style="font-style: italic; font-size: 14px">
<p>해당 글에서 자세히 설명되지 않은 용어는 <a href="/general/about-npm">npm:소개, 설치, 명령어, 배포</a> 글에서 볼 수 있다.</p>
<p>해당 글은 <a href="https://v4.webpack.js.org/">webpack4</a>를 기준으로 작성되었다.</p>
</div>

## 웹팩 나오게 된 배경

다른 사람이 만들어 둔 함수, 혹은 자신이 만들어둔 것을 나중에 다른 곳에서 import하여 쓰고 싶다면 모듈로 만들어 쓸 수 있다.

하지만 자바스크립트는 모두 같은 전역 스코프에 해당하기 때문에 자칫 잘못하면 스코프 오염이 생기면서 런타임 에러가 발생할 수 있다.

그래서 정의되자마자 즉시 실행되는 함수([IIFE](https://developer.mozilla.org/ko/docs/Glossary/IIFE))로 오염을 방지했다.

```js
(function() {
  function add(a, b) {
    return a + b
  }
})()
```

이러한 방식으로 자바스크립트 모듈을 구현하는 대표적인 명세에 AMD와 CommonJS가 있다.

CommonJS는 자바스크립트를 사용하는 모든 환경에서 모듈을 하는 것이 목표로, `exports` 키워드로 모듈을 만들고 `require()` 함수로 불러 들이는 방식이다. 대표적으로 서버 사이드 플랫폼인 Node.js에서 이를 사용한다.

AMD(Asynchronous Module Definition)는 비동기로 로딩되는 환경에서 모듈을 사용하는 것이 주 목표로, 주로 브라우저 환경이다.

UMD(Universal Module Definition)는 AMD 기반으로 CommonJS 방식까지 지원하는 통합 형태이다.

<br />

<span class="file-location">add.js</span>

```js
export function add(a, b) {
    return a + b;
}
```

<span class="file-location">app.js</span>

```js
const math = require('./add.js')
math.add(1, 2) // output: 3;
```

이렇게 만든 모듈을 `index.html`에서 불러오면 사용가능하다.

```html
<script type="module" src="./A.js"></script>
```

하지만 아직 모든 브라우저에서 모듈 시스템을 지원하지 않는다. 그래서 웹팩이 나오게 되었다.

## 웹팩의 원리

![webpack](https://user-images.githubusercontent.com/58619071/193439343-31489a93-9702-43ec-9bd1-b43c356423f1.PNG)

[Webpack](https://webpack.js.org/)의 메인 화면이다. 왼쪽을 보면 여러 모듈들이 얽혀있다. 위에서 `app.js`에서 `add.js`를 불러와 사용하는 것을 예로 들 수 있다.

웹팩 번들링 작업을 위해 [webpack](https://github.com/webpack/webpack)과 [webpack-cli](https://github.com/webpack/webpack-cli)를 설치해야 한다.

웹팩3까지는 `webpack`만 설치해도 됐었는데, 웹팩4부터는 `webpack-cli`를 같이 설치해야 커맨드라인에 webpack 명령어를 사용할 수 있다.

```shell
# webpack 설치
$ npm install --save-dev webpack
# or
$ yarn add webpack --dev

# webpakc-cli 설치
$ npm install --save-dev webpack-cli
# or
$ yarn add webpack-cli --dev
```

`-dev`를 쓰면 `package.json`에서 `devDependencies`로 설치가 되는데, 이는 개발용 패키지라는 뜻이다.

설치가 잘 되었다면, `node_moduels/.bin`에서 webpack과 webpack-cli를 볼 수 있다. 해당 경로에 가서 `webpack -h`를 치면 [명령어](https://webpack.js.org/api/cli/)를 볼 수 있는데, 우리가 필수로 봐야할 세 가지는 `--mode`, `--entry`, `--output, -o`이다.

```shell
Config options:
  --mode      Enable production optimizations or development hints.
              [선택: "development", "production", "none"]

Basic options:
  --entry      The entry point(s) of the compilation.        [문자열]

Output options:
  --output, -o        The output path and file for compilation assets
```

|   옵션   |                              값                              |
| :------: | :----------------------------------------------------------: |
|  --mode  |             "development", "production", "none"              |
|          |   - devleopment: 개발환경에서 사용, 개발 옵션을 추가할 때    |
|          | - production: 운영환경, 운영 배포 시 필요한 최적화 설정할 때 |
| --entry  |                     모듈이 시작하는 부분                     |
| --output |        모듈을 하나로 합쳐서 결과를 저장하는 경로 설정        |

최상의 폴더에 `webpack.config.js`를 만들고 아래와 같이 쓰면 기본적인 설정을 완료한 것이다.

```js
const path = require('path')

module.exports = {
  mode: 'development', // 개발 환경으로 설정
  entry: './src/app.js', // 시작 경로 설정
  output: {
    filename: 'main.js', // 번들링 결과물 경로 설정
    path: path.resolve(__dirname, 'dist'),
  },
}
```

그 후, 아래 명령어를 치면 `dist/main.js`가 생긴 것을 볼 수 있다.

그럼 `index.html`에서 `<script src="dist/main.js"></script>`로 바꾸어도 전과 똑같은 화면이 나오는 것을 볼 수 있다.이렇게 `type="module"`을 삭제해도 여러개의 모듈을 하나로 합쳐주는 것을 알 수 있다.

```shell
$ npx webpack --config webpack.config.js

Hash: 97818daee5ecbc71e023
Version: webpack 4.43.0
Time: 48ms
Built at: 2020-06-14 16:51:44
  Asset      Size  Chunks             Chunk Names
main.js  4.83 KiB    main  [emitted]  main
Entrypoint main = main.js
[./src/app.js] 105 bytes {main} [built]
[./src/math.js] 313 bytes {main} [built]
```

앞으로 쉽게 웹팩을 실행할 수 있도록 `package.json`에 커스텀 명령어를 추가해보자.

```json
"scripts": {
    "build": "node_modules/.bin/webpack"
  },
```

이제 `npm run build`를 치면 웹팩이 빌드된다.

## 로더(Loader)

웹팩은 모든 파일을 모듈로 바라본다. 그리고 **로더(loader)**는 웹팩이 웹 애플리케이션을 해석할 때 자바스크립트로 만든 모듈뿐만 아니라, 타입스크립트 같은 다른 언어와 HTML, CSS, 이미지, 폰트 등을 자바스크립트 문법으로 변환하여 모듈로 import 할 수 있다.

로더를 만들면 `webpack.config.js`에 `module`에 대한 설정을 추가하면 된다.

```js
module: {
  rules: [
    {
      test: /\.js$/, // .js로 끝나는 모든 파일
      use: [path.resolve('./로더_파일명.js')],
    },
  ]
}
```

만약 CSS를 포함하여 빌드해야 하는데 로더가 없다면 CSS 문법을 이해하지 못하여 에러가 발생한다.

<span class="file-location">app.js</span>

```js
import './app.css'
```

<span class="file-location">app.css</span>

```css
body {
  background-color: aqua;
}
```

![](https://user-images.githubusercontent.com/58619071/193439346-643d97b0-b36c-4e35-a4c2-442c8b729036.png)

<p style="text-align: center; font-size: 14px">Module parse failed, 웹팩이 CSS를 이해하지 못하여 생긴 오류</p>

따라서 웹팩이 다른 모듈들을 해석할 수 있도록 상황에 맞는 로더를 설치해줘야 한다.

<br />

### css-loader

[css-loader](https://webpack.js.org/loaders/css-loader/)는 웹팩이 CSS를 읽을 수 있도록 도와주는 로더이다.

설치

```shell
$ npm install --save-dev css-loader
```

<span class="file-location">webpack.config.js</span>

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
    ],
  },
}
```

이렇게 설정하고 아까 실패했던 빌드를 하면 정상 처리된 걸 볼 수 있다.

```shell
$ npm run build

Hash: 341fc5e0ff2d91722adf
Version: webpack 4.43.0
Time: 549ms
Built at: 2020-06-14 21:37:17
  Asset      Size  Chunks             Chunk Names
main.js  7.69 KiB    main  [emitted]  main
Entrypoint main = main.js
[./src/app.css] 276 bytes {main} [built]
[./src/app.js] 19 bytes {main} [built]
    + 1 hidden module
```

그리고 `dist/main.js`에서도 `background-color: aqua`라는 텍스트를 찾을 수 있다.

하지만 막상 `index.html`을 열어보면 배경색상이 적용되지 않은 걸 확인할 수 있다.

이는 자바스크립트에는 CSS가 적용되었지만, DOM에 아직 추가가 안돼서 브라우저가 아직 모르는 상태이기 때문이다. 이걸 도와주는 것이 [style-loader](https://webpack.js.org/loaders/style-loader/)이다.

<br />

### styled-loader

styled-loader는 자바스크립트 안에 있는 것을 HTML에 알려준다. 따라서 CSS를 모듈로 만들어 빌드하려면 css-loader와 styled-loader를 같이 사용해야 한다.

설치

```shell
$ npm install --save-dev style-loader
```

<span class="file-location">webpack.config.js</span>

```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'], // 뒤에서부터 앞이 실행되어 css-loader가 뒤쪽에 위치
    },
  ]
}
```

이후 다시 `npm run build`를 하면 HTML에서 배경색상이 바뀐 것을 확인할 수 있다.

HTML의 개발자 도구를 열어 Elements를 보면 `<head>`에 `<style>`에 인라인으로 스타일이 들어가 있는 것을 볼 수 있다.

<br />

### file-loader

로더는 CSS 뿐만 아니라, 이미지 파일도 처리할 수 있다.
이번에는 `app.css`에서 배경색상이 아닌, 이미지로 불러와서 build를 해보자.

<span class="file-location">app.css</span>

```css
body {
  background-image: url(bg.png);
}
```

이 상태에서 웹팩을 빌드하면 아까와 같이 `Module parse failed` 에러가 난다.

[file-loader](https://webpack.js.org/loaders/file-loader/) 설치

```shell
$ npm install file-loader --save-dev
```

<span class="file-location">webpack.config.js</span>

```js{8, 9}
module: {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      use: ['file-loader'],
    },
  ]
}
```

설정하고 빌드를 하면 `dist` 폴더에 이미지가 들어간 걸 확인할 수 있다. 웹팩은 빌드를 할 때마다 유니크한 값으로 저장하기 때문에 이미지 이름도 해시처리가 된다.

<p style="text-align: center;"><img src="https://user-images.githubusercontent.com/58619071/193439348-928efa27-b270-4083-8049-4ee3d60bf426.PNG"></p>

하지만 막상 `index.html`을 열어보면 이미지는 보이지 않으며 console 창에 `GET file:///... net::ERR_FILE_NOT_FOUND` 에러가 난다.

이는 `index.html`에서 바로 이미지를 불러오고 있기 때문인데, 실제 이미지는 `src/bg.png`에 있기 때문에 경로가 달라서 이미지를 못 찾는 것이다.

따라서 `webpack.config.js`에서 다시 설정을 해줘야 한다.

```js
{
  test: /\.(png|jpg|gif|svg)$/,
  loader: 'file-loader',
  options: {
      publicPath: './dist/',
      name: '[name].[ext]?[hash]' // 이름.확장자?해시값
  }
}
```

<p style="text-align: center;"><img src="https://user-images.githubusercontent.com/58619071/193439349-60b9873e-f79c-4861-89f4-f54e31921e8d.PNG"></p>

설정을 마치고 웹팩을 빌드해주면 `bg.png` 이름 그대로 `dist` 폴더에 들어간 걸 볼 수 있으며, `index.html`도 배경이 이미지로 바뀐 걸 확인할 수 있다.

<br />

### url-loader

사용하는 이미지가 많아지면 네트워크에 부담이 될 수 있다. 따라서 [Data URI Scheme](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)를 사용하는 것이 더 나을 수 있다.

[url-loader](https://webpack.js.org/loaders/url-loader/)는 이미지를 base64로 인코딩하여 문자열 형태로 소스코드에 넣는 걸 처리해준다.

설치

```shell
$ npm install url-loader --save-dev
```

<span class="file-location">webpack.config.js</span>

```js
{
  test: /\.(png|jpg|gif|svg)$/,
  loader: 'url-loader',
  options: {
      publicPath: './dist/',
      name: '[name].[ext]?[hash]',
      limit: 5000, // 5KB 미만의 파일은 url-loader로 처리
  }
}
```

이번에는 다른 이미지(위에 `limit`보다 작은 용량의 이미지 준비)를 `src` 폴더에 넣고 `app.js`에서 import 해오자.

```js
import './app.css'
import howdy from './howdy.png'

// DOM이 로드가 되면 img 불러오기
document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = `
        <img src="${howdy}" />
    `
})
```

그리고 웹팩을 빌드하면, 아까 배경으로 넣었던 것은 그대로 `dist/bg.png`로 있지만, `howdy.png`는 5KB보다 작기 때문에 `main.js`에 인코딩되어 들어가 있다.

<br />

### 정리

- css-loader: CSS 파일을 자바스크립트 모듈로 처리
- style-loader: 자바스크립트를 HTML에 넣어 DOM에 적용되도록 처리
- file-loader: 이미지 파일을 모듈로 사용할 수 있도록 처리
- url-loader: 파일을 base64로 인코딩하여 자바스크립트에 문자열로 넘겨주는 것

<br />

**참고**

<div style="font-size: 12px;">

- https://webpack.js.org/
- https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html
- https://joshua1988.github.io/webpack-guide

</div>
