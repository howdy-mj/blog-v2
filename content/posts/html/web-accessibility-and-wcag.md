---
title: '웹 접근성과 웹 콘텐츠 접근성 지침'
date: '2022-05-07'
tags: ['html']
draft: false
---

> 웹 접근성은 매우 중요하며, 시맨틱 마크업을 준수해야 한다.

웹 개발을 했다면 많이 들어봤을 말이다.

그렇다보니 필자는 이를 단순하게 _웹 접근성 = 시맨틱 마크업_, 시맨틱 마크업은 곧 적절한 곳에 올바른 HTML 태그를 작성하는 것이라고만 인지하고 있었다.

그러나 생각했던 것과는 달리 더 상세하고 복잡한 규정이 존재했다.

## 웹 접근성(Web Accessibility)

웹은 누구나 어떤 것으로 접속해도 모두가 동일한 기능을 사용할 수 있어야 한다. 이 문장만 봤을 때는 쉽게 체감되지 않을 수 있다.

장애를 가진 사람들도 웹에 있는 기능을 다 사용할 수 있어야 한다. 시각 장애인의 경우 웹 페이지의 내용을 소리내어 읽어 주어 알려줄 수 있어야 하며, 청각 장애인의 경우 오디오로 된 내용은 텍스트로 읽을 수 있도록 만들어야 한다.

이 외, 웹 접근성이 잘 준수되어 있다면,

- 앱을 깔지 않고도 모바일 웹이 PC와 동일하게 동작하여, 모든 기능을 사용할 수 있다.
- 손가락을 다쳐 키보드 사용이 불편할 경우, 가상 키보드로 입력할 수 있다.
- 인터넷 속도가 느려서 이미지가 늦게 뜨지만 이미지에 대한 설명이 있어 어떤 내용인지 알 수 있다.

지금은 <a href="https://www.w3.org/WAI/" target="_blank">W3C(World Wide Web Consortium)</a>에서 HTML, CSS등의 웹 표준을 개발 중이며, 산하에 WAI(Web Accessibility Initiative, 웹 접근성 이니셔티브)가 웹 접근성과 관련된 지침을 계속 개발하고 정의하고 있다.

## 웹 콘텐츠 접근성 지침

<a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank">WCAG(Web Content Accessibility Guidelines, 웹 콘텐츠 접근성 지침)</a>는 현재 2.0, 2.1, 2.2 버전이 있으며, <a href="https://www.w3.org/TR/WCAG22/" target="_blank">2.2</a>는 2022년 9월에 마무리될 것으로 예정되어있다. 2.2 버전은 이전의 2.0, 2.1 의 내용을 모두 아우르며 변경된 점은 <a href="https://www.w3.org/TR/WCAG22/#changelog" target="_blank">Change Log</a>에서 볼 수 있다.

웹 콘텐츠 접근성 지침은 일반적으로 텍스트, 이미지, 소리와 같은 정보 그리고 구조나 표현 방법 등을 정의한 코드나 마크업을 가리킨다.

그래서 WCAG에서는 크게 네 가지 원칙으로 이를 분류했다. (아래는 2.2 기준으로 작성되었다)

### 1. Perceivable(인지성)

모든 콘텐츠(정보와 사용자 인터페이스 컴포넌트)는 사용자가 인지할 수 있도록 표시되어야 한다.

<li class="small">
  <a href="https://www.w3.org/TR/WCAG22/#dfn-user-interface-components" target="_blank">사용자 인터페이스 컴포넌트(user interface component)</a>는 사용자가 하나의 기능으로 인식하는 콘텐츠의 일부를 말한다.
</li>

**1.1 Text Alternatives (대체 텍스트 제공)**

텍스트가 아닌(non-text) 컨텐츠들에 대한 대체 텍스트가 제공되어야 한다. 대표적인 예로는 이미지에 대한 설명을 작성하는 것이다.

```html
<!-- ❌ Bad -->
<img src="welcome.png" alt="환영" />

<!-- ✅ Good -->
<img src="welcome.png" alt="저희 홈페이지의 방문을 환영합니다!" />
```

