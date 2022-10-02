---
title: '배열, 유사 배열 객체 그리고 이터러블'
date: '2021-6-19'
tags: ['javascript']
draft: false
---

<span class="definition">배열(Array)</span>이란 여러 개의 값을 순차적으로 나열한 자료구조이며, 안의 값을 요소(Element)라 한다.

단순히 나열된 구조로 보이는 배열이 자바스크립트에서는 다소 독특한 데이터 같다. 자바스크립트에는 배열이라는 타입이 존재하지 않으며, 배열의 타입을 찍어보면 객체(<span class="return">object</span>)라 나온다.

```js
const arr = [1, 2, 3]
typeof arr // output: 'object'
```

하물며 배열의 형태가 아닌 일반 객체로도 반복문을 돌릴 수 있다. 도대체 어떻게 객체로 반복문을 돌릴 수 있는 걸까?

<br />

<a class="post-link" href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array" target="_blank">MDN</a>은 배열을 아래와 같이 정의했다.

> 배열은 프로토타입으로 탐색과 변형 작업을 수행하는 메서드를 갖는, 리스트와 비슷한 객체(list-like objects)입니다.

여기서 말하는 <span class="definition">리스트와 비슷한 객체</span>란 무슨 뜻 일까? 이걸 알기 위해서는 우선 자료구조에서 말하는 배열이 무엇인지 알아야 한다.

<div class="img-refer">
  <img src="https://media.geeksforgeeks.org/wp-content/uploads/array-2.png" alt="Array">
  <p>https://www.geeksforgeeks.org/array-data-structure/</p>
</div>

자료구조에서 말하는 배열은 동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열된 자료구조를 말한다. 즉, 배열의 요소는 <span class="underline">하나의 데이터 타입으로 통일되어 있으며 서로 연속적으로 이어져 있다</span>. 이러한 배열을 <span class="definition">밀집 배열(Dense Array)</span>이라 한다. 따라서 인덱스를 통해 단 한 번의 연산으로 임의의 요소에 접근(임의 접근, Random Access)이 가능하다.

하지만 배열에서 특정한 요소를 검색할 때, 배열의 모든 요소를 처음부터 특정 요소를 발견할 때까지 차례대로 검색(선형 검색, Linear Search)해야 한다. 또한 배열에 요소를 삽입하거나 삭제하는 경우, 배열의 요소를 연속적으로 유지하기 위해 요소를 이동시켜야 하는 단점도 있다.

하지만 자바스크립트의 배열의 요소는 <span class="underline">동일한 크기의 메모리 공간은 갖지 않아도 되며, 연속적으로 이어져 있지 않을 수도 있다</span>. 즉, 원시값, 객체, 함수, 배열 등 어떤 값이든 모두 배열의 요소가 될 수 있다. 이러한 배열을 <span class="definition">희소 배열(Sparse Array)</span>이라 한다.

<div class="img-refer">
  <img src="https://matteding.github.io/images/sparse_dense.gif" alt="Array">
  <p>https://matteding.github.io/2019/04/25/sparse-matrices/</p>
</div>

이처럼 자바스크립트의 배열은 엄밀히 말해 일반적인 의미의 배열이 아니며, 일반적인 배열의 동작을 흉내 낸 특수한 객체다.

## 자바스크립트의 배열

자바스크립트의 배열은 객체이지만, 일반 객체와 달리 인덱스와 length 프로퍼티가 존재한다.

```js
const num = [1, 2, 3]
```

### 인덱스

배열의 요소는 자신의 위치를 나타내는 0 이상의 정수인 <span class="definition">인덱스(index)</span>를 갖는다. 인덱스는 배열의 요소에 접근할 때 사용한다. 대부분의 프로그래밍 언어에서 인덱스는 0부터 시작한다.

요소에 접근할 때는 대괄호 표기법을 사용한다. 대괄호 내에는 접근하고 싶은 요소의 인덱스를 지정한다.

```js
num[0] // output: 1
num[1] // output: 2
num[2] // output: 3
```

### length

배열은 요소의 개수, 즉 배열의 길이를 나타내는 <span class="definition">length 프로퍼티</span>를 갖는다.

