---
title: 'ReactNode vs. JSX.Element 그리고 ReactElement'
date: '2022-07-24'
tags: ['react']
draft: false
---

해당 글 작성한 시점의 React는 18.0, TypeScript는 2.8 버전이다.

- <a href="https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts" target="_blank">DefinitelyTyped/types/react/index.d.ts</a>

## ReactNode vs. JSX.Element

ReactNode, JSX.Element 모두 외부에서 주입받을 컴포넌트의 타입을 정의할 때 가장 많이 사용한다.

### ReactNode

```ts
type ReactNode =
  | ReactElement
  | string
  | number
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined

type ReactFragment = Iterable<ReactNode>
```

ReactNode는 ReactElement를 비롯하여 대부분의 자바스크립트 데이터 타입을 아우르는 범용적인 타입이다. 따라서 어떤 props을 받을 건데, 구체적으로 어떤 타입이 올지 알 수 없거나, 어떠한 타입도 모두 받고 싶다면 ReactNode로 지정해주는 것이 좋다.

참고로 ReactText와 ReactChild는 React를 사용할 때 큰 관련이 없기 때문에 곧 <a href="https://github.com/DefinitelyTyped/DefinitelyTyped/blob/06d407a545af127e4a6537261a6d46a2e3620270/types/react/index.d.ts#L216:L223" target="_blank">deprecated</a> 될 것이라 명시되어 있다.

<span class="file-location">Blog.tsx</span>

```tsx
type BlogProps = {
  profile: React.ReactNode
  introduction: JSX.Element
}

const Blog = ({ profile, introduction }: BlogProps) => {
  return (
    <div>
      {profile}
      {introduction}
    </div>
  )
}

export default Blog
```

<span class="file-location">App.tsx</span>

```tsx
const App = () => {
  return (
    <Blog
      profile={'howdy-mj'}
      introduction={'howdy-mj'} // TS2322: Type 'string' is not assignable to type 'Element'.
    />
  )
}

export default App
```

<div class="img-div" style="margin-bottom: 10px">
  <img src="https://user-images.githubusercontent.com/58619071/193442161-9cdc371b-e82b-4693-9c18-08437bab3a00.png" alt="introduction은 에러">
</div>

`profile`에는 string을 선언할 수 있지만, `introduction`은 string이기 때문에 Element 타입에 선언할 수 없다는 에러가 뜬다.

<br>

의아했던 점은, ReactNode에는 ReactElement만 있다는 것이다. 보통 ReactElement와 JSX.Element를 많이 비교하고 있기 때문에 두 개를 같이 아우를줄 알았는데 아니었다.

공통점부터 알아보자면, 두 가지 모두 `React.createElement()`의 리턴 값이다.

## React.createElement()

```jsx
const HowdyMj = () => {
  return <div>howdy-mj</div>
}
```

위와 같이 JSX로 작성된 코드를 자바스크립트로 변환하면 아래와 같다.

```js
const HowdyMj = () => {
  return React.createElement('div', null, 'howdy-mj')
}
```

다른 변환 예시를 보고 싶다면 <a href="https://babeljs.io/repl/#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=DwEwlgbgfAFg9gdxATwLQFsBWwD05oBQQA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=false&targets=&version=7.18.9&externalPlugins=&assumptions=%7B%7D" target="_blank">Babel compiler - online</a>에서 직접 해볼 수 있다.

사실 이렇게만 보면 구체적으로 와닿지 않는다. 위의 컴포넌트를 console로 찍어보자.

```tsx
console.log(HowdyMj())
```

<div class="img-div" style="margin-bottom: 10px">
  <img src="https://user-images.githubusercontent.com/58619071/193442165-1d90508f-0ea3-4107-b7aa-f5ae7dd9174c.png" alt="HowdyMj 컴포넌트 console">
</div>

그렇다면 위처럼 type, key, props 등을 갖고 있는 것을 알 수 있다.

type은 해당 요소의 HTML 태그를 나타내고, props는 children이나 className, style 등의 속성을 나타낸다.

이걸 `React.createElement()`로 만든다면 아래와 같다.

```jsx
const HowdyMj = () => {
  return React.createElement('div', {
    children: 'howdy-mj',
  })
}
```

이처럼 JSX는 `React.createElement()` 보다 훨씬 간단하게 컴포넌트를 만들 수 있다. 그래서 JSX가 `React.createElement()` 함수에 대한 문법적 설탕을 제공한다고 하는 것 같다.

## ReactElement와 JSX.Element

자 이제 둘의 리턴 타입인 `React.createElement()`에 대해 어느정도 숙지했다. 그렇다면 ReactElement와 JSX.Element의 차이점은 무엇일까?

### ReactElement

ReactElement는 <a href="https://github.com/facebook/react/blob/main/packages/shared/ReactElementType.js" target="_blank">ReactElementType.js</a>에서 flow로 정의되어 있어 쉽게 볼 수 있다.

```ts
export type ReactElement = {|
  $$typeof: any,
  type: any,
  key: any,
  ref: any,
  props: any,
  // ReactFiber
  _owner: any,

  // __DEV__
  _store: { validated: boolean, ... },
  _self: React$Element<any>,
  _shadowChildren: any,
  _source: Source,
|}
```

위에서 이미 본 익숙한 형태의 타입을 볼 수 있다.

```ts
interface ReactElement<
  P = any,
  T extends string | JSXElementConstructor<any> =
    | string
    | JSXElementConstructor<any>
> {
  type: T
  props: P
  key: Key | null
}

type JSXElementConstructor<P> =
  | ((props: P) => ReactElement<any, any> | null)
  | (new (props: P) => Component<any, any>)

type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>

type Key = string | number
```

따라서 type이 받는 T 제너릭은 해당 HTML 태그의 타입을 받고, props는 그 외의 컴포넌트가 갖고 있는 속성을 받는다.

### JSX.Element

JSX.Element는 ReactElement의 타입과 props를 모두 any로 받아 확장한 인터페이스다. 따라서 더 범용적으로 사용할 수 있다.

```ts
// Global
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
  }
}

// React Elements
declare namespace React {
  // ... 생략
}
```

또한 React 관련 타입은 모두 React의 namespace에서 선언되었는데, JSX는 global namespace로 선언되어 있다. 따라서 React 내에서 JSX를 import하지 않아도 바로 사용이 가능하다.

<br>

**참고**

<div style="font-size: 12px;">

- <a href="https://stackoverflow.com/questions/58123398/when-to-use-jsx-element-vs-reactnode-vs-reactelement" target="_blank">When to use JSX.Element vs ReactNode vs ReactElement?</a>
- <a href="https://ko.reactjs.org/docs/introducing-jsx.html" target="_blank">JSX 소개 | React</a>
- <a href="https://www.robinwieruch.de/react-element-component/" target="_blank">React Element vs Component</a>

</div>
