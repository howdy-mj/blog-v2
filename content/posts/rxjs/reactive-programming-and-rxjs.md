---
title: '반응형 프로그래밍과 RxJS'
date: '2021-5-3'
tags: ['rxjs']
draft: false
---

<div class="intro">
  <p>해당 글은 Angular를 사용하면서 반응형 프로그래밍, RxJS에 대해 궁금한 것을 작성한 글입니다.</p>
  <p>오역이 있을 수 있습니다. 피드백은 언제나 환영합니다:)</p>
</div>

<br />

대부분 어플리케이션에는 비동기 작업 처리가 필수다. 그리고 그 어플리케이션의 규모가 커지면서 많은 양의 데이터를 처리해야 하는데, 데이터를 가공하고 올바른 시점에 데이터를 반환하게 하기 위해 코드가 점점 더 복잡해질 수 있다.

이런 복잡한 데이터를 처리하기 위해 <span class="definition">반응형 프로그래밍(Reactive Programming)</span>이 등장하였다.

## 반응형 프로그래밍(Reactive Programming)

<a href="https://en.wikipedia.org/wiki/Reactive_programming" target="_blank">위키피디아</a>에서 반응형 프로그래밍은 데이터 스트림과 변화의 전파(propagation of change)와 관련된 <span class="definition">선언형 프로그래밍(Declarative Programming) 패러다임</span>이다. 해당 패러다임으로 정적(ex. arrays), 동적(ex. 이벤트 이미터) 데이터 스트림을 쉽게 표현할 수 있으며, 변경된 데이터의 흐름 전달이 용이하다.

RxJS의 컨트리뷰터 <a href="https://gist.github.com/staltz/868e7e9bc2a7b8c1f754" target="_blank">André Staltz</a>는 <span class="variable bold">Reactive programming is programming with asynchronous data streams</span>, 즉 반응형 프로그래밍을 비동기 데이터 스트림을 이용한 프로그래밍이라 정의했다.

여기서 데이터 스트림은 키 입력, 마우스, 터치, HTTP 호출 등의 이벤트를 뜻한다. 그리고 <span class="definition">명령형 프로그래밍(Imperative Programming)</span>이 어떤 방식으로 하는지(How)에 알려준다면, <span class="definition">선언형 프로그래밍(Declarative Programming)</span>은 무엇(What)과 같은지를 반환하여, 반응형 프로그래밍은 데이터가 어떤 값으로 변경되는지 직관적으로 보여준다.

간단한 수식으로 명령형 프로그래밍과 반응형 프로그래밍을 비교해 보자.

```js
// 명령형 프로그래밍
let b = 1
let c = 2
let a = b + c
console.log(a) // 3
b = 10
console.log(a) // 3 ('=' 연산자 이전의 b, c 값으로 a를 반환)

// 반응형 프로그래밍
// '$'는 참조되는 값이 변경되면 실시간으로 해당 값을 따른다
let b = 1
let c = 2
let a$ = b + c
console.log(a$) // 3
b = 10
c = 5
console.log(a$) // 15 ('=' 연산자 이후에 변경된 b, c 값으로 a를 반환)
```

반응형 프로그래밍에서 `$`는 스트림을 가리키는 변수를 한정하는 데 사용하며, 변경 된 값을 실시간으로 참조한다.

<br />

그렇다면 Rx(Reactive eXtension)는 무엇일까?

<a href="http://reactivex.io" target="_blank">공식 문서</a>에서 Rx는 <span class="bold">옵저버블 스트림을 사용하는 비동기 프로그래밍용 API(<span class="variable">An API for asynchronous programming
with observable streams</span>)</span>라고 정의하고 있다.

## Observable

Rx를 설명하는데 가장 핵심이 되는 단어가 바로 <span class="definition">Observable(옵저버블)</span>인데, 공식문서에서 이를 여러 개의 값을 Push하는 것으로 정의하고 있다.

