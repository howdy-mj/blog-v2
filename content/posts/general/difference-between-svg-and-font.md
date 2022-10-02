---
title: 'Icon Fonts와 SVG의 차이'
date: '2020-6-11'
tags: ['general']
draft: false
---

## 아이콘을 가져오는 방법

크게 세 가지 방법이 존재한다.

1. 이미지 파일 (ex. jpg, png 등)
2. Icon Fonts
3. SVG 파일

## 1. 이미지 파일

프론트를 처음 배우고 제일 먼저 아이콘을 불러올 때, 대부분 해당 아이콘 이미지를 다운받은 후 `img` 태그로 불러올 것이다.

```js
<img src="경로" alt="" />
```

개인 프로젝트이면서 해당 이미지를 변경하지 않을 거라면 이미지 파일로 불러와도 큰 문제는 없다.

하지만 이미지 파일은 아이콘이 해상도나 색상을 바꿔야 할 때, 아이콘 원본 이미지 파일을 편집하고 저장 후, 다시 import 해와야 하는 번거로움이 있다.

## 2. Icon Fonts

이미지 파일의 불편함을 해소하고자 Icon Fonts가 나왔다. 유명한 Icon Fonts 사이트에는 [Font Awesome](https://fontawesome.com/)과 구글의 [Material Icons](https://google.github.io/material-design-icons/)가 있다.

Font는 벡터(vector)이기 때문에 CSS를 통해 해상도를 변경할 수 있다. 가장 보편적인 방법은 가상요소([pseudo element](https://developer.mozilla.org/ko/docs/Web/CSS/Pseudo-elements), ex. `::before`, `::after` 혹은 특정 요소)를 통해 적용하는 것이다.

```js
<i class="fas fa-hand-sparkles"></i>
```

<p style="font-size: 14px;">(자세한 사용방법은 Font Awesome 홈페이지에서 확인할 수 있다)</p>

하지만 Icon Font에도 몇 가지 문제점이 있다.

가장 큰 문제는 깨져서 보인다는 것이다.

Font 자체는 벡터 그래픽 기반이지만, 브라우저에서는 텍스트로 취급되기 때문에 흐릿하게 보일 수도 있다. 그래서 렌더링할 때 [안티 에일리어싱](https://kbench.com/?q=node/1699)(Anti-Alising, AA, 모서리 선을 부드럽게 만드는 것) 문제를 해결하기 위해 정규화를 진행해야 한다.

그리고 이미 웹에 올라온 아이콘을 사용할 때는 문제가 없지만, 직접 제작하려면 폰트 제작 서비스에 의존해야 하며, 추가/삭제 자동화가 어렵고 번거롭다.

## 3. SVG 파일

이러한 불편함을 해소하기 위해 SVG를 사용한다.

SVG(Scalable Vector Graphics)은 2차원 벡터 그래픽을 표현하기 위한 [XML](https://ko.wikipedia.org/wiki/XML) 기반의 파일 형식으로, 1999년 W3C 주도하에 개발된 오픈 그래픽 표준이다. IE7 이전 버전을 제외한 대부분의 브라우저에서 지원된다. 벡터 기반이기 때문에 어떤 사이즈에서든 깨지지 않는다.

<p style="text-align: center;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Bitmap_VS_SVG.svg/450px-Bitmap_VS_SVG.svg.png" alt="SVG"/></p>
<p style="font-size: 10px; text-align: center;">https://en.wikipedia.org/wiki/Scalable_Vector_Graphics</p>

### import SVG

<p style="font-size: 14px; font-style: italic">이 글은 React 기준으로 SVG import 방식에 대해 소개한다.</p>

SVG는 `img` 태그, CSS background, JavaScript에서 inline으로 불러올 수도 있다.
그래서 SVG의 속성(ex. defs, fill 등)도 그대로 사용 가능하다. 혹은 가장 간단하게 [SVGR](https://react-svgr.com/) 라이브러리로도 바로 import할 수 있다.

이번 글에서는 inline과 SVGR로 불러오는 것을 다룰 것이다.

### (1) inline

W3School에 [SVG Tutorial](https://www.w3schools.com/graphics/svg_intro.asp)이 있어서 한 번씩 읽거나 따라해보면 이해가 빨리 될 것이다.

간단한 예제는 위의 SVG Tutorial에서 볼 수 있으니, 비교적 복잡한 암호화폐 거래소 [지닥](https://www.gdac.com/)의 로고를 살펴보겠다.

<div style="text-align: center">
<img src="https://resources.gdac.com/imgs/icon/gdac-logo-dark.svg" style="width: 200px;">
<p style="font-size: 10px;">img 태그로 import 해온 것</p>
</div>

```jsx
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 203.93 62.66"
  class="injected-svg"
  data-src="https://resources.gdac.com/imgs/icon/gdac-logo-dark.svg"
>
  <defs>
    <style>
      .clsd-1 {
        fill: #00358d;
      }
      .clsd-2 {
        fill: #064fa2;
      }
      .clsd-3 {
        fill: #0b80ca;
      }
      .clsd-4 {
        fill: #139de0;
      }
      .clsd-5 {
        fill: #0969b6;
      }
      .clsd-6 {
        fill: #0c1430;
      }
    </style>
  </defs>
  <title>logo-dark</title>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_1-2" data-name="Layer 1">
      <path class="clsd-1" d="M0,0,26.18,1.31,52,7.67Z"></path>
      <path class="clsd-2" d="M1.92,35.76,0,0,14.57,62.66Z"></path>
      <path
        class="clsd-3"
        d="M52,7.67,44.42,41.76,14.57,62.66,28.7,18.17Z"
      ></path>
      <path class="clsd-4" d="M28.7,18.17,14.57,62.66,0,0Z"></path>
      <path class="clsd-5" d="M28.7,18.17,0,0,52,7.67Z"></path>
      <path
        class="clsd-6"
        d="M91.35,48.39a30.77,30.77,0,0,1-7.27.81,21.15,21.15,0,0,1-7.51-1.29,17.43,17.43,0,0,1-5.91-3.65,16.66,16.66,0,0,1-3.86-5.64,18.55,18.55,0,0,1-1.39-7.32,18.65,18.65,0,0,1,1.41-7.39,16.54,16.54,0,0,1,3.91-5.64,17.25,17.25,0,0,1,5.86-3.58,20.72,20.72,0,0,1,7.25-1.25,22.21,22.21,0,0,1,7.49,1.23A15.47,15.47,0,0,1,96.94,18l-5.18,5.91a9,9,0,0,0-3.17-2.28,10.76,10.76,0,0,0-4.46-.89,9.9,9.9,0,0,0-4,.79A9.79,9.79,0,0,0,77,23.69a9.93,9.93,0,0,0-2.08,3.36,11.72,11.72,0,0,0-.75,4.25,13.5,13.5,0,0,0,.67,4.32,9.31,9.31,0,0,0,2,3.38,9,9,0,0,0,3.26,2.21,11.68,11.68,0,0,0,4.44.79,17.21,17.21,0,0,0,2.74-.21,10.62,10.62,0,0,0,2.4-.7V34.9H83.17V28.27h14v18A26.09,26.09,0,0,1,91.35,48.39Z"
      ></path>
      <path
        class="clsd-6"
        d="M135.63,31.25A16.63,16.63,0,0,1,134,39a15.54,15.54,0,0,1-4.36,5.33,18.17,18.17,0,0,1-6.12,3.07,24.74,24.74,0,0,1-6.92,1H103.9v-34h12.29a30.84,30.84,0,0,1,7.1.84A17.7,17.7,0,0,1,129.53,18,14.13,14.13,0,0,1,134,23.19,17.45,17.45,0,0,1,135.63,31.25Zm-8.54,0a10.85,10.85,0,0,0-.94-4.78,8,8,0,0,0-2.5-3,10,10,0,0,0-3.55-1.61,17.42,17.42,0,0,0-4.1-.48h-4.08V41.23h3.89a17.4,17.4,0,0,0,4.24-.5,10.08,10.08,0,0,0,3.6-1.66,8.11,8.11,0,0,0,2.5-3.07A10.83,10.83,0,0,0,127.09,31.25Z"
      ></path>
      <path
        class="clsd-6"
        d="M162.94,48.34l-2.64-6.67H147.15l-2.5,6.67h-8.92l14.25-34h8l14.11,34Zm-9.12-24.91L149.5,35.09h8.55Z"
      ></path>
      <path
        class="clsd-6"
        d="M198.37,47.74a18.21,18.21,0,0,1-7.64,1.51,19.82,19.82,0,0,1-7.27-1.3,16.78,16.78,0,0,1-9.62-9.36,18.57,18.57,0,0,1-1.39-7.29,18.65,18.65,0,0,1,1.41-7.39,16.54,16.54,0,0,1,3.91-5.64,17.25,17.25,0,0,1,5.86-3.58,21,21,0,0,1,14.33,0,13.6,13.6,0,0,1,5.64,3.72L198,24a7,7,0,0,0-3-2.35,10.08,10.08,0,0,0-3.84-.77,9.86,9.86,0,0,0-4,.79,9.28,9.28,0,0,0-3.1,2.19,10,10,0,0,0-2,3.29,11.55,11.55,0,0,0-.72,4.15,11.94,11.94,0,0,0,.72,4.22,9.81,9.81,0,0,0,2,3.29,8.91,8.91,0,0,0,3,2.14,9.75,9.75,0,0,0,3.89.76,8.91,8.91,0,0,0,4.27-1,8.23,8.23,0,0,0,2.93-2.49l5.71,5.37A16.2,16.2,0,0,1,198.37,47.74Z"
      ></path>
    </g>
  </g>
</svg>
```

저 로고 하나를 inline으로 작성하려면 위의 코드처럼 속성 하나하나 다 지정해줘야 한다.

그럼 여기서 나오는 속성에 대해 간략하게 알아보자.

#### SVG 요소(Element) 및 속성(Attribute)

`<svg>`: SVG 파일을 생성할 때 사용한다.

`<g>`: 다른 SVG element들을 그룹 지을때 사용한다.

`<defs>`: 나중에 재사용할 element를 안에 정의한다.

`<path>`: element의 path를 지정할 때 사용하는데, `d` 속성 안에서 여러 명령어들로 정의된다.

- M = moveto(이동)
- L = lineto(선)
- H = horizontal lineto(수평선)
- V = vertical lineto(수직선)
- C = curveto(곡선)
- S = smooth curveto(완만한 곡선)
- Q = quadratic Bézier curve(베지에 곡선)
- T = smooth quadratic Bézier curveto(완만한 베지에 곡선)
- A = elliptical Arc(호(弧), 원이나 타원의 일부분)
- Z = closepath(path 끝)

위의 명령어들은 대문자, 소문자 모두 사용가능한데, 대문자는 절대적 좌표를 참조하고, 소문자는 상대적 좌표를 참조한다.

`viewBox`: min-x, min-y, width, height 4가지 값을 가진다. 만약 width, height를 0으로 지정하면 SVG가 렌더되지 않는다.

`fill`: 어떤 색상으로 채울 때 사용

[SVG 요소, 속성 더 자세히 알아보기](https://developer.mozilla.org/ko/docs/Web/SVG)

### (2) SVGR

```shell
# Node API
$ npm install @svgr/core
# or
$ yarn add @svgr/core

# Webpack
$ npm install @svgr/webpack --save-dev
# or
$ yarn add @svgr/webpack --dev
```

Node API로 설치한다면, custom script나 SVGR를 기반으로 다른 툴도 생성할 수 있다.

Webpack으로 설치한다면, SVG 파일을 바로 React Component로 import가 가능하다.

여기서는 Webpack으로 설명하겠다.
Webpack으로 사용하려면 아래와 같은 설정이 필요하다.

<span class="file-location">webpack.config.js</span>

```js
{
  test: /\.svg$/,
  use: ['@svgr/webpack'],
}

// or
webpack(config) {
  config.module.rules.push({
    test: /\.svg$/,
    use: ["@svgr/webpack"]
  });
}
```

그리고 원하는 component에서 바로 import하면 된다.

```jsx
import Star from './star.svg'
const App = () => (
  <div>
    <Star />
  </div>
)
```

Webpack에 다른 옵션을 주거나 url-loader, babel 등을 설정하고 싶다면 [SVGR DOCS](https://react-svgr.com/docs/webpack/)를 참고하면 된다.

<br>

**참고**

<div style="font-size: 12px;">

- https://www.creativebloq.com/web-design/icon-fonts-vs-svg-101413211
- https://junojunho.com/front-end/svg-icon
- https://www.keycdn.com/blog/icon-fonts-vs-svgs
- http://jun.hansung.ac.kr/WP_2014/WP/lecture%20notes/SVG%20Introduction.html
- https://developer.mozilla.org/ko/docs/Web/SVG/Tutorial/Paths

</div>
