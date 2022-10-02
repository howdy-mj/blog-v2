---
title: Headless 컴포넌트
date: '2022-6-20'
tags: [design]
draft: false
---

## Headless란?

Headless를 그대로 번역하면 '머리가 없는'이라는 뜻이다.

구글에 Headless를 검색 시, 가장 많이 나오는 단어는 Headless browser로 '창이 없는' 브라우저를 뜻한다. 주로 크롤링할 때 실제로 브라우저 창을 띄우지 않고 화면을 가상으로 렌더링하여 실제 브라우저와 동일하게 동작하는 방식을 뜻한다.

그렇다면 프론트엔드에서 Headless가 어떤 의미를 뜻할까? 먼저 프론트엔드 개발을 하면서 느껴봤을 법한 일을 떠올려보자.

### UI 라이브러리의 한계

외부 UI 라이브러리를 사용할 경우, 유스케이스에 맞게 기능을 새로 추가하거나 변경하고 싶어도 그에 맞게 디자인이나 기능을 수정하기가 매우 어렵다. 더 나아가 해당 라이브러리에 심각한 버그가 있거나, 유지보수를 종료한다고 하면 언젠가는 바꿔야 한다. 그러다 결국 '그냥 컴포넌트를 만들까?'라는 생각을 문뜩 들게 한다.

그래서 나온 개념이 Headless UI Component로 <span class="underline">기능은 있지만 스타일이 없는 컴포넌트</span>를 의미한다.

## Component 기반 UI 라이브러리 vs Headless UI 라이브러리

물론 언제나 Headless 라이브러리가 컴포넌트 기반의 라이브러리보다 좋다는 건 아니다. 모두 장단점이 존재하며, 상황에 맞게 사용하면 된다.

### Component 기반 UI 라이브러리

Component 기반 UI 라이브러리는 기능과 스타일이 존재하는 라이브러리를 말하며, 대표적으로 <a href="https://mui.com/" target="_blank">Material UI</a>, <a href="https://ant.design/" target="_blank">Ant Design</a>가 있다.

<div style="margin-bottom: 30px"></div>

<table>
  <colgroup>
    <col width="10%">
    <col>
  </colgroup>
  <tbody>
    <tr style="border-top: 1px solid hsla(0,0%,0%,0.12)">
      <td>장점</td>
      <td>
        <ul>
          <li>바로 사용할 수 있는 마크업과 스타일이 존재</li>
          <li>설정이 거의 필요 없음</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>단점</td>
      <td>
        <ul>
          <li>마크업을 자유롭게 할 수 없음</li>
          <li>스타일은 대부분 라이브러리에 있는 테마 기반으로만 변경할 수 있어 한정적임</li>
          <li>큰 번들 사이즈</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<br>

### Headless UI 라이브러리

Headless는 기능은 있지만 스타일이 없는 라이브러리로, <a href="https://headlessui.dev/" target="_blank">Headless UI</a>, <a href="https://www.radix-ui.com/" target="_blank">Radix UI</a>, <a href="https://github.com/reach/reach-ui" target="_blank">Reach UI</a> 등이 있다.

<div style="margin-bottom: 30px"></div>

<table>
  <colgroup>
    <col width="10%">
    <col>
  </colgroup>
  <tbody>
    <tr style="border-top: 1px solid hsla(0,0%,0%,0.12)">
      <td>장점</td>
      <td>
        <ul>
          <li>마크업과 스타일을 완벽하게 제어 가능</li>
          <li>모든 스타일링 패턴 지원(ex. CSS, CSS-in-JS, UI 라이브러리 등)</li>
          <li>작은 번들 사이즈</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>단점</td>
      <td>
        <ul>
          <li>추가 설정이 필요함</li>
          <li>마크업, 스타일 혹은 테마 모두 지원되지 않음</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<br>

디자인이 그렇게 중요하지 않고, 커스텀할 곳이 많지 않다면 Component 기반 라이브러리를 사용하면 된다. 하지만 만약 반응형에 따라 디자인이 달라지고, 기능 변경이나 추가가 많이 발생한다면 Headless 라이브러리가 유지보수에 더 좋을 것 같다.

혹은 회사에 디자이너가 없거나 기한이 촉박한 프로젝트라면, 아예 특정 UI 라이브러리만을 사용해서 만드는 경우도 있다.

## Headless Component를 만드는 원칙

하지만 아직 Headless 라이브러리에는 컴포넌트의 종류가 상대적으로 적다. 그래서 바로 사용해야 하는 컴포넌트가 없다면 만들어야 한다.

사실 Headless Component를 만드는 원칙이라기 보다는, 유지보수 하기 좋은 컴포넌트를 만드는 원칙이라고 볼 수 있다.

