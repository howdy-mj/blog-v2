---
title: 'Node.js란?'
date: '2020-6-5'
tags: ['node']
draft: false
---

## Node.js란 무엇인가?

대부분 npm은 아래처럼 기술되어 있다.

- npm은 Node Package Manager의 줄임말로 Node.js 패키지 관리를 원활하게 도와주는 것이다.
- npm은 Node.js의 패키지 생태계이면서 세계에서 가장 큰 오픈 소스 라이브러리이다.

그렇다면 Node.js란 무엇일까?

<a href="https://nodejs.org/en/about/" target="_blank">공식 홈페이지</a>에서는 <span style="font-style: italic; font-weight: bold">Node.js®는 Chrome V8 JavaScript 엔진으로 빌드된 JavaScript 런타임이다. Node.js는 싱글 스레드 이벤트 루프 기반, Non-Blocking I/O 모델을 사용해 가볍고 효율적</span>이라 정의하고 있다.

그럼 다음의 키워드에 대해 하나씩 살펴보자.

- V8
- 자바스크립트 엔진
- 런타임
- Non-Blocking I/O
- 싱글 스레드
- 이벤트 루트 기반

### V8

<a href="https://v8.dev/" target="_blank">V8</a>은 C++로 작성된 구글의 오픈소스 고성능 자바스크립트와 WebAssembly(웹어셈블리: JavaScript API를 사용하여 최신 웹 브라우저에서 실행할 수 있는 새로운 유형의 코드, C/C++을 웹에서 동작할 수 있도록 컴파일 해줌) 엔진이다. Node.js의 런타임으로도 사용된다.

### 자바스크립트 엔진(JavaScript Engine)

자바스크립트 코드를 해석하고 실행하는 프로그램 또는 인터프리터<span style="font-size: 14px; font-style: italic">(\*interpreter: 프로그래밍 언어를 바로 실행하는 컴퓨터 프로그램 또는 환경)</span>이다. 위에 설명한 V8가 대표적인 자바스크립트 엔진 중 하나다.

### 런타임(Runtime)

런타임은 프로그램이 실행되고 있을 때 존재하는 곳을 말한다. 즉 컴퓨터 내에서 프로그램이 가동되면, 그것이 바로 그 프로그램의 런타임이다.  
원래 자바스크립트는 웹 브라우저에서만 사용할 수 있었지만, Node.js를 통해 서버 사이드 애플리케이션에서도 사용가능한 범용 개발 언어가 되었다. 그럼에도 자바스크립트는 여전히 웹에서 제일 많이 사용된다.

### 스레드(Thread)

스레드는 어떠한 프로그램 내에서, 특히 프로세스<span style="font-size: 14px; font-style: italic">(\*운영체제로부터 자원을 할당받는 작업의 단위)</span> 내에서 실행되는 흐름의 단위를 말한다. 일반적으로 한 프로그램은 하나의 스레드를 갖고 있지만, 프로그램 환경에 따라 둘 이상의 스레드를 동시에 실행할 수 있다.

