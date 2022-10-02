---
title: 이벤트 캡쳐링과 버블링 알아보기
date: '2021-02-08'
tags: [dom]
draft: false
---

필자는 모달을 구현하고, 모달 밖을 누르면 모달이 꺼지고, 모달 내부를 누르면 아무 반응도 없게 구현하고 싶었다. 하지만 분명 모달의 바깥을 눌러야 모달이 닫히는 함수를 만들었음에도 불구하고, 내부를 클릭했을 때도 같이 꺼지는 문제가 발생했다.

이런 현상이 바로 이벤트 버블링(Event Bubbling) 때문이었다.

## 이벤트 버블링, 캡쳐링이란?

```html
<html>
  <body>
    <div class="pink-div">
      <div class="green-div"></div>
    </div>
    <script>
      const html = document.querySelector('html')
      const body = document.querySelector('body')
      const greenDiv = document.querySelector('.green-div')
      const pinkDiv = document.querySelector('.pink-div')

      html.addEventListener('click', function() {
        console.log('html')
      })

      body.addEventListener(
        'click',
        function() {
          console.log('body')
        },
        false
      )

      pinkDiv.addEventListener(
        'click',
        function() {
          console.log('pink div')
        },
        false
      )

      greenDiv.addEventListener(
        'click',
        function() {
          console.log('green div')
        },
        false
      )
    </script>
  </body>
</html>
```

가장 간단하게 이벤트 버블링, 캡쳐링을 이해할 수 있도록 click 이벤트를 만들어보았다. <i>(아래 codesandbox에 코드 존재)</i>

이벤트가 실행되면 캡쳐링(Capturing), 버블링(Bubbling) 두 가지 단계(two phases)가 존재한다.

<div style="text-align: center;">
<img src="https://user-images.githubusercontent.com/58619071/193438888-ceef93fd-e232-43bd-95a3-fbb1e83c56f8.png" alt="event-bubbling-and-capturing">
<p style="font-size: 12px; color: gray;">@howdy-mj</p>
</div>

위 이미지에서 보듯이, 이벤트 캡쳐링은 위에서 아래로 내려가며, 이벤트 버블링은 밑에서 위로 올라가는 단계이다.

<ul>
  <li>이벤트 캡쳐링: html > body > ... > target</li>
  <li>이벤트 버블링: target > ... > body > html</li>
</ul>

`addEventListener()`의 세 번째 인자가 캡쳐링 여부를 결정한다.

```js
target.addEventListener(type, listener[, useCapture]);
```

기본 값은 false로 되어있기 때문에 버블링만 발생하며 이를 true로 바꾸면 캡쳐링이 발생한다.

```js
const body = document.querySelector('body')

body.addEventListener(
  'click',
  function() {
    console.log('clicked body')
  },
  true
)
```

<hr />

아래에서 실제 코드를 보고 실습을 해보자.

### 이벤트 캡쳐링

<iframe src="https://codesandbox.io/embed/event-capturing-ype5c?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="event-capturing"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

아래 console을 열고 클릭해보면 이벤트 버블링이 일어나는 순서를 알 수 있다.

회색부분을 누르면 `html > body`가, 분홍색을 누르면 `html > body > pink div`, 초록색을 누르면 `html > body > pink div > green div` 순으로 console이 찍힌다.

### 이벤트 버블링

<iframe src="https://codesandbox.io/embed/event-bubbling-and-capturing-6rzjn?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="event-bubbling-and-capturing"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

console을 열고 회색부분을 누르면 `body > html`이, 분홍색을 누르면 `pink div > body > html`, 초록색을 누르면 `green div > pink div > body > html` 순으로 찍히는 걸 볼 수 있다.

이처럼 가장 내부를 클릭하지만, 실제로는 그 클릭 이벤트가 최상단의 body, html에까지 전달이 된다. 처음에 필자가 만들었던 모달도, 내부를 누르면 그 위의 element까지 같이 눌리게 되기 때문에 이벤트가 발동되어 모달이 닫혔던 것이다.

## 이벤트 전파 막기

그렇다면 과연 어떻게 이런 이벤트 전파를 막을 수 있을까?

`e.stopPropagation()`을 사용하면 된다.

버블링 상태에서 pink div에만 해당 함수를 걸면 아래와 같은 결과를 볼 수 있다.

```js
pinkDiv.addEventListener('click', function(e) {
  e.stopPropagation()
  console.log('pink div')
})
```

<iframe src="https://codesandbox.io/embed/event-stoppropagation-y7d70?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="event-stopPropagation"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

그랬더니 pink div를 클릭 할 때에는 오직 'pink div'만 console에 찍히는 것을 확인할 수 있다. 이는 클릭한 element의 이벤트만 발생시키고 상위로 이벤트 전달하는 것을 막아준다. 캡쳐링에서 e.stopPropagation()을 걸 경우, 클릭한 element의 최상위 이벤트만 동작하고, 하위 이벤트는 발생하지 않는다.

이 외, `e.stopImmediatePropagation()`을 사용하면 동일한 대상의 이벤트 흐름뿐만 아니라 다른 유사 이벤트도 중지시킬 수 있다. <i>(추후 추가)</i>

## 이벤트 버블링, 취소 가능 여부

가장 자주 사용하는 이베트의 버블링 및 취소 가능 여부를 알아보자.

<a href="https://www.w3.org/TR/uievents/#event-types" target="_blank">UI Events</a>에서 전체 이벤트를 볼 수 있다.

### Focus Event

|   Type    |  Bubbles  |  Cancelable  |
|:---------:|:---------:|:------------:|
|  `blur`   |    No     |      No      |
|  `focus`  |    No     |      No      |

<br />

### Mouse Event

|      Type      |  Bubbles  |  Cancelable  |
|:--------------:|:---------:|:------------:|
|    `click`     |    Yes    |     Yes      |
|  `mousedown`   |    Yes    |     Yes      |
|  `mouseenter`  |    No     |      No      |
|  `mouseleave`  |    No     |      No      |
|  `mousemove`   |    Yes    |     Yes      |
|   `mouseout`   |    Yes    |     Yes      |
|  `mousemover`  |    Yes    |     Yes      |
|   `mouseup`    |    Yes    |     Yes      |

<br />

### Wheel Event

|    Type    |  Bubbles  |  Cancelable  |
|:----------:|:---------:|:------------:|
|  `wheel`   |    Yes    |     Yes      |
|  `scroll`  |    Yes    |      No      |

<br />

### Keyboard Event

|    Type     |  Bubbles  |  Cancelable  |
|:-----------:|:---------:|:------------:|
|  `keydown`  |    Yes    |     Yes      |
|   `keyup`   |    Yes    |     Yes      |

<br />

**참고**

<div style="font-size: 12px;">

- https://www.w3.org/TR/uievents/
- https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/
- https://ko.javascript.info/bubbling-and-capturing
- https://www.tutorialrepublic.com/javascript-tutorial/javascript-event-propagation.php

</div>