만드려는 컴포넌트에 어떤 메서드가 있는지를 먼저 결정하기보다, 그 컴포넌트가 **무엇을 수행할 수 있는지**부터 결정해야 한다. 그리고 사용자가 사용할 수 있는 기능들과 방법을 제공해야 한다. 이후에 그 기능을 어떻게 수행할 지 구현하면 된다.

여기서 중요한 점은 기능은 어떻게 구현할지는 컴포넌트 내부에 정의하는 것으로, 외부의 다른 컴포넌트들이나 사용자가 전혀 알지 않아도 된다. 밑의 예시로 한 번 알아보자.

<div style="margin-bottom: 30px"></div>

### Checkbox 컴포넌트를 Headless로 리팩토링하기

<div class="img-div center">
  <img src="https://user-images.githubusercontent.com/58619071/193438748-65c687a9-d481-445d-ba78-1e127c88857c.gif" alt="체크박스 컴포넌트" style="border: 1px solid gray;">
</div>

위와 같은 Checkbox 컴포넌트를 만든다면 아래와 같을 것이다.

<span class="file-location">Checkbox.tsx</span>

```tsx
import { useState } from 'react'

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <label>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <span>체크박스 만들기</span>
    </label>
  )
}

export default Checkbox
```

이를 다른 곳에서 바로 사용할 수 있게 하려면 어떤 내용을 체크하는 지에 대한 라벨, 체크가 되었는지의 상태 값, 체크하는 로직을 props를 받아야 한다. 수정한다면 아래와 같은 형태가 될 것이다.

<span class="file-location">Checkbox.tsx</span>

```tsx
type CheckboxProps = {
  label: string
  isChecked: boolean
  onChange: () => void
}

const Checkbox = ({ label, isChecked, onChange }: CheckboxProps) => {
  return (
    <label>
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      <span>{label}</span>
    </label>
  )
}

export default Checkbox
```

<span class="file-location">App.tsx</span>

```tsx
export default function App() {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <Checkbox
      label="체크박스 만들기"
      isChecked={isChecked}
      onChange={() => setIsChecked(!isChecked)}
    />
  )
}
```

만약 Checkbox를 사용하는 모든 곳에서 디자인과 기능이 동일하다면 이대로 사용해도 문제없다.

하지만 만약 특정 페이지들에서만 색상을 다르게 한다던지, 모바일에서는 체크박스를 오른쪽으로 옮겨야 한다던지 등의 레이아웃의 변경이 필요하다면 어떻게 해야할까? 디자인이 살짝 다르다는 이유로 컴포넌트를 새로 만들거나 내부에서 분기 처리하여 수정하기 시작한다면, 유지보수가 점점 더 힘들어질 것이다.

<br>

이럴 때 Headless 컴포넌트로 만들면 좋다. 다시 한 번 Headless 컴포넌트(aka. 유지보수 하기 좋은 컴포넌트)를 만드는 원칙들을 생각해보자.

#### Checkbox 컴포넌트는 무엇을 하는 컴포넌트일까?

- 상태에 대한 라벨(설명)이 있다.
- 마우스로 체크박스나 라벨을 클릭할 수 있다.
- 체크가 안 된 상태라면 박스가 비어있고, 체크가 된 상태면 박스가 ✓ 아이콘이 생긴다.

#### 사용자가 할 수 있는 기능은 무엇일까?

- 사용자는 Checkbox 컴포넌트를 마우스로 클릭할 수 있다.

<div style="margin-bottom: 10px"></div>

사용자는 그저 Checkbox 컴포넌트를 클릭할 뿐, 컴포넌트 내부가 어떻게 구현되어 있는지는 알 수 없고, 알 필요도 없다.

<br>

Headless 컴포넌트를 만드는 방식은 다양한데, 그 중 세 가지 방법을 소개해보려 한다.

<div style="margin-bottom: 20px"></div>

### 1. Compound Component

Material UI, Reach UI등 많은 UI 라이브러리가 Compound 컴포넌트를 사용한다.

> Compound components is a pattern where components are used together such that they share an implicit state that lets them communicate with each other in the background.

Compound 컴포넌트란 같이 사용되는 컴포넌트들의 상태(state) 값을 공유할 수 있게 만들어주는 패턴이다. 코드로 한 번 알아보자.

<span class="file-location">CheckboxWrapper.tsx</span>

