---
title: 'Storybook: Actions, Knobs, Docs addon 소개 및 설치'
date: '2020-6-3'
tags: ['storybook']
draft: false
---

## 1. addon이란?

addon은 Storybook의 plugin과 비슷한 역할로 고급 기능을 지원하고 새로운 워크플로우를 제공해준다.

대표적인 addon은 Knobs, Actions, Source, Docs, Viewport, Storyshots, Backgrounds, Accessibility, Console, Links가 있으며 더 자세한 내용은 [홈페이지](https://storybook.js.org/addons/)에서 확인 가능하다.

_해당 글은 Storybook 5.3 기준으로 작성되었습니다._

<br>

이번 글에서는 Actions, Knobs, Docs의 정의와 기본 세팅에 알아 보겠다.

### Actions

원래 Actions도 따로 설치를 해야 되는걸로 아는데, 업데이트 되면서 바뀌었는지 storybook을 설치하면 actinos도 같이 설치되어 있다.

`.storybook/main.js`

```js{5}
module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
}
```

`package.json`

```json{5}
...,
"devDependencies": {
    "@storybook/addon-actions": "^5.3.19",
    "@storybook/addon-links": "^5.3.19",
    "@storybook/addons": "^5.3.19",
    "@storybook/preset-create-react-app": "^3.0.0",
    "@storybook/react": "^5.3.19"
}
```

만약 설치가 안되어있다면, 아래처럼 입력하면 된다.

```shell
$ npm install --save-dev @storybook/addon-actions
```

설치 후, `.sotrybook/main.js`에 아래 코드를 추가한다.

```js
module.exports = {
  addons: ['@storybook/addon-actions/register'],
}
```

<br>

우선 storybook에 기본으로 세팅되어 있는 Button을 보자.

```
src
└─ stories
    ├─ 0-Weclome.stories.js
    └─ 1-Button.sotries.js
```

버튼을 클릭하게 되면 아래 `Actions`탭에 clicked한 내용이 뜬다.

![actions](https://user-images.githubusercontent.com/58619071/193442836-e53fe271-da13-49b9-ba92-aa85065aa519.png)

더 정확하게는, Actions는 Componenet를 통해 특정 함수가 호출 되었을 때, 어떤 함수가 어떤 parameter를 넣어서 호출되었는지에 대한 정보를 알려준다.

<br>

### Knobs

Knobs는 component의 props를 스토리북 화면에서 바로 반영시켜주는 것이다.

**Knobs 설치**

```shell
$ npm install --save-dev @storybook/addon-knobs
```

설치 후, `.sotrybook/main.js`에 아래 코드를 추가한다.

```js
module.exports = {
  addons: ['@storybook/addon-knobs/register'],
}
```

실행했던 storybook을 껐다가 다시 키면 Knobs 탭이 추가된 걸 확인할 수 있다.

![knobs](https://user-images.githubusercontent.com/58619071/193442837-6a31bde7-057d-4f10-8453-53a8365a23fc.png)

아직 기능이 없기 때문에 Knobs 탭에도 아무것도 보이지 않는다.

**왜?**
이상하게 나는 Knobs를 깔 때마다 에러가 나서
`node_modules`랑 `package-lock.json`을 지우고 다시 `npm install`, `npm update`를 해야 정상적으로 작동된다...

```shell
$ rm -rf package-lock.json node_modules
$ npm install
$ npm update
$ npm audit fix
```

나중에 원인을 알게되면 글에 추가하겠다.

<br>

### Docs

Docs는 **MDX**<span style="font-size: 14px">(\*마크다운을 jsx와 결합한 파일 형식)</span> 형식으로 문서를 작성할 수 있게 해주며, component의 props와 주석에 기반하여 문서를 자동으로 생성해준다.
MDX를 사용하면 마크다운으로 react component를 더 쉽게 문서화할 수 있다.

**Docs 설치**

```shell
$ npm install --save-dev @storybook/addon-docs
```

설치 후, `.sotrybook/main.js`에 아래 코드를 추가한다.

```js
module.exports = {
  stories: ['../src/**/*.stories.(js|mdx)'],
  addons: ['@storybook/addon-docs'],
}
```

storybook을 재실행하면 아래와 같이 Docs 탭이 생긴걸 볼 수 있다.

![docs](https://user-images.githubusercontent.com/58619071/193442839-18ab501b-6b04-4ccc-87bd-59d25e96044c.png)

<br>

이제 Actions, Knobs, Docs의 설치했으니, 다음 글에서 사용 방법에 대해 다뤄보겠다.
