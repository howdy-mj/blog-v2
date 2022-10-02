---
title: 'var, let, const의 차이 ⏤ 변수 선언 및 할당, 호이스팅, 스코프'
date: '2021-3-20'
tags: ['javascript']
draft: false
---

자바스크립트에서 var로 변수 선언이 가능했는데, 왜 const와 let이 나왔으며 이 둘의 사용을 권장할까?

이를 정확하게 알기 위해서는, 변수의 선언 및 할당 과정, 호이스팅, 스코프를 알아야한다.

## 변수

먼저 자바스크립트에서 변수가 무엇인지 알아보자.
**변수(variable)는 하나의 값을 저장하기 위해 확보한 메모리 공간 자체 또는 그 메모리 공간을 식별하기 위해 붙인 이름**을 말한다.

<div style="text-align: center;">
<img src="https://miro.medium.com/max/700/1*IiejRUFbks-TaOzJJvdoVw.jpeg" alt="memory allocation">
<p style="font-size: 12px; color: gray;">https://medium.com/@ethannam/javascripts-memory-model-7c972cd2c239</p>
</div>

```js
const myNumber = 23
// 변수명(식별자): myNumber
// 해당 값의 위치(메모리 주소): 0012CCGWH80
// 변수 값(저장된 값): 23
```

자바스크립트는 매니지드 언어(managed language)이기 때문에 개발자가 직접 메모리를 제어하지 못한다. 따라서 개발자가 직접 메모리 주소를 통해 값을 저장하고 참조할 필요가 없고 변수를 통해 안전하게 값에 접근이 가능하다.

변수명(식별자)인 myNumber는 변수의 값이 아닌 메모리 주소를 기억하고 있다. 변수명을 사용하면, 자바스크립트 엔진이 변수명과 매핑된 메모리 주소를 통해 거기에 저장된 값(23)을 반환한다.

이처럼 변수에 값을 저장하는 것을 **할당**(assignment, 대입, 저장)이라 하며 변수에 저장된 값을 읽어 들이는 것을 **참조**(reference)라 한다. 그리고 변수명을 자바스크립트 엔진에 알리는 것을 **선언**(declaration)이라 한다.

### 변수 선언

변수의 선언은 `var`, `const`, `let` 키워드로 할 수 있으며, ES6에서 const와 let이 추가되었다.

자바스크립트에서 변수 선언은 `선언 → 초기화` 단계를 거쳐 수행된다.

- **선언 단계**: 변수명을 등록하여 자바스크립트 엔진에 변수의 존재를 알린다.
- **초기화 단계**: 값을 저장하기 위한 메모리 공간을 확보하고 암묵적으로 <span class="return">undefined</span>를 할당해 초기화한다.

```js
var kmj
console.log(kmj) // output: undefined
```

var 키워드를 이용한 변수 선언은 선언 단계와 초기화 단계가 동시에 진행되어, kmj에 암묵적으로 <span class="return">undefined</span>를 할당해 초기화한다.

그런데 반대로, console을 먼저 찍어도 반환 값이 <span class="return">undefined</span>로 나온다.

```js
console.log(kmj) // output: undefined
var kmj
```

이는 변수 선언이 런타임에서 되는 것이 아니라, 그 이전 단계에서 먼저 실행되기 때문이다. 자바스크립트 엔진은 소스코드를 한 줄씩 순차적으로 실행하기에 앞서, 변수 선언을 포함한 모든 선언문(ex. 변수 선언문, 함수 선언문 등)을 찾아내 먼저 실행한다. 즉, 변수 선언이 어디에 있든 상관없이 다른 코드보다 먼저 실행되는 특징을 **호이스팅**(hoisting)이라 한다.

변수 선언 뿐만 아니라, `var`, `let`, `const`, `function`, `function*`, `class` 키워드를 사용해 선언한 모든 식별자(변수, 함수, 클래스 등)는 호이스팅이 된다.

### 변수 할당

변수에 값을 할당 할 때에는 할당 연산자(=)를 사용한다.

```js
var kmj // 변수 선언
kmj = 'howdy-mj' // 값의 할당

var kmj = 'howdy-mj' // 변수 선언과 할당
```

변수 선언과 할당은 하나의 문(statement)으로 단축 표현할 수 있지만, 두 개의 실행 시점이 다르다. 변수 선언이 호이스팅되어 런타임 이전에 실행되지만, 값의 할당은 소스코드가 순차적으로 실행되는 런타임에 실행된다.