<div class="img-div">
  <img src="https://user-images.githubusercontent.com/58619071/193442526-5df051dd-a765-4c46-8be7-c0a86d4e5387.png" alt="observable">
  <p>https://rxjs-dev.firebaseapp.com/guide/observable</p>
</div>

### Pull vs. Push

Pull과 Push는 두개의 다른 프로토콜로, <span class="definition">데이터 생산자(Data Producer)</span>와 <span class="definition">데이터 소비자(Data Consumer)</span>가 통신하는 방법을 제공한다.

처음에는 데이터 생산자가 서버, 데이터 소비자가 클라이언트인줄 알았다. 하지만 Rx 내에서 말하는 생산자는 <span class="underline">데이터 변경을 수행하는 이벤트</span>, 소비자는 <span class="underline">데이터 변경 이벤트를 처리하는 것</span>이다.

|          |                     생산자                      |               소비자                |
| :------: | :---------------------------------------------: | :---------------------------------: |
| **Pull** |        Passive: 요청이 올때 데이터 생산         | Active: 데이터가 언제 요청될지 결정 |
| **Push** | Active: 자신의 페이스(phase)에 맞춰 데이터 생산 |     Passive: 받은 데이터에 반응     |

<div class="explain">
  <p>* Pull은 function, iterator를 Push는 Promise, Observable을 말한다.</p>
  <p>* Passive는 이벤트를 기다리는 수동적인 상태, Active는 이벤트를 발동시키는 능동적인 상태를 나타내는 것으로 추측한다.</p>
</div>

<div class="img-refer">
  <img src="https://drek4537l1klr.cloudfront.net/daniels/Figures/02fig12_alt.jpg" alt="down stream">
  <p>https://livebook.manning.com/book/rxjs-in-action/chapter-2/164</p>
</div>

<br />

#### Pull

Pull은 소비자가 언제 생산자에서 데이터를 받아올지 결정한다. 생산자는 언제 소비자에게 데이터를 전달해야 하는지 모른다.

자바스크립트의 모든 함수는 Pull에 해당한다. 함수는 데이터의 생산자이며, 함수를 호출하는 코드는 단일 반환 값을 '꺼냄'(pull)으로써 데이터를 소비한다.

ES2015에서 소개 된 제너레이터 함수와 이터레이터(<span class="return">function\*</span>) 역시 pull에 해당한다. <span class="return">iterator.next()</span>은 소비자로 여러 개의 값을 iterator(생산자)에서 '꺼낸다'(pull).

어떠한 조건 혹은 소비자 값에 따라 이벤트가 발동(active)되며, 이 때 생산자를 호출(passive)한다.

#### Push

Push는 생산자가 언제 소비자에게 데이터를 보낼지 결정하며, 소비자는 언제 데이터를 받을지 모른다.

Promise는 자바스크립트에서 가장 많이 쓰이는 Push다. Promise(생산자)는 callback(소비자)에서 나온 값을 전달하고, 함수와 다르게 언제 해당 callback 값을 보낼지(push) 결정한다.

RxJS에서는 Observable이라는 새로운 Push를 내보였다. Observable은 여러 값의 생산자로 값들을 Observer(소비자)에게 보낸다(push).

생산자가 변화를 감지하고 이벤트를 발동(active)시키며, 이벤트 처리는 소비자(passive)에게 맡긴다. 이때 데이터 스트림은 생산자에서 소비자로만 이동하며 다른 방향으로 이동하지 않는다. 즉, RxJS와 관련된 스트림은 항상 업스트림 Observable에서 다운스트림 Observer로 흐른다.

<div class="img-refer">
  <img src="https://drek4537l1klr.cloudfront.net/daniels/Figures/01fig12.jpg" alt="down stream">
  <p>https://livebook.manning.com/book/rxjs-in-action/chapter-1/147</p>
</div>

### 정리

