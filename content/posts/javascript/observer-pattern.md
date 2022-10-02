---
title: 'Observer 패턴 알아보기 (hooks와 observables)'
date: '2022-1-6'
tags: ['javascript']
draft: false
---

현 회사의 메인 프로젝트가 Angular로 개발되어 있다보니 자연스럽게 RxJS를 접하게 되었다.

그러나 Observable이 어떻게 그 객체의 변화를 감지하는지 모른채 사용했다. 그래서 조금이나마 이해하기 위해 Observer 패턴에 대해 찾아봤다.

## GoF 디자인 패턴이란?

간략하게 ‘패턴’이란 무엇인지 알아보자. 개발자라면 이게 무엇인지는 몰라도 한 번 쯤 **GoF 디자인 패턴**을 들어봤을 것이다.

<details>
  <summary>용어: GoF, 디자인 패턴</summary>
  <ul class="small">
    <li>GoF는 Gang of Four의 약자로 네 명의 개발자(Erich Gamma, Richard Helm, Ralph Johnson, John Vissides)를 뜻한다.</li>
    <li>디자인패턴은 공통적으로 발생하는 문제에 대한 표준적인 해결책, 일종의 템플릿이다.</li>
  </ul>
</details>

GoF 디자인 패턴은 객체지향을 기반으로 23개의 디자인 패턴을 연구하여 정의한 것이다. 이는 크게 세 가지 영역으로 나뉘는데, **생성 패턴(Creational Patterns)**, **구조 패턴(Structural Patterns)** 그리고 **행동 패턴(Behavioral Patterns)**이 있다.

<br>

해당 글에서 다뤄볼 내용은 Observer 패턴은 행동 패턴에 속한다. 행동 패턴은 GoF 패턴의 가장 큰 부분으로 객체가 데이터를 공유하는 방법 혹은 객체 사이에서 데이터를 교환하는 방법에 대한 가이드를 제공한다.

그 중, Observer 패턴은 객체의 상태를 관찰하여, 객체 값의 변화를 감지할 때 사용된다. 하지만 이것만으로는 어떤 얘기인지 잘 와닿지 않는다. 해당 글에서는 `MutationObserver`로 간단하게 알아볼 예정인데, 그 외 MDN애 존재하는 웹 Observer API는 아래와 같다.

- <a href="https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API" target="_blank">Intersection Observer API</a>: 타겟 요소와 상위 요소 혹은 document의 뷰포트 사이의 intersection<span class="small">(\*의역: 거리)</span> 변화 감지
- <a href="https://developer.mozilla.org/ko/docs/Web/API/MutationObserver" target="_blank">MutationObserver</a>: DOM 객체 변경 감지
- <a href="https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API" target="_blank">Resize Observer API</a>: 객체의 크기(width, height) 변화 감지
- <a href="https://developer.mozilla.org/en-US/docs/Web/API/ReportingObserver" target="_blank">ReportingObserver</a>: 웹 플랫폼의 기능 혹은 버그 관련 정책 등을 감지
- <a href="https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver" target="_blank">PerformanceObserver</a>: 브라우저의 퍼포먼스 감지

## MutationObserver

<iframe src="https://codesandbox.io/embed/mutationobserver-mq2tg?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="MutationObserver"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

Observer 아래의 `Start`와 `Disconnect` 버튼으로 객체(_여기서는 박스_)를 관찰할지 말지를 결정할 수 있으며, Target 박스 아래의 버튼으로 박스의 속성을 변경할 수 있다. 로직은 아래와 같다.

```js
// observe할 대상 node, 해당 예시에서는 박스
const target = document.getElementById('target')

// observe 설정 (MutationObserverInit)
const config = { attributes: true, childList: true }

// observer 생성
const observer = new MutationObserver(mutations => {
  console.log('mutations', mutations)
})

// observe 대상 및 설정 전달
document.querySelector('.start').addEventListener('click', () => {
  console.log('Start Observe')
  observer.observe(target, config)
})

// observe 중지
document.getElementById('disconnect').addEventListener('click', () => {
  console.log('Disconnect Observer')
  observer.disconnect()
})

document.getElementById('attributes').addEventListener('click', () => {
  target.setAttribute('class', 'red')
})

document.getElementById('childList').addEventListener('click', () => {
  target.textContent = '변경'
})

document.getElementById('reset').addEventListener('click', () => {
  target.removeAttribute('class', 'red')
  target.textContent = ''
})
```

