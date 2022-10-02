---
title: 'react-spring: Common api'
date: '2020-5-30'
tags: ['react-spring']
draft: false
---

## Common api

### Configs

react-spring의 animation의 속도, 크기 등의 설정은 `config`를 통해 바꿀 수 있다.

ex. useSpring에 적용하고 싶다면:

```js
useSpring({ config: { duration: 250 }, ... })
```

| Property   | Default    | Description                                                                                                                               |
|:-----------|:-----------|:------------------------------------------------------------------------------------------------------------------------------------------|
| mass       | 1          | spring의 크기                                                                                                                                |
| tension    | 170        | spring의 움직이는 속도                                                                                                                           |
| friction   | 26         | spring의 마찰, 저항(클수록 반동이 없어짐)                                                                                                               |
| clamp      | false      | true일 때, spring의 경계를 넘으면 움직임이 멈춤                                                                                                          |
| precision  | 0.01       | 정밀도                                                                                                                                       |
| velocity   | 0          | 초속(初速)                                                                                                                                    |
| duration   | undefined  | 0보다 클 경우, spring-physics가 아닌 지속시간 기반 animation으로 바뀌며 초 단위로 표시됨 (ex. duration: 2500은 2.5초 동안 animation 실행                                  |
| easing     | t => t     | 선형이 기본값으로, [d3-ease](https://github.com/d3/d3-ease) 처럼 원하는 굴곡을 넣을 수 있음                                                                    |

<br>

### Presets

react-spring에서 자주 쓰일법한 config들을 미리 설정해주었다.

```jsx
import { ..., config } from 'react-spring'

useSpring({ ..., config: config.default })
```

| Property         | Value                                     |
|:-----------------|:------------------------------------------|
| config.default   | { mass: 1, tension: 170, friction: 26 }   |
| config.gentle    | { mass: 1, tension: 120, friction: 14 }   |
| config.wobbly    | { mass: 1, tension: 180, friction: 12 }   |
| config.stiff     | { mass: 1, tension: 210, friction: 20 }   |
| config.slow      | { mass: 1, tension: 280, friction: 60 }   |
| config.molasses  | { mass: 1, tension: 280, friction: 120 }  |

<br>

### Properties

모두 아래와 같은 property를 상속 받을 수 있다.

```jsx
useSpring({ from: { ... }, to: { ... }, delay: 100, onRest: () => ... })
```

| Property   | Type               | Description                                                                             |
|:-----------|:-------------------|:----------------------------------------------------------------------------------------|
| from       | obj                | 기준 값 (optional)                                                                         |
| to         | obj/fn/array(obj)  | 변경될 값                                                                                   |
| delay      | number/fn          | animaion 지연 시간(초 단위), 개별 key의 함수로 사용 가능: key => delay                                   |
| immediate  | bool/fn            | true일 경우 animation 중지, 개별 key의 함수로 사용 가능: key => immediate                              |
| config     | obj/fn             | spring config(mass, tension, friction 등 ), 개별 key의 함수로 사용 가능: key => config             |
| reset      | bool               | true일 경우, spring이 처음부터 animation 시작 (from => to)                                        |
| reverse    | bool               | true일 경우, "from"과 "to"가 바뀜                                                              |
| onStart    | fn                 | key가 animaten을 시작할 때 콜백                                                                 |
| onRest     | fn                 | 모든 animation이 정지 상태일 때 콜백                                                               |
| onFrame    | fn                 | frame 별 콜백, 첫 번째 전달 된 인자가 animated 값임                                                   |

<br>

### Interpolations

react-spring에는 Up-front interpolation과 View interpolation으로 나뉜다. 여기에선 View interpolation에 대해 다루겠다.

interpolate은 '보간하다, (중간값을) 채우다'란 의미로 그래픽과 관련된 작업에서 많이 쓰인다. (다른 글에서 더 자세히 다룰 예정이다)

clamp(어떤 값을 특정 범위의 값으로 고정)나 extrapolate(보외법, 범위 외의 값을 추정할 때)가 필요한 경우 사용되며, 각각의 animated 값은 view안에서 `interpolate`할 수 있다.
`value.interpolate`은 object나 function을 가질 수 있다.

| Value             | Default    | Description                                             |
|:------------------|:-----------|:--------------------------------------------------------|
| extrapolateLeft   | extend     | 왼쪽 extrapolate, identity/clamp/extend가 될 수 있음           |
| extrapolateRight  | extend     | 오른쪽 extrapolate, identity/clamp/extend가 될 수 있음          |
| extrapolate       | extend     | 좌우 extrapolate를 설정할 수 있는 단축값                            |
| range             | [0,1]      | input 범위 배열                                             |
| output            | undefined  | map으로 출력 된 output 범위 배열                                 |
| map               | undefined  | input 값에 적용된 값 필터                                       |

range를 짧게 쓰고 싶다면: `value.interpolate([...inputRange], [...outputRange])`
혹은 함수로도 쓸 수 있다: `value.interpolate(v => ...)`

<br>

이제 spring에 어떤 property가 있는지 알아보았으니, 다음엔 Hooks api에 대해 써보겠다.

<br>

<p style="font-size: 13px; font-style: italic">오역이 있을 수 있습니다. 피드백은 언제나 환영합니다!</p>
