---
title: 'react-spring 소개'
date: '2020-5-29'
tags: ['react-spring']
draft: false
---

## 1. react-spring이란?

react-spring은 spring-physics 기반의 애니메이션 라이브러리로, 대부분의 UI 애니메이션을 지원한다.
본래 애니메이션은 퍼블리셔 단에서 많이 진행됐지만, 최근은 프론트엔드가 같이 하는 추세라 라이브러리가 많이 나오고 있다.

**react-spring 설치**

```shell
$ npm install react-spring
```

react-spring은 cross platform으로 웹, react-native, react-native-web 등의 플랫폼에서 다 사용 가능하다.

#### 왜 이름이 durations이 아니라 springs일까?

[react-spring 홈페이지](https://www.react-spring.io/)에 따르면, 모든 움직임은 만화처럼 깔끔하게 움직이는 경우는 거의 없으며, 항상 struggle(꿈틀거림)이 존재한다. 즉, 어느 움직임이든 한 번에(sync) 이루어지지 않고, 늘 time and curves(시간과 굴곡)에 영향을 받는다.
그래서 spring-physcis라는 단어를 사용한 것이 아닐까 추측해본다.

#### animated + react-motion 장점 = react-spring

애니메이션 라이브러리하면 [animated](https://github.com/animatedjs/animated)와 [react-motion](https://github.com/chenglou/react-motion)이 많이 나온다.
react-animated는 시간 기반의 애니메이션 라이브러리로 간단하게 start와 stop 메소드를 사용한다.
react-spring은 animated의 쉬운 사용과 react-motion의 간결한 구조를 합쳤다.

## 2. Hooks api, Render-props api

react-spring은 크게 Hooks, Render-props(Class)로 나뉜다.
Hooks api는 19년 2월에 도입되었다.

두 가지의 가장 큰 차이점은 Hooks는 view를 모른다.
만약 height를 해당 스코프 밖에서 선언했다면, Hooks의 경우 다른 해당 height를 알려주는 custom Hook을 사용해서 `<animated.div />`에 알려줘야 한다.

```jsx
const [bind, { height }] = useMeasure() // custom Hook
const props = useSpring({ height })
return (
  <animated.div style={{ overflow: 'hidden', ...props }}>
    <div {...bind}>content</div>
  </animated.div>
)
```

_(조금 더 이해도가 높아졌을 때 다시 수정할 예정이다.)_

<br>

이번 글에서 간단하게 Hooks와 Render-props의 구조를 살펴보자.
두 가지 모두 spring을 예로 들겠다.

#### (1) Hooks api 구조

```jsx
import { useSpring, animated } from 'react-spring'

function App() {
  const props = useSpring({ number: 1, from: { number: 0 } }) // spring 정의
  return <animated.span>{props.number}</animated.span> // return(내 view)에 animated 값 묶기
}
```

#### (2) Render-props api 구조

```jsx
import { Spring } from 'react-spring/renderprops'

function App() {
  return (
    // spring 정의
    <Spring from={{ number: 0 }} to={{ number: 1 }}>
      // return
      {props => <div>{props.number}</div>}
    </Spring>
  )
}
```

지금은 Hooks와 Render-props를 import 해오는 위치가 다르지만, react-spring 9.0(아직 배포 전)에서는 모두 `react-spring`에서 불러올 수 있다.

```jsx
import { Spring, useSpring } from 'react-spring'

// 아래처럼 import하는 것도 여전히 가능하다:
import { Spring } from 'react-spring/renderprops'
```

<br>

<p style="font-size: 13px; font-style: italic">오역이 있을 수 있습니다. 피드백은 언제나 환영합니다!</p>