일반적으로 가장 많이 보는 예는 CAPTCHA(캡챠)가 있다.

<div class="img-div">
  <img src="https://cf-assets.www.cloudflare.com/slt3lc6tev37/3pwMuJ55jpErAafgrWbyTr/e6c487ac6e4288dfe284db72b88ea3d1/captcha.png" alt="CAPTCHA 이미지">
  <p>https://www.cloudflare.com/ko-kr/learning/bots/how-captchas-work/</p>
</div>

사람인지 봇인지 판단하기 위해 나온 테스트인데, 시각장애인이라면 소리를 들을 수 있게 음성도 같이 제공해주었다.

**1.2 Time-based Media (대체 미디어 제공)**

영상이라면 자막이나 수화 등 대체 가능한 컨텐츠가 있어야 한다.

**1.3 Adaptable (적응 가능한)**

정보나 구조를 잃지 않고 다른 방법(ex. 간단한 레이아웃)으로 표시할 수 있는 컨텐츠를 만든다.

예를 들면,

- 필수로 입력해야 하는 값에는 `*`나 텍스트를 빨간 색상으로 하여 눈에 잘 띄게 한다.
- 체크 박스 옆의 텍스트를 클릭해도 체크박스가 체크 된다.
- 여러 열로 이루어진 문서를 볼 경우, 왼쪽에서 오른쪽으로 위에서 아래로 읽는다.
- 여러 페이지의 설문지일 경우, 다음 페이지로 넘기는 버튼이 어디에 있는지 눈에 띄는 색상을 활용해 잘 찾을 수 있게 한다.
- 사용자의 정보를 기기에서 가져와 자동입력(autofill) 기능을 제공한다.
- 입력하는 내용 옆에 아이콘을 붙여 어떤 내용을 작성해야하는지 시각적으로 알려준다.

<br>

**1.4 Distinguishable (구별 가능한)**

배경과 콘텐츠를 구분하여 사용자들이 쉽게 보고 들을 수 있게 한다.

이는 텍스트 색상, 크기, 행간과 배경 색상과의 대비 명도를 통한 강조, 이해하기 쉬운 시각적 자료 그리고 링크와 input등에 마우스나 키보드를 올렸을 때 나타나는 상태 등이 있다.

텍스트와 배경색의 대비 관련해서는 <a href="https://colorable.jxnblk.com/4d4960/f47273" target="_blank">Colorable</a>에서 책정해볼 수 있다. 이 외, <a href="http://styleguide.co.kr/" target="_blank">웹 디자이너를 위한, 웹 스타일 가이드 지침서</a>에 잘 정리되어 있으니 확인해보면 좋다.

<br>

### 2. Operable(운용성)

사용자 인터페이스 컴포넌트와 네비게이션이 작동되어야 한다.

**2.1 Keyboard Accessible (키보드 접근성)**

모든 기능이 키보드로 동작할 수 있어야 한다.

예를 들면, 마우스의 드래그, 드롭은 복사, 붙여넣기로 대체 가능하며, 그림을 그리는 프로그램에서 생성, 사이즈 조절, 회전 등의 기능의 단축키가 존재한다.

**2.2 Enough Time (충분한 시간)**

사용자가 충분한 시간을 갖고 읽고 사용할 수 있어야 한다.

대표적으로는 어떠한 콘텐츠에 시간 제한이 걸려있다면, 사용자가 직접 그 제한 시간을 끄거나, 조정하거나, 늘릴 수 있어야 한다.

<!-- TODO: 추후 보충 -->
<!-- 예외 상황도 있는데, 경매와 같은 실시간 이벤트성(real-time exception)이거나 시간 제한은 필수적이나 연장하면 무효화(essential exception)되거나, 시간 제한이 20시간 이상(20 hour exception)인 경우도 있다. -->

<!-- 만약 어떠한 정보가 움직이거나, 깜빡이거나, 스크롤링되는데 1) 자동적으로 시작되고, 2) 5초 이상 지속되고, 3) 다른 콘텐츠와 병렬로 표시된다면, 사용자가 그 기능을 멈추게 할 수 있어야 한다.

