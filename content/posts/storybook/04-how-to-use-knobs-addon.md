---
title: 'Storybook: Knobs addon 사용법'
date: '2020-6-10'
tags: ['storybook']
draft: false
---

해당 글의 모든 예시는 기본으로 설치되어 있는 `src/storeis/1-Button.stories.js`으로 진행한다. 보기 쉽게 `Emoji`는 삭제하고, `Text`에서 추가하는 형태로 진행하겠다.

## Knobs

- [Knobs repo](https://github.com/storybookjs/storybook/tree/master/addons/knobs)
- [Knobs 소개 및 설치](https://howdy-mj.me/storybook/02-addon-intro/#knobs)

Knobs는 component에 props가 있을 때, 더 보기 쉽게 도와주는 addon이다.

기존에 `1-Button.stories.js`에서 쓴 것을, `1-Button.js`에 Button 컴포넌트만 쓰고 import해오는 것으로 바꿔보겠다.

```
src
└─ stories
    ├─ 0-Weclome.stories.js
    ├─ 1-Button.css
    ├─ 1-Button.js
    └─ 1-Button.sotries.js
```

<span class="file-location">src/stories/1-Button.js</span>

```jsx
import React from 'react'
import './1-Button.css'

const Button = ({ disabled, name, clicked }) => {
  return (
    <button className="Button" onClick={clicked} disabled={disabled}>
      Hi {name}
    </button>
  )
}

export default Button
```

<span class="file-location">src/stories/1-Button.css</span>

```css
.Button {
  padding: 10px;
  width: 100px;
  background-color: aliceblue;
  border-radius: 5px;
  border: none;
}
```

<span class="file-location">src/stories/1-Button.stories.js</span>

```jsx
import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import Button from './1-Button'

export default {
  title: 'Button', // 스토리북의 그룹과 경로
  component: Button, // 어떤 컴포넌트를 문서화 할지
  decorators: [withKnobs], // knobs 적용
}

export const buttonText = () => {
  // knobs 만들기
  const name = text('name', '버튼')
  const disabled = boolean('disabled', false)

  return <Button clicked={action('clicked')} disabled={disabled} name={name} />
}
```

<p style="text-align: center"><img src="https://user-images.githubusercontent.com/58619071/193442955-98262a36-fb60-46e1-84a2-aab46df01ab6.PNG" alt=""></p>

위와 같이 코드를 쳤을 때 나오는 화면이다.

그럼 코드를 자세히 살펴보자.

`src/stories/1-Button.js`에서 필요한 props를 미리 component에 작성해서 넘겨주는 형태이다.

그리고 `src/stories/1-Button.stories.js`에서 해당 component째로 불러와서 사용하는데, 이 때 knobs가 있으면 위의 이미지처럼 Knobs 탭에서 바로 보고 수정도 할 수 있다.

`src/stories/1-Button.stories.js`는 쪼개서 설명하겠다.

```jsx
export default {
  title: 'Button', // 스토리북의 그룹과 경로
  component: Button, // 어떤 컴포넌트를 문서화 할지
  decorators: [withKnobs], // knobs 적용
}
```

<p style="text-align: center"><img src="https://user-images.githubusercontent.com/58619071/193442956-dcf752fd-73ab-4b78-a78e-d4627d863993.PNG" alt=""></p>

`title`은 여기서 Button과 같은 카테고리 이름을 정할 때 사용한다.
만약 그룹단위로 묶어야 한다면 `title: "components|Button"`으로 작성하면 된다.

<p style="text-align: center"><img src="https://user-images.githubusercontent.com/58619071/193442957-58b50449-8c0b-47db-9d94-60ee179858ca.PNG" alt=""></p>

```jsx
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

export const buttonText = () => {
  // knobs 만들기
  const name = text('name', '버튼')
  const disabled = boolean('disabled', false)

  return <Button clicked={action('clicked')} disabled={disabled} name={name} />
}
```

`Button`아래 `Button Text`로 들어오는데, 이는 component 이름을 camelCase로 `buttonText`로 작성해서 (신기하게도) 대문자 있는 곳까지 자르고 띄워쓰기를 해서 보여준다.

이제 knobs 사용법을 봐보자.

우선 맨 위에서 import를 해오고, knobs를 만들 때 사용해야 한다.
TypeScript랑 비슷하게 어떤 type을 갖는지 적어줘야 한다. (그래서 TypeScript와 많이 쓴다)

[Knobs repo](https://github.com/storybookjs/storybook/tree/master/addons/knobs)

어떤 것들을 보여주고 싶은지 선언했다면, return문에서 해당 컴포넌트에 들어갈 것을 props로 써준다.
해당 props는 `1-Button.js`에서 component를 만들 때 넣어줬기 때문에, 원하는 이름으로 넣어주면 된다.

그래서 아래와 같은 화면을 볼 수 있다.

<p style="text-align: center"><img src="https://user-images.githubusercontent.com/58619071/193442958-d0ee9064-fa5e-4e71-a89f-6ad35f2fd84f.PNG" alt=""></p>

```jsx
const name = text('name', '버튼')
```

이를 예로 들면, 왼쪽에 있는 것이 첫 번째 인자인 `'name'`이고, 오른쪽에 오는 것이 두 번째 인자 `'버튼'`이다.

만약 우리가 Storybook을 쓰지 않았을 때, 저기 버튼에 있는 내용을 바꾸고 싶다면 어떻게 해야 했을까?

React에서 직접 수정하고 웹 화면을 봤어야 한다.

하지만 Storybook은 Knobs로 props를 넘겨주었기 때문에 화면에서 바로 수정할 수 있다.

바로 아래처럼.

<p style="text-align: center"><img src="https://user-images.githubusercontent.com/58619071/193442959-039915f6-4483-4e7a-9672-faf848917a67.PNG" alt=""></p>

그래서 디자이너와 같은 화면에서 직접 고치면서 만족스러운 시안이 나오면 개발자는 그 값을 사용하면 돼서 매우 편하다.

이 외에도, size, color 등 모두 Knobs로 확인할 수 있으니 한 번 직접 해보면 이해가 더 빨리 갈 것이라 생각한다.
