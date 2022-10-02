---
title: 'script 요소 알아보기'
date: '2021-10-30'
tags: ['html']
draft: false
---

HTML의 `script` 요소는 보통 JavaScript를 불러오기 위해 사용된다. 그 외, WebGL의 GLSL 셰이더 프로그래밍 언어, JSON 등 다른 언어와도 사용이 가능하다.

```html
<!-- 생략 -->
<body>
  <script src="index.js"></script>
</body>
```

`script`의 interface는 <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement" target="_blank">HTMLScriptElement</a>이며 여러 프로퍼티들이 존재한다.

## src

<span class="return">src</span> 속성은 외부 스크립트의 URI를 적어준다. 프로젝트 내부의 스크립트라 상대주소일 수도 있고, 외부 라이브러리일 경우 절대 주소일 수도 있다.

## async와 defer

일반적으로 스크립트 파일은 화면이 다 그려진 후에 가져온다.

그러나 <span class="return">async</span>나 <span class="return">defer</span> 속성이 존재하면, 화면이 다 그려지기 전에도 스크립트를 가져올 수 있다. (단, 인라인에서 <span class="return">src</span> 속성이 없을 때 <span class="return">async</span>와 <span class="return">defer</span>를 사용하면 안된다.)

<span class="return">async</span>나 <span class="return">defer</span> 속성 모두 boolean 타입으로 태그에 속성만 작성하면 된다

```html
<body>
  <!-- 생략 -->
  <script defer src="index.js"></script>
  <script async src="index.js"></script>
</body>
```

두 속성 모두 false가 기본 값이다.

<br>

스크립트를 불러오는 데는 크게 세 가지 유형이 존재한다.

<div class="img-div">
  <img src="https://res.cloudinary.com/josefzacek/image/upload/v1520507339/blog/whats-the-difference-between-async-vs-defer-attributes.jpg">
  <p>https://www.josefzacek.cz/blog/whats-the-difference-between-async-vs-defer-attributes/</p>
</div>

1. <span class="return">async</span> 속성이 있다면, 스크립트가 다운되자마자 비동기적으로 실행된다.
2. <span class="return">async</span> 속성이 없고, <span class="return">defer</span>가 존재한다면, 스크립트는 페이지가 파싱이 끝나고 화면에 콘텐츠가 로딩되기 전에 실행된다.
3. 만약 둘 다 없다면, 스크립트를 곧바로 불러오고 실행하지만, 페이지 파싱이 멈춘다.

페이지의 콘텐츠 로딩 여부는 아래 코드로 확인이 가능하다.

```js
window.addEventListener('DOMContentLoaded', event => {
  console.log('DOM fully loaded and parsed')
})
```

<span class="return">defer</span> 속성은 HTML 파싱이 끝나고, 화면에 콘텐츠가 그려지기 전에 스크립트가 실행된다. 따라서, 화면이 렌더되기 전에 스크립트를 가져오고 순서를 보장받고 싶다면 <span class="return">defer</span> 속성을 사용하면 된다.

## type

해당 스크립트의 타입을 나타내는 것으로, 자주 사용하는 유형은 두 가지가 있다.

### JavaScript MIME

```html
<script type="text/javascript" src="index.js"></script>
```

해당 스크립트가 자바스크립트인 것을 뜻하며, 기본 값이라 생략해도 무관하다.

### module

모듈은 하나의 클래스 혹은 특정 목적을 가진 함수다. 모듈 스코프가 따로 존재하여 외부에 공개하려면 export로 내보내야 하며, 사용하려면 import로 가져와야 한다.

```html
<script type="module" src="index.mjs"></script>
```

스크립트를 자바스크립트 모듈(`mjs` 확장자가 모듈임을 명시)로 간주한다. 자바스크립트 모듈은 항상 지연 실행되어, <span class="return">defer</span>와 동일하게 실행된다. _(모듈은 추후 다른 글에서 자세히 다뤄 볼 예정이다)_

## crossorigin

현재와 다른 도메인에서 스크립트를 불러올 때, 해당 스크립트를 어떻게 다룰 것인지 설정하는 속성으로, `script`뿐만 아니라, `audio`, `img`, `link`, `video`에도 사용 가능하다.

```html
<script src="https://example.com/example-framework.js"></script>
```

<div class="img-div" style="width: 350px;">
  <img src="https://user-images.githubusercontent.com/58619071/193440125-9ee34114-e53c-4472-9389-46f7ec332497.png" alt="script error">
  <p>script만 작성했을 경우</p>
</div>

일반 `script`는 표준 CORS를 통과하지 못했을 때 <a href="https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror" target="_blank">window.onerror</a>에 최소한의 정보만 넘긴다. 따라서 정확히 어떤 원인인지 파악하기 어렵다.

반면 crossorigin 속성은 다른 도메인을 사용하는 사이트의 에러 기록을 자세히 알려준다. 해당 속성에는 <span class="return">anonymous</span>, <span class="return">use-credentials</span>이 들어갈 수 있다. 만약 빈 문자열이나 잘못된 값이 들어간다면 <span class="return">anonymous</span>와 동일하게 동작한다.

```html
<script
  src="https://example.com/example-framework.js"
  crossorigin="anonymous"
></script>
```

<div class="img-div" style="width: 350px;">
  <img src="https://user-images.githubusercontent.com/58619071/193440124-1ebcad7b-96f0-4b44-a589-7e02310d6e96.png" alt="script anonymous">
  <p>crossorigin이 anonymous인 경우</p>
</div>

crossorigin도 나중에 다양한 예시를 갖고 다시 글에 다뤄보고 싶다.

<br />

**참고**

<div style="font-size: 12px;">

- <a href="https://developer.mozilla.org/ko/docs/Web/HTML/Element/script" target="_blank">MDN - script</a>

</div>
