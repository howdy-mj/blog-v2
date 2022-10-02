---
title: '스토리북 SVG undefined 에러'
date: '2020-9-24'
tags: ['storybook']
draft: false
---

Storybook에서 SVG 파일을 컴포넌트로 렌더하면 undefined가 뜬다.

`에러가 나는 코드`

```js
import React from 'react'
import { ReactComponent as SVGFile } from './example.svg'

console.log(SVGFile) // undefined
```

`에러 화면`

> Storybook: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined.

<div style="text-align: center; font-size: 14px;">
<img src="https://user-images.githubusercontent.com/58619071/193443115-ce8cad20-3a08-4adf-9d0b-efa578c07f7d.png" style="margin-bottom: 0;">
화면 렌더 자체가 불가하다
</div>

이는 스토리북의 기본 webpack 설정에 이미 file-loader로 svg를 변환하고 있기 때문에 나는 에러이다.

<span class="file-location">storybook/preview/base-webpack.config.js</span>

```js
// ...
{
  test: /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/,
  loader: require.resolve('file-loader'),
  query: {
    name: 'static/media/[name].[hash:8].[ext]',
  },
},
// ...
```

전문: [storybook base-webpack.js](https://github.com/storybookjs/storybook/blob/4da246bbe9413510b48d1ab8b9faf4fae4656d92/lib/core/src/server/preview/base-webpack.config.js#L36-L40)

따라서, 스토리북에서 svg import가 기본 file-loader 설정보다 먼저 실행해야 하기 때문에 `unshift`로 넣어주면 된다.

## 해결법

```shell
$ npm install @svgr/webpack --save-dev
```

<span class="file-location">./storybook/main.js</span>

```js
// ...
module.exports = {
 // ...
  webpackFinal: async config => {
    // ...
    config.module.rules.unshift({
      test: /\.svg$/,
      use: [‘@svgr/webpack’],
    });
    // ...
    return config;
  }
}
```

어떤 사람은 기존의 file-loader 설정에서 `svg`를 없애는 작업을 먼저 해줘야 한다고 했지만, 이렇게 해도 작동은 된다.

<br />

**참고**

<div style="font-size: 12px;">

- https://duncanleung.com/import-svg-storybook-webpack-loader/
- https://github.com/storybookjs/storybook/issues/6188

</div>
