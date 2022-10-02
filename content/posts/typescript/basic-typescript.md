---
title: '타입스크립트(TypeScript) 소개 및 맛보기'
date: '2020-8-22'
tags: ['typescript']
draft: false
---

## 타입스크립트(TypeScript)

자바스크립트는 암묵적 타입 변환(Implicit coercion)으로, 개발자 혹은 엔진에 의해 암묵적으로 타입이 자동 변화 되기도 한다.

또한, 자바스크립트는 런타임 환경에서 에러를 보여주기 때문에 코드를 작성할 때에는 어떤 에러가 있는지 알지 못한다. 이는 곧 프로그램을 실행하기 전까지는 에러를 발견하지 못한다는 뜻이다.

타입스크립트는 이러한 맹점을 보완해준다. 타입스크립트는 개발자에 의해 의도적으로 타입을 변환하는 명시적 타입 변환(Explicit corecion)을 한다. 또한, 코드를 작성하는 그 환경에서 어떤 것이 에러가 나는지 보여주기 때문에 시간 절약을 할 수 있다. _(물론 타입스크립트를 쓰는 이유는 더 많이 있다.)_

## 타입스크립트 설치 및 맛보기

타입스크립트 설치를 위해서 먼저 Node가 설치 되어 있어야 한다.

```shell
$ npm install -g typescript ts-node
```

타입스크립트를 설치하는 것은 알겠지만, `ts-node`가 무엇일까?

타입스크립트는 브라우저가 바로 이해할 수 없는 언어이다. 따라서 자바스크립트로 변환해주어야 한다.

<div style="text-align: center;"><img src="https://www.graycelltech.com/wp-content/uploads/2018/09/arrows1-1.png">
<p style="font-size: 11px; color: gray;">https://dzone.com/articles/what-is-typescript-and-why-use-it</p></div>

<span class="file-location">index.ts</span>

```ts
import axios from 'axios'

const url = 'https://jsonplaceholder.typicode.com/todos/1'

axios.get(url).then(response => {
  console.log(response.data)
})
```

위와 같은 `.ts` 파일이 있다고 하면, 이를 브라우저가 이해하기 위해서는 `.js` 파일로 변환 후, 실행해 줘야 한다.

```shell
$ tsc index.ts # index.js 파일 생성
$ node index.js # index.js 파일 실행
```

이 두 가지를 한번에 해줄 수 있는 것이 바로 `ts-node`이다.

```shell
$ ts-node index.ts # index.js 파일 생성 및 실행
# 결과
# { userId: 1, id: 1, title: 'delectus aut autem', completed: false }
```

<br />

그럼 어떻게 타입스크립트가 우리가 쓴 코드의 에러를 알려주는지 알아보자. 위의 코드에서 조금 더 보기 편하게 각 변수에 할당하고 console을 찍어보자.

```ts
const id = todo.ID
const title = todo.Title
const finished = todo.finished

console.log(`
    The Todo with ID: ${id}
    Has a title of: ${title}
    Is it finished? ${finished}
  `)
```

이렇게 작성 후, console을 찍으면 모두 `undefined`가 뜬다. 이는 fetch 해온 것에 각각 `id, title, completed`로 불러와야 했기 때문이다. 하지만 이는 프로그램을 실행해야만 이를 발견할 수 있었다.

그렇다면 다시 타입을 정의해보자.

```ts
interface Todo {
  id: number
  title: string
  completed: boolean
}
```

`interface`는 타입을 정의하는 것이며, `Todo`안에 어떤 프로퍼티가 어떤 타입을 갖는지 미리 정한다.

그리고 `const todo = response.data as Todo;`를 추가하면, 위에 작성했던 코드에 바로 빨간 줄이 쳐지는 걸 확인할 수 있다.

아래에서 보기 쉽게 변수명을 변경하고 console을 따로 빼보자.

```ts
import axios from 'axios'

const url = 'https://jsonplaceholder.typicode.com/todos/1'

interface Todo {
  id: number
  title: string
  completed: boolean
}

axios.get(url).then(response => {
  const todo = response.data as Todo
  const id = todo.id
  const title = todo.title
  const completed = todo.completed

  logTodo(id, completed, title) // 일부로 completed를 두 번째에 썼다
})

const logTodo = (id, title, completed) => {
  console.log(`
    The Todo with ID: ${id}
    Has a title of: ${title}
    Is it completed? ${completed}
  `)
}
```

자바스크립트 처럼 아래 `logTodo`에 타입을 선언하지 않은 채 실행한다면, 내용이 반대로 나오는 것을 실행하고 나서야 알아챌 수 있다. 그럼 타입을 한번 선언해보자.

```ts
const logTodo = (id: number, title: string, completed: boolean) => {
  console.log(`
    The Todo with ID: ${id}
    Has a title of: ${title}
    Is if completed? ${completed}
  `)
}
```

위처럼 함수에 타입을 선언하면 `logTodo(id, completed, title)` 여기에 빨간줄이 쳐진다.

이렇게 타입스크립트는 실행하기 전에, 코드를 작성하는 곳에서 에러를 알려주기 때문에 시간을 단축할 수 있다.

<br />

**참고**

<div style="font-size: 12px;">

- Typescript: The Complete Developer's Guide [2020], 유데미
- <https://poiemaweb.com/js-type-coercion>

</div>
