---
title: CRA + Typescript 절대경로 설정 (w/craco)
date: '2020-10-11'
tags: [boilerplate]
draft: false
---

## CRA + TypeScript에서 절대경로 설정

폴더 구조가 겹겹인 경우, import 경로를 상대경로하면 코드가 너무 길어지고 보기 어렵다.

절대 경로를 사용하기 위해서는 `tsconfig.json`과 webpack 설정을 바꾸면 되지만, `tsconfig.json`에서 paths를 수정하고 `yarn start`를 하면 강제적으로 작성한 paths가 없어진다.

이는 CRA로 만든 프로젝트는 eject를 해서 숨겨진 webpack 설정을 바꾸어야 하는데, 그러기엔 CRA로 만든 장점이 없어지기 때문에 [craco](https://www.npmjs.com/package/@craco/craco)를 사용하는 것이 편하다.

## Craco란?

**Craco**(Create React App Configuration Override)는 create-react-app(CRA)을 쉽게 설정하기 위해 만들어졌다.

CRA에서 eject를 하지 않아도, root 폴더에 `craco.config.js`를 추가함으로 eslint, babel, postcss 등을 쉽게 설정할 수 있다.

CRA 4.\*, Yarn, NPM, Lerna, custom react-scripts에서 사용가능하다.

<br />

```shell
$ yarn add @craco/craco
$ yarn add craco-alias -D
```

패키지 설치 후, root 폴더에서 아래의 파일을 생성하자.

<span class="file-location">craco.config.js</span>

```js
const CracoAlias = require('craco-alias')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.extend.json',
      },
    },
  ],
}
```

### Options 설정

- `source`: default 값은 `options`로, `jsconfig`, `tsconfig` 선택 가능

- `baseUrl`: default 값은 `./`로 root 폴더를 가리킴

- `aliases`: alias 이름과 경로, default 값은 `{}`

- `tsConfigPath`: 만약 `source`가 `tsconfig`이라면 해당 파일 이름 작성

- `debug`: default 값은 false이며, 만약 버그가 생긴다면 해당 값을 true로 바꾸어 console로 내용 확인 가능

<br />

<span class="file-location">tsconfig.extend.json</span>

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      // 파일
      "@app": ["./App.tsx"],

      // 폴더
      "@pages/*": ["./pages/*"],
      "@components/*": ["./components/*"],
      "@styles/*": ["./styles/*"]
    }
  }
}
```

<span style="color: red;">"Can't parse tsconfig.extend.json."</span>이라는 에러가 뜬다면, `tsconfig.extend.json` 마지막 줄에 콤마(`,`)가 있는지 확인하고 없애야 한다.

ex. `"@styles/*": ["./styles/*"],`이라면 마지막 `,`를 삭제

<br />

그리고 `tsconfig.json`, `package.json` 파일에서 아래의 항목을 추가/수정 한다.

<span class="file-location">tsconfig.json</span>

```json
{
  "extends": "./tsconfig.extend.json",
  "compilerOptions": {
    //...
  }
}
```

<span class="file-location">package.json</span>

```json
"scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject"
  },
```

다 마쳤다면, 다른 곳에서 아래와 같이 import가 가능하다.

```js
import Example from '@pages/Example'
```

<br />

**참고**

<div style="font-size: 12px;">

- [@craco/craco](https://www.npmjs.com/package/@craco/craco)
- [craco-alias](https://github.com/risenforces/craco-alias#readme)

</div>
