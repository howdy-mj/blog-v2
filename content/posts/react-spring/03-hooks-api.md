---
title: 'react-spring: Hooks api'
date: '2020-5-31'
tags: ['react-spring']
draft: false
---

## Hooks api

Hooks api는 크게 5가지로 나뉜다.

- **useSpring**: 하나의 spring의 데이터가 from: a => to: b로 움직이는 것
- **useSprings**: 여러개의 springs, 각 데이터가 자신만의 상태로 움직이는 것 (dependency 존재)
- **useTrail**: 여러개의 springs가 하나의 데이터셋처럼 이전의 spring을 따라 움직이는 것 (dependency가 없음)
- **useTransition**: list의 아이템들이 추가/제거/업데이트 될 때 animation 발생
- **useChain**: 다수의 animation을 묶어서 연쇄적으로 발생

<br>

_해당 글은 react-spring 8.0 기준으로 작성되었다._

### 1. useSpring

<iframe
src="https://codesandbox.io/embed/q3ypxr5yp4?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="basic useTransition masonry grid"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-autoplay allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

<br>

```jsx{6}
import { useSpring, animated } from 'react-spring'
...

function App() {
  const [open, toggle] = useState(false)
  const [bind, { width }] = useMeasure()
  const props = useSpring({ width: open ? width : 0 })

  return (
    <div {...bind} class="main" onClick={() => toggle(!open)}>
      <animated.div class="fill" style={props} />
      <animated.div class="content">
        {props.width.interpolate(x => x.toFixed(0))}
      </animated.div>
    </div>
  )
}
```

`onClick()`을 했을 때, open이 `true`로 바뀌면서 div의 색상과 숫자를 채워주고 있다.

react-spring [introduction](https://howdy-mj.me/react-spring/01-introduction/) 글에서 썼듯이, Hooks api는 view를 모르기 때문에 `useMeasure()`라는 custom Hook으로 `{ width }`를 정의해서 return 안에 있는 `animated.div`에 알려주었다.

return문 안에 있는 두 개의 `animated.div`에 모두 props로 useSpring 값을 넘겨주었고, 만약 open이 `true`가 된다면, div의 width만큼 색상과 숫자(px)이 채워진다.

<br>

### 2. useSprings

_추후 업데이트_

<br>

### 2. useTrail

<iframe
src="https://codesandbox.io/embed/8zx4ppk01l?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="8zx4ppk01l"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-autoplay allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

<br>

useTrail이 어떤 것인지 가장 잘 보여주는 예시인 것 같다.
마우스가 움직이는 대로 중간의 큰 동그라미가 따라온다.

```jsx
import { useTrail, animated } from 'react-spring'

const fast = { tension: 1200, friction: 40 }
const slow = { mass: 10, tension: 200, friction: 50 }
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`

export default function Goo() {
  const [trail, set] = useTrail(3, () => ({
    xy: [0, 0],
    config: i => (i === 0 ? fast : slow),
  }))
  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"
          />
        </filter>
      </svg>
      <div
        className="hooks-main"
        onMouseMove={e => set({ xy: [e.clientX, e.clientY] })}
      >
        {trail.map((props, index) => (
          <animated.div
            key={index}
            style={{ transform: props.xy.interpolate(trans) }}
          />
        ))}
      </div>
    </>
  )
}
```

`fast`와 `slow`는 config의 mass, tension, friction으로 설정했다.
아직 spring들의 property를 모르겠다면, [전글](https://howdy-mj.me/react-spring/02-common-api/)을 참고하길 바란다.

`trans`에는 마우스의 x, y값 대로 움직일 것을 미리 정의했다.

```jsx{1}
const [trail, set] = useTrail(3, () => ({
  xy: [0, 0],
  config: i => (i === 0 ? fast : slow),
}))
```

spring을 선언할 때, 어떤 값에 바로 선언해도 되지만, 위에 처럼 함수로 return 값을 넣고 `set`을 이용해 업데이트 해줄 수도 있다.
`set`은 render를 하지 않고 그 위에 animation을 덮어 씌워 빠르게 업데이트 해줄 수 있다. 그리고 세번째 인자로 `stop`을 쓸 수 있어 함수를 멈출 수 있다.

여기서 `set`은 return 안의 `onMouseMove()`에서 마우스의 x, y값을 가져오고 이를 `trans`에 업데이트 해 줄 때 사용된다.

`useTrail`은 배열로 출력되어, return문에서 `trail`을 map을 돌려 사용한다.
이때 `useTrail( number, () => {})`에서 number는 따라 움직일 item의 개수이다.
해당 예시에서는 마우스를 빠르게 움직이면 세 개의 동그라미를 볼 수 있다. 해당 숫자를 2로 바꾼다면 마지막에 따라오는 동그라미가 없어진 걸 확인할 수 있다.

초기의 xy값은 모두 0이고, `i===0`일 때 마우스 가장 가까이 있는 동그라미가 가장 빠른 것이 온다. `i===1`일 경우, 동그라미는 2개로 바뀌면서 제일 빨랐던 동그라미가 없어지고, 가장 큰 동그라미가 선두에 선다. 그리고 `i=== 2`일 경우, 여전히 두 개의 동그라미로 이루어져있으며, `i===1`일때와 반대로 작은 동그라미가 선두에 있다. (아직 제대로 파악하지 못했다.. 알게되면 수정하겠다)

```jsx
<div
  className="hooks-main"
  onMouseMove={e => set({ xy: [e.clientX, e.clientY] })}