이 외에도, 만약 사용자의 인증 세션이 만료되어 로그아웃 후, 재인증 한다면 그 데이터를 손실 없이 사용할 수 있도로 해야 한다. -->

**2.3 Seizures and Physical Reactions (발작과 신체 반응)**

발작이나 신체 반응을 일으키는 방식으로 콘텐츠를 만들면 안된다.

예를 들면 1초에 3번 이상의 플래시 효과나 <a href="https://www.w3.org/TR/WCAG22/#dfn-relative-luminance" target="_blank">밝기가 너무 낮은</a> 콘텐츠는 포함되면 안된다.

**2.4 Navigable (이동 가능한)**

사용자들이 탐색하거나, 콘텐츠를 찾고, 어디에 있을지 결정하는 방법을 제공해야 한다. 주로 링크로 페이지를 이동하는 것을 말한다.

**2.5 Input Modalities (입력 양식)**

사용자가 키보드의 다양한 입력을 통해 기능을 보다 더 쉽게 조작할 수 있어야 한다.

<!-- 추후 추가: https://www.w3.org/TR/WCAG22/#input-modalities -->

<br>

### 3. Understandable(이해성)

정보와 유저 인터페이스의 조작은 반드시 이해할 수 있어야 한다.

**3.1 Readable (읽기 쉬운)**

텍스트 콘텐츠 읽기 쉬우며 이해하기 쉬워야 한다.

**3.2 Predictable (예측 가능한)**

예측 가능한 방식으로 표시하고 작동해야 한다. 예를 들어, input 창을 마우스로 클릭할 경우, 해당 input 창 테두리의 색상이 바뀌며 활성화 된 걸 표시하는 것이 있다.

**3.3 Input Assistance (입력 도움)**

사용자의 실수를 방지하고 수정할 수 있도록 도와주어야 한다. 예를 들어, 사용자가 잘못 입력한 경우, 빨간 테두리가와 함께 어떤 형식으로 작성해야 하는지 알려주어야 한다.

<br>

### 4. Robust(견고성)

콘텐츠는 <a href="https://www.w3.org/TR/WCAG22/#dfn-assistive-technologies" target="_blank">보조 기술(assistive technologies)</a><i class="small">(추후 보충)</i>을 포함한 다양한 사용자 에이전트에 의해 해석될 수 있도록 견고해야 한다.

**4.1 Compatible (호환 가능)**

보조 기술을 포함하여, 현재 및 미래 사용자 에이전트와의 호환성을 극대화해야 한다.

예를 들어, 마크업 언어를 사용해 구현된 콘텐츠에서 요소들은 완전한 시작과 끝 태그를 갖고 있으며, 요소들은 그들의 스펙에 따라 중첩될 수 있으며, 중복된 속성을 포함하지 않는다.

## 예제 및 평가

해당 글에서는 어떤 지침이 있는지 간단하게 훑어본 것이기 때문에 이해하기 어려울 수 있다.

WCAG에서 만든 <a href="https://www.w3.org/WAI/WCAG22/quickref" target="_blank">빠른 참고 자료</a>를 보면, 규칙에 해당하는 예제를 볼 수 있다. 국내는 <a href="http://www.kwacc.or.kr/Accessibility/Certification" target="_blank">국가표준 한국형 웹 콘텐츠 접근성 지침 2.1(KWCAG 2.1)</a>(2015년 3월 개정)을 따르고 있으며, 각 항목마다 세부 설명도 첨부되어 있다.

사이트가 웹 접근성을 잘 지켰는지 확인해보려면, 크롬 브라우저의 <a href="https://chrome.google.com/webstore/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn" target="_blank">Screen Reader</a>를 통해 확인해볼 수 있다. 무료에 음성도 제공하여 간편하다.

<br />

**참고**

<div style="font-size: 12px;">

- <a href="https://www.w3.org/WAI/fundamentals/accessibility-intro/ko" target="_blank">웹 접근성 소개 | W3C</a>
- <a href="https://www.w3.org/TR/WCAG22/" target="_blank">Web Content Accessibility Guidelines (WCAG) 2.2</a>

<!-- - <a href="" target="_blank"></a> -->

</div>