- <span class="return bold">Function</span>은 호출할 때, 단일 값을 동기적으로 반환하는 느긋한 계산법이다.
- <span class="return bold">Iterator</span>는 반복(iteration)할 때, 0에서 (잠재적으로) 무한 값을 동기적으로 반환하는 느긋한 계산법이다.
- <span class="return bold">Promise</span>는 단일 값을 반환할 수 있는(혹은 반환하지 않을 수 있는) 계산법이다.
- <span class="return bold">Observable</span>은 동기 또는 비동기적으로 호출될 때부터 0에서 (잠재적으로) 무한대의 값을 반환할 수 있는 느긋한 계산법이다.

<div class="explain">
  <p>* 느긋한 계산법(Lazy evaluation, 혹은 지연 평가)은 계산의 결과값이 필요할 때까지 계산을 늦추는 기법이다. 값을 미리 저장하지 않아 공간을 절약할 수 있고, 값이 꼭 필요할 때만 계산하기 때문에 성능에도 좋은 영향을 준다.</p>
</div>

<br />

즉, Observable은 서버가 클라이언트에게 데이터를 보내주며 해당 값을 UI 단에 실시간으로 반영할 수 있게 도와준다.

## Promise vs. Observable

RxJS를 써보지 않은 상태에서 위의 내용만 봤을 때, Promise와 Observable이 얼마나 다른지 와닿지 않는다. 본 글에서는 두 개의 작동 방식 차이만 알아보고, 다음 글에서 아래에 나온 메서드들을 자세히 다룰 예정이다.

### 실행 시점

- Promise는 객체를 생성할 때 바로 실행되어 즉시 로딩(eager)이라 부른다. 모든 `then()`은 같은 계산 값을 공유한다.

```js
// 최초 실행 (생성 및 실행)
let promise =
  new Promise() <
  number >
  ((resolve, reject) => {
    // ...
  })
promise.then(value => {
  // 결과 처리
})
```

- Observable은 소비자가 구독(subscription)하기 전까지는 실행되지 않아 지연 로딩(lazy)이라 부른다. `subscribe()`는 여러 번 호출될 수 있으며, 각각의 구독은 모두 자신만의 계산 값을 갖고 있다.

```js
import { Observable } from 'rxjs'
// 선언 (생성)
const observable$ =
  new Observable() <
  number >
  (observer => {
    // ...
  })

// 최초 실행 (구독)
observable$.subscribe(value => {
  // observer 처리
})
```

### return 개수

- Promise는 하나만 보낼 수 있으며, 여러 개 보낼 경우 나중에 보낸 건 무시된다.

```js
const promise = new Promise(resolve => {
  resolve(1)
  resolve(2) // 무시
})
promise.then(console.log) // output: 1
```

- Observable은 데이터를 여러 개 보낼 수 있다.

```js
const observable$ = new Observable(observer => {
  observer.next(1)
  observer.next(2)
})
observable$.subscribe(console.log) // output: 1 2
```

### 조작과 반환

- Promise는 `then()` 하나로 데이터의 조작과 반환을 같이 진행한다.

```js
promise.then(v => 2 * v)
```

- Observable은 데이터의 조작과 구독(반환)을 나눌 수 있다. 오직 구독자가 있을 때만 subscriber 함수가 실행되어 값을 계산한다. 다른 곳에서 데이터를 복잡하게 가공해야 한다면 Observable이 더 효율적이다.

```js
observable$.pipe(map(v => 2 * v))
```

### 취소(해제)

- Promise는 실행 도중에 취소할 수 없지만, Observable은 구독을 취소(해제)할 수 있다. 구독 취소는 이벤트 리스터가 받을 값을 제거하고, subscriber 함수에게 취소하라고 알린다.

```js
const subscription = observable$.subscribe(() => {
  // ...
})
subscription.unsubscribe()
```

### 에러 처리

- Promise는 `then()`이나 `catch()`를 사용하는데, 위치에 따라 에러를 처리하는 로직이 달라져야 한다.

```js
promise
  .then(() => {
    throw new Error('my error')
  })
  .catch(error => {
    alert(error)
  })
```

- Observable은 `subscribe()`는 에러도 함께 처리할 수 있으며, 자동으로 구독을 취소한다. Observable은 에러 처리 로직을 한 군데에 집중할 수 있다.