따라서 변수의 할당과 console을 실행하는 위치에 따라 반환되는 값이 다르다.

```js
console.log(kmj) // output: undefined

var kmj = 'howdy-mj'
console.log(kmj) // output: howdy-mj
```

kmj라는 변수에 새로운 값을 재할당할 수도 있다.

```js
console.log(kmj) // output: howdy-mj

kmj = 'mj'
console.log(kmj) // output: mj
```

재할당은 변수에 저장된 값을 다른 값으로 변경하는 것으로, 만약 변경할 수 없는 값이라면 이는 변수가 아니라 상수(constant)라 부른다.

<br />

### 함수 호이스팅

위에서 `function` 키워드로 선언한 모든 식별자도 호이스팅이 된다고 했는데, 정확히 어떻게 이루어질까?

먼저 함수가 정의되는 방식 네 가지를 살펴보자.

```js
// 1. 함수 선언문
// 함수 이름 생략 불가능
function add(x, y) {
  return x + y
}

// 2. 함수 표현식
// 함수 이름 생략 가능
var add = function(x, y) {
  return x + y
}
// 함수 이름 작성 시,
// var add = function plus(x, y) {
//   return x + y
// }

// 3. Function 생성자 함수
var add = new Function('x', 'y', 'return x+ y')

// 4. 화살표 함수
var add = (x, y) => x + y
```

위에서 함수 선언문과 함수 표현식의 호이스팅 결과를 먼저 보자.

```js
// 함수 참조
console.dir(add) // output: f add(x, y)
console.dir(sub) // output: undefined

// 함수 호출
console.log(add(2, 5)) // output: 7
console.log(sub(2, 5)) // output: Uncaught TypeError: sub is not a function

// 함수 선언문
function add(x, y) {
  return x + y
}

// 함수 표현식
var sub = function(x, y) {
  return x + y
}
```

**함수 선언문**의 경우, 런타임 이전에 자바스크립트 엔진에서 먼저 실행되어, 함수 자체를 호이스팅 시킬 수 있다. 반면, **함수 표현식**은 위에서 봤던 변수 호이스팅과 같이 런타임 이전에 해당 값을 `undefined`로 초기화만 시키고, 런타임에서 해당 함수 표현식이 할당되어 그때 객체가 된다.

## 스코프

스코프(scope)는 식별자(ex. 변수명, 함수명, 클래스명 등)의 유효범위를 뜻하며, 선언된 위치에 따라 유효 범위가 달라진다. 전역에 선언된 변수는 전역 스코프를, 지역에 선언된 변수는 지역 스코프를 갖는다.

전역 변수는 어디에서든지 참조가 가능한 값이다. 반면, 지역 변수는 함수 몸체 내부를 말한다. 따라서 지역 변수는 자신의 지역 스코프와 그 하위 지역 스코프에서 유효하다.

한 가지 주의해야 할 점은, 자바스크립트에서 모든 코드 블록(if, for, while, try/catch 등)이 지역 스코프를 만들며, 이러한 특성을 **블록 레벨 스코프**라 한다. 하지만 var 키워드로 선언된 변수는 오로지 함수의 코드 블록만을 지역 스코프로 인정한다. 이를 **함수 레벨 스코프**라 한다.

```js
var a = 1

if (true) {
  var a = 5
}

console.log(a) // output: 5
```

함수가 아닌 곳에서 var 키워드를 이용해 a를 선언했기 때문에 전역 변수로 취급한다. 기존에 있던 a 변수가 중복 선언되면서, 최하단의 console에서도 출력 값이 5로 바뀐 것을 확인할 수 있다.

해당 예제는 코드가 짧아서 어디에서 문제가 일어난지 바로 알 수 있었지만, 실무에서는 그렇지 않다. 전역 변수로 인해 재할당이 발생하거나, 전역 스코프를 공유하기 때문에 어딘가에 동일한 이름이 있다면 예상치 못한 결과를 가져올 수 있는 위험이 있다. 따라서 오로지 함수 코드 블록만을 지역 스코프로 인정하는 `var` 대신, 블록 레벨 스코프를 지원하는 `const`와 `let`을 사용하는 것을 권장한다.

## var, let, const의 차이

