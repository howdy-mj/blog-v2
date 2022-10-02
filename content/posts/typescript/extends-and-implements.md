---
title: 'extends와 implements'
date: '2021-10-04'
tags: ['typescript']
draft: false
---

자바스크립트에서 어떤 클래스를 상속받고 싶을 때는 하위 클래스에서 `extends` 키워드를 통해 상속 받을 수 있다. 그리고 타입스크립트에서는 `implements` 키워드를 통해서, interface와 <span class="return">class</span>를 동시에 확장 가능한 것을 알고 있었다.

하지만 늘 그렇듯, 이 두 가지의 정확한 차이점은 알지 못했다.

## extends vs. implements

### extends

`extends` 키워드는 <span class="return">class</span> 선언문이나 <span class="return">class</span> 표현식에서 만들고자하는 <span class="return">class</span>의 하위 클래스를 생성할 때 사용한다.

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

class KMJ extends Person {
  sayHi() {
    console.log(`hi, ${this.name}`)
  }
}

const mj = new KMJ('kmj', 10)
console.log(mj.sayHi()) // output: hi, kmj
```

클래스의 `.prototype`은 반드시 Object이거나 null이어야 한다. null일 경우, 프로토타입 체인의 최상단을 뜻한다.

<div class="img-div">
  <img src="https://user-images.githubusercontent.com/58619071/193442683-47a49c83-2429-4194-8719-3a3bbfb1dcba.png" alt="mj prototype">
  <p>console.dir(mj)</p>
</div>

<div class="img-div">
  <img src="https://user-images.githubusercontent.com/58619071/193442685-cbe44339-1de7-49d2-886b-6d479277b5b3.png" alt="Peron prototype">
  <p>Person.prototype</p>
</div>

### implements

`implements` 키워드는 <span class="return">class</span>의 interface에 만족하는지 여부를 체크할 때 사용된다. `implements`한 interface의 타입이 없다면 에러를 반환한다.

```ts
interface Person {
  name: string
  age: number
}

// 에러: age 미정의
class Howdy implements Person {
  // Class 'Howdy' incorrectly implements interface 'Person'.
  // Property 'age' is missing in type 'Howdy' but required in type 'Person'.
  name = 'howdy'
}
```

여기서 주의할 점은, `implements`는 오직 타입 체크를 위해 사용되는 것이지, 안의 값을 자동으로 바꾸어주지 않는다.

```ts
interface Person {
  name: string
  age: number
  isMJ(name: string): boolean
}

class Howdy implements Person {
  name = 'howdy'
  age = 20

  isMJ(name) {
    // 에러: parameter의 타입 미지정
    // Parameter 'name' implicitly has an 'any' type, but a better type may be inferred from usage.
    return this.name === 'kmj'
  }
}
```

### 소결론

`extends` 키워드는 새로운 클래스의 '상속'을 위해 사용한다. 상위 클래스의 모든 프로퍼티와 메서드들을 갖고 있으므로 일일이 정의하지 않아도 된다. 상위 클래스의 프로퍼티를 지정하지 않으면, 초기값으로 선언되며 에러는 반환하지 않는다.

`implements` 키워드는 새로운 클래스의 모양을 동일하게 정의하고 싶을 때 사용한다. 따라서, interface로 정의한 값들은 모두 필수적으로 들어가야 하며, 하나라도 빠질 경우 에러를 반환한다. 타입으로 지정한 메서드 모두 내부에서 재정의가 필요하다.

이는 `extends`와 `implements`의 차이점에 대해 정리한 것으로, 모든 기능에 대해 정리한 것은 아니다.

## React의 extends와 Angular의 implements

그러다 문득, React와 Angular가 컴포넌트 정의하는 방식이 다른 것이 생각났다.

React의 class 컴포넌트는 `extends`로 확장한다.

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

반면, Angular는 `implements`로 대부분의 구성요소(ex. Component, Directive, Service, Module)를 정의한다.

```ts
export class CounterComponent implements OnInit {}
```

공식문서를 보니 React의 Component는 class로 정의되어 있었고, Angular는 대부분 interface로 정의되어 있었다.

React의 <a href="https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L433" target="_blank">Component</a>:

```ts
class Component<P, S> {
  static contextType?: Context<any> | undefined
  context: any
  constructor(props: Readonly<P> | P)
  setState<K extends keyof S>(
    state:
      | ((prevState: Readonly<S>, props: Readonly<P>) => Pick<S, K> | S | null)
      | (Pick<S, K> | S | null),
    callback?: () => void
  ): void
  forceUpdate(callback?: () => void): void
  render(): ReactNode
  readonly props: Readonly<P> & Readonly<{ children?: ReactNode | undefined }>
  state: Readonly<S>
  refs: {
    [key: string]: ReactInstance
  }
}
```

Angular의 <a href="https://angular.io/api/core/OnInit" target="_blank">OnInit</a>:

```ts
interface OnInit {
  ngOnInit(): void
}
```

처음에는 왜 프레임워크인 Angular가 `extends`가 아닌 `implements`일까 궁금했다. 공식문서에는 Angular는 TypeScript가 기본으로 내제되어 있는 프레임워크로 모든 핵심 및 선택 기능을 TypeScript의 라이브러리처럼 참조해 개발할 수 있다고 나와있다.

이것만으로는 명쾌한 답을 내릴 수 없었지만, 이 외의 내용은 찾을 수 없어 필자 나름의 추측을 해보았다.

Angular에서 어떠한 기능을 추가하려면 Angular에서 만든 특정 규칙에 맞게 사용해야만 한다. 따라서 불필요하게 모든 프로퍼티와 메서드를 상속을 하는 `extends` 보다는 딱 그 형식에 맞는 `implements`로도 충분한게 아닐까는 생각이다. (닭이 먼저, 달걀이 먼저의 문제 같지만...) 또한, 해당 상황에 맞게 내용은 모두 재정의해야 한다.

그리고 Angular는 일반적으로 프로젝트의 규모가 크기 때문에 모든 것이 `extends`로 얽혀있다면 객체지향 프로그래밍이 추구하는 방향과도 맞지 않는 것 같다.

<br>

그렇다면 또 궁금한 것이 생겼다.

React가 추구하는 방향은 무엇일까? 라이브러리인데 굳이 왜 Component를 상속받으면서 프로퍼티와 메서드를 갖고 있게 하는 것일까? 그러다 hooks를 개발하게 된 이유는 무엇일까?

> 더 공부한 후 블로깅 해보려 한다.

<br />

**참고**

<div style="font-size: 12px;">

- <a href="https://www.typescriptlang.org/docs/" target="_blank">TypeScript</a>
- <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/extends" target="_blank">MDN - extends</a>
- <a href="https://stackoverflow.com/questions/38834625/whats-the-difference-between-extends-and-implements-in-typescript" target="_blank">What's the difference between 'extends' and 'implements' in TypeScript</a>

</div>
