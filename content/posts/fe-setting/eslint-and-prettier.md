---
title: 'ESLint & Prettier 알아보기'
date: '2020-7-23'
tags: ['fe-setting']
draft: false
---

ESLint, Prettier는 코드를 검사해서 깔끔하게 만들어주고 잠재적 에러를 제거해준다.

## ESLint

[ESLint](https://eslint.org/)는 ECMAScript/JavaSciprt 코드에서 자동으로 에러나 오류를 제거하고 더 단단한 코드로 만들어준다.

### ESLint 설치 및 설정

```
$ npm install eslint --save --dev
# or
$ yarn add eslint --dev
```

ESLint는 configuration 파일이 있어야 실행 가능하기 때문에 `.eslintrc.{js, yml, json}` 파일을 만들어야 한다.

일일이 규칙을 설정하기 번거롭다면, `npx eslint --init`으로 `.eslintrc` 파일을 만들 수 있다.

사용하고 싶은 [규칙](https://eslint.org/docs/rules/)을 해당 파일에 넣으면 된다.

<span class="file-location">.eslintrc.json</span>

```json
{
  "env": {
    "es6": true
  },
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "single"]
  },
  "extends": "eslint:recommended"
}
```

ES6를 준수하기 위해 `"env": { "es6": true}`를 작성했다. 그리고
rules에는 코드에 세미콜론이 항상 있어야 하며, `'single quotes'`를 쓰도록 설정해보겠다.

또한, 해당 파일에는 `"extends": "eslint:recommended"` 문구가 있어야 [규칙](https://eslint.org/docs/rules/)에서 체크(✔)되어 있는 항목이 검사된다.

`app.js`에 `const hello = "double"`이라고 작성 한후,
eslint를 실행해보면 우리가 작성한 것에 위배되는 항목을 띄워준다.

```
$ npx eslint app.js
  1:7   error  'hello' is assigned a value but never used  no-unused-vars
  1:15  error  Strings must use singlequote                quotes
  1:23  error  Missing semicolon                           semi

✖ 3 problems (3 errors, 0 warnings)
  2 errors and 0 warnings potentially fixable with the `--fix` option.
```

`npx eslint app.js --fix`를 치면 에러가 난 코드를 자동으로 고쳐준다. ([Rules](https://eslint.org/docs/rules/)에서 렌치🔧모양이 있는 것만 자동 수정)

ESLint에는 자주 사용하는 규칙 모음이 있는데, 하나는 [airbnb 스타일](https://github.com/airbnb/javascript)이고, 나머지 하나는 [자바스크립트 standard 스타일](https://standardjs.com/)이다.

## Prettier

[Prettier](https://prettier.io/)는 code formatter로 코드를 더 이쁘게 만들어준다.

### Prettier 설치 및 설정

```shell
$ npm install --save --dev prettier
```

<span class="file-location">app.js</span>

```js
const hello = 'double'
```

이렇게 된 것을 prettier를 실행하면 아래처럼 나온다.

```shell
$ npx prettier app.js

const hello = "double";
```

`npx prettier app.js --write`을 같이 작성하면 `app.js` 파일이 자동으로 수정된다.

<br />

이처럼 Prettier는 ESLint와 겹치는 부분도 있지만, 코드 품질 관련 기능은 없다.

그렇기 때문에 ESLint와 Prettier를 같이 쓰며, 충돌하는 부분은 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) 패키지를 통해 ESLint 규칙을 끈다.

```shell
$ npm install --save-dev eslint-config-prettier
```

설치 후, `.eslintrc.json`파일에 extends를 추가한다.

```json
{
  "extends": ["eslint:recommended", "eslint-config-prettier"]
}
```

## ESLint, Prettier 간단 설정

코딩할 때마다 확인해야 하는데, 매번 코드 치고 ESLint와 Prettier를 실행해야하는 건 매우 번거롭다.

따라서 Git과 사용하기 편한 [husky](https://github.com/typicode/husky), 혹은 VSCode에의 확장도구인 ESLint를 다운하면 된다.

이번 글에서는 ESLint 익스텐션을 설치한 후,

<span class="file-location">.vscode/settings.json</span>

```json
{
  "eslint.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

이렇게 설정해주면 저장할 때마다 자동으로 ESLint가 실행된다.

<br />

**참고**

<div style="font-size: 12px;">

- https://eslint.org/
- https://prettier.io/
- http://jeonghwan-kim.github.io/series/2019/12/30/frontend-dev-env-lint.html

</div>
