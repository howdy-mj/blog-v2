---
title: 'HTML 템플릿 및 HTML Content Model'
date: '2021-03-01'
tags: ['html']
draft: false
---

## HTML 기본 템플릿

기본적인 HTML 템플릿과 각 태그가 어떤 역할을 하는지 알아보자.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <title>HTML Title</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="initial-scale=1, width=device-width" />
  </head>
  <body>
    <!-- 이 문서의 핵심 내용으로 유저에게 보임 -->
  </body>
</html>
```

VSCode를 사용하고 있을 경우, `html:5`를 작성한 경우 Emmet이 위의 내용을 템플릿을 자동으로 만들어준다.

### DOCTYPE

```html
<!DOCTYPE html>
```

DOCTYPE은 항상 첫번 째 줄에서 작성하며, HTML, XML, SGML, SVG 등 다양한 마크업 기반 언어에서 사용되며, 브라우저에게 해당 문서의 타입과 버전을 알려준다.

현재 웹 브라우저는 완전 표준 모드(Full standards mode)는 HTML과 CSS에 따라 웹 페이지가 표시되고, 거의 표준 모드(Almost standard mode)는 소수의 호환 모드 요소만 지원한다. DOCTYPE은 브라우저에게 완전 표준 모드를 활성화하기 위해 작성하는데, 만약 이를 선언하지 않으면 Quirks mode(호환 모드)로 읽는다. 이는 예상치 못한 동작이 발생할 수 있으며, 브라우저의 구현 상황에 따라 조금씩 상이하게 동작하기도 한다. 다만 이메일에서 사용하는 HTML을 작성할 때는 명시적으로 작성하지 않는다.

### Head

head 태그에는 문서의 메타데이터(metadata)가 있으며, 다른 문서나 기기에게 이 문서에 대한 정보를 제공하는 데이터가 작성된다. 주로 아래 세 가지가 존재한다.

```html
<title>HTML title</title>
```

해당 문서의 제목

```html
<meta charset="UTF-8" />
```

해당 문서의 문자 인코딩 방식을 나타내며, 유니코드(Unicode)를 위한 문자셋인 UTF-8을 가장 많이 사용한다. 작성하지 않을 경우, 해당 문서를 보든 사용자의 브라우저가 제대로 해석하지 못해 임의의 문자를 표시할 수도 있다.

```html
<meta name="viewport" content="initial-scale=1, width=device-width" />
```

viewport는 브라우저에서 볼 수 있는 콘텐츠 영역을 말하며, 모바일 유저를 위해 사용하는 것을 권장한다. 이는 웹 표준 태그는 아니며 <a href="https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html" target="_blank">Apple에서 지원</a>하는 것이다.

### Body

body 태그는 나중에 다른 글에서 설명하려 한다.

<br />

## HTML Content Model

모든 HTML 요소는 콘텐츠 모델을 가지고 있으며, 두 가지 이상의 모델에 속할 수 있다. 콘텐츠 모델은 콘텐츠의 포함 관계를 나타내거나, 어떤 요소가 어떤 콘텐츠에 속해있는지를 볼 때 도움이 된다.

크게 Main, Secondary 카테고리 그리고 Transparent content Model로 나뉘며, Main 카테고리는 크게 7가지의 콘텐츠 모델로 나뉜다.

<div style="text-align: center">
<img src="https://developer.mozilla.org/@api/deki/files/6244/=Content_categories_venn.png?size=webview" style="width: 400px;">
<p style="font-size: 12px;">https://developer.mozilla.org/ko/docs/Web/Guide/HTML/Content_categories</p>
</div>

자세한 건 <a href="https://html.spec.whatwg.org/multipage/dom.html#kinds-of-content" target="_blank">여기서</a> 확인할 수 있다.
<br />

## Main

### Metadata content

메타 데이터 콘텐츠는 문서의 표현이나 동작을 수정하거나, 다른 문서와 이 문서 간의 관계를 나타내고 이 문서에 대한 정보를 표현할 때 사용한다.

- `<base>`, `<link>`, `<meta>`, `<script>`, `<noscript>`, `<style>`, `<template>`, `<title>`

### Flow content

문서의 body 요소 내부에 들어갈 수 있는 대부분의 요소는 여기에 속한다.

### Sectioning content

heading, footer 그리고 제목 콘텐츠의 범위를 정한다.

- `<article>`, `<aside>`, `<nav>`, `<section>`

### Heading content

섹션의 헤더를 정의한다. 섹션의 헤더에는 명시적으로 sectioning content를 사용하는 방법과 암묵적으로 생성할 수도 있다.

- `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, `<hgroup>`

> 'header' 는 보통 제목을 포한하지만 heading content는 아니다.

> 'hgroup'은 HTML5의 완성 전, W3C HTML에서 제거되었으나, 여전히 WHATWG 명세의 일부이며 대부분의 브라우저에서 부분적으로 지원하고 있다.

### Phrasing content

HTML 문서 내에서 텍스트를 표시하는 요소이다. Text 노드를 포함하는 경우 대부분 여기에 해당한다.

### Embedded content

주로 문서 내에서 외부 콘텐츠(ex. 이미지, 비디오, 오디오, 외부 문서 등)를 가져올 때 사용한다.

- `<audio>`, `<canvas>`, `<embed>`, `<iframe>`, `<img>`, `<matchML>`, `<object>`, `<picture>`, `<svg>`, `<video>`

### Interactive content

유저와 상호작용이 발생하는 모든 요소를 말한다.

- `<a>`, `<audio> (controls)`, `<video> (controls)`, `<button>`, `<details>`, `<iframe>`, `<object> (usemap)`, `<img> (usemap)`, `<input> (type이 hidden이 아닌 경우)`, `<label>`, `<select>`, `<textarea>`

### Palpable content

palpable는 감지할 수 있는, 뚜렷한 이라는 뜻이며, 비어 있거나 hidden인 콘텐츠를 뜻한다.

Flow 콘텐츠나 Phrasing 콘텐츠는 자식 노드가 적어도 1개 이상 존재해야 하는데, 만약 해당 콘텐츠에 자식 노드가 없거나, 숨겨져 있는 경우를 Palpable 콘텐츠라 부른다.

<br />

## Secondary

### Script-supporting content

이 자체로는 문서에 무언가를 렌더하지 않지만, 스크립트를 지원하기 위해 사용하는 요소이다.

- `<script>`, `<template>`

<br />

## Transparent content Model

일부 요소는 이 콘텐츠 모델을 지니는데, 어떤 콘텐츠에 속하느냐에 따라 콘텐츠 모델이 달라지는 걸 의미한다.
예를 들어 `a 태그가` `p 태그` 내부에 있는 경우 `a`는 Phrasing content 처럼 취급된다.

## Paragraphs

이는 콘텐츠 모델은 아니지만, Flow 콘텐츠 내에 텍스트가 들어가 있거나, Phrasing content가 여럿 묶여 있는 경우를 Paragraph라 취급한다.

## The nothing content model

Text 노드가 없거나, 다른 자식 노드가 전혀 없는 것을 말한다.

<br />

**참고**

<div style="font-size: 12px;">

- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories
- https://developer.mozilla.org/ko/docs/Web/HTML/Quirks_Mode_and_Standards_Mode
- https://html.spec.whatwg.org/multipage/dom.html#kinds-of-content

</div>
