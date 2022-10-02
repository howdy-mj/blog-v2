---
title: Babel 알아보기
date: '2020-7-20'
tags: [fe-setting]
draft: false
---

## Babel(바벨)

각 브라우저마다 사용하는 문법이 달라서 크롬에서 정상적으로 동작하는 것일지라도, IE나 사파리에서는 제대로 동작이 안될 수도 있다.

[Can I use](https://caniuse.com/)에서 원하는 기능을 검색하면 어떤 브라우저에서 사용할 수 있는지 확인할 수 있다.

가령, IE에서는 ES6에서 나온 화살표 함수나 템플릿 리터럴 사용이 불가하다.

<br />

이런 크로스브라우징의 문제를 해결해 주는 것이 바로 바벨(Babel)이다. 바벨은 ECMAScript2015 이후로 나온 모든 코드를 각 브라우저에서 동작하도록 호환성을 지켜준다. 또한, TypeScript나 JSX처럼 다른 언어로 분류되는 것도 포함한다. 이렇게 바꾸어주는 것을 '트랜스파일(transpile)'이라 표현한다.

### 바벨 설치

[바벨](https://babeljs.io/)은 자바스크립트의 컴파일러(compiler)라고 소개되고 있다.

_컴파일(compile)은 사람이 작성한 코드를 컴퓨터가 이해할 수 있도록 바꿔주는 과정이고, 트랜스파일(transpile)은 다른 실행 환경에서 돌아갈 수 있는 언어로 바꿔주는 과정이다_

```shell
$ npm install -D @babel/core  @babel/cli
```

여기서 바벨을 개발의존성(devDependencies)으로 설치하는 이유는, 바벨은 어플리케이션 실행 때 필요한 것이 아니라 빌드 할 때 필요한 것이기 때문이다.

`@babel/core`는 바벨을 사용할 때 항상 필요한 패키지이고, `@babel/cli`는 터미널에서 커맨드를 입력해 바벨을 사용할 때 필요한 패키지이다.

<span class="file-location">app.js</span>

```js
const name = 'kmj'
;`Hello, ${name}`
```

바벨 설치가 완료되면, `app.js`에 ES6에 추가된 것을 만들고, `node_modules/.bin`에 추가된 바벨 명령어를 사용할 수 있다.

```shell
$ npx babel app.js
# const name = 'kmj';
# `Hello, ${name}`
```

하지만 출력된 것은 기존 `app.js`와 같다.

왜냐하면 아직 바벨에게 어떻게 코드를 변환할지 알려주지 않았기 때문이다.

변환은 **플러그인(plugin)**이나 **프리셋(preset)**을 통해 할 수 있다. 플러그인은 규칙을 세세하게 적용하고 싶을 때 사용하며, 프리셋은 여러 개의 규칙을 한 번에 적용할 때 사용한다.

<br />

### 플러그인

<span class="file-location">babel-plugin.js</span>

```js
module.exports = function myplugin() {
  return {
    visitor: {
      // https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-block-scoping/src/index.js#L26
      VariableDeclaration(path) {
        console.log('VariableDeclaration() kind:', path.node.kind) // const

        if (path.node.kind === 'const') {
          // const를 var로 바꿔라
          path.node.kind = 'var'
        }
      },
    },
  }
}
```

IE에서 알아볼 수 있도록, `const`를 `var`로 변환하는 플러그인을 만들어보자.

이후 플러그인을 실행하는 커맨드를 치면 변환되는 것을 확인할 수 있다.

```shell
$ npx babel app.js --plugins ./babel-plugin.js
# VariableDeclaration() kind: const
# var name = 'kmj';
# `Hello, ${name}`;
```

정말 다행히도, 이런 규칙들을 하나 씩 설정할 필요 없이, 바벨에서 자주 사용하는 플러그인을 먼저 만들어주었다.

`const`를 `var`로 바꾸어주는 [block-scoping](https://babeljs.io/docs/en/babel-plugin-transform-block-scoping) 플러그인, 화살표 함수를 지원해주는 [arrow-functions](https://babeljs.io/docs/en/babel-plugin-transform-arrow-functions) 플러그인 그리고 ES5부터 지원하는 [strict-mode](https://babeljs.io/docs/en/babel-plugin-transform-strict-mode) 플러그인 등을 설치하고, `babel.config.js` 파일에 설정해두면 된다.

```shell
$ npm install -D @babel/plugin-transform-block-scoping @babel/plugin-transform-arrow-functions @babel/plugin-transform-strict-mode
```

<span class="file-location">babel.config.js</span>

```js
module.exports = {
  plugins: [
    '@babel/plugin-transform-block-scoping',
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-transform-strict-mode',
  ],
}
```

이후 다시 바벨을 실행하면 아래와 같은 결과를 볼 수 있다.

```shell
$ npx babel app.js
"use strict";

# var name = 'kmj';
# `Hello, ${name}`;
```

<br />

### 프리셋

플러그인은 각 규칙을 적용하기 위해 각각의 플러그인을 설치하고 설정해야 했다.
프리셋은 이런 목적에 맞게 여러가지 플러그인을 세트로 모아놓은 것을 말한다.

프리셋을 사용하기 위해 이전에 설정해 놓은 것을 약간 수정해보자.

<span class="file-location">mypreset.js</span>

```js
module.exports = function myPreset() {
  return {
    plugins: [
      '@babel/plugin-transform-arrow-functions',
      '@babel/plugin-transform-block-scoping',
      '@babel/plugin-transform-strict-mode',
    ],
  }
}
```

`babel.config.js`

```js
module.exports = {
  presets: ['./myPreset.js'],
}
```

이처럼 프리셋은 각각의 목적에 맞는 [프리셋](https://babeljs.io/docs/en/presets)을 제공한다.

그 중에서도, IE 지원을 위해 env 프리셋을 먼저 알아보자.

```shell
$ npm install -D @babel/preset-env
```

<span class="file-location">babel.config.js</span>

```js
module.exports = {
  presets: ['@babel/preset-env'],
}
```

이후 다시 빌드해보면 `const`가 `var`로 바뀌고, 템플릿 리터럴도 ES5에 맞게 바뀐 것을 확인할 수 있다.

```shell
$ npx babel app.js
# "use strict";

# var name = 'kmj';
# "Hello, ".concat(name);
```

`preset-env`를 통해 지원하는 브라우저도 따로 설정할 수 있다.

<br />

### 웹팩으로 통합

바벨은 웹팩의 loader 형태로 제공되는 데 이것이 `babel-loader`이다.

```shell
$ npm install -D babel-loader
```

설치 후, 웹팩에 로더를 추가해준다.

<span class="file-location">webpack.config.js</span>

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
}
```

.js 확장자로 끝나는 파일을 babel-loader가 처리하도록 설정한다.
사용하는 외부 라이브러리가 많을 수록, 바벨 로더가 느리게 동작하여 node_modules 폴더를 제외하고 처리하도록 한다. ([참고](https://github.com/babel/babel-loader#babel-loader-is-slow))

그 후, `entry`를 방금 만든 `app.js`로 바꾸고 `npm run build`로 빌드한다면 `dis/main.js`가 생성된 것을 볼 수 있다.

<br />

**참고**

<div style="font-size: 12px;">

- https://babeljs.io/
- http://jeonghwan-kim.github.io/series/2019/12/22/frontend-dev-env-babel.html
- https://www.daleseo.com/js-babel/

</div>