```js
observable$.subscribe(() => {
  throw new Error('my error')
})
```

## Observable는 동기, 비동기 모두 처리 가능하다

Observable이 Promise와 비슷한 선상에서 이야기를 나누고 있기 때문에, Observable도 비동기로만 처리할 수 있다고 생각이 들 수 있다. 하지만 예상과 다르게 Observable은 동기, 비동기 모두 처리가 가능하다.

아래에 같은 동작을 하는 일반 함수와 Observable이 존재한다.

```js
// 일반 함수
function foo() {
  console.log('Hello')
  return 42
}

const x = foo()
console.log(x) // output: "Hello" 42
```

```js
// Observable
import { Observable } from 'rxjs'

const foo$ = new Observable(subscriber => {
  console.log('Hello')
  subscriber.next(42)
})

foo$.subscribe(x => {
  console.log(x) // output: "Hello" 42
})
```

만약, 일반 함수로 만든 `foo()`를 다른 console 사이에 둘 경우 아래와 같이 값이 출력 된다.

```js
console.log('before')
console.log(foo())
console.log('after')

// output:
// "before"
// "Hello"
// 42
// "after"
```

이를 Observable인 `foo()`로 실행하여도 똑같은 값이 출력된다.

```js
console.log('before')
foo$.subscribe(x => {
  console.log(x)
})
console.log('after')

// output:
// "before"
// "Hello"
// 42
// "after"
```

그렇다면 함수와 Observable의 차이는 무엇일까? 그건 바로 **Observable은 여러 개의 값을 return할 수 있다**는 것이다.

일반적으로 함수는 return을 두 번이상 사용할 수 없다. 만약 사용할 경우 무시된다.

```js
function foo() {
  console.log('Hello')
  return 42
  return 100 // 무시
}
```

하지만 Observable은 가능하다.

```js
const foo$ = new Observable(subscriber => {
  console.log('Hello')
  subscriber.next(42)
  subscriber.next(100) // 두 번째 return
  subscriber.next(200) // 세 번째 return
})

console.log('before')
foo$.subscribe(x => {
  console.log(x)
})
console.log('after')

// output:
// "before"
// "Hello"
// 42
// 100
// 200
// "after"
```

그리고 이 값을 비동기로도 반환할 수 있다.

```js
const foo$ = new Observable(subscriber => {
  console.log('Hello')
  subscriber.next(42)
  subscriber.next(100)
  subscriber.next(200)
  setTimeout(() => {
    subscriber.next(300) // 비동기로 값이 반환
  }, 1000)
})

console.log('before')
foo$.subscribe(x => {
  console.log(x)
})
console.log('after')

// output:
// "before"
// "Hello"
// 42
// 100
// 200
// "after"
// 300
```

Observable은 나중에 다른 글에서 더 자세하게 작성할 예정이다.

## RxJS의 이점

- for, while 등 반복문에서는 비동기를 인식하지 못하는 문제(주로 반복 사이의 지연 시간 또는 대기 시간을 인식하지 못함)를 해결할 수 있다.
- 각 콜백 내에서 try/catch 블록을 중첩할 경우 코드가 금방 복잡해지는데, 이를 깔끔하게 작성할 수 있다.
- 비즈니스 로직을 실행해야 할 경우, 중첩된 콜백 구조가 아닌 데이터 흐름을 파악할 수 있는 코드 작성이 가능하다.
- 이벤트 또는 장기 실행 작업이 멋대로 작동되어 취소해야 할 때, 미리 정한 시간이 지나면 이벤트를 자동으로 취소할 수 있다.
- 스로틀링, 디바운싱을 사용하여 프로그램에 전반적으로 안정성을 줄 수 있다.
- UI 단에서 발생하는 이벤트들의 메모리 누수와 브라우저 프로세스의 크기를 제어할 수 있다.

## 번외) 함수형 프로그래밍(Functional Programming)

