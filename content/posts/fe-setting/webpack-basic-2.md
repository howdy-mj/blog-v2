---
title: 'Webpack 웹팩 알아보기(2) : plugin'
date: '2020-7-16'
tags: ['fe-setting']
draft: false
---

## 플러그인(Plugin)

로더가 파일 단위로 처리하는 반면, 플러그인은 번들된 결과물을 처리한다. 번들된 자바스크립트를 난독화 한다거나 특정 텍스트를 추출하는 용도로 사용한다.

공식홈페이지의 [Basic Plugin Architecture](https://webpack.js.org/contribute/writing-a-plugin/)를 따라해보자.

<span class="file-location">hello-world-plugin.js</span>

```js
class HelloWorldPlugin {
  apply(compiler) {
    // plugin이 종료 되었을 때 실행된다.
    compiler.hooks.done.tap('Hello World Plugin', stats => {
      console.log('Hello World!')
    })
  }
}

module.exports = HelloWorldPlugin
```

loader가 함수형으로 정의된 것과 다르게, plugin은 클래스형으로 정의된다.

<span class="file-location">webpack.config.js</span>

```js
const HelloWorldPlugin = require('./hello-world-plugin')

module.exports = {
  plugins: [new HelloWorldPlugin()],
}
```

설정을 마치고 `npm run build`를 하면 'Hello World!'가 찍힌 것을 볼 수 있다.

```shell{3}
$ npm run build

Hello World!
Hash: cabe67579d243965d759
Version: webpack 4.43.0
Time: 1349ms
Built at: 2020-07-15 23:46:13
                                  Asset      Size  Chunks             Chunk Names
bg.png?5c6d3b633991b51295c68b34d8b94c8b  1.17 MiB          [emitted]
                                main.js    22 KiB    main  [emitted]  main
Entrypoint main = main.js
[./node_modules/css-loader/dist/cjs.js!./src/app.css] 581 bytes {main} [built]
[./src/app.css] 517 bytes {main} [built]
[./src/app.js] 186 bytes {main} [built]
[./src/bg.png] 64 bytes {main} [built]
[./src/howdy.png] 2.93 KiB {main} [built]
    + 3 hidden modules
```

그럼 이제 웹팩이 번들링한 결과물에는 어떻게 접근할까?

이때 `compiler`와 `compilation`이 필요하다. 이들의 역할을 이해하는 것이 웹팩 엔진을 확장하는 중요한 첫 걸음이다. 이 둘을 외, 중요한 것은 [plugins API](https://webpack.js.org/api/plugins/) 문서를 보면된다.

### compiler

[compiler](https://webpack.js.org/api/compiler-hooks/) 모듈은 모든 옵션이 CLI 혹은 Node API를 통해 전달되는 compilation instance를 생성하는 메인 엔진이다.

`compiler`의 Hooks는 아래와 같다.

```js
compiler.hooks.someHook.tap('MyPlugin', params => {
  /* ... */
})
```

hook 타입에 따라 `tapAsync`와 `tapPromise`가 될 수도 있다.

### compilation

[compilation](https://webpack.js.org/api/compilation-hooks/) 모듈은 `compiler`에 의해 사용되며, 새로운 compilations를 만들거나 build 할 때 사용한다.

```js
compilation.hooks.someHook.tap(/* ... */)
```

`compiler`와 마찬가지로 hook 타입에 따라 `tapAsync`와 `tapPromise`를 사용할 수 있다.

### tap, tapAsync, tapPromise

`tap`은 동기로 동작하는 것에 사용하며, `tapAsync`와 `tapPromise`는 이름에서도 알 수 있듯이 비동기를 처리할 때 사용한다.

`tapAsync`

```js
class HelloAsyncPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'HelloAsyncPlugin',
      (compilation, callback) => {
        // Do something async...
        setTimeout(function() {
          console.log('Done with async work...')
          callback()
        }, 1000)
      }
    )
  }
}

module.exports = HelloAsyncPlugin
```

`tapPromise`

```js
class HelloAsyncPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapPromise('HelloAsyncPlugin', compilation => {
      // return a Promise that resolves when we are done...
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          console.log('Done with async work...')
          resolve()
        }, 1000)
      })
    })
  }
}

module.exports = HelloAsyncPlugin
```

인자로 받는 것이 약간 다르다.

<br />

다시 본론으로 돌아와, 번들링한 결과물을 보기 위해 `compiler`를 사용해보겠다.

```js
class HelloWorldPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'HelloWorldPlugin',
      (compilation, callback) => {
        const source = compilation.assets['main.js'].source()
        console.log(source)
      }
    )
  }
}
```

제대로 번들링이 되었는지 확인하기 위해 `npm run build`를 하면 해독하기 힘든 형태의 텍스트가 터미널에 찍히는 걸 볼 수 있다.

<br />

## 자주 사용하는 플러그인

웹팩 자체에서 제공하는 플러그인 중에, 자주 사용되는 것이 몇 가지 있다.

### BannerPlugin

[배너플러그인](https://webpack.js.org/plugins/banner-plugin/)은 build 된 것의 제일 상단에 작성한 내용을 보여준다.

<span class="file-location">webpack.config.js</span>

```js
const webpack = require('webpack');

module.exports = {
  ...,
  plugins: [new webpack.BannerPlugin({
    banner: `
      Build Date: ${new Date().toLocaleDateString()}
    `
  })],
}
```

이렇게 설정 한후, `npm run build`를 하면 '배너 플러그인'이 `dist/main.js`의 제일 상단에 있는 것을 볼 수 있다.

배너플러그인은 해당 파일의 작성 시간, 담당자 등 표기할 때 많이 사용한다.

### DefinePlugin

[DefinePlugin](https://webpack.js.org/plugins/define-plugin/)은 컴파일 시간에 전역 변수를 생성하게 해준다.

어플리케이션은 개발(development)환경과 운영(production)환경이 나뉘어서 운영 된다. 이때 사용하는 API 주소가 다를 수 있는데, 이를 DefinePlugin으로 정보를 저장할 수 있다.

현재 환경을 알기 위해서는 `process.env.NODE_ENV`로 접근하면 어떤 환경인지 알 수 있다.

<span class="file-location">webpack.config.js</span>

```js
module.exports = {
  ...,
  plugins: [new webpack.DefinePlugin({})],
}
```

이를 설정하고, 아무 `.js`에서 `console.log(process.env.NODE_ENV)`를 하고 `npm run build` 후, HTML 파일을 열어 확인해보면 'development'가 나오는 것을 확인할 수 있다.

환경에 따른 API를 변수로 저장하자면 아래와 같이 할 수 있다.

```js
module.exports = {
  ...,
  plugins: new webpack.DefinePlugin({
    DEVELOPMENT_API: JSON.stringify('http://localhost:5000'),
    PRODUCTION_API: JSON.stringify('http://123.456')
  })],
}
```

그 후, 다시 console로 찍어보면 정상적으로 나오는 것을 알 수 있다.

<p style="text-align: center"><img src="https://user-images.githubusercontent.com/58619071/193439350-64cc24aa-6ecb-4530-a8de-8626c970888d.png"></p>

이는 Node 런타임에서 `process.env`에 저장되는 환경 변수를 전역 변수로 등록해주는 [EnvironmentPlugin](https://webpack.js.org/plugins/environment-plugin/)이랑 자주 쓰인다.

### CleanWebpackPlugin

[CleanWebpackPlugin](https://github.com/johnagan/clean-webpack-plugin)은 빌드 이전의 결과물을 제거해주는 플러그인이다.

```shell
$ npm install -D clean-webpack-plugin
```

<span class="file-location">webpack.config.js</span>

```js
const { CleanWebpackPlugin }= require('clean-webpack-plugin');

module.exports = {
  ...,
  plugin: [
    new CleanwebpackPlugin()
  ]
}
```

설정 후, `npm run build`를 하면 `/dist` 폴더에 있는 것이 없어지고 새로 build 되는 것을 확인할 수 있다.

<br />

이 외에도, 번들한 CSS, JS파일을 각각의 HTML 파일에 태그로 추가해주는 [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin/), , 번들 결과에서 CSS 코드만 뽑아 별도의 파일로 분리해주는 [MiniCssExtractPlugin](https://github.com/webpack-contrib/mini-css-extract-plugin)이 있다.

<br />

**참고**

<div style="font-size: 12px;">

- https://webpack.js.org/
- https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html
- https://joshua1988.github.io/webpack-guide
- https://www.daleseo.com/webpack-plugins-define-environment/

</div>