1. **설정(MutationObserverInit)**

  - 가장 많이 사용되는 값은 아래와 같다.

   ```ts
   const config: MutationObserverInit = {
     childList, // node의 자식 요소가 추가/삭제를 감지
     attributes, // 타겟의 속성 감지
     characterData, // 타겟의 데이터(ex. text node) 감지
     // ...생략
   }
   ```

  - 최소한 `childList`, `attributes` 혹은 `characterData`를 true로 설정해야 한다.
  - 더 자세한 내용은 <a href="https://developer.mozilla.org/ko/docs/Web/API/MutationObserver#mutationobserverinit" target="_blank">MDN - MutationObserverInit</a>에서 볼 수 있다.

2. **observe(target, config)**
  - observer에게 감지할 대상 node와 어떤 변화를 감지할 것인지에 대한 설정을 알려준다.
3. **mutations**
  - `new MutationObserver()` 생성자의 콜백 함수는 DOM의 변화를 나타내는 MutationRecord 값이 배열로 넘겨진다.
  - 해당 글에서는 어떤 type이 변경되었는지만 다룰 예정이며, 자세한 내용은 <a href="https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord" target="_blank">MDN - MutationRecord</a>에서 볼 수 있다.

### 문제점

위와 같이 하나의 이벤트에 하나의 변화만 있다면 문제될 건 없다. 하지만 어떠한 이벤트로 인해 바로 다른 객체가 변한다면 예기치 못한 사이드 이펙트가 일어날 수 있다.

위의 코드에서, `Make Red` 버튼을 누르면 박스에 trigger라는 글자가 생기도록하는 로직만 추가했다.

```js
const observer = new MutationObserver(mutations => {
  console.log('mutations', mutations)

  const currentAction = mutations[0] // 들어오는 변화의 첫 번째 것만 감지
  // 해당 코드에서 Make Red만 attributes이기 때문에 이렇게 작성했다
  if (currentAction.type === 'attributes') {
    target.textContent = 'trigger'
  }
})
```

<iframe src="https://codesandbox.io/embed/mutationobserver-trigger-ty1gg?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="MutationObserver - trigger"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

Start 버튼을 눌러서 관찰을 시작한 후, `Make Red` 버튼을 누르면 박스가 빨간색으로 변화함과 동시에 trigger라는 글자가 생긴다. 그리고 이를 Reset하여 없앤다면, 박스는 흰색으로 돌아가지만 trigger라는 글자는 여전히 있다.

console을 보면 왜 이렇게 나오는지 알 수 있는데, 이는 빨간색 속성이 흰색으로 변경됨으로써 다시 attributes에 변화가 생겨서 trigger 문자가 다시 생기는 것이다.

이렇듯 하나의 이벤트에 다른 이벤트를 물고 있다면, 의도치 않은 사이드 이펙트가 일어날 확률이 크다.

따라서 객체에 필요없는 이벤트는 관찰하면 안되고, 우리가 원하는 순서대로 실행이 보장되어야 한다. 그래서 **ReactiveX(Rx)**가 나왔다고 생각된다.

> <a href="https://reactivex.io/intro.html" target="_blank">ReactiveX</a> is a library for composing asynchronous and event-based programs by using observable sequences.
> It extends the observer pattern to support sequences of data and/or events and adds operators that allow you to compose sequences together declaratively...
>
> ReactiveX는 옵저버블 순서를 이용하여 비동기와 이벤트 기반 프로그램을 조합하는 라이브러리다. observer 패턴을 확장하여 데이터 및/또는 이벤트의 순서를 지원하고 선언적으로 순서를 조합할 수 있는 오퍼레이터를 추가해준다.

## React와 RxJS

React도 state의 변화를 감지하고 UI를 업데이트하기 때문에 ‘React가 Reactive의 뜻이지 않을까?’라는 생각을 해 본 적 있다. 하지만 공식문서를 보면 그렇지 않다는 걸 알 수 있었다.

