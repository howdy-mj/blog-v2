---
title: '프로토타입: [[Prototype]], __proto__, prototype 프로퍼티'
date: '2021-4-04'
tags: ['javascript']
draft: false
---

<div style="font-size: 12px; font-style: italic; text-align: right;">
마지막 업데이트: 2021.08.31
</div>

<br>

> 자바스크립트는 명령형, 함수형, 프로토타입 기반 객체지향 프로그래밍을 지원하는 멀티 패러다임 프로그래밍 언어다.

<br />

클래스의 가장 큰 특징은 상속이다. 상속은 객체지향 프로그래밍의 핵심 개념으로, 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 그대로 사용할 수 있는 것을 말한다.

자바스크립트는 ES6에서 Class(이하 클래스)가 도입되었지만 <span class="bold">프로토타입 기반 언어</span>라, 다른 언어에서 사용되는 클래스와 동작 방식이 약간 다르다.

```js
// 클래스의 상속
function Greeting(name) {
  this.name = name;
  this.hello = function () {
    console.log(`hello ${this.name}`);
  };
}

const mj = new Greeting('mj');
mj.hello(); // output: hello mj
```

하지만 새로운 클래스를 생성할 때마다 모두 `hello` 함수를 갖고 있어 메모리가 낭비된다.

이때 자바스크립트는 프로토타입을 기반으로 상속을 구현하여, 새로운 클래스 몇 개를 만들든 하나의 `hello` 함수를 사용하여 불필요한 중복을 제거할 수 있다.

```js
// 자바스크립트 프로토타입 기반의 상속
function Greeting(name) {
  this.name = name;
}

Greeting.prototype.hello = function () {
  console.log(`hello ${name}`);
};

const mj = new Greeting('mj');
mj.hello(); // output: hello mj
```

그렇다면 **프로토타입**이 정확히 무슨 뜻일까?

## 프로토타입(prototype) 객체

ECMA-262에서 prototype은 **object that provides shared properties for other objects**로, 다른 객체에 공유 프로퍼티(메서드 포함)를 제공하는 객체이다.

모든 객체는 `[[Prototype]]`이라는 내부 슬롯(자바스크립트 엔진의 내부 로직)을 갖으며, 상속을 구현하는 프로토타입 객체를 가리킨다.

<div style="text-align: center;">
  <img src="https://user-images.githubusercontent.com/58619071/193441027-50ca26c8-f44c-4073-8da1-183758695daf.png" alt="prototype connection">
  <p style="font-size: 12px; color: gray;">모던 자바스크립트 Deep Dive, 이웅모</p>
</div>

하지만 `[[Prototype]]` 내부 슬롯에는 직접 접근이 불가하다. 이는 프로토타입 체인의 단방향을 지키기 위해서다. 만약 직접 접근가능하다면, 서로가 서로의 프로토타입이 되면서 프로토타입 체인이 무한으로 돈다. 따라서 `__proto__` 프로퍼티로만 접근할 수 있다.

```js
const a = {};
const b = {};

a.__proto__ = b;
b.__proto__ = a; // Uncaught TypeError: Cyclic __proto__ value
```

### \_\_proto\_\_

모든 객체는 `__proto__`를 통해 자신의 프로토타입(`[[Prototype]]` 내부 슬롯)에 접근할 수 있다.

<div class="img-div">
  <img src="https://user-images.githubusercontent.com/58619071/193441030-c547ddb6-b48b-44ed-aa65-bc3608d31c20.png" alt="prototype connection">
  <p>hello.__proto__</p>
</div>

ES6에서 `__proto__`를 표준으로 채택되었다. 하지만 여전히 코드 내에서 `__proto__`보다는 `Object.getPrototypeOf()`의 사용을 권장한다.

```js
const hello = { name: 'kmj' };
Object.getPrototypeOf(hello);
// {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
```

<br />

### 함수 객체의 prototype 프로퍼티