![thread](https://user-images.githubusercontent.com/58619071/193441869-921c9683-892d-4ecf-8955-2aa1dd914ee8.png)

<p style="text-align: center; font-size: 10px">https://walkccc.github.io/CS/OS/Chap04/</p>

**스레드와 프로세스**

<span style="text-decoration: underline">프로세스</span>는 실행될 때 운영체제로부터 CPU 시간, 필요한 주소 공간, code, data, stack, heap의 구조로 된 독립된 메모리 영역 등 자원을 할당 받는다.
<span style="text-decoration: underline">스레드</span>는 한 프로세스 내에서 동작되는 여러 실행의 흐름으로, 프로세스 내의 주소 공간이나 자원들(ex. heap 공간 등)을 같은 프로세스내에 스레드끼리 공유하면서 실행된다.

<br>

자바스크립트는 <span style="text-decoration: underline; font-weight: bold">한번에 하나의 작업만 수행</span>할 수 있는 **싱글 스레드(Single-Thread)**이다. 싱글 스레드는 먼저 들어온 요청을 전부 처리할 때까지 다른 요청을 받지 못한다. 따라서 자바스크립트에서는 비동기적 작업이 필수이다.

### 이벤트 루프(Event Loop)

싱글 스레드이기 때문에, 발생하는 이벤트 순서대로 실행하기 위해 이벤트 루프라는 개념이 있다.

이벤트 루프는 작업을 요청하면서 그 작업이 완료되었을 때 어떤 작업을 진행할지에 대한 콜백 함수를 지정하여 **동작이 완료되었을 때 해당 콜백 함수를 실행되는 동작 방식**을 말한다. 즉, 이벤트 발생 시 호출되는 콜백 함수들을 관리하여 콜백 큐(Callback queue)에 전달하고, 이를 콜 스택(Call stack)에 넘겨준다.

```js
// 예시
console.log('Hi')
setTimeout(function cb1() {
  console.log('cb1')
}, 5000)
console.log('Bye')
```

자바스크립트는 위에서 아래로 실행되는데, `setTimeout()`은 비동기 콜백함수이기 때문에 Web APIs에 보관되어 있다가 시간이 지나 호출될 때 콜백 큐에 전달 후, 콜 스택에 넘겨준다.

<img src="https://miro.medium.com/max/1400/1*TozSrkk92l8ho6d8JxqF_w.gif" alt="event loop">
<p style="text-align: center; font-size: 10px">https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5</p>

발생한 이벤트에 대해서만 웹서버가 연결해주기 때문에 자원을 최소화할 수 있는 장점이 있다. 대부분의 웹서버는 사용자가 이벤트를 발생하기까지를 기다리면서 자원(대기시간/메모리)을 계속 소비한다.

### Blocking & Non-Blocking I/O

**I/O**는 Input과 Output이 관련된 작업으로 http, Database CRUD, Third party API, Filtsystem 등 데이터나 정보를 가공하는 프로세스이다.
이 외에도, 대표적인 Input 장치로 키보드, 마우스, Output 장치에는 프린터가 있다.

**Blocking I/O**는 어떤 이벤트(작업)가 발생하면 그 이벤트가 완료될 때까지 기다려야 한다. 이는 이벤트 루프가 Blocking 작업을 하는 동안 JavaScript 실행을 계속 할 수 없기 때문이다. 또한 메모리 버퍼에 데이터를 차지하게 되므로 메모리도 소비한다.

이러한 비효율성을 극복하고자 나온 것이 **Non-blocking I/O**이다. Non-Blocking은 비동기 방식으로 콜백 함수를 받는다. 또한, I/O 작업을 진행하는 동안 유저 프로세스의 작업을 중단하지 않고 모듈을 변환시켜 다른 작업을 하도록 준비를 한다. 그래서 속도가 동기식 보다 빠르고 메모리도 덜 차지한다.

만약 Blocking I/O 였다면, 우리가 키보드를 칠 때 옆에있는 애니메이션이 멈출 것이다. 하지만 Non-Blocking I/O이기 때문에 타이핑을 하면서도 애니메이션이 끊기지 않는다.

## Node.js는 JavaScript만 돌아갈까?

사실 나는 Node.js가 자바스크립트 엔진으로 빌드된 것이기 때문에 당연히 자바스크립트에서만 사용할 수 있을 줄 알았다. 하지만 이는 편협된 사고였다.

Node.js로 서버를 만들다 보면, npm 패키지에 포함되지 않은 기능이 필요하거나 더 좋은 성능(빠른 속도, 적은 메모리 등)이 필요 할 때가 있다. 이럴 때 다른 프로그래밍 언어(Java, C, C++, Python)를 활용할 수 있으며, 해당 언어의 라이브러리에도 연결할 수 있다.

어떻게 import해서 쓰는지는 <a href="https://nodejs.org/dist/latest-v14.x/docs/api/" target="_blank">Node.js v14.4.0 Documentation</a>을 참고하길 바란다.

<br>

### 번외) JavaScript가 싱글 스레드인 이유?

Node.js가 싱글 스레드인 이유는 자바스크립트가 싱글 스레드이기 때문이다.
그렇다면 자바스크립트는 왜 싱글 스레드로 만들어 졌을까?

처음에는 웹이 단순했기 때문에 빠른 처리를 위해 싱글 스레드로 만들거라 생각했다. 하지만 그 보다 예전 컴퓨터 사양을 보면 더 타당하게 추론할 수 있다.

최근 컴퓨터나 노트북의 코어 수는 보통 2개로, 4개의 스레드로 이루어져있다. 맥북의 경우 3 코어, 6 스레드이다.

<p style="font-size: 14px; font-style: italic; margin-bottom: 5px;"><span style="font-weight: bold">코어</span>: 단일 컴퓨팅 구성 요소에 들어 있는 독립된 CPU(중앙 처리 장치) 수를 나타내는 하드웨어 용어</p>
<p style="font-size: 14px; font-style: italic"><span style="font-weight: bold">스레드</span>: 스레드 또는 스레드 확장은 싱글 CPU 코어를 경유하거나 싱글 CPU 코어에 의해 처리될 수 있는 기본 순서로 구성된 명령어 시퀀스를 가리키는 소프트웨어 용어</p>

하지만 자바스크립트가 탄생했던 90년대 후반에는 듀얼 코어가 매우 획기적이고 희귀했다. 대부분은 1코어, 1스레드였다.

<p style="text-align: center;"><img src="https://user-images.githubusercontent.com/58619071/193441874-4e6edd1b-631f-45af-a185-3006f1fef4d8.PNG" style="width: 600px;"></p>

그렇기 때문에 누구든 웹 브라우저를 원활하게 사용할 수 있게 하기 위해 싱글 스레드로 만들었던게 아닐까 생각한다.

<br>

<p style="font-size: 13px; font-style: italic">피드백은 언제나 환영합니다!</p>

<br>

**참고**

<div style="font-size: 12px;">

- https://junspapa-itdev.tistory.com/3
- https://geonlee.tistory.com/92
- https://asfirstalways.tistory.com/43
- https://poiemaweb.com/js-browser
- https://edu.goorm.io/learn/lecture/557/%ED%95%9C-%EB%88%88%EC%97%90-%EB%81%9D%EB%82%B4%EB%8A%94-node-js/lesson/21763/%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EA%B8%B0%EB%B0%98-%EB%B9%84%EB%8F%99%EA%B8%B0-%EB%B0%A9%EC%8B%9D
- https://ko.wikipedia.org/wiki/%EC%8A%A4%EB%A0%88%EB%93%9C_(%EC%BB%B4%ED%93%A8%ED%8C%85)
- https://gmlwjd9405.github.io/2018/09/14/process-vs-thread.html
- https://medium.com/@vdongbin/javascript-%EC%9E%91%EB%8F%99%EC%9B%90%EB%A6%AC-single-thread-event-loop-asynchronous-e47e07b24d1c
- https://ui.toast.com/fe-guide/ko_DEPENDENCY-MANAGE/
- https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5
- https://tech.peoplefund.co.kr/2017/08/02/non-blocking-asynchronous-concurrency.html

</div>