공식문서에서 'Rx는 옵저버 패턴, 이터레이터 패턴 그리고 함수형 프로그래밍(Functional Programming)을 조합하여 이벤트 시퀀스를 이상적으로 관리할 수 있다'고 정의하고 있다.

> ReactiveX combines the Observer pattern with the Iterator pattern and functional programming with collections to fill the need for an ideal way of managing sequences of events.

이 중, 반응형 프로그래밍은 함수형 프로그래밍을 기반으로 구축되어 Rx에서 가장 중요한 개념이라 볼 수 있다. 본 글에서 함수형 프로그래밍에 대해서만 간략하게 다뤄보겠다. (추후 다른 글에서 따로 작성할 예정이다)

<div class="explain">
  <p>- <span class="bold">옵저버 패턴</span>은 객체의 상태 변화를 관찰하는 옵저버들의 목록을 객체에 등록하여 상태 변화가 있을 때마다 메서드 등을 통해 객체가 직접 목록의 각 옵저버에게 통지하도록 하는 디자인 패턴이다.</p>
  <p>- <span class="bold">이터레이터 패턴</span>은 객체 지향 프로그래밍에서 반복자(iterator)를 사용하여 내부에 있는 요소들을 노출시키지 않고 접근하는 디자인 패턴이다. 반복 자체에서 강 요소에 적용된 비즈니스 로직을 분리하는 데 효과적이다.</p>
</div>

### 함수형 프로그래밍 특징

#### - 부가작용이 없다(Side effect free)

- 반드시 하나 이상의 인자(입력)를 받고, 항상 같은 결과 값을 반환하는 순수 함수이다.
- 함수 범위는 인수와 그 안에 선언된 모든 지역 변수로 구성되며, 이 외의 작업(외부 변수 수정, console 출력, HTML 페이지 요소 렌더링 등)은 부가 작용으로 간주하여 피하거나 최소한으로 격리해야 한다.

<!-- - 어플리케이션의 상태가 일반적으로 공유되고 객체의 메서드와 함께 배치되는 객체 지향 프로그래밍과 대조된다. -->

#### - 명령형(Imperative)이 아닌 선언형(Declarative)이다.

- 명령형 프로그램은 원하는 결과를 얻기 위해 특정 단계를 설명하는 코드(ex. for, if, switch 등)를 사용하는 반면, 선언형 프로그램은 흐름 제어를 추상화하고 데이터 흐름을 설명하는 코드(ex. map, filter 등)를 사용한다.

#### - 불변성(Immutable)

- 데이터를 생성하거나 변수가 선언된 후, 이를 변경하거나 수정하지 않는다.
- 데이터 변경이 필요한 경우, 원본 데이터의 복사본을 만들어 수정 작업을 진행한다.

#### - 고차함수를 통한 재사용(HoF)

- 함수에 함수를 파라미터로 전달할 수 있으며, 함수의 반환값으로 함수를 사용할 수 있다.
- 콜백 함수, 프로미스, 모나드 등을 사용하여 액션, 효과 또는 비동기 흐름을 추상화하거나 분리시킨다.

<br />

**참고**

<div style="font-size: 12px;">

- <a href="http://reactivex.io/" target="_blank">ReactiveX</a>
- <a href="https://rxjs-dev.firebaseapp.com/guide/overview" target="_blank">RxJS</a>
- RxJS 반응형 프로그래밍, 2019
- <a href="https://angular.kr/guide/comparing-observables" target="_blank">Observable vs. Promise</a>
- <a href="https://developers.redhat.com/blog/2017/06/30/5-things-to-know-about-reactive-programming/" target="_blank">5 Things to Know About Reactive Programming</a>
- <a href="https://medium.com/javascript-everyday/javascript-theory-promise-vs-observable-d3087bc1239a" target="_blank">JavaScript Theory: Promise vs Observable</a>
- <a href="https://sungjk.github.io/2017/07/17/fp.html" target="_blank">번역 - 함수형 프로그래밍이란 무엇인가?</a>

</div>
