---
title: BEM(Block Element Modifier)이란?
date: '2020-9-23'
tags: [css]
draft: false
---

개발자가 가장 힘들어 하는 일은 변수, 함수, 클래스 등의 '이름 짓기'다.

<div style="text-align: center">
<img src="https://abibablog.files.wordpress.com/2016/01/kishore_programmer_hardest_job.jpg?w=640" style="width: 400px;">
<p style="font-size: 12px;">https://abibablog.wordpress.com/2016/01/13/programmers-hardest-tasks/</p>
</div>

어떤 이름이 깔끔하고, 겹치지 않으며 재사용할 수 있고, 다른 사람이 한번에 팍하고 알아볼 수 있을까?

## BEM(Block Element Modifier)

BEM은 Block, Element, Modifier의 줄임말로 CSS 방법론 중 하나로, 스타일링 구조를 정의한다.

기본 구조는 `block__element--modifier`이다.

조금 더 쉽게 설명하기 위해 아래 구조를 예로 들겠다.

<p style="text-align: center;">
<img src="https://user-images.githubusercontent.com/58619071/193415042-6c2d6e50-3f1a-4f79-bcbf-18faf2c9a335.png" />
</p>

```html
<section class="section-tours" id="section-tours">
  <div class="card">
    <div class="card__side card__side--front">
      <div class="card__picture card__picture--1">&nbsp;</div>
      <h4 class="card__heading">
        <span class="card__heading-span card__heading-span--1">
          The Sea Explorer</span
        >
      </h4>
      <div class="card__details">
        <ul>
          <li>3 day tours</li>
          <li>Up to 30 people</li>
          <li>2 tour guides</li>
          <li>Sleep in cozy hotels</li>
          <li>Difficulty: easy</li>
        </ul>
      </div>
    </div>
  </div>
  ...
</section>
```

<p style="font-style: italic;">전체 코드는 <a href="https://github.com/howdy-mj/advanced-css-course/blob/master/1-Natours/index.html" target="_blank">Github Repo</a>에서 볼 수 있다.</p>

<br />

### Block

Block은 `card`와 같이 하나의 독립된 영역을 말한다. 이 외, header, footer, menu 등 누가 봐도 하나로 묶을 수 있는 것을 block으로 볼 수 있다.

Block은 중첩(Nesting)이 가능하여, 안에 다른 Block이 올 수 있다.

```html
<section class="section-tours" id="section-tours">
  <div class="card">
    ...
  </div>
</section>
```

`section-tours`라는 블록 아래에 `card` 블록이 있다.

<br />

### Element

Element는 `card__heading`, `card__details`처럼 어떤 목적인지 나타낸다. 이 외, input, text 등에도 사용 가능하다.

Element도 중첩이 가능하지만, Block과 마찬가지로 한 번만 사용이 가능하다.

```html
<!--틀린 예-->
<div class="card__details">
  <ul class="card__details__ul">
    ...
  </ul>
</div>
```

만약 ul태그에 Element를 붙이자면, `card__ul`로 할 수 있다.

```html
<div class="card__details">
  <ul class="card__ul">
    <li class="card__li1"></li>
    <li class="card__li2"></li>
    <li class="card__li3"></li>
  </ul>
</div>
```

이것처럼 하나의 Block에서 하나의 Element만 받는다. 하지만 Block에 속해 있는 상태에서 밖에서 사용할 수 없다.

```html
<!--틀린 예-->
<div class="card">
  ...
</div>
<div class="card__details">
  Details
</div>
```

<br />

### Modifier

Modifier는 `card__side--front`와 같이 해당 요소의 형태(상태)를 나타낸다. (해당 글에서는 코드를 다 가져오지 못했지만, `card__side--back`도 존재한다)

Modifier를 `__`로 작성하는 곳도 있지만, 필자는 Element와 구분짓기 쉽고, 직관적인 [Get BEM](http://getbem.com/)을 따른다.

Modifier는 Block 다음에 바로 올 수도 있다. 예를 들면 `card--large`, `card--hidden`이 있다.

<br />

물론 프로젝트, 기업 마다 준수하는 스타일 가이드는 다 다르며 각자의 상황에 맞게 협의하여 사용하면 된다.

<br>

**참고**

<div>

- http://getbem.com/
- https://en.bem.info/

</div>
