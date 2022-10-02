---
title: 'Storybook: Actions addon 사용법'
date: '2020-6-8'
tags: ['storybook']
draft: false
---

해당 글의 모든 예시는 기본으로 설치되어 있는 `src/storeis/1-Button.stories.js`에서 추가하는 형태로 진행하겠다.

_해당 글은 Storybook 5.3 기준으로 작성되었습니다._

## Actions

- [Actions repo](https://github.com/storybookjs/storybook/tree/master/addons/actions)
- [Actions 소개 및 설치](https://howdy-mj.me/storybook/02-addon-intro/#actions)

<br>

```js{2, 11, 16}
import React from 'react'
import { action } from '@storybook/addon-actions'
import { Button } from '@storybook/react/demo'

export default {
  title: 'Button',
  component: Button,
}

export const Text = () => (
  <Button onClick={action('clicked')}>Hello Button</Button>
)

export const Emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
)
```

Actions은 간단하다.
`actions`을 import하고, `onClick()`메소드에 넣어주면 된다.

![actions](https://user-images.githubusercontent.com/58619071/193442836-e53fe271-da13-49b9-ba92-aa85065aa519.png)

`onClick()`메소드가 있는 곳을 클릭하면 하단 Actions 탭에 'clicked'라는 이름으로 뜨는 것을 볼 수 있다.

<br />

### storiesOf ?

Storybook 이용법을 찾다보면 종종 `storiesOf`이란 문법을 볼 수 있다.
이는 [storiesOf API](https://storybook.js.org/docs/formats/storiesof-api/#docs-content)안에 있는 것으로 Storybook 5.2까지 사용된 stories 생성법이며, 지금은 사용하지 않아도 된다.