```js
num.length // output: 3
```

배열은 인덱스와 length 프로퍼티를 갖기 때문에 반복문(ex. for문)을 통해 순차적으로 요소에 접근이 가능하다.

```js
for (let i = 0; i < num.length; i++) {
  console.log(num[i]) // output: 1 2 3
}
```

자바스크립트에서 배열은 희소 배열이기 때문에 length를 명시적으로 할당할 수 있으며, 연속적으로 위치하지 않으며 일부가 비어 있을 수 있다.

```js
const num = [1, 2, 3, 4, 5]

num.length = 3
console.log(num) // output: [1, 2, 3]

const num2 = [1, 2, 3]
num2.length = 5
console.log(num2) // output: [1, 2, 3, empty × 2]

const num3 = [1, , 3, , 5]
console.log(num3.length) // output: 5
console.log(num3) // output: [1, empty, 3, empty, 5]
```

하지만 희소 배열은 배열의 기본적인 개념(연속적인 값의 집함)에 맞지 않으며, 성능에도 좋지 않다. 따라서 배열에는 같은 타입의 요소를 연속적으로 위치 시키는 것이 제일 좋다.

### 생성

배열은 배열 리터럴, Array 생성자 함수, `Array.of`, `Array.from` 메서드로 생성할 수 있다.

```js
// 배열 리터럴
const arr = [1, 2, 3]

// Array 생성자 함수
const arr = new Array(3)

// Array.of
Array.of(1) // output: [1]
Array.of(1, 2, 3) // output: [1, 2, 3]

// Array.from
// - 유사배열객체 또는 이터러블 객체를 인수로 받아 배열로 변환하여 반환
Array.from({ 0: 'kmj', 1: 'howdy-mj', length: 2 }) // output: ["kmj", "howdy-mj"]
Array.from('kmj') // output: ["k", "m", "j"]
```

배열의 생성자 함수는 Array이며, 배열의 프로토타입 객체는 Array.prototype이다.

```js
const arr = [1, 2, 3]
arr.constructor === Array // output: true
Object.getPrototypeOf(arr) === Array.prototype // output: true
```

