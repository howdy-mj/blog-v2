---
title: 'react-spring: Render-props api'
date: '2020-6-1'
tags: ['react-spring']
draft: false
---

## Render-props api

react-spring 6.0(2018.10)까지는 Render-props api만 있었다.
Render-props api도 크게 5가지로 나뉜다.

- **Spring**: spring 혹은 springs의 데이터가 from: a => to: b로 움직이는 것
- **Trail**: list의 다른 아이템들이 첫번째 아이템을 따라 움직이는 것
- **Transition**: list의 아이템들이 추가/제거/업데이트 될 때 animation 발생
- **Keyframes**: animation들을 연결, 구성, 조율할 수 있는 것
- **Parallax**: 스크롤을 만드는 것

<br>

_해당 글은 react-spring 8.0 기준으로 작성되었다._

react-spring의 property는 [이전글](https://howdy-mj.me/react-spring/02-common-api/)을 참고하길 바란다.

### 1. Spring

Spring은 Hooks-api의 useSpring(s)와 비슷하다.

<iframe
src="https://codesandbox.io/embed/interesting-night-56x84?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="interesting-night-56x84"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-autoplay allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

출처: [react-spring-examples](https://github.com/react-spring/react-spring-examples/tree/renderprops/demos/renderprops/auto)

```jsx
import { Spring, animated } from 'react-spring/renderprops'

const LOREM = `Hello world`

export default class App extends React.Component {
  state = { toggle: true, text: [LOREM] }
  onToggle = () => this.setState(state => ({ toggle: !state.toggle }))
  onAddText = () =>
    this.setState(state => ({ toggle: true, text: [...state.text, LOREM] }))
  onRemoveText = () =>
    this.setState(state => ({ toggle: true, text: state.text.slice(1) }))
  render() {
    const { toggle, text } = this.state
    return (
      <div className="auto-main">
        <button onClick={this.onToggle}>Toggle</button>
        <button onClick={this.onAddText}>Add text</button>
        <button onClick={this.onRemoveText}>Remove text</button>
        <div className="content">
          <Spring
            native
            force
            config={{ tension: 2000, friction: 100, precision: 1 }}
            from={{ height: toggle ? 0 : 'auto' }}
            to={{ height: toggle ? 'auto' : 0 }}
          >
            {props => (
              <animated.div className="item" style={props}>
                {text.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
              </animated.div>
            )}
          </Spring>
        </div>
      </div>
    )
  }
}
```

useSpring과 크게 다를게 없기 때문에 바로 Trail로 넘어가겠다.

<br>

### 2. Trail

Trail 역시 useTrail과 비슷한데, native, from, immediate, onReset 등과 같은 spring properties도 사용 가능하며, Trail에서만 쓰이는 Props가 존재한다.

| Property  | Type              | Required  | Default       | Description                                                                                                     |
|:----------|:------------------|:----------|:--------------|:----------------------------------------------------------------------------------------------------------------|
| keys      | fn/undefined/any  | false     | item => item  | item의 keys(React에 넘겨주는 key와 동일) items를 지정한다면, keys는 접근자 함수가 될 수 있음(item => item.key)                            |
| from      | obj               | false     | -             | 기준 값                                                                                                            |
| to        | obj               | false     | -             | 바뀔 값                                                                                                            |
| items     | any/undefined     | true      | -             | 표시 될 items의 배열, 실제 items에 접근해서 특정 값을 넘겨야 할 때 사용                                                                 |
| children  | fn                | true      | -             | 하나의 item을 받는 단일 함수-자식(하위)으로 함수 컴포넌트를 리턴함 ex. (item, index) => props => view                                     |
| reverse   | bool              | false     | -             | true일 때, triling 순서가 bottom => top으로 바뀜                                                                         |

<br>

codesandbox에 구현되지 않아 코드로만 대체한다.

```jsx{28, 31}
import { Trail, animated } from 'react-spring/renderprops'

export default class TrailsExample extends React.PureComponent {
  state = {
    toggle: true,
    items: ['item1', 'item2', 'item3', 'item4', 'item5'],
  }
  toggle = () =>
    this.setState(state => ({
      toggle: !state.toggle,
    }))
  render() {
    const { toggle, items } = this.state
    return (
      <div
        style={{
          backgroundColor: '#247BA0',
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <Trail
          native
          reverse={toggle}
          initial={null}
          items={items}
          from={{ opacity: 0, x: -100 }}
          to={{ opacity: toggle ? 1 : 0.25, x: toggle ? 0 : 100 }}
        >
          {item => ({ x, opacity }) => (
            <animated.div
              className="box"
              onClick={this.toggle}
              style={{
                opacity,
                transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
              }}
            />
          )}
        </Trail>
      </div>
    )
  }
}
```

```css
/** css */
.box {
  cursor: pointer;
  position: relative;
  width: 50%;
  height: 20%;
  background-color: #f3ffbd;
  will-change: transform;
}
```

예시 보러가기 : [TRAILS](https://www.react-spring.io/docs/props/trail)

여기서 `items`는 움직일 때 보여지는 박스 5칸을 뜻 하며, `onClick()`이 발동되었을 때 toggle 값이 바뀔 때 animation이 일어난다.

`<Trail>`에서 선언한 `opacity`와 `x`값을 그대로 `<animated.div>`의 props로 넘겨주기 위해 `{item => ({x, opacity}) => ()}`로 넘겨준다.

<br>

### 3. Transition

Transition도 useTransition과 같이 lifecycles에 따라 animation이 실행된다.

Transition은 모든 종류의 타입으로 이루어진 items으로 이루어져 있다. 마지막 기본값으로는 item => item인데, items이 key로 자급자족할 수 있는 경우가 많다.(??) items가 추가, 제거, 재정렬, 업데이트 될 때마다 애니메이션화 하는데 도움이 될 것이다.

item과 추가적으로 transition state(enter/leave/update)와 index를 받는 단일 함수-자식(하위)을 제공해야 한다. 전체적인 그림은 이것과 같다: `(item, state, index) => props => ReactNode`.

이미 삭제된 item을 render할 수 있으니 스코프 밖에서 값을 받는 것보다, 항상 함수로 받는 item들에 의존해야 한다. 하지만 이 item은 fade-out이 완료될 때 까지 Transition 내부에 보관 된다. 이는 routes에 굉장히 중요하다(?).

요약하자면, 필요한 경우 keys를 items에 표시하고, props로 넘겨주어 animation에 적용하면 된다.

### Transition Properties

native, from, immediate, onRest 등의 spring의 properties도 사용가능하다.

| Property     | Type    | Required  | Default       | Description                                                                                                                                                                                |
|:-------------|:--------|:----------|:--------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| keys         | union   | false     | item => item  | 일반적으로 list에서 React로 넘겨주는 key와 동일한 key. keys는 key-accessor로 함수, 배열 혹은 단일 값으로 지정될 수 있음                                                                                                       |
| unique       | bool    | false     | false         | true 일 때, 동일 한 key를 가진 두 개 이상의 items들이 stack에 공존하도록 허용하는 대신, 한 번만 발생할 수 있다고 강행                                                                                                             |
| reset        | bool    | false     | false         | 'unique'와 주로 같이 사용되며, true일 때, 현재 값에 적응하는 대신 이미 존재하는 들어오는 items이 다시 시작되도록 강행                                                                                                               |
| initial      | union   | false     | -             | 첫번째 render의 초기 값, 만약 값이 존재한다면 첫 render에서 "from"보다 우선 됨. 첫 mounting transition을 스킵하고 싶다면 "null"로 작성. object나 function을 가질 수 있음 (item => object)                                             |
| from         | union   | false     | -             | 기준 값 (from => enter), 혹은 item => values                                                                                                                                                    |
| enter        | union   | false     | -             | 들어오는(새로운) (entering) elements에 적용되는 값, 혹은 item => values                                                                                                                                   |
| leave        | union   | false     | -             | 없어지는(leaving) elements에 적용되는 값, 혹은 item => values                                                                                                                                          |
| update       | union   | false     | -             | 들어오지도 나가지도 않는 element에 적용되는 값(이 값을 사용하여 현재 elements를 업데이트 할 수 있음) , 혹은 item => values                                                                                                      |
| trail        | number  | false     | -             | 지연되는 시간(초 단위)                                                                                                                                                                              |
| config       | union   | false     | -             | Spring의 config 값, 혹은 각각의 keys에 해당: fn( (item, type) => key => config) 혹은 fn ( (item, type) => config) , "type"은 enter, leave, update가 될 수 있음                                               |
| onDestoryed  | fn      | false     | -             | transition이 끝날 때 콜백                                                                                                                                                                        |
| items        | union   | true      | -             | 표시할 items의 배열(또는 모든 타입의 단일 item) 이며, Transition에 의해 변경 사항을 탐지하는 주요 수단으로 사용                                                                                                                 |
| children     | fn      | true      | -             | 하나의 item을 받는 단일 함수-자식(하위)으로 함수 컴포넌트를 리턴함 ex. (item, index) => props => view                                                                                                                |

<br>

이것도 이상하게 codesandbox에서 구현되지 않아 코드만 올린다.

```jsx
import React from 'react'
import { Transition, animated } from 'react-spring/renderprops'
import './styles.css'

export default class App extends React.PureComponent {
  state = { show: true }
  toggle = e => this.setState(state => ({ show: !state.show }))
  render() {
    return (
      <div className="reveals-main" onClick={this.toggle}>
        <Transition
          native
          items={this.state.show}
          from={{ position: 'absolute', overflow: 'hidden', height: 0 }}
          enter={[{ height: 'auto' }]}
          leave={{ height: 0 }}
        >
          {show =>
            show && (props => <animated.div style={props}>hello</animated.div>)
          }
        </Transition>
      </div>
    )
  }
}
```

```css
/** css */
.reveals-main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.reveals-main > div {
  font-weight: 800;
  font-size: 4em;
  will-change: transform, opacity;
  overflow: hidden;
}
```

예시 보러가기 : [SIMPLE REVEALS](https://www.react-spring.io/docs/props/trail)

`onClick()`에 따라 toggle값이 바뀌면서 'Hello'란 글자가 사라졌다 보여진다.

```jsx
<Transition
  native
  items={this.state.show}
  from={{ position: 'absolute', overflow: 'hidden', height: 0 }}
  enter={[{ height: 'auto' }]}
  leave={{ height: 0 }}
>
  {show => show && (props => <animated.div style={props}>hello</animated.div>)}
</Transition>
```

기본값으로 `height: 0`으로 되어 있으며, 클릭하면 `leave`로 바뀌어서 글자가 위에서 밑으로 사라진다. 그 후, 다시 클릭하면 `enter`가 실행되어 글자가 밑에서 올라오는 듯한 animation을 보여준다.

<br>

### 4. Keyframes

Keyframes은 springs나 trails의 기능을 확장하는 공장과 같다. 먼저 구현하고 싶은 한 개 이상의 animation을 named-slot으로 정의한다. 알수 없는 모든 props는 interpolate를 이용해 "to"로 설정한다. 이 외에도, from, config, reset 등의 모든 spring props를 사용할 수 있다. 이는 특별한 "state" prop을 가진 컴포넌트를 생성하고, 만들어 둔 slot 중 하나로 그 값을 받는다. 그러면 그것이 실행되면서 animation을 일으킬 것이다.

slot은 아래와 같은 것을 가질 수 있다:

- properties를 가진 object
- animation이 연결된(chained) objects의 배열
- loop를 만들 수 있는 함수

요약하자면, named-slots으로 Keyframe-object를 정의해야 한다.

### Keyframes Properties

resulting 컴포넌트는 native, from, immediate, onRest 등의 spring properties도 사용가능하다.

| Property  | Type    | Required  | Default      | Description           |
|:----------|:--------|:----------|:-------------|:----------------------|
| state     | string  | false     | \_\_default  | 활성화된 slot의 이름         |

<br>

codesandbox에서 delay를 넣으면 실행이 안돼서 빼고 가져왔더니 animation이 온전하지 못하다.
원본을 보고 싶다면 [SCRIPTED KEYFRAMES](https://www.react-spring.io/docs/props/keyframes) 여기서 확인하는 것을 추천한다.

<iframe
src="https://codesandbox.io/embed/react-spring-keyframes-example-7pn6q?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="react-spring KeyFrames example"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-autoplay allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

```jsx{4, 53}
import { Keyframes, animated, config } from 'react-spring/renderprops'
// import delay from 'delay'

const Content = Keyframes.Spring(async next => {
  // None of this will cause React to render, the component renders only once :-)
  while (true) {
    await next({
      from: { opacity: 0, width: 50, height: 50, background: 'black' },
      opacity: 1,
      width: 80,
      height: 80,
      background: 'tomato',
    })
    await next({
      from: { left: '0%' },
      left: '70%',
      background: 'seagreen',
    })
    next({
      from: { top: '0%' },
      top: '40%',
      background: 'plum',
      config: config.wobbly,
    })
    // await delay(2000) // don't wait for the animation above to finish, go to the next one in 2s
    await next({ left: '0%', background: 'hotpink' })
    await next({
      top: '0%',
      background: 'teal',
    })
    await next({
      opacity: 0,
      width: 40,
      height: 40,
      background: 'black',
    })
  }
})

export default class App extends React.Component {
  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          background: 'aquamarine',
          padding: 10,
        }}
      >
        <Content native>
          {props => (
            <animated.div
              style={{ position: 'relative', borderRadius: '50%', ...props }}
            />
          )}
        </Content>
      </div>
    )
  }
}
```

Keyframes를 이용해 모든 Spring들을 묶어준다. 그리고 `await`를 이용해 animation이 일어날 순서를 정의한다.
위에서 정의한 모든 props를 `<Content>` 내부에서 가져와서 사용한다.

### 5. Parallax

Parallax는 시차(視差: 관측 위치에 따른 물체의 위치나 방향의 차이)란 뜻으로 주로 scroll container를 만들어 준다. 그리고 ParallaxLayers에 값을 넣어 offsets과 speeds등을 따라 움직일 수 있다.

### Parallax Properties

**1. Parallax**
<br>

| Property    | Type    | Required  | Default      | Description                                                  |
|:------------|:--------|:----------|:-------------|:-------------------------------------------------------------|
| config      | object  | false     | config.slow  | Spring config (선택)                                           |
| scrolling   | bool    | false     | true         | 스크롤 가능 여부                                                    |
| horizontal  | bool    | false     | false        | 스크롤의 가로, 세로 결정                                               |
| pages       | number  | true      | -            | 각 page에 100%를 차지하는 container의 내부 공간(space) 설정                |

**2. ParallaxLayer**
<br>

| Property  | Type    | Required  | Default  | Description                                            |
|:----------|:--------|:----------|:---------|:-------------------------------------------------------|
| factor    | number  | false     | 1        | page 사이즈 (1=100%, 1.5= 150%, ...)                      |
| offset    | number  | false     | 0        | layer가 언제 scroll될 지 결정 (0=start, 1=1page, ...)         |
| speed     | number  | false     | 0        | offset에 따라 layer 변경, 값은 +, - 값이 올수 있음                  |

<iframe
src="https://codesandbox.io/embed/nwq4j1j6lm?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="nwq4j1j6lm"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-autoplay allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

<br>

<p style="font-size: 13px; font-style: italic">오역이 있을 수 있습니다. 피드백은 언제나 환영합니다!</p>
