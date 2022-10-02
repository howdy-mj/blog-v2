---
title: 'MobX 6 사용하기'
date: '2020-12-09'
tags: ['mobx']
draft: false
---

해당 글에서는 MobX로 간단하게 count를 변경하는 코드를 만들어 볼 것이며, 여러가지 방식을 보여주는 것이 목적이다. (완성된 코드는 [mobx-playground](https://github.com/howdy-mj/mobx-playground)에서 볼 수 있다)

MobX는 자유도가 무척 높기 때문에, 필자가 작성한 방식이 정답이 아니며 '이렇게도 사용할 수 있구나' 정도로 보면 될 것 같다.

<br />

### MobX란?

리액트 상태 관리 라이브러리하면 가장 먼저 떠오르는 것이 Redux, 그 다음 얼핏 들어본 이름중에 MobX가 있을 것이라 생각한다.

MobX는 React 뿐만 아니라, Angular, Vue, Flutter, Dart에서도 사용이 가능하다.

MobX의 러닝커브는 낮은편으로 초기에 작성해야하는 보일러플레이트 코드가 거의 없으며, state의 불변성도 걱정하지 않아도 된다. Redux를 사용해본 사람이라면 MobX가 꽤나 간단하다고 느껴질 것이다. 하지만 자유도가 매우 높아서 그 만큼 잘 활용하기가 어려운 것 같다.

## MobX 핵심 개념

MobX를 사용하기 전에 핵심 개념부터 알아보자.

MobX는 `observable`을 사용하면 properties, entire objects, arrays, Maps, Sets 등을 모두 자동으로 observable(관찰 가능한)하게 만들 수 있다. 여기에 가장 중요한 어노테이션(annotation)으로는 아래 세 가지가 있다.

- `observable`: 추적 가능한 state 정의
- `action`: state를 변경하는 메소드
- `computed`: state와 캐시로부터 새로운 결과를 반환

### observable

observable은 `makeObservable`, `makeAutoObservable` 그리고 `observable` 이 세 가지가 있으며, 모두 추적 가능한 상태의 state로 만들어준다.

`makeObservable`은 주로 class의 this와 많이 사용된다.

`makeAutoObservable`은 `makeObservable`와 거의 비슷하지만, class에서 super나 subclassed가 있을 경우 사용할 수 없다.

`make(Auto)Observable`와 `observable`의 가장 큰 차이점은 전자는 들어온 인자로 들어온 object를 바로 변경하지만, 후자는 클론을 하고 observable하게 만든다는 점이다. 또한 `observable`는 Proxy object를 생성한다. (추후 보완..ㅠㅠ) 따라서 공식 문서에서도 `make(Auto)Observable` 사용을 권장하고 있다.

### action

action은 state를 변경하는 것을 뜻한다. `makeObservable`을 사용하면 action을 따로 작성해줘야 하지만, `makeAutoObservable`은 이를 대신해준다. 밑에 코드에서 두 가지 방식 모두 사용해 볼 것이다.

### computed

computed values(계산된 값)는 다른 observable들에서 어떠한 정보를 도출하는데 사용할 수 있다. 이렇게만 봐서는 뭔지 모를 수 있는데 밑의 예시를 통해 같이 살펴보자.

<br />

## MobX 사용하기

### 프로젝트 세팅

```shell
$ yarn create react-app mobx-playground --template typescript
$ cd mobx-playground
```

```json
// package.json
{
  "dependencies": {
    "mobx": "^6.0.4",
    "mobx-react": "^7.0.5",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-scripts": "4.0.1",
    "typescript": "^4.0.3"
  }
}
```

`src` 폴더 안에 있는 index, App을 제외하고 모두 지운다.

<span class="file-location">src/index.tsx</span>

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
```

<span class="file-location">src/App.tsx</span>

```tsx
import React from 'react'

const App: React.FC = () => {
  return <div>App</div>
}

export default App
```

```shell
$ yarn add mobx mobx-react
```

React에서 MobX를 쉽게 사용하게 해주는 써드파티 라이브러리로, `mobx-react`와 `mobx-react-lite`가 있는데, `mobx-react`는 클래스형 컴포넌트와 hooks를 모두 지원하고, `mobx-react-lite`는 훅스만 지원한다. MobX를 사용하려는 프로젝트에서 이미 hooks를 사용중이라면, 조금 더 가벼운 `mobx-react-lite` 사용을 권장한다.

또한, MobX 6에서 decorators(ex. @action, @observable 등)들이 deprecated 되었다.

<br />

### Store 구축

Stores는 Flux 아키텍쳐에서 볼 수 있으며, MVC의 Controller와 비교할 수 있다. 스토어의 주요 역할은 비즈니스 로직과 state를 컴포넌트에서 빼서 단독으로 프론트, 백에서 모두 사용할 수 있도록 만드는 것이다.

MobX에서 규정하는 Store에는 Domain Stores(그 안에 Domain objects)와 UI Stores가 있다. 여기서는 Domain Store만 논하겠다.

Domain Store는 하나 혹은 여러개가 있을 수 있으며, 하나의 Domain Store는 해당 애플리케이션에서 하나의 역할을 책임지고 수행해야 한다. 그리고 하나의 스토어 안에는 여러개의 domain objects가 있을 수 있다. 그리고 domain objects안에서 간단하게 state를 모델링할 수 있다.

해당 글에서 만드는 것은 MobX의 state 모델링 하는 것에 속하지만, 이해하기 편하도록 Store라고 하겠다. _(추후 보완)_

<br />

해당 글에서는 class, object 두 가지 형태로 구축해보겠다.

우선 `src/store` 폴더를 만들고, 그 안에 `count.ts`를 만든다.

<span class="file-location">src/store/count.ts</span>

1. class - `makeObservable`

```ts
import { action, makeObservable, observable } from 'mobx'

class Count {
  number: number = 0

  constructor() {
    makeObservable(this, {
      number: observable,
      increase: action,
      decrease: action,
    })
  }

  increase = () => {
    this.number++
  }
  decrease = () => {
    this.number--
  }
}

const countStore = new Count()
export default countStore
```

2. class - `makeAutoObservable`

```ts
import { makeAutoObservable } from 'mobx'

class Count {
  number: number = 0

  constructor() {
    makeAutoObservable(this)
  }

  increase = () => {
    this.number++
  }
  decrease = () => {
    this.number--
  }
}

const countStore = new Count()
export default countStore
```

개인 적으로 깔끔한 두 번째 방식을 선호한다. 하지만 super나 subclassed에서는 사용이 불가하기 때문에 첫 번째 방식도 알아두어야 하긴 한다.

3. object

```ts
import { observable } from 'mobx'

const countObject = observable({
  // 헷갈릴 수 있으니 num으로 작명
  num: 0,
  increase() {
    this.num++
  },
  decrease() {
    this.num--
  },
})

export default countObject
```

object로 만들면 코드가 더 줄어든다. observable로 감싸주기만 하면 된다.

이렇게 만든 Store<i>(정확히는 state model)</i>는 사용할 컴포넌트에서 따로 import 해도 되지만, 필자는 개인적으로 하나의 store에 넣는 것이 선호하기 때문에 `src/store/index.ts`를 만든다.

```tsx
import countClass from './countClass'
import countObject from './countObject'

const store = { countClass, countObject }
export default store
```

잘 동작하는지 확인하기 위해 `src/App.tsx`를 아래처럼 작성한다.

```tsx
import React from 'react'
import { observer } from 'mobx-react'
import store from './store'

// 컴포넌트를 observer로 감싸주어 state가 실시간으로 변경되는 것을 감지한다
const App: React.FC = observer(() => {
  const { countClass, countObject } = store

  return (
    <div style={{ padding: '50px' }}>
      <div style={{ marginBottom: '50px' }}>
        <h1>Count (Class)</h1>
        <div>number: {countClass.number}</div>
        <button onClick={() => countClass.increase()}>plus</button>
        <button onClick={() => countClass.decrease()}>minus</button>
      </div>

      <div style={{ marginBottom: '50px' }}>
        <h1>Count (Object)</h1>
        <div>num: {countObject.num}</div>
        <button onClick={() => countObject.increase()}>increment</button>
      </div>
    </div>
  )
})

export default App
// export default observer(App) // 이렇게 감싸줄수도 있다
```

<br />

이제 computed가 무엇인지 알아보기 위해 액션(클릭)이 일어날 때마다, 계산된 값이 배가 되는 `double`을 만들어 보자. 마찬가지로 class, object 두 가지 형식으로 만들어 보겠다.

<span class="file-location">src/store/double.ts</span>

1. class - `makeObservable`

```ts
import { makeObservable, observable, computed, action } from 'mobx'

class Doubler {
  value

  constructor(value: number) {
    makeObservable(this, {
      value: observable,
      double: computed,
      increment: action,
    })
    this.value = value
  }

  get double() {
    return this.value * 2
  }

  increment() {
    this.value++
  }
}

const doubleClass = new Doubler(1)
export default doubleClass
```

2. class - `makeAutoObservable`

```ts
import { makeAutoObservable } from 'mobx'

class Doubler {
  value

  constructor(value: number) {
    makeAutoObservable(this)
    // makeAutoObservable이 다른 action, computed를 자동으로 선언
    this.value = value
  }

  get double() {
    return this.value * 2
  }

  increment() {
    this.value++
  }
}

const doubleClassAuto = new Doubler(1)
export default doubleClassAuto
```

3. object

```ts
import { observable } from 'mobx'

const doubleObject = observable({
  value: 1,
  get double() {
    return this.value * 2
  },
  increment() {
    this.value++
  },
})

export default doubleObject
```

만든 Store를 `src/store/index`에 넣어주자. 이번에는 `doubleClassAuto`를 사용해보겠다.

```ts
import countClass from './countClass'
import countObject from './countObject'
import doubleClassAuto from './doubleClassAuto'

const store = { countClass, countObject, doubleClassAuto }
export default store
```

<span class="file-location">src/App.tsx</span>

```tsx
import React from 'react'
import { autorun } from 'mobx'
import { observer } from 'mobx-react'

import store from './store'

const App: React.FC = observer(() => {
  const { countClass, countObject, doubleClassAuto } = store
  autorun(() => {
    if (doubleClassAuto.double) {
      console.log('Double' + doubleClassAuto.double)
    }
    if (doubleClassAuto.double === 8) {
      console.log('만약 value가 8이라면 0으로 초기화')
      doubleClassAuto.value = 0
    }
  })

  return (
    <div style={{ padding: '50px' }}>
      <div style={{ marginBottom: '50px' }}>
        <h1>Count (Class)</h1>
        <div>number: {countClass.number}</div>
        <button onClick={() => countClass.increase()}>plus</button>
        <button onClick={() => countClass.decrease()}>minus</button>
      </div>

      <div style={{ marginBottom: '50px' }}>
        <h1>Count (Object)</h1>
        <div>num: {countObject.num}</div>
        <button onClick={() => countObject.increase()}>increment</button>
      </div>

      <div>
        <h1>Computed</h1>
        <div>double number: {doubleClassAuto.value}</div>
        <button onClick={() => doubleClassAuto.increment()}>
          double increment
        </button>
      </div>
    </div>
  )
})

export default App
```

이때 `autorun`을 통해 해당 computed 값이 어떻게 바뀌는지 감지할 수 있다. 이번 예제에서는 increment를 누를 때마다 `double()`이라는 getter가 value에 곱하기 2를 한다. 그리고 계산된 값(computed value)가 8에 도달하면 value를 0으로 초기화시킨다.

이런 기능을 통해 다른 action을 막거나 유저에게 알림을 줄수 있을 것 같다. 예를 들면, 어떤 물건을 장바구니에 담았을 때 자동으로 물건의 가격을 계산하면서 예산을 초과했을 경우 팝업창을 띄우거나, 싫어요를 특정 개수 이상 누를 경우 패널티를 부과 한다던지의 트리거 역할을 할 수 있을 것 같다.

<br />

전체 코드: [mobx-playground](https://github.com/howdy-mj/mobx-playground)

<br />

MobX를 올바르고 더 잘 사용하기 위해서는 Flux 패턴 그리고 정확히 Domain Store, Domain Object, Model State가 무엇이고 어떻게 다른지 알아야 할 것 같다.

<br />

<p style="font-size: 13px; font-style: italic; text-align: center">해당 글은 <a href="https://mobx.js.org/README.html" target="_blank">MobX 공식홈페이지</a>를 보고 작성하여 오역이 있을 수 있습니다. 피드백은 언제나 환영합니다!</p>