```tsx
import * as React from 'react'

type CheckboxContextProps = {
  id: string
  isChecked: boolean
  onChange: () => void
}

type CheckboxProps = CheckboxContextProps & React.PropsWithChildren<{}>

const CheckboxContext = React.createContext<CheckboxContextProps>({
  id: '',
  isChecked: false,
  onChange: () => {},
})

const CheckboxWrapper = ({
  id,
  isChecked,
  onChange,
  children,
}: CheckboxProps) => {
  const value = {
    id,
    isChecked,
    onChange,
  }
  return (
    <CheckboxContext.Provider value={value}>
      {children}
    </CheckboxContext.Provider>
  )
}

const useCheckboxContext = () => {
  const context = React.useContext(CheckboxContext)
  return context
}

const Checkbox = ({ ...props }) => {
  const { id, isChecked, onChange } = useCheckboxContext()
  return (
    <input
      type="checkbox"
      id={id}
      checked={isChecked}
      onChange={onChange}
      {...props}
    />
  )
}

const Label = ({ children, ...props }: React.PropsWithChildren<{}>) => {
  const { id } = useCheckboxContext()
  return (
    <label htmlFor={id} {...props}>
      {children}
    </label>
  )
}

CheckboxWrapper.Checkbox = Checkbox
CheckboxWrapper.Label = Label

export default CheckboxWrapper
```

<span class="file-location">App.tsx</span>

```tsx
import CheckboxWrapper from './CheckboxWrapper'

export default function App() {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <CheckboxWrapper
      id="checkbox-1"
      isChecked={isChecked}
      onChange={() => setIsChecked(!isChecked)}
    >
      <CheckboxWrapper.Checkbox />
      <CheckboxWrapper.Label>체크박스 만들기</CheckboxWrapper.Label>
    </CheckboxWrapper>
  )
}
```

컴포넌트 내부에서 state를 공유하기 위해 Context API를 사용해서 처음에 작성해야 하는 코드가 꽤 많다.

하지만 컴포넌트를 사용하는 곳에서는 `<CheckboxWrapper />` 하위에 어떤 컴포넌트가 있는지 볼 수 있고, 위치도 자유롭게 수정 가능하다.

<br>

### 2. Function as Child Component

Function as Child Component는 자식에 어떤 것이 들어올지 예상할 수 없기 때문에 `children` prop으로 받아 그대로 전달하는 것이다.

<span class="file-location">CheckboxHeadless.ts</span>

```tsx
type CheckboxHeadlessProps = {
  isChecked: boolean
  onChange: () => void
}

const CheckboxHeadless = (props: {
  children: (args: CheckboxHeadlessProps) => JSX.Element
}) => {
  const [isChecked, setIsChecked] = useState(false)

  if (!props.children || typeof props.children !== 'function') return null

  return props.children({
    isChecked,
    onChange: () => setIsChecked(!isChecked),
  })
}

export default CheckboxHeadless
```

<span class="file-location">App.tsx</span>

```tsx
import CheckboxHeadless from './CheckboxHeadless'

export default function App() {
  return (
    <CheckboxHeadless>
      {({ isChecked, onChange }) => {
        return (
          <label>
            <input type="checkbox" checked={isChecked} onChange={onChange} />
            <span>체크박스</span>
          </label>
        )
      }}
    </CheckboxHeadless>
  )
}
```

Compound 컴포넌트보다 작성해야 하는 코드량이 훨씬 적다. 사용하려는 state 값을 위에서 따로 선언할 필요가 없어, 다른 컴포넌트에 해당 state를 실수로 넣을 일이 적어진다. 그리고 관련된 코드가 한 곳에 모여 있어 읽기 편하다. 하지만 다른 곳에서 해당 state를 공유할 경우, `CheckboxHeadless`가 감싸야 할 코드량이 많아지는 단점이 있다.

<br>

### 3. Custom hooks

React를 사용해본 사람이라면 가장 익숙할 법한 커스텀 훅이다.

<span class="file-location">useCheckbox.ts</span>

```ts
import { useState } from 'react'

export const useCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false)

  return {
    isChecked,
    onChange: () => setIsChecked(!isChecked),
  }
}
```

<span class="file-location">App.tsx</span>

```tsx
import { useCheckbox } from './useCheckbox'

export default function App() {
  const { isChecked, onChange } = useCheckbox()
  return (
    <label>
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      <span>체크박스 만들기</span>
    </label>
  )
}
```

위의 두 방식보다 간단하고 직관적이다. 하지만 state 값을 사용되어야 하는 Checkbox 컴포넌트가 아니라 다른 곳에 작성할 실수가 발생할 수 있다.

<!-- ### Calendar 컴포넌트 만들어보기

Calendar 컴포넌트는 무엇을 할 수 있을까? 대부분의 상황에서는 달력을 보여줄 것이다.

달력은 한 해의 일, 주, 월을 보여주는 표로, 아래와 같은 특징을 갖고 있다.

