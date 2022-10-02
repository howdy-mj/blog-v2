---
title: 'Flux(플럭스)'
date: '2020-7-19'
tags: ['react']
draft: false
---

## Flux란?

Flux(플럭스)는 데이터 흐름을 한 방향으로 유지하기 위해 페이스북에서 설계한 디자인 패턴<span style="font-size: 14px">(\*객체 지향 프로그래밍 설계를 할 때 자주 발생하는 문제들을 해결하기 위해 사용하는 패턴)</span>이다.

_그렇다면 페이스북은 왜 Flux를 만들었을까?_

Flux 이전에는 다양한 MVC 디자인 패턴이 웹 개발에서 주를 이루고 있었다.

<br />

### MVC

<p style="text-align: center;font-size: 14px"><img src="https://mdn.mozillademos.org/files/16042/model-view-controller-light-blue.png" alt="MVC pattern"/>https://developer.mozilla.org/ko/docs/Glossary/MVC</p>

MVC란 Model View Controller의 약자로 어플리케이션을 세 가지 역할로 나눈 것이다.

사용자가 Controller를 조작하면 Controller는 Model을 통해서 데이터를 가져오고 그에 기반하여 View가 바뀐 화면을 사용자에게 보여준다.

각자 자기가 맡은 역할에 집중할 수 있지만, 한 Model은 다수의 View들을 가질 수 있고, 반대로 Controller를 통해 한 View에 여러 Model이 연결될 수도 있다.

따라서 프로젝트가 커질 경우, Model과 View의 전후 관계를 따지기가 매우 힘들다.

페이스북의 경우, 알림이 떠서 알림창에 들어가보면 아무것도 없는 현상이 발생했다. 얽혀있는 데이터들이 너무 많았기 때문에 정확히 어떤 이유 때문에 알림이 울렸는지 찾을 수 없어서 단 방향으로 유지할 수 있는 Flux 디자인 패턴이 나오게 되었다.

<br />

### Flux 구조

<p style="text-align: center;font-size: 14px; color: gray"><img src="https://facebook.github.io/flux/img/overview/flux-simple-f8-diagram-with-client-action-1300w.png" alt="MVC pattern"/>https://facebook.github.io/flux/docs/in-depth-overview</p>

Flux는 단방향 데이터 흐름을 갖고 있다.

- Action: 사용자의 요청을 표현
- Dispatcher: 중앙 제어 컴포넌트로 액션을 가져와 스토어에게 알려줌
- Store: 상태(state)를 저장하는 곳
- View: 변경된 것을 화면에 반영

만약 사용자가 어떤 버튼을 눌러 자신의 정보를 제출했다고 가정해보자.

이 버튼을 누르는 행위를 액션(action)이라 하며, 액션은 변화를 일으키는 명령과 데이터를 디스패처(dispatcher)에게 알려준다. 그러면 디스패처는 스토어(store)에 있는 상태 값을 변경하라고 스토어에게 알려주며, 변경 된 후, 뷰(view)를 갱신한다.

### Flux 구현

여러가지 플럭스 구현이 존재한다.

- [Flux(플럭스)](https://github.com/facebook/flux): 해당 글에서 소개한 디자인 패턴이다.
- [Redux(리덕스)](https://redux.js.org/): 객체가 아닌 함수를 통해 모듈화를 달성하는 플럭스와 비슷한 라이브러리이다.
- [MobX(몹엑스)](https://mobx.js.org/README.html): 옵저버블(observable)을 사용해 상태 변화에 반응하는 반응형(reactive) 상태 관리 라이브러리이다.
- [Reflux(리플럭스)](https://github.com/reflux/refluxjs): 액션, 스토어, 뷰에 초점을 맞춰 단방향 데이터 흐름을 더 단순하게 접근한다.
- [Flummox(플럼목스)](https://github.com/acdlite/flummox): 자바스크립트 클래스를 상속해서 플러긋 모듈을 만들게 해주는 플럭스 구현이다.

<br />

**참고**

<div style="font-size: 12px;">

- https://facebook.github.io/flux/
- https://opentutorials.org/course/697/3828
- https://velog.io/@ljinsk3/Concept-MVC-Pattern
- 러닝 리액트, 한빛미디어, p237

</div>