앞에서 발견한 `var` 키워드의 문제점은 크게 세 가지가 존재한다.

- 변수 중복 선언 가능하여, 예기치 못한 값을 반환할 수 있다.
- 함수 레벨 스코프로 인해 함수 외부에서 선언한 변수는 모두 전역 변수로 된다.
- 변수 선언문 이전에 변수를 참조하면 언제나 undefined를 반환한다.

<br />

ES6에서 나온 `let`과 `const` 키워드는 위의 세 가지 문제점을 해결했다.

### 1. 변수 중복 선언 불가

(1) let

let 키워드로는 변수 중복 선언이 불가하지만, 재할당은 가능하다.

```js
let name = 'kmj'
console.log(name) // output: kmj

let name = 'howdy' // output: Uncaught SyntaxError: Identifier 'name' has already been declared

name = 'howdy'
console.log(name) // output: howdy
```

(2) const

const가 let과 다른 점이 있다면, **반드시 선언과 초기화를 동시에 진행되어야 한다.**

```js
const name; // output: Uncaught SyntaxError: Missing initializer in const declaration
const name = 'kmj'
```

const도 let과 마찬가지로 재선언이 불가하며, 더 나아가 재할당도 불가하다. 재할당의 경우, 원시 값은 불가능하지만, 객체는 가능하다. const 키워드는 재할당을 금지할 뿐, '불변'을 의미하지 않는다.

```js
// 원시값의 재할당
const name = 'kmj'
name = 'howdy' // output: Uncaught TypeError: Assignment to constant variable.

// 객체의 재할당
const name = {
  eng: 'kmj',
}
name.eng = 'howdy'

console.log(name) // output: { eng: "howdy" }
```

### 2. 블록 레벨 스코프

let, const 키워드로 선언한 변수는 모두 코드 블록(ex. 함수, if, for, while, try/catch 문 등)을 지역 스코프로 인정하는 블록 레벨 스코프를 따른다.

위 var 키워드로 예를 들었던 것을 그대로 가져와 바꾸면 아래와 같은 결과가 나온다.

```js
let a = 1

if (true) {
  let a = 5
}

console.log(a) // output: 1
```

var 키워드로 선언한 경우 5가 나왔지만, let 키워드로 선언한 경우 if 문 안에 있는 것은 지역 스코프를 가져 전역에서 console을 찍었을 경우, 전역에 있는 a가 결과 값으로 출력된다. (const 키워드도 let 키워드와 동일하게 동작한다)

### 3. 변수 호이스팅

(1) let

let 키워드로 선언한 변수는 **선언 단계와 초기화 단계가 분리되어 진행**된다. 즉, 런타임 이전에 자바스크립트 엔진에 의해 선언 단계가 먼저 실행되지만, 초기화 단계가 실행되지 않았을 때 해당 변수에 접근하려고 하면 참조 에러가 뜬다.

```js
console.log(name) // output: Uncaught ReferenceError: name is not defined

let name = 'kmj'
```

따라서 let 키워드로 선언한 변수는 스코프의 시작 지점부터 초기화 단계 시작 지점까지 변수를 참조할 수 없는 **일시적 사각지대(Temporal Dead Zone: TDZ)** 구간에 존재한다.

(2) const

const 키워드는 **선언 단계와 초기화 단계가 동시에 진행**된다.

```js
console.log(name) // output: Uncaught ReferenceError: Cannot access 'name' before initialization

const name = 'kmj'
```

let 키워드로 선언한 경우, 런타임 이전에 선언이 되어 자바스크립트 엔진에 이미 존재하지만 초기화가 되지 않았기 때문에 `name is not defined`라는 문구가 떴다. 하지만 const 키워드로 선언한 경우, 선언과 초기화가 동시에 이루어져야 하지만 런타임 이전에는 실행될 수 없다. 따라서 초기화가 진행되지 않은 상태이기 때문에 `Cannot access 'name' before initialization` 에러 문구가 뜬다.

## 정리

기본적으로 변수의 스코프는 최대한 좁게 만드는 것을 권장한다. 따라서, var 키워드 보다는 let과 const 키워드를 사용하며, 변경하지 않는 값(상수)이라면 let 보다는 const 키워드를 사용하는 것이 안전하다.

<br />

**참고**

<div style="font-size: 12px;">

- 모던 자바스크립트 Deep Dive, 이웅모 (2020)

</div>