- 일주일은 7일이고, 1주라고 칭한다.
- 1주는 월, 화, 수, 목, 금, 토, 일이라는 요일로 이루어져 있다. 이 중, 월, 화, 수, 목, 금은 평일이고, 토, 일은 주말이다.
- 매달 1일부터 시작하며 말일이 정해져있다. (예외케이스로, 윤년의 2월의 말일은 29일이다)
- 1년은 1월부터 12월까지로 이루어져 있다.

<div style="margin-bottom: 10px"></div>

달력의 외관이 다르더라도 위의 특징을 갖고 있다면 사용자는 달력이라 생각한다.

예를 들어 사용자가 '달력을 본다'라는 메세지를 Calendar에게 요청하면, Calendar는 달력을 보여주는 대신 한 해의 날짜를 다 보여줄 수도 있고, 월 단위로 나누어서 보여줄 수도 있고, 주 단위로 나누어서 보여줄 수도 있다. 이처럼 Calendar가 달력을 어떻게 보여줄지는 내부에서 결정한다.

물론 사용자가 원한다면 '달력을 본다(월 단위로)'처럼 메세지에 내용을 추가하여 요청할 수 있다. 이렇게 컴포넌트에 기능을 실행하도록 요청하는 방법이 바로 인터페이스(interface)이며, 외부에서 유일하게 컴포넌트 내부와 소통할 수 있는 수단이다.

```ts
type UnitType = 'year' | 'month' | 'week'

interface CalenderProps {
  open: (unit: UnitType) => Calendar
}
```

Calendar의 인터페이스는 위와 같을 것이며, 우리는 Calendar의 내부가 어떻게 구현되어 있는지 알 수 없으며 알 필요도 없다. Calender의 인터페이스를 보고 원하는 기능을 요청하면 된다.

그리고 공휴일이 포함된 달력을 구현해야 할 수도 있는데, 공휴일은 나라마다 다르다. 따라서 Calendar 컴포넌트에 바로 적용하기 보다는 CalendarKor 처럼 따로 생성하여 구현하는 것이 나중에 유지보수 차원에서 더 좋을 수 있다. 물론 국내 달력만 구현한다면 Calendar 컴포넌트 내부에 구현해도 무방할 것이다. -->

## 결론

Headless 컴포넌트는 스타일이 없고 로직만 존재하는 것을 뜻한다. 마크업과 스타일 수정이 자유롭기 때문에 기능 변경이 많은 곳에서 유용하다. 하지만 장단점이 명확하니 상황에 맞게 도입해야 한다.

그리고 사실 기능은 언제든 변경될 수 있다. 따라서 어느 컴포넌트든 유지보수 하기 좋은 컴포넌트를 만들어야 한다. 유지보수 하기 좋은 컴포넌트란, 변경에 쉽게 대응할 수 있는 컴포넌트다. Headless라는 개념도 변경에 쉽게 대응하기 위해 생겨난 것이라 생각한다.

변경에 쉽게 대응하기 위해서는 해당 컴포넌트가 무엇을 하는지 알아야 하며, 내부와 외부에 두어야 할 것을 완전히 분리해야 한다. 외부가 변경되었다 하더라도 내부 컴포넌트가 영향을 받아서도 안되고, 내부가 수정되었다 하더라도 외부가 변경되어서도 안된다.

<br>

**참고**

<div style="font-size: 12px">

- <a href="https://www.joshbritz.co/posts/the-sexiness-of-headless-ui/" target="_blank">The Sexiness of Headless UI Components</a>
- <a href="https://www.merrickchristensen.com/articles/headless-user-interface-components/" target="_blank">HEADLESS USER INTERFACE COMPONENTS</a>
- <a href="https://www.merrickchristensen.com/articles/function-as-child-components/" target="_blank">FUNCTION AS CHILD COMPONENTS</a>
- <a href="https://kentcdodds.com/blog/compound-components-with-react-hooks" target="_blank">React Hooks: Compound Components</a>
- <a href="https://dev.to/alexi_be3/react-component-patterns-49ho" target="_blank">⚛️ 🚀 React Component Patterns</a>
- 객체지향의 사실과 오해, 조영호 (2015)
- <a href="https://tanstack.com/table/v8/docs/guide/00-introduction" target="_blank">TanStack Table | Introduction</a>

<!-- - https://medium.com/cstech/headless-ui-components-creating-re-usable-logic-without-thinking-about-design-69ac9fad6400 -->

<!-- - <a href="https://blog.logrocket.com/the-complete-guide-to-building-headless-interface-components-in-react/" target="_blank">The complete guide to building headless interface components in React</a> -->

<!-- - <a href="https://betterprogramming.pub/headless-ui-components-a-journey-with-high-order-components-render-props-and-custom-hooks-811c9677b4cf" target="_blank">Headless UI Components: A Journey With High Order Components, Render Props, and Custom Hooks</a> -->

</div>
