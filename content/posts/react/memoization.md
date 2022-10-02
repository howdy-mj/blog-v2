---
title: 'React의 Memoization'
date: '2022-02-14'
tags: ['react']
draft: false
---

위키피디아에 따르면, 메모이제이션(memoization)은 컴퓨터가 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로서 동일한 계산을 하지 않도록 하여, 속도를 높이는 기술이다. 보통 애플리케이션의 최적화를 위해 사용된다.

<br >

React에서 컴포넌트가 렌더링하는 규칙에는 크게 세 가지가 존재한다.

1. state나 props가 변경되었을 때
2. `forceUpdate()`를 실행했을 때
3. 부모 컴포넌트가 렌더링 되었을 때

애플리케이션의 규모가 커지면서 리렌더가 점점 더 잦아진다면 이는 서비스 사용에 불편을 초래할 것이다. 따라서 리렌더가 일어나지 않도록 최적화해주는 것이 중요하다.

React에서 메모이제이션을 하는 대표적인 방법으로는 `useCallback`, `useMemo`, `React.memo`가 있다.

<br>

### useCallback

```js
const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])
```

useCallback은 메모이제이션 된 콜백을 반환한다.

컴포넌트 내부에 있는 위치해있는 컴포넌트가 렌더링 될 때마다 다시 함수를 생성한다. 하지만 useCallback으로 감싸주게 되면 첫 렌더할 때에만 생성하고 그 이후에는 함수를 기억하고 있어 재생성하지 않는다.

dependency 배열에는 어떠한 값이 변경되었을 때 다시 생성해준다는 뜻으로 새로운 값으로 함수를 실행해야 한다면 반드시 그 값을 해당 의존성 배열에 넣어줘야 한다.

### useMemo

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
```

useMemo는 메모이제이션 된 값을 반환한다.

렌더링하는 과정에서 특정 값이 바뀌었을 때만 계산을 실행하고, 원하는 값이 바뀌지 않았다면 이전에 계산한 그 값을 그대로 사용한다. useCallback과 마찬가지로 dependency 배열에 값을 넘긴다.

### React.memo

```js
// 방법 1
const Result = React.memo(() => {
  return ()
})

// 방법 2
export default React.memo(Result)
```

`React.memo`는 컴포넌트를 감싸서 사용하며, 들어온 props의 값이 바뀌었다면 해당 컴포넌트의 렌더를 발생시킨다. 따라서 props만 받는 자식 컴포넌트에서 사용하는 것을 권장한다.

Class 컴포넌트에는 `PureComponent`가 존재하며, `React.memo`와는 달리 props와 state의 얕은 비교를 하는 `shouldComponentUpdate`와 비슷하다. `PureComponent`는 하위 컴포넌트에 대한 props를 갱신하지 않기 때문에, 반드시 자식 컴포넌트들이 순수한지 확인해야 한다.

## 간단한 코드로 보는 사용 예시

1시간 안에 끝내야 할 todo 리스트를 만드는 앱이며, 코드는 아래와 같다.

<span class="file-location">App.tsx</span>

```tsx
import { useState, useMemo } from 'react'
import Title from './components/Title'
import { getAvgPerHour } from './utils/index'