> React, however, sticks to the “pull” approach where computations can be delayed until necessary.
> <i style="display: block">(중략)</i>
> There is an internal joke in the team that React should have been called “Schedule” because React does not want to be fully “reactive”.

<p class="small" style="text-align: right; margin-bottom: 10px;">출처: <a href="https://reactjs.org/docs/design-principles.html#scheduling" target="_blank">React Design Principles</a></p>

<details style="margin-bottom: 20px">
  <summary>용어: pull, push</summary>
  <ul class="small">
    <li>pull: Function, iterator 등 대부분의 자바스크립트 함수는 모두 pull 방식으로, 받은 값을 리턴하는 방식을 뜻한다.</li>
    <li>push: Promise와 Observalbe처럼 이벤트를 발생시켜 데이터를 변경하는 방식을 뜻한다.</li>
  </ul>
</details>

React의 `setState()` UI가 바뀌어야만 할 때 사용하는 비동기 메서드로 pull 방식이다. 동시에 React는 glue 코드<span class="small">(\*호환되지 않는 코드를 실행하기 위한 코드)</span>가 되고 싶다고 표명했다. 아마 UI를 렌더링하기 위해 유저들이 최소한의 코드만을 작성하는 것을 뜻하는 것 같다. _(단, 최근 Svelte의 등장으로 React가 어떻게 바뀔 지 모르겠다)_

<br>

### hooks와 observables의 차이

그럼에도 불구하고, hooks와 observables의 차이가 잘 와닿지 않았는데, RxJS의 핵심 개발자 Ben Lesh가 트윗에 <a href="https://twitter.com/BenLesh/status/1118888489108422656" target="_blank">hooks와 RxJS 차이</a>에 대해 작성한 것이 있어 요약해봤다.

Hooks는 어떤 컴포넌트에 묶여있는 state인 반면, Observables는 독립적으로 존재하는 객체다.

Hooks로도 promises, async iterators, throttling, debouncing 등 비동기 이벤트를 처리할 수 있지만, Observables처럼 여러 개의 비동기 이벤트들을 한 번에 다룰 수 없다.

```jsx
new Observable(() => {
  /*do stuff */
  return () => {
    /* teardown */
  }
})

useEffect(() => {
  /*do stuff */
  return () => {
    /* teardown */
  }
})
```

이 둘은 비슷한 형태의 API를 갖고 있는데, 가장 큰 차이점은 아래와 같다.

Observables은 이벤트 실행이 되기 전까지, state의 값을 변경하지 않는다. 반면, useEffect는 React의 렌더가 될때까지 이벤트의 실행을 미루고, state를 관련되어 있는 컴포넌트에 바인딩한다. 또한, useEffect는 값을 방출하지 않지만, Observables은 변경된 값을 push하여 호출한 구독자에게 알려준다(여기서 사이드 이펙트가 일어날 수 있다).

Observable은 React에 속한 것이 아니기 때문에, 그 값을 자동으로 컴포넌트에 묶을 수 없다. 반면, Hooks는 여러 개의 이벤트를 trigger하여 발동되도록 조작하기 어렵다. 따라서 해당 기능들이 필요한 곳에 적재적소하게 사용할 줄 알아야 한다.

<br>

React를 사용 중인데 바로 RxJS 도입에 조금 허들을 느낀다면, LeetCode가 만든 <a href="https://github.com/LeetCode-OpenSource/rxjs-hooks" target="_blank">RxJS hooks</a>를 같이 사용해봐도 좋을 것 같다.

## 마치며

RxJS를 사용하고 있었지만 어떻게 변화를 감지하고 있는지는 몰랐다. 시간이 없다는 핑계로 계속 미루다가 이제서야 찾아보았다.

지금은 Angular로 진행중인 프로젝트에서는 당연하게 RxJS를 이용해서 개발해왔는데, 앞으로는 어떤 기능을 개발하기 전에 ‘여기서 RxJS를 사용하는게 맞나?’를 한 번 생각해볼 것 같다.

<br>

**참고**

<div style="font-size: 12px;">

- 자바스크립트 디자인 패턴, 에이콘출판, 2016
- <a href="https://nils-mehlhorn.de/posts/react-hooks-rxjs" target="_blank">React Hooks vs. RxJS</a>

</div>
