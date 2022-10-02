---
title: 'Storybook 6 가이드'
date: '2020-9-24'
tags: ['storybook']
draft: false
---

<p style="font-style: italic;">해당 글은 <a href="https://medium.com/storybookjs/storybook-6-migration-guide-200346241bb5" target="_blank">Storybook 6 Migration Guide</a>과 <a href="https://storybook.js.org/" target="_blank">공식 홈페이지</a>를 참고하였고, React 기준으로 작성되었습니다.</p>

<br />

지난 스토리북 글을 작성했을 때에도 Storybook 5.3 참고 글이 별로 없어 쓰는데 오래 걸린다는 핑계로 계속 안 쓰고 있었다.(반성...) 그런데 지난 8월 Storybook 6(SB6)이 릴리즈 되면서 다시 새로운 모습으로 돌아와 글을 써보고자 한다.

## Storybook 6 마이그레이션 가이드

작년(2019) 봄, [Storybook 5.0](https://medium.com/storybookjs/storybook-5-0-db1d0f9c83b8)은 주로 인터페이스를 신경썼다면, Storybook 6.0은 개발자 경험을 향상 시켰다.

**패키지 업데이트**

```shell
$ npx sb upgrade
# or
$ yarn storybook
```

`@storybook/*` 패키지 모두 업그레이드 된다.

<br />

### 달라진 점

**TypeScript 빌트인 지원 (zero-config)**

- 예전처럼 복잡하게 `.storybook` config를 설정하지 않아도 된다. 또한, `@storybook/addon-docs`에서도 바로 prop 테이블을 확인할 수 있다.
- 기존 버전에서 6.0으로 마이그레이션 하는 프로젝트는 설정해 둔 타입스크립트 webpack/babel config와 `@storybook/preset-typescript`를 삭제하고 재 설정할 것을 권장한다.
- Storybook 5.3에서 소개한 `main.js` 파일에 `stories` property를 넣으면 되고, 기존에 glob이 인식되지 않은 문제도 해결했다.

<span class="file-location">./storybook/main.js</span>

```js
{
  ...
  stories: ['./**/*.stories.@(ts|js)']
}
```

[TypeScript Configure](https://storybook.js.org/docs/react/configure/typescript)에서 자세한 타입스크립트 설정을 확인할 수 있다.

<br />

**Hierarchy separators 제거**

- hierarchy separators는 그룹화 할 때 사용되며, 사이드바에서 그룹 별로 확인 가능하다. 예전 버전은 `|`와 `.`도 사용이 가능했지만, 지금은 `/`로 통일되었다.

```shell
$npx sb@next migrate upgrade-hierarchy-separators --glob="*/**/*.stories.@(tsx|jsx|ts|js)"
```

- 이로 모두 `/`로 바꿀 수 있지만, `.mdx` 컴포넌트 안에 있는건 수동으로 바꿔 줘야 한다.

- 현재는 'roots'를 기본으로 보여주지만, disable도 가능하다.

<span class="file-location">./storybook/manager.js</span>

```js
import addons from '@storybook/addons'
addons.setConfig({
  showRoots: false,
})
```

<br />

**`addon-info`, `addon-notes`, `addon-contexts`, `addon-centered`등 사용 중지**

- `addon-info`, `addon-notes`는 `addon-docs`로 대체되었다. ([마이그레이션 문서](https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/recipes.md#migrating-from-notesinfo-addons) 참고)

- `addon-contexts`는 `addon-toolbars`로 대체되었다. 더 간단하고 모든 Storybook 프레임워크와 호환된다.

- `addon-centered`는 각 Storybook 컴포넌트에서 손 쉽게 중앙 정렬이 가능하여 삭제되었다.

```js
export const MyStory = () => <div>my story</div>
MyStory.story = {
  parameters: { layout: 'centered' },
  // padded, fullscreen 값도 존재
}
```

- `.storybook/preview.js`에서 `addParameters`, `addDecorator` 대신 `export const parameter = {}` 혹은 `export const decorators = []` 사용을 권장한다. ([Preview entries](https://github.com/storybookjs/storybook/blob/next/docs/api/writing-presets.md#preview-entries))

- Hot Module Reloading(HMR)) 이슈로 다수의 파일로 컴포넌트를 복제하는 기능도 중지되었다. `export default { title: 'foo/bar' }`가 stories에 있다면 `Duplicate title '${kindName}' used in multiple files` 경고가 뜬다. 이는 7.0에서 완전히 삭제될 예정이다.

<br />

**`addon-docs` 전면 개편**

- SB 5.2에서 사용하는 `@storybook/addon-docs/react/preset`을 SB 5.3에서 `@storybook/addon-docs/preset`로 합쳤다. 그리고 6.0에서 사용 중단된 preset이 제거되었다.

- `Preview`는 `Canvas`로, `Props`는 `ArgsTable`로 이름이 바뀌었다.

- docs의 테마는 `./storybook/preview.js`에서 설정가능하다.

```js
import { themes } from '@storybook/theming'
// or global addParameters
export const parameters = {
  docs: {
    theme: themes.dark,
  },
}
```

- zero-config TypeScript로 따로 설정을 하지 않아도 바로 React의 prop 테이블이 보인다.

- 이 외의 내용은 [Docs breaking changes](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#60-docs-breaking-changes)에서 확인 가능하다.

<br />

Storybook 6.0 Migration 전문은 [여기서](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md) 볼 수 있다.

## Storybook Configure

Storybook의 configure는 SB 5.3에서 개편되었다. `presets.js`는`main.js`, `config.js`는 `preview.js`, `addons.js`는 `manager.js`로 이름을 바꾸었다. 모두 `.storybook` 폴더 안에 생성한다.

### main.js

메인 config 파일로 스토리북의 생성(generation)을 담당한다. 예를 들어, story 파일들의 위치, presets 관리(webpack, babel이 다른 파일을 허용할 수 있도록), webpack config 정규화 업무 그리고 기본적인 addon 설정도 `main.js`에 작성한다.

<div style="text-align: center; font-size: 10px;">
<img src="https://miro.medium.com/max/700/1*7qO4gGhxEcwW6FmA3sBPVw.png" style="margin-bottom: 0;">
https://medium.com/storybookjs/declarative-storybook-configuration-49912f77b78
</div>

<br />

### preview.js

`config.js`를 대체하며, stories의 렌더링을 설정한다. `config.js`와 달리 `preview.js`는 어느 stories의 로딩도 책임지지 않는다. 주 목적은 global parameters와 decorators를 추가하는 것이다.

<div style="text-align: center; font-size: 10px;">
<img src="https://miro.medium.com/max/700/1*FmtGe9jCMsrkfJYQ6AALYQ.png" style="margin-bottom: 0;">
https://medium.com/storybookjs/declarative-storybook-configuration-49912f77b78
</div>

<br />

### manager.js

`addons.js`를 대체하며, Storybook의 UI 렌터를 커스텀할 수 있다. Canvas를 제외한 모든 화면을 뜻한다.

<div style="text-align: center; font-size: 10px;">
<img src="https://miro.medium.com/max/577/1*USRW0qjGyqcNQH5sWWpMDg.png" style="margin-bottom: 0;">
https://medium.com/storybookjs/declarative-storybook-configuration-49912f77b78
</div>

<br />

## Stories 포맷

SB 6에서 개발 경험을 향상했다고 했는데, 필자가 느끼는 가장 큰 차이는 Stories 포맷이다. 기존 `storiesOf`를 대체할 [Component Story Format(CSF)](https://storybook.js.org/docs/react/writing-stories/introduction#component-story-format)이 나왔다.

더 간단하고, 직관적이며 ES6도 자유롭게 사용할 수 있어 Jest, Cypress와 같은 테스트도 가능하다.

```js
// Button.js 컴포넌트를 import 한 후,

// storeisOf
storiesOf('atoms/Button', module)
  .add('text', () => <Button>Hello</Button>)
  .add('emoji', () => <Button>😀😎👍💯</Button>)

// CSF
export default { title: 'atoms/Button' }
export const text = () => <Button>Hello</Button>
export const emoji = () => <Button>😀😎👍💯</Button>
```

컴포넌트의 arguments도 쉽게 넘겨줄 수 있다.

```js
// Button.stories.js
const Template = (args) => <Button {...args} />;

// Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = { background="#ff0",  label: 'Button' };

export const Secondary = Template.bind({});
Secondary.args = {  ...Primary.args,  label: '😄👍😍💯',};

export const Tertiary = Template.bind({});
Tertiary.args = {  ...Primary.args,  label: '📚📕📈🤓',};
```

`Template.bind({})`는 코드 중복을 줄이며 복사본을 만들 수 있다. `...Primary.args`는 Primary의 args를 복사한다.

그리고 `addon-knobs` 보다 더 좋은 `controls`가 나타났다.

<div style="text-align: center; font-size: 10px;">
<video style="max-width: 100%" autoplay loop>
  <source src="https://storybook.js.org/ab451447f5f33717ed2ae14567375bb5/addon-controls-demo-optimized.mp4">
  <source >
</video>
storybook 홈페이지
</div>

다음 몇 개의 글에서 더 자세한 stories 작성법, addons에 대해 다뤄보겠다.

<br />

**참고**

<div style="font-size: 12px;">

- https://github.com/storybookjs/storybook/blob/next/MIGRATION.md
- https://medium.com/storybookjs/declarative-storybook-configuration-49912f77b78

<div>

<br />

<p style="font-size: 13px; font-style: italic; text-align: center;">피드백은 언제나 환영합니다</p>