이러한 Array.prototype은 빌트인 메서드(<a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array#" target="_blank">Array Methods</a>)가 존재한다.

## 유사 배열 객체

유사 배열 객체는 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고, length 프로퍼티를 갖는 객체를 말한다. (참고: <a class="post-link" href="https://tc39.es/ecma262/#sec-lengthofarraylike" target="_blank">ECMAScript: LengthOfArrayLike</a>)

유사 배열 객체는 마치 배열처럼 for문으로 순회할 수도 있다.

```js
const kmj = {
  0: 'kmj',
  1: 'howdy-mj',
  2: 'FE',
  length: 3,
}

for (let i = 0; i < kmj.length; i++) {
  console.log(kmj[i]) // output: 'kmj', 'howdy-mj', 'FE'
}
```

하지만 배열처럼 `push`, `pop`, `join`, `map`과 같은 메서드 사용은 불가하며, 일반 객체처럼 프로퍼티로 접근할 수 없다.

```js
kmj.push('web') // output: Uncaught TypeError: kmj.push is not a function

kmj.0 // output: Uncaught TypeError: kmj.push is not a function
```

대표적으로 볼 수 있는 유사배열 객체에는 함수의 <span class="variable">arguments, HTMLCollection, NodeList</span>가 있다.

```js
// HTMLCollection
const htmlCollection = document.body.children
```

<div class="img-div">
  <img src="https://user-images.githubusercontent.com/58619071/193440721-db548961-c938-431d-a365-a5af44c0a09b.png" alt="유사배열객체">
  <p>HTMLCollection</p>
</div>

```js
// NodeList
const allDiv = document.querySelectorAll('div')
```

<div class="img-div">
  <img src="https://user-images.githubusercontent.com/58619071/193440722-29e8890e-91d0-4465-8de5-f12523dc8781.png" alt="유사배열객체">
  <p>NodeList</p>
</div>

언뜻보면 배열과 비슷하게 생겼지만, `Array.isArray()`로 확인해보면 두개 다 false로 나온다.

```js
Array.isArray(htmlCollection) // output: false
Array.isArray(allDiv) // output: false
```

유사 배열 객체는 `Array.prototype.slice.call()`로 배열로 만들 수 있다.

```js
Array.prototype.slice.call(htmlCollection)
Array.prototype.slice.call(allDiv)
```

## 이터러블 객체

<a href="https://tc39.es/ecma262/#sec-ecmascript-language-types-symbol-type" target="_blank">Symbol(심벌)</a>은 변경 불가능한 원시 타입이다. 심벌은 중복되지 않는 고유 값을 갖기 때문에 기존 코드에 영향을 주지 않고 새로운 프로퍼티를 추가하기 위해 사용된다. React에서도 JSX를 생성할때 Symbol을 사용하고 있다. (참고: <a class="post-link" href="https://overreacted.io/why-do-react-elements-have-typeof-property/" target="_blank">Why Do React Elements Have a \$\$typeof Property?</a>)

이 외, Symbol은 ES6에서 추가된 데이터 타입으로 브라우저 console 창에서도 바로 확인할 수 있다.

<div class="img-div">
  <img src="https://user-images.githubusercontent.com/58619071/193440724-faaa4192-61b8-4f59-b836-cb4605282842.png" alt="심벌">
  <p>Symbol 프로퍼티</p>
</div>

이러한 프로퍼티들을 ECMAScript에서는 <a href="https://tc39.es/ecma262/#sec-well-known-symbols" target="_blank">Well-Known Symbol</a>이라 부르며, 자바스크립트 내부 알고리즘에서 사용된다.

위 이미지에서 볼 수 있듯이, Symbol에는 `Symbol.iterator` 메서드가 있는데, 이는 <span class="variable">Array, String, Map, Set, TypedArray, arguments</span>, DOM 컬렉션(<span class="variable">NodeList, HTMLCollection</span>)과 같은 이터러블 객체를 `for...of`문으로 순회할 수 있다. 이터러블 객체는 스프레드 문법과 배열 구조 분해가 가능하다.

```js
const num = [1, 2, 3]

// 이터러블 객체
console.log(Symbol.iterator in num) // output: true

// for...of문
for (const n of num) {
  console.log(n) // output: 1 2 3
}

// 스프레드 문법과 배열 구조 분해
console.log([0, ...num]) // output: [0, 1, 2, 3]
```

하지만 유사 배열 객체는 이터러블 객체가 아닌 일반 객체이므로 `for...of`문으로 순회할 수 없고, 배열 구조 분해도 불가하다. 하지만 객체 리터럴 내부에서는 스프레드 문법 사용이 가능하다. (단, <span class="variable">arguments, NodeList, HTMLCollection</span>은 유사 배열 객체이면서도 이터러블이다)

```js
const kmj = {
  0: 'kmj',
  1: 'howdy-mj',
  2: 'FE',
  length: 3,
}

// 이터러블 객체
console.log(Symbol.iterator in kmj) // output: false

// for...of문
for (const n of kmj) {
  console.log(n) // output: Uncaught TypeError: kmj is not iterable
}

// 배열 구조 분해
const [0, 1, 2] = kmj; // output: Uncaught SyntaxError: Invalid destructuring assignment target

// 스프레드 문법
console.log({ ...kmj }) // output: {0: "kmj", 1: "howdy-mj", 2: "FE", length: 3}
```

하지만 일반 객체에서도 이터러블 프로토콜을 준수하여 구현한다면 이터러블이 될 수 있다.

<br>

<div>

**추가할 내용**

- 유사 배열 객체, 이터러블 활용 예제

</div>

<br />

**참고**

<div style="font-size: 12px;">

- <a href="https://www.nfriedly.com/techblog/2009/06/advanced-javascript-objects-arrays-and-array-like-objects/" target="_blank">Advanced Javascript: Objects, Arrays, and Array-Like objects</a>
- 모던 자바스크립트 Deep Dive, 이웅모 (2020)
- <a href="https://dev.to/capscode/what-is-array-like-object-in-javascript-3f5m" target="_blank">What is Array Like Object in JavaScript</a>

</div>