`prototype` 프로퍼티는 생성자 함수로 호출할 수 있는 객체, 즉 <span class="return">constructor</span>를 소유하는 프로퍼티다. 일반 객체와 생성자 함수로 호출할 수 없는
<span class="return">non-constructor</span>에는 `prototype` 프로퍼티가 없다.

```js
// 함수 객체는 prototype 프로퍼티가 있음
function func() {}
func.hasOwnProperty('prototype'); // output: true

// 일반 객체는 prototype 프로퍼티가 없음
const obj = {};
obj.hasOwnProperty('prototype'); // output: false
```

단, 화살표 함수와 ES6 메서드 축약 표현으로 정의된 메서드는 <span class="return">non-constructor</span>로 `prototype` 프로퍼티가 없다.

```js
// 화살표 함수
const arrowFunc = () => {};
arrowFunc.hasOwnProperty('prototype'); // output: false

// ES6 축약 메서드
const es6 = {
  test() {},
};
es6.test.hasOwnProperty('prototype'); // output: false
```

## 생성자 함수와 프로토타입

생성자 함수에 의해 생성된 객체는 <span class="return">constructor</span> 프로퍼티를 통해 생성자 함수와 연결된다.

```js
function Person(name) {
  this.name = name;
}
const me = new Person('kmj'); // Person 생성자로 만들어진 me 객체
me.constructor === Person; // output: true
```

생성자 함수로 생성한 것이 아닌, 리터럴 표기법으로 생성하여도 <span class="return">constructor</span> 프로퍼티가 연결된다.

```js
const person = function (name) {
  this.name = name;
};
person.constructor === Function; // output: true
```

이처럼 리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요하며, 이는 곧 <span class="return">constructor</span> 프로퍼티와 연결된다. 즉, **프로토타입과 생성자 함수는 늘 함께 존재**한다.

<br>

### 추상 연산 OrdinaryObjectCreate

객체를 생성하는 방식에는 `객체 리터럴`, `Object 생성자 함수`, `생성자 함수`, `Object.create 메서드`, `클래스` 등 다양한 방법이 존재한다.

세부적인 생성 방식에는 차이가 있으나, 모두 추상 연산 <a href="https://tc39.es/ecma262/#sec-ordinaryobjectcreate" target="_blank">OrdinaryObjectCreate</a>에 의해 생성된다는 공통점이 있다.

```js
OrdinaryObjectCreate(proto [ , additionalInternalSlotsList ])
```

추상 연산 **OrdinaryObjectCreate**는 proto(객체 혹은 null)와 선택 인자 *additionalInternalSlotsList*를 받아 런타임에 새로운 <a href="https://tc39.es/ecma262/#ordinary-object" target="_blank">객체(ordinary objects)</a>를 만든다. *additionalInternalSlotsList*이 있다면, 전달받은 프로토타입(프로퍼티)을 자신이 생성한 객체의 `[[Prototype]]` 내부 슬롯에 할당 한 후, 생성한 객체를 반환한다. 여기서 전달되는 인수는 객체가 생성되는 시점에 객체 생성 방식에 의해 결정된다.

#### 추상 연산(Abstract Operations)이란?

추상 연산은 ECMAScript의 일부가 아닌, ECMAScript 언어의 상세를 돕기 위해 정의된 것이다. 해당 규격은 다른 알고리즘 내에서 참조될 수 있도록 매개변수화(parameterized)된 함수 형태로 사용된다. 보다 자세한 내용은 <a href="https://tc39.es/ecma262/#sec-algorithm-conventions-abstract-operations" target="_blank">여기</a>에서 확인 가능하다.

<br />

**참고**

<div style="font-size: 12px;">

- 모던 자바스크립트 Deep Dive, 이웅모 (2020)
- <a href="https://tc39.es/ecma262/" target="_blank">ECMAScript® 2022 Language Specification</a>
- <a href="https://medium.com/jspoint/what-are-internal-slots-and-internal-methods-in-javascript-f2f0f6b38de" target="_blank">What are “Internal Slots” and “Internal Methods” in JavaScript?</a>

</div>