>
  {trail.map((props, index) => (
    <animated.div
      key={index}
      style={{ transform: props.xy.interpolate(trans) }}
    />
  ))}
</div>
```

위에서 선언한 `trans`를 props로 받으며, 마우스의 실시간 위치가 `set`으로 업데이트 되어 해당 위치로 `transform`하게 해준다.

<br>

### 2. useTransition

useTransition은 list의 아이템들이 lifecycles이 일어날 때 animation 발생한다.

useTransition의 인자로는 items, keys(atomic이라면 `null`이 될 수 있다), property에는 lifecycles가 있다.

따라서 useTransition만 따로 쓰는 properties가 존재한다.

#### useTransition Properties

| Property     | Type               | Description                                                                     |
|:-------------|:-------------------|:--------------------------------------------------------------------------------|
| initial      | obj/fn             | 최초값 (optional, null도 될 수 있음)                                                    |
| from         | obj/fn             | 기준 값 (optional)                                                                 |
| enter        | obj/fn/array(obj)  | animation이 시작할 때 적용되는 것                                                         |
| update       | obj/fn/array(obj)  | animation이 업데이트 될 때 적용되는 것 (자체 hook으로 새로운 값 업데이트 가능)                            |
| leave        | obj/fn/array(obj)  | animation이 끝날 때 적용되는 것                                                          |
| trail        | number             | animation 시작 시간 지연(초 단위), enter/update/leave에 추가 가능                             |
| unique       | bool/fn            | true라면, 들어가고 나오는 아이템들은 같은 key를 재 사용함                                            |
| reset        | ool/fn             | 'unique'와 같이 사용되며, enter 아이템들을 처음부터 시작하게 함                                      |
| onDestroyed  | fn                 | object들이 완전히 사라졌을 때 호출 됨                                                        |

이 외, common api도 같이 사용할 수 있다.

<iframe
src="https://codesandbox.io/embed/morr206pv8?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="morr206pv8"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-autoplay allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

```jsx
import { useTransition, animated, config } from 'react-spring'

const slides = [
  {
    id: 0,
    url:
      'photo-1544511916-0148ccdeb877?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1901&q=80i',
  },
  {
    id: 1,
    url:
      'photo-1544572571-ab94fd872ce4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1534&q=80',
  },
  {
    id: 2,
    url: 'reserve/bnW1TuTV2YGcoh1HyWNQ_IMG_0207.JPG?ixlib=rb-1.2.1&w=1534&q=80',
  },
  { id: 3, url: 'photo-1540206395-68808572332f?ixlib=rb-1.2.1&w=1181&q=80' },
]

const App = () => {
  const [index, set] = useState(0)
  const transitions = useTransition(slides[index], item => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
  })
  useEffect(
    () => void setInterval(() => set(state => (state + 1) % 4), 2000),
    []
  )
  return transitions.map(({ item, props, key }) => (
    <animated.div
      key={key}
      class="bg"
      style={{
        ...props,
        backgroundImage: `url(https://images.unsplash.com/${item.url}&auto=format&fit=crop)`,
      }}
    />
  ))
}
```

`useTransition`도 `useTrail`처럼 값을 배열로 리턴하여, return문 에서 `transitions`를 map으로 돌릴 수 있다.

`setInterval()`로 2초마다 index 값을 올려서 사진을 무한 반복하고 있다.

<br>

### 2. useChain

useChain은 다른 spring들과 다르게 from => to가 아니라, spring 들의 순서를 정해주는 animation-hooks이다.
useChian을 사용하기 위해서는 `useRef()`로 ref를 선언해 주고, 밑에 `useChain([firstRef, secondRef])`를 적어주면 이 순서대로 animation을 실행시켜준다.

```jsx
// spring과 springRef 묶어주기
const springRef = useRef()
const spring = useSpring({ ...values, ref: springRef })

// transitions와 transitionRef 묶어주기
const transitionRef = useRef()
const transitions = useTransition({ ...values, ref: transitionRef })

// spring이 끝나고 transition 실행
useChain([springRef, transitionRef])

// Use the animated props like always
return (
  <animated.div style={spring}>
    {transitions.map(({ item, key, props }) => (
      <animated.div key={key} style={props} />
    ))}
  </animated.div>
)
```

useChain의 두 번째 인자로 timeSteps를 정의할 수 있다. timeSteps는 0-1 사이의 숫자로 이루어진 배열로, 처음 시작 시간과 끝나는 시간을 정의할 수 있다.

```jsx
useChain([springRef, transitionRef], [0, 0.5] /*1000*/)
// springRef는 0.0 * 1000ms = 0ms로 바로 시작
// transitionRef는 0.5 * 1000ms = 500ms 뒤에 시작
```

<iframe
src="https://codesandbox.io/embed/2v716k56pr?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="2v716k56pr"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-autoplay allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

<br>

이로써 react-spring의 Hooks api를 간단하게 훑어봤다.
아직 공부한지 얼마 안되어 부족한 부분이 많다. 수정하거나 추가할 것이 생기면 업데이트 할 예정이다.

<br>

<p style="font-size: 13px; font-style: italic">오역이 있을 수 있습니다. 피드백은 언제나 환영합니다!</p>
