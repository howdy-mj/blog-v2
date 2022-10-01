---
title: CRA + Typescript + ESlint + Prettier
date: '2020-11-08'
tags: [boilerplate]
draft: false
---

<div style="font-size: 12px; font-style: italic; ">
업데이트: 2021.05.17 <br />
- 주요 내용: config에서 @typescript-eslint 삭제
</div>

<br />

CRA로 만든 TypeScript 기반에 ESlint, Prettier 설정하는 법을 알아보자.

원래 타입스크립트에서는 TSLint가 있었지만, 2019년 2월에 ESLint로 마이그레이션을 [발표](https://github.com/palantir/tslint/issues/4534)하며, 2020년 1월에 완전히 적용되었다.

해당 글은 VSCode를 사용하며, ESLint, Prettier extensions이 이미 설치된 상태이며, react `^17.0.2`, typescript `^4.1.2` 버전으로 작성되었다.

## 폴더 생성 및 설치

```shell
# 폴더 생성 및 이동
$ yarn create react-app cra-settings --template typescript
$ cd cra-settings

# 패키지 설치
$ yarn add eslint-plugin-prettier eslint-plugin-react prettier -D
```

_CRA에 ESLint가 포함되어 있기 때문에 따로 설치를 안해줘도 된다_

현 시점 패키지 버전:

```json
// ...
"devDependencies": {
  "eslint-plugin-prettier": "^3.4.0",
  "eslint-config-prettier": "^8.3.0",
  "eslint-plugin-react": "^7.23.2",
  "prettier": "^2.3.0"
}
// ...
```

이후, root 폴더에 `.eslintrc`와 `.prettierrc` 파일 생성 후 밑의 내용을 작성한다.

<span class="file-location">.eslintrc</span>

```json
{
  "extends": ["plugin:prettier/recommended"],
  "plugins": ["react", "prettier"],
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "prettier/prettier": ["error", { "singleQuote": true }],
    "react/jsx-uses-vars": "error"
  },
  "ignorePatterns": ["*.config.js"]
}
```

<div style="font-style: italic;">

<a href="https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21" target="_blank">eslint-config-prettier Version 8.0.0</a>에서 prettier config가 하나로 합쳐졌다. 따라서 기존에 있던 @typescript-eslint은 삭제해도 된다.

</div>

<span class="file-location">.prettierrc</span>

```json
{
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80
}
```

## 패키지 및 config 항목 알아보기

단순히 복붙하여 사용해도 되지만, 각각 어떤 것을 뜻하는지 한 번 알아보자.

<br />

### 패키지 역할

- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier): ESLint와 Prettier의 충돌을 막아줌
- [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react): React에서 ESLint 명세 규정
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier): Prettier를 ESLint 규칙으로 실행하고 문제점을 ESLint로 보고

ESLint와 Prettier는 [이전글](https://howdy-mj.me/node/eslint-and-prettier/)에서 확인 가능하다.

<br />

### eslint config 설명

<span class="file-location">.eslintrc</span>

```json
{
  "extends": ["plugin:prettier/recommended"],
  "plugins": ["react", "prettier"],
  "parserOptions": {
    // ESLint는 es6 이후의 문법을 알지 못하기 때문에 설정
    // https://eslint.org/docs/user-guide/configuring#specifying-parser-options
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "jsx": true // eslint-plugin-react
    }
  },
  "rules": {
    // 설정하고 싶은 규칙 작성
    // 밑은 예시일 뿐, 아무거나 추가 가능
    "prettier/prettier": ["error", { "singleQuote": true }], // eslint-plugin-prettier
    "react/jsx-uses-vars": "error" // eslint-plugin-react
  },
  "ignorePatterns": ["*.config.js"] // 제외하려는 파일
}
```

<br />

**참고**

<div>

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

</div>
