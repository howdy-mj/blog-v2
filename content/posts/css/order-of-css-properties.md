---
title: CSS 속성 순서
date: '2020-12-16'
tags: [css]
draft: false
---

CSS를 작성하다보면, 어떤 순서로 작성해야 깔끔하고 눈에 잘 보이는지 고민되는 순간이 온다.

필자는 개인적으로 `position > display > width, height, padding, margin > background, color > font > 그 외 > pseudo`의 순서로 작성했는데 다른 곳에서는 어떻게 작성하는지 궁금하여 한번 찾아봤다.

_(CSS property 순서라 돌아다니는 글은 정확한 출처를 찾을 수 없어 다시 찾아봤다)_

공식적으로 발표 된 순서는 것은 없지만, 다들 비슷한 생각인지 정리 해놓은 글들이 꽤 있었다.

## Grouped by type

이는 기존에 내가 하던 방식과 가장 유사하다.

출처: [Poll Results: How do you order your CSS properties?](https://css-tricks.com/poll-results-how-do-you-order-your-css-properties/)

```css
.selector {
  /* Positioning */
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;

  /* Display & Box Model */
  display: inline-block;
  overflow: hidden;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 10px solid #333;
  margin: 10px;

  /* Color */
  background: #000;
  color: #fff

  /* Text */
  font-family: sans-serif;
  font-size: 16px;
  line-height: 1.4;
  text-align: right;

  /* Other */
  cursor: pointer;
}
```

## Concentric-CSS

2011년에 나왔으며, 바깥의 box model부터 시작하여 안으로 작성한다.

출처: [Concentric-CSS](https://github.com/brandon-rhodes/Concentric-CSS)

```css
#Concentric-CSS-Overview {
  display: ; /* Directions about where and how the box is placed */
  position: ;
  float: ;
  clear: ;

  visibility: ; /* Next: can the box be seen? */
  opacity: ;
  z-index: ;

  margin: ; /* Layers of the box model, from outside to inside */
  outline: ;
  border: ;
  background: ; /* (padding and content BOTH get the background color) */
  padding: ;

  width: ; /* Content dimensions and scrollbars */
  height: ;
  overflow: ;

  color: ; /* Textual content */
  text: ;
  font: ;
}
```

## idiomatic CSS

2013년에 나왔으며, [mozilla](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Organizing)에서도 몇 가지 내용을 반영하였다.

클래스 네이밍 부터 포맷, 선언 순서까지 가이드를 작성했으며, 주석이 있어 코드가 좀 길지만 다른 사람이 보더라도 무엇인지 알아 볼 수 있다는게 큰 장점인 것 같다.

출처: [Principles of writing consistent, idiomatic CSS](https://github.com/necolas/idiomatic-css)

```css
/**
 * 실제로 주석이 더 많지만, 해당 글에서는 삭제했다. 위의 출처에서 볼 수 있다.
 */

/* ===================================================
   Grid layout
   =================================================== */

/* Grid container */
.grid {
  height: 100%;
  font-size: 0;
  white-space: nowrap;
}

/* Grid cells */
.cell {
  position: relative;
  display: inline-block;
  overflow: hidden;
  box-sizing: border-box;
  height: 100%;
  padding: 0 10px;
  border: 2px solid #333;
  vertical-align: top;
  white-space: normal;
  font-size: 16px;
}

/* Cell states */
.cell.is-animating {
  background-color: #fffdec;
}

/* Cell dimensions */
.cell-1 {
  width: 10%;
}
.cell-2 {
  width: 20%;
}
.cell-3 {
  width: 30%;
}
.cell-4 {
  width: 40%;
}
.cell-5 {
  width: 50%;
}

/* Cell modifiers */
.cell--detail,
.cell--important {
  border-width: 4px;
}
```
