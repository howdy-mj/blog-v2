---
title: 'Storybook 소개'
date: '2020-6-2'
tags: ['storybook']
draft: false
---

### 현존하는 프론트 개발의 불편함

최근 프론트엔드 개발은 주로 component 단위로 이루어진다. 특히, React에서도 Class Component 보다 Functional Component가 주로 사용된다.

하지만, 실제 개발 환경은 여전히 Component가 아니라 Page 단위로 진행되기 때문에, component 의존성이 있어 **재사용성이 높지 않다는 문제**가 있다.

분명 같은 속성으로 만들었지만, 어떤 페이지에서는 깨지는 경우가 있어 재설정을 해야만 했다.

그래서 Design System(디자인 시스템)이란 것이 도입됐다.

## Design System(디자인 시스템)

![](https://user-images.githubusercontent.com/58619071/193442765-a85eecfe-0d6b-4714-a65b-6899ddbdb36c.png)

<p style="font-size: 10px; text-align: center">https://product-unicorn.com/design-systems-style-guides-all-those-libraries-what-the-hell-is-the-difference-4c2741193fdc</p>

디자인 시스템의 정의는 제각각이다.
따라서 그냥 내가 이해하기 가장 쉬웠던 정의로 가져왔다.

디자인 시스템은 하나의 서비스 혹은 상품에 적용되는 것으로, Style Guide(ex. 색상, 여백, 타이포그라피 등)과 Component Library(ex. 카드, 버튼, 네비게이션 등)을 포함한다.

즉, 디자인 시스템은

- 개발자와 디자이너의 효율적인 소통 및 협업
- 프로덕트 디자인에 대한 일관성 유지
- 디자인 요소들을 분리하여 재사용 가능한 Component로 만들기
  위해 나왔으며, 이를 위해 **'문서화'** 된 가이드가 필요하다.

디자인 코드의 문서화를 도와주는 도구 중 하나가 바로 <span style="font-size: 18px; font-weight: bold;">Storybook📚</span>이다.

## Storybook이란?

> Storybook runs outside of the main app so users can develop UI components in isolation without worrying about app specific dependencies and requirements.

스토리북은 외부 영향을 받지 않는 독립적인 UI Component이다.

<p style="font-size: 12px;">(\*User Interface: 사용자와 컴퓨터가 상호작용할 수 있는 접점)</p>

![](https://user-images.githubusercontent.com/58619071/193442767-e98a42cc-c53d-4951-8c7f-90467b264d1f.jpg)

<p style="font-size: 10px; text-align: center">https://www.learnstorybook.com/intro-to-storybook/react/en/get-started/</p>

예전에는 디자이너의 요구대로 개발자가 만들고 적용한 후 테스트 단계에서 같이 확인했었다면, 스토리북이 있다면 개발자가 개발하면서 디자이너가 직접 보면서 확인할 수 있어 빠른 수정이 가능하다.

**Storybook 설치 및 실행**

CRA 환경에서 설치해야 한다.

```shell
# 원하는 폴더 위치에서
$ npx create-react-app 폴더명
$ cd 폴더명
$ npx -p @storybook/cli sb init

$ npm run storybook
# or
$ yarn storybook
```

![](https://user-images.githubusercontent.com/58619071/193442772-5a913463-e95f-4b4b-8dd2-be883a5bcbe0.png)

스토리북을 열면 9009 포트로 열리게 된다.
컴퓨터 사양에 따라 켜지는 속도가 다른거 같은데, 나는 조금 오래 걸리는 편인 것 같다.

![](https://user-images.githubusercontent.com/58619071/193442768-a427832f-0a81-454b-903e-b044b339df79.PNG)

<p style="text-align: center;  font-size: 12px;">storybook 첫 화면</p>

<p style="text-align: center"><img src="https://user-images.githubusercontent.com/58619071/193442770-cfc0fda8-6c52-4817-aa06-1f6174424d5f.PNG"></p>
<p style="text-align: center;  font-size: 12px;">storybook 폴더 구조</p>

<br>

다음 글에서는 스토리북의 각종 편리한 기능을 제공해주는 addon을 다룰 것이다.
