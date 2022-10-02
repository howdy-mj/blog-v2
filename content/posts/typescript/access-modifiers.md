---
title: '타입스크립트 접근제한자(public, protected, private)'
date: '2021-11-10'
tags: ['typescript']
draft: false
---

자바스크립트에는 마땅히 Class 내부의 값을 은닉화를 할 수 있는 방법이 없었다.

다행히 타입스크립트에는 접근 제한자(Access modifier)인 `public`, `protected`, `private`를 지원하며, 이를 통해 외부에서 특정 메서드나 프로퍼티에 접근 범위를 지정할 수 있다.

## public

public은 어디에서나 접근할 수 있으며 생략 가능한 default 값이다.

```ts
class Hello {
  name: string

  constructor(name: string) {
    this.name = name
  }

  // public 생략 가능
  public greet() {
    console.log(`hi! ${this.name}`)
  }
}

const hello = new Hello('kmj')
hello.greet() // output: 'hi! kmj'
```

name을 선언해주기 위해서 꽤나 많은 양의 코드를 작성해야 하는데, 이를 constructor에서 한 번에 선언할 수 있다.

```ts
class Hello {
  constructor(public name: string) {}
  // 생략
}
```

## protected

protected는 해당 클래스 혹은 서브클래스의 인스턴스에서만 접근이 가능하다.

```ts
// 1. 해당 클래스에서 접근
class Hello {
  constructor(public name: string) {}

  greet() {
    console.log(`hi! ${this.name}, log: ${this.test()}`)
  }

  protected test() {
    return 'test'
  }
}

const hello = new Hello('kmj')
hello.greet() // output: 'hi! kmj, log: test'

// 2. 서브클래스에서 접근
class Hi extends Hello {}

const hi = new Hi('howdy')
hi.greet() // output: 'hi howdy, log: test'
```

단, 서브클래스에서 `protected`로 된 값을 `public`으로 오버라이딩한다면 해당 값은 `public`으로 취급된다.

```ts
class Hi extends Hello {
  test() {
    return 'override'
  }
}

const hi = new Hi('howdy')
hi.greet() // output: 'hi howdy, log: override'

const test = hi.test()
console.log(test) // output: 'override'
```

오버라이딩할 경우, 상위클래스의 return 타입과 같아야 한다 그렇지 않으면 에러를 반환한다.

## private

`private`는 해당 클래스의 인스턴스에서만 접근 가능하다.

```ts
class Hello {
  constructor(private name: string) {}
}

const hello = new Hello('kmj')
hello.name // Property 'name' is private and only accessible within class 'Hello'.
```

위의 예시에서 name을 가져오려하려면, 위와 같은 에러가 뜬다.

그리고 서브클래스에서 name을 `public`으로 바꾸어주려고 해도 에러가 뜬다.

```ts
class Hi extends Hello {
  constructor(public name: string) {
    super(name)
  }
  // Class 'Hi' incorrectly extends base class 'Hello'.
  // Property 'name' is private in type 'Hello' but not in type 'Hi'.ts(2415)
}
```

## Caveats

하지만 `private`와 `protected`로 지정한 값들이 항상 보호되는 것이 아니라, key 값으로는 접근이 가능하다.

```ts
const hello = new Hello('kmj')
console.log(hello['name']) // output: 'kmj'
```

따라서 온전히 보호하기 위해서는 다른 장치가 필요하다. (추후 보충)

### readonly

만약 정말 수정되면 안되는 값이 있다면, `readonly` 접근자를 활용해야 한다.

```ts
class Hello {
  readonly hey: string = 'Hey'

  constructor(private name: string) {}
}

const hello = new Hello('kmj')
console.log(hello.hey) // output: 'Hey'

hello.hey = 'test' // Error: Cannot assign to 'hey' because it is a read-only property.
```

<br>

_추후 추가할 내용_

- getter, setter

<br />

**참고**

<div style="font-size: 12px;">

- <a href="https://www.typescriptlang.org/docs/handbook/2/classes.html" target="_blank">TypeScript: Documentation</a>

</div>