const App = () => {
  const [list, setList] = useState<string[]>([])
  const [todo, setTodo] = useState<string>('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setList([...list, todo])
    setTodo('')
  }

  const avgPerHour = getAvgPerHour(list)

  return (
    <>
      <Title title="1시간 안에 끝내야 할 업무들" />
      <div>
        <form onSubmit={onSubmit}>
          <input value={todo} onChange={onChange} />
        </form>

        <ul>
          {list.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
        <div>하나당 최대 걸려야할 시간: {avgPerHour}분</div>
      </div>
    </>
  )
}

export default App
```

<span class="file-location">components/Title.tsx</span>

```tsx{8}
import React from 'react'

interface TitleI {
  title: String
}

const Title = ({ title }: TitleI) => {
  console.log('Title 렌더')
  return <h1>{title}</h1>
}

export default React.memo(Title)
```

<span class="file-location">utils/index.ts</span>

```ts{2}
export const getAvgPerHour = (totalList: string[]) => {
  console.log('getAvgPerHour 함수')
  if (totalList.length === 0) return 0
  return 60 / totalList.length
}
```

<div class="img-div">
  <img src="https://user-images.githubusercontent.com/58619071/193442105-61360992-4159-436b-ad74-e9018c56fc07.png" alt="화면">
  <p>만들어진 화면</p>
</div>

가장 큰 문제점은, input에 값을 입력할 때마다, `getAvgPerHour()`와 Title 컴포넌트에서 console이 찍히다는 것이다.

input에 값을 입력할 때에는 list의 값이 변경되지 않고, Title은 변하지 않기 때문에 불필요한 렌더가 일어나고 있는 것이다.

따라서, avgPerHour는 `useMemo`로 감싸주어 이전에 기억하고 있던 값과 다르지 않다면 그 값을 재사용하는 것으로 바꾸고, Title은 props로 들어오는 값이 달라지지 않는다면 렌더를 하지 않도록 `React.memo`로 감싸주면 된다.

<span class="file-location">App.tsx</span>

```tsx{1}
const avgPerHour = useMemo(() => getAvgPerHour(list), [list])
```

<span class="file-location">components/Title.tsx</span>

```tsx{6}
const Title = ({ title, obj }: TitleI) => {
  console.log('Title 렌더')
  return <h1>{title}</h1>
}

export default React.memo(Title)
```

이렇게 하면 input에 값을 입력해도 console이 찍히지 않는다.

그렇다면 `useCallback`은 언제 사용할까? 이건 함수의 재생성을 막아주는 것이기 때문에 console로는 바로 확인이 어렵다.

<span class="file-location">App.tsx</span>

```tsx{1,3}
const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  setTodo(e.target.value)
}, [])
```

`useCallback`은 컴포넌트가 리렌더 될 때 함수의 재생성을 막아주는 역할을 한다. 위와 같이 `useCallback`으로 감싸준다면 첫 렌더할 때만 생성하고, 이후에는 저장된 값을 그대로 가져와서 사용한다.

<br>

하지만 모든 곳에서 `useCallback`, `useMemo`를 사용하면 메모리 성능상 좋지 않을 수 있다. 그렇다면 이것들은 언제 적용해야 할까?

## dependency 배열의 참조 타입 처리 (참조동일성)

위에서 dependency 배열에 넘기는 값은 모두 원시 타입일 경우이다.

React는 얕은 비교를 하기 때문에 원시 타입은 판단 가능하지만, 참조 타입은 렌더가 될 때마다 참조 메모리 주소가 달라진다. 따라서 우리가 보기에는 같은 값이더라도, React는 다른 값으로 인지하여 렌더를 일으킨다.

<span class="file-location">App.tsx</span>

```tsx{6}
const App = () => {
  const person = { name: 'kmj' }

  return (
    <>
      <Title title="1시간 안에 끝내야 할 업무들" person={person} />
    </>
  )
}
```

<span class="file-location">components/Title.tsx</span>

```tsx{11}
import React, { useEffect, useRef } from 'react'

interface TitleI {
  title: String
  person: {
    name: string
  }
}

const Title = ({ title, person }: TitleI) => {
  console.log('Title 렌더') // 렌더될때마다 console에 찍힘
  return (
    <>
      <h1>{title}</h1>
      <p>작성자: {person.name}</p>
    </>
  )
}

export default React.memo(Title)
```

만약 이처럼 Title 컴포넌트에 person이라는 참조 타입을 넘기게 된다면, 아무리 `React.memo`로 감싸고 있더라도 React는 다른 값으로 인식하여 계속 console이 찍히는 것을 볼 수 있다. 때문에 넘겨줄 때, `useMemo`를 통해 person의 이전 값을 기억해두면 된다.

<span class="file-location">App.tsx</span>

```tsx{1}
const person = useMemo(() => {
  return { name: 'kmj' }
}, [])
```

이는 useMemo, useCallback, useEffect 그리고 모든 커스텀 훅에도 해동되는 내용이다.

<br />

**참고**

<div style="font-size: 12px;">

- <a href="https://ko.reactjs.org/docs/hooks-reference.html" target="_blank">Hooks API Reference | React</a>
- <a href="https://ko.reactjs.org/docs/optimizing-performance.html" target="_blank">성능 최적화 | React</a>
- <a href="https://kentcdodds.com/blog/usememo-and-usecallback" target="_blank">When to useMemo and useCallback | Kent C.Dodds</a>

</div>
