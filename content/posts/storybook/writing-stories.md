---
title: '스토리북으로 Stories 작성하기'
date: '2020-11-30'
tags: ['storybook']
draft: false
---

스토리북에서 stories를 어떻게 작성하는지 알아보자.

해당 글은 react `^17.0.1`, react-scripts `4.0.1`, @storybook/react `^6.1.8`, styled-components `^5.2.1`, typescript `^4.0.3` 버전으로 작성되었다.

완성된 코드: [Github - writing-stories](https://github.com/howdy-mj/writing-stories)

## 프로젝트 세팅

```shell
$ yarn create react-app writing-stories --template typescript
$ cd writing-stories
$ npx sb init
$ yarn add styled-components
$ yarn add -D @types/styled-components
$ yarn storybook # 스토리북 서버
```

<div style="text-align: center; font-size: 14px;">
<img src="https://user-images.githubusercontent.com/58619071/193443172-41b96d15-c970-4330-8942-b5340d2039cc.png" alt="폴더 구조">
<div>기존 폴더 구조</div>
</div>

기본 구조는 위와 같아지는데, 개인적으로 stories와 컴포넌트가 같이 있는 것을 선호하기 때문에 약간의 폴더 구조 변경을 하며, 해당 글은 오로지 Storybook에만 치중하기 때문에, `src/index.tsx`와 `src/App.tsx`는 건드리지 않으며, 예제는 기본으로 내제된 컴포넌트를 활용하겠다.

## 폴더 구조 변경

<div style="text-align: center; font-size: 14px;">
<img src="https://user-images.githubusercontent.com/58619071/193443173-a778d4ad-c7d6-4416-ae00-7a1c9021ce78.png" alt="변경한 폴더 구조">
<div>변경한 폴더 구조</div>
</div>

기존의 `Button.tsx`와 `Header.tsx`는 components/Button, components/Header 안으로, `Pages.tsx`는 pages/Main으로 변경했으며, 기존의 css는 모두 styled-components로 변경했다. [Github: Folder Structure](https://github.com/howdy-mj/writing-stories/commit/8b9403948f9102f6adc23f166667ed1ccd5a0ed9)

```shell
$ yarn storybook
```

이 후 다시 스토리북을 실행하면 이전과 같은 화면을 볼 수 있다.

해당 글에서는 Button 컴포넌트를 다루어 보겠다.

<div style="text-align: center; font-size: 14px;">
<img src="https://user-images.githubusercontent.com/58619071/193443174-710e835e-fbd3-4b8e-80d3-b012b230fc2f.png" alt="Button Docs">
<div>Button Docs 화면</div>
</div>

개인적으로 (현재의 나로서는) 스토리북의 최대 장점은 Docs라 생각한다. Storybook 6로 오면서 TypeScript 지원이 훨씬 간단해졌으며, interface를 지정해주고, 주석으로 달아주면 위 이미지처럼 스토리북 Docs에서 그대로 볼 수 있다.

문서화를 함으로써, 만들어 둔 컴포넌트에 어떤 props가 있는지, 어떻게 사용해야 하는지 굳이 알려줄 필요 없이 스토리북 서버에서 바로 확인 가능하다.

<span class="file-location">components/Button/index.tsx</span>

```tsx
export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  bgColor?: string
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Button contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
// => 스토리북 Docs 소제목으로 들어감
export const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  bgColor,
  label,
  ...props
}) => {
  return (
    <ButtonWrap
      type="button"
      primary={primary}
      style={{ backgroundColor: bgColor }}
      size={size}
      {...props}
    >
      {label}
    </ButtonWrap>
  )
}
```

<div style="text-align: center; font-size: 14px;">
<img src="https://user-images.githubusercontent.com/58619071/193443175-d666db50-2adf-4818-9655-54b2092738e4.png" alt="Button stories">
<div>Button Stories 화면</div>
</div>

그리고 해당 props일 때 어떤 UI를 가지는지도 스토리북에서 바로 확인이 가능하다.

<span class="file-location">components/Button/Button.stories.tsx</span>

```tsx
import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import { Button, ButtonProps } from './index'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta

const Template: Story<ButtonProps> = args => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Button',
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Button',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'Button',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'Button',
}
```

_추후 내용 추가 예정_

<br />

**참고**

<div style="font-size: 12px;">

- https://storybook.js.org/

</div>
