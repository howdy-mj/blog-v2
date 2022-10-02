---
title: '자바스크립트의 비동기 프로그래밍'
date: 2022-2-1 00:00:00
category: 'javascript'
draft: false
---

최근 들어 자바스크립트에서 비동기를 잘 다루는게 얼마나 중요한지 더 절실하게 느낀다. 필자가 마주한 대부분의 골치 아픈 에러는 비동기로 인한 것이며, 왜 이때 실행되는지 혹은 왜 이렇게 늦게 실행되는지 등 원인 파악이 어려워 늘 애를 먹는다.

개발 공부를 막 시작했을 무렵 <a href="https://www.howdy-mj.me/node/about-node.js/" target="_blank">Node.js란?</a>과 <a href="https://www.howdy-mj.me/javascript/async/" target="_blank">자바스크립트 비동기 함수 알아보기</a> 글을 작성했었다. 당시에 내가 이해한 만큼만 썼다보니 겉핥기 식의 글로 무척이나 부끄럽지만, 공부했던 기록이니 삭제보다는 새로 작성해보려 한다.

<br />

### 싱글스레드인 자바스크립트의 비동기가 가능한 이유

사람은 혼자서 앞과 뒤를 동시에 볼 수 없고, 공부를 하면서 잠을 자는 등의 업무를 동시에 진행할 수 없다.

자바스크립트 역시 싱글 스레드로 한 번에 하나의 코드만 실행시킬 수 있다. 따라서 애니메이션이 지속됨과 동시에 상품 상세페이지로 이동하기 위한 클릭 등의 작업이 불가하다. 하지만 이 글을 읽는 사람 모두가 알듯이, 브라우저에서 이와 같은 업무가 가능하다. 왜 그럴까?

<details>
    <summary>용어: 스레드(Thread)</summary>
    <ul style="font-size: 14px;">
        <li>스레드는 어떠한 프로그램이 실행되는 작업을 말한다.</li>
        <li>싱글 스레드는 한 번에 하나의 작업만 수행할 수 있으며, 멀티 스레드는 한 번에 여러 개의 작업을 수행할 수 있다.</li>
    </ul>
</details>

이는 '이벤트 루프(Event Loop)' 덕분이다.

## 이벤트 루프

<div class="img-div">
  <img src="https://miro.medium.com/max/700/1*FA9NGxNB6-v1oI2qGEtlRQ.png" >
  <p>출처: https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5</p>
</div>

브라우저 환경을 그린 것인데, 그림에서도 알 수 있듯이 <span class="underline">이벤트 루프는 자바스크립트가 아닌 브라우저에 내장되어 있는 기능</span> 중 하나다. 즉, 자바스크립트는 싱글 스레드이지만, 브라우저에서는 이벤트 루프 덕분에 멀티 스레드로 동작하여 비동기 작업이 가능하다.

  <details>
    <summary>용어: Memory Heap(메모리 힙), Call Stack(콜 스택)</summary>
    <ul style="font-size: 14px;">
        <li>메모리 힙: 메모리 할당이 일어나는 곳</li>
        <li>콜 스택: 힙에 저장된 객체를 참조하여, 호출 된 코드(함수)의 정보를 저장하고 실행하는 곳</li>
        <li>더 자세한 내용은 추후 실행 컨텍스트 글에서 다뤄보겠다.</li>
    </ul>
  </details>

하지만 만약 콜 스택에 `while(true)`나 React `useEffect()`의 두 번째 인자를 작성하지 않아 무한 호출되는 함수가 존재한다면, 콜 스택이 감당할 수 있는 범위를 초과하면 브라우저의 동작이 멈춰버리니 주의해야 한다.

이벤트 루프는 실행 할 함수를 관리하는 역할로 콜 스택과 큐(Queue)의 함수를 계속 확인한다. 만약 콜 스택이 비어 있고 큐에 대기 중인 함수가 있다면, 순차적으로 큐에 대기중인 함수를 콜 스택으로 이동시킨다. 그리고 이렇게 반복되는 매 순회(Iteration)을 tick이라 부른다.

```js
console.log('Hi')
setTimeout(function cb1() {
  console.log('cb1')
}, 5000)
console.log('Bye')
```

위의 함수를 실행한 순서는 아래와 같다.

<div class="img-div">
  <img src="https://miro.medium.com/max/1400/1*TozSrkk92l8ho6d8JxqF_w.gif" alt="event loop">
  <p>https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5</p>
</div>

예상한 것과 달리, 콜 스택에서 바로 큐로 넘어가는게 아니라 중간에 Web APIs를 한 번 거쳐 큐로 넘어간다. 이는 어떤 함수나 이벤트가 종료될 때까지 시간이 오래 걸릴 수 있기 때문에, 자바스크립트 엔진이 직접 처리하는 것이 아니라 브라우저에 위임한다. 위 예제에서는 `setTimeout()` 함수가 5초 뒤에 실행되기 때문에, Web APIs가 해당 연산을 마치고(5초 후) 콜 스택에서 바로 실행될 수 있는 상태가 되었을 때 큐에 등록한다.

## 큐 (Queue)

큐는 먼저 들어간 데이터가 먼저 나오는 특징(FIFO, First In First Out)을 갖고 있다.

<div class="img-div center">
  <img src="https://user-images.githubusercontent.com/58619071/193440783-e789bde8-a402-4cef-836a-b996883cffff.gif" alt="프레임" style="width: 200px">
  <p>https://garychang.gitbook.io/data-structure/lecture1-stack-and-queue/lecture1.2-queue-lie</p>
</div>

<details>
    <summary>용어: 스택(Stack)</summary>
    <div style="font-size: 14px;">
      <li>스택은 나중에 들어간 데이터가 먼저 나오는 특징(LIFO, Last In First Out)의 특징을 갖고 있다.</li>
      <div class="img-div center">
       <img src="https://user-images.githubusercontent.com/58619071/193440784-92b21505-d648-4827-be9c-1dee2ff894c0.gif" alt="프레임" style="width: 200px">
        <p>https://garychang.gitbook.io/data-structure/lecture1-stack-and-queue/lecture1.1-stack-dui</p>
      </div>
      <li>그래서 위에 콜 스택은 나중에 들어간 데이터가 먼저 빠지고, 큐는 우->좌로 실행된다.</li>
    </div>
</details>

<br/>

큐는 크게 태스크 큐(Task Queue), 마이크로 태스크 큐(Micro Task Queue), rAF 큐(Request Animation Frame Queue)로 나뉜다.

<div>

- **태스크 큐(Task Queue)**: `setTimeout()`, `setInterval()`과 같은 비동기 함수의 콜백 함수 또는 이벤트 핸들러가 대기하는 곳이다.

- **마이크로 태스크 큐(Micro Task Queue)**: `Promise()`의 후속 처리 메서드의 콜백 함수나 `MutationObserver()`가 대기하는 곳이다.

- **rAF 큐(Request Animation Frame Queue)**: `requestAnimationFrame()`처럼 애니메이션을 업데이트하는 콜백 함수가 대기하는 곳이다.

</div>

### 우선 순위

각 큐에 대한 실행 우선 순위는 **마이크로 태스크 큐 > rAF 큐 > 태스트 큐** 순서이다. 이벤트 루프는 해당 순서대로 대기하고 있는 함수들을 보고 있다가 차례대로 콜 스택에 가져와 실행한다.

```js
console.log('처음')

setTimeout(() => {
  console.log('setTimeout - 태스크 큐')
}, 0)

Promise.resolve()
  .then(() => {
    console.log('promise1 - 마이크로 태스크 큐')
  })
  .then(() => {
    console.log('promise2 - 마이크로 태스크 큐')
  })

requestAnimationFrame(() => {
  console.log('requestAnimationFrame - rAF 큐')
})

console.log('마지막')
```

```txt
처음
마지막
promise1 - 마이크로 태스크 큐
promise2 - 마이크로 태스크 큐
requestAnimationFrame - rAF 큐
setTimeout - 태스크 큐
```

따라서 위와 같은 결과가 나와야하지만 실제로는 그렇지 않았다.

<iframe src="https://codesandbox.io/embed/queue-l92vz?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:350px; border:0; border-radius: 4px; overflow:hidden;"
title="queue"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

몇 번의 새로고침을 반복하다보면 `setTimeout()`이 `requestAnimationFrame()`보다 먼저 console에 찍히는걸 볼 수 있다.

구글링을 해보면 브라우저에 따라 태스크 큐와 rAF 큐의 실행 순서가 달라질 수 있다고 했지만, 같은 크롬에서 테스트했을 때 발생한 문제이기 때문에 다른 원인이 있다고 생각한다.

아직 정확한 이유는 모르지만, 필자는 `requestAnimationFrame()`가 브라우저가 리페인트 하기 바로 직전에 호출되기 때문이라 추측한다. _(추후 내용 보충)_

<div class="callout">

#### 만약 긴급하게 실행해야 하는 함수가 존재한다면?

태스크 큐보다 먼저 실행해야하는 함수가 존재한다면, `queueMicrotask()`로 우선 순위를 끌어올릴 수 있다.

```js
const callback = () => console.log('일반 콜백 함수 호출')
const urgentCallback = () => console.log('---> 긴급 콜백 함수 호출')

console.log('시작')
setTimeout(callback, 0)
queueMicrotask(urgentCallback)
console.log('종료')
```

```
시작
종료
---> 긴급 콜백 함수 호출
일반 콜백 함수 호출
```

</div>

<br>

### setTimeout(setInterval)의 문제

먼저 알아야 할 점은, 대부분의 브라우저는 <a href="https://www.w3.org/TR/hr-time/" target="_blank">W3C 권장사항</a>에 따라 디스플레이 주사율과 일치한 횟수로 콜백 함수를 호출한다. 그래서 보통 60FPS로 화면을 렌더링하고, 이는 콜백의 수가 보통 1초에 60회, 16ms(0.016초)에 하나씩 실행된다.

<div class="img-div center">
  <img src="https://user-images.githubusercontent.com/58619071/193440782-02462a51-6d33-4084-8935-b0d21714a5e3.gif" alt="프레임" style="width: 200px">
  <p>https://namu.wiki/w/FPS</p>
</div>

<details>
    <summary>용어: FPS(Frames Per Second), 프레임</summary>
    <ul style="font-size: 14px;">
      <li>FPS는 초당 프레임을 말한다.</li>
      <li>동영상은 정지된 사진의 연속으로도 볼 수 있는데, 이처럼 각각의 정지된 사진을 '프레임'이라 부른다. 그리고 이러한 사진이 1초에 몇 장 보이는지를 일컬어 프레임률이라 하며 단위는 'fps' 혹은 'Hz'를 쓴다.</li>
      <li>일반적인 모니터가 초당 60번의 갱신 주기(Hz)를 갖고 있기 때문에 W3C에서도 60FPS를 권장한게 아닌가 생각한다.</li>
    </ul>
</details>

`requestAnimationFrame()`이 나오기 전에는 `setTimeout()`이나 `setInterval()`을 중첩으로 사용하여 애니메이션 작업을 했다. 따라서 함수 실행이 프레임(16ms)마다 끊기지 않고 연이어 실행되어야 유저에게 부드럽게 재생되는 애니메이션 효과를 낼 수 있다.

그러나 `setTimeout()`과 `setInterval()` 모두 시간 기반의 함수가 아니며, 앞의 콜백 함수가 종료 시에 실행된다. 게다가 만약 컴퓨터 성능이 안 좋다면, 프레임(16ms) 시작 때 함수 실행이 늦어져 화면과 싱크가 맞지 않아 애니메이션이 끊겨 보이는 현상(ex. 위 gif의 15FPS)이 일어난다.

<div class="img-div center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/iq5yVSd4wRskoD8GywR7.jpg?auto=format&w=1600" alt="setTimeout fires">
  <p>https://web.dev/optimize-javascript-execution/</p>
</div>

반면 <a href="https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame" target="_blank">requestAnimationFrame()</a>는 콜백을 실행하는 시점에 `DOMHighResTimeStamp`가 전달되어 시간 기반으로 작동하는 함수로 프레임(16ms) 시작 때 실행을 보장한다. 때문에 무한 스크롤을 구현할 때 `setTimeout()` 기반의 throttle 대신 `requestAnimationFrame()`을 사용해야 한다.

<!-- <br /> -->

<!-- <iframe src="https://codesandbox.io/embed/settimeout-raf-cifhw?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:200px; border:0; border-radius: 4px; overflow:hidden;"
     title="setTimeout-rAF"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

위의 코드는 '시작' 버튼을 누르면, 바로 1씩 증가하는 counter를 만든 것이고, 각각의 id가 500이상이 되면 동작을 멈추게 만들었다.

확인해보면, rAF는 언제나 500에서 멈추지만, setTimeout은 500 이전의 숫자에서 랜덤하게 멈춘다. -->

## 비동기 프로그래밍(Asynchronous Programming)

비동기 처리는 현재 실행중인 것이 완료되지 않더라도 다음 코드를 실행하는 방식을 말한다.

동시에 여러 작업을 수행할 수 있다는 큰 장점이 있지만, 비동기 함수가 많을 경우 어떤 코드가 먼저 실행되는지 알 수 없고 가독성이 나쁘다는 평을 들어왔다. 이런 문제를 해결하기 위해 여러 비동기 프로그래밍 방법이 생겼고 크게 `콜백(Callback) 함수`, `Promise`, `async/await` 패턴이 존재한다.

해당 글에서는 각각의 패턴이 어떤 형태이며, 어떤 문제점이 존재하는지 등에 대해 간단히 다루고 다른 글에서 사용법에 대해 자세히 다뤄보겠다.

### 콜백(Callback) 함수

콜백은 다른 함수의 인자로 함수를 넘기는 것을 말한다. 콜백 함수로 비동기 프로그래밍을 짤 수 있지만, 모든 콜백 함수가 비동기이진 않다. 예를 들어 `map()`, `filter()`의 첫 번째 인자로 들어가는 콜백 함수는 동기식으로 호출된다.

```js{20}
// 해당 코드는 [자바스크립트 Deep Dive, 이웅모 (2020)]의 프로미스(p842)에서 가져왔습니다.

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const getPosts = url => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.send()

  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.response))
    } else {
      console.error(`${xhr.status} ${xhr.statusText}`)
    }
  }
}

const posts = getPosts(POSTS_URL)
console.log('posts: ', posts)
```

여기서 post를 console로 찍었을 때 어떤 결과가 나올까?

`xhr.onload()`가 비동기로 동작하기 때문에 post는 <span class="return">undefined</span>라는 결과를 반환한다. 이렇듯 비동기로 동작하는 함수는 외부에서 그 값을 바로 참조하지 못하여, 무조건 콜백 함수 내부에서 그 처리를 진행해야 한다.

```js
const getPosts = (url, whenSuccess, whenFail) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.send()

  xhr.onload = () => {
    if (xhr.status === 200) {
      whenSuccess(JSON.parse(xhr.response))
    } else {
      whenFail(xhr.status, xhr.statusText)
    }
  }
}

const handlePosts = response => {
  // ...
}

const errorHandling = (status, statusText) => {
  // ...
}

const posts = getPosts(POSTS_URL, handlePosts, errorHandling)
```

따라서 콜백의 후속 처리를 모두 그 콜백 함수 내에서 처리해야 하기 때문에, 위처럼 다시 콜백함수를 넘기는 수 밖에 없게 되었다.

그런데 만약 해당 콜백 함수에 또 예외 처리를 해야 하거나, 여러 에러 상황에 각기 다른 조치를 취해야 한다면 어떻게 해야할까? 끔찍하게도 이것 역시 또 다른 콜백함수로 넘겨야 한다. 그리고 이런 상황이 곧 **'콜백 헬(callback hell)'**이라는 단어로 불러졌다.

### Promise

Promise도 콜백 헬을 해결할 수 없었지만, 비동기 함수의 후속 처리가 콜백 함수에 비해 다루기 훨씬 쉬워졌다.

```js{19}
const getPostsWithPromise = url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open('GET', url)
    xhr.send()

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response))
      } else {
        reject(xhr.status, xhr.statusText)
      }
    }
  })
}

const posts = getPostsWithPromise(POSTS_URL)
console.log('posts: ', posts)
```

콜백 함수와 달리 post를 console로 찍어보면 <span class="return">Promise {\<pending>}</span>이란 값이 나온다. 비동기 함수가 수행되기 전이기 때문에 resolve나 reject가 아닌 pending이 반환된 것이다.

```js
posts
  .then(res => console.log(res))
  .catch(err => console.error(err))
  .finally(() => console.log('끝'))
```

그리고 Promise로 생성된 posts는 각각 then, catch, finally로 후속 처리가 가능하다.

<a href="https://fetch.spec.whatwg.org/" target="_blank">fetch()</a> 함수가 바로 Promise 기반으로 만들어진 HTTP 요청 전송 기능인 클라이언트 사이드 Web API다. 쓰임새도 Promise와 매우 유사하다.

```js
fetch(POSTS_URL)
  .then(res => console.log(res))
  .catch(err => console.error(err))
  .finally(() => console.log('끝'))
```

Promise는 비동기 함수 처리를 쉽게 할 수 있다는 것 외에도, 여러 비동기 처리를 병렬 처리할 때 사용하는 `Promise.all()`, 여러 비동기 처리를 다룰 때 가장 먼저 fulfilled된 처리 결과를 반환하는 `Promise.race()` 등 일반 콜백 함수로 다루는 것보다 보다 더 다양한 작업이 가능하다.

### async/await

그러나 Promise는 여전히 콜백 함수를 사용하기 때문에, 콜백 헬의 문제를 해결할 수 없었다. ES6에 <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Generator" target="_blank">제너레이터</a>가 도입되어 비동기를 동기처럼 구현했지만, 코드가 장황해지고 가독성이 나빠졌다. 이에 뒤따라 ES8에서 보다 간단하고 가독성 좋게 비동기 처리를 동기 처리처럼 구현하는 async/await가 도입되었다.

async/await는 Promise를 기반으로 동작하며, then/catch/finally와 같은 후속 처리 메서드 없이 마치 동기 처리처럼 사용할 수 있다.

```js
const getPostWithAsync = async url => {
  try {
    const response = await fetch(url)
    return await response.json() // 혹은 다른 형태로 데이터 전처리 가능
  } catch (err) {
    console.err(err)
  } finally {
    console.log('끝')
  }
}

const posts = getPostWithAsync(POSTS_URL)
console.log('posts: ', posts)

posts.then(console.log)
```

콜백 함수나 Promise는 무조건 api를 호출한 후, 또 다른 콜백 함수를 실행하여 데이터의 처리가 가능했지만, async/await는 해당 함수 내부에서 바로 동기 처리처럼 데이터를 수정할 수 있다. 또한 try/catch 문으로 에러 처리도 훨씬 수월하다. _(추후 콜백 함수나 Promise에서는 try/catch 문이 어려운지 작성해보겠다)_

<br />

_추후 추가할 내용_

- rAF 큐와 태스크 큐의 우선순위가 매번 달라지는 이유
- 콜백함수, Promise, async/await에서의 try/catch 문

<br />

**참고**

<div style="font-size: 12px;">

- <a href="https://helloworldjavascript.net/pages/285-async.html" target="_blank">비동기 프로그래밍 | JavaScript로 만나는 세상</a>
- <a href="https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf" target="_blank">How JavaScript works: an overview of the engine, the runtime, and the call stack</a>
- <a href="https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5" target="_blank">How JavaScript works: Event loop and the rise of Async programming + 5 ways to better coding with async/await</a>
- <a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/" target="_blank">Tasks, microtasks, queues and schedules</a>
- <a href="https://developer.mozilla.org/ko/docs/Web/API/HTML_DOM_API/Microtask_guide" target="_blank">JavaScript의 queueMicrotask()와 함께 마이크로태스크 사용하기</a>
- 모던 자바스크립트 Deep Dive, 이웅모 (2020)
- <a href="https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke#syntax" target="_blank">JavaScript Visualized: Promises & Async/Await</a>
- <a href="https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame" target="_blank">window.requestAnimationFrame() | MDN</a>
- <a href="https://stackoverflow.com/questions/38709923/why-is-requestanimationframe-better-than-setinterval-or-settimeout" target="_blank">Why is requestAnimationFrame better than setInterval or setTimeout | StackOverFlow</a>
- <a href="https://developers.google.com/web/fundamentals/performance/rendering/optimize-javascript-execution?hl=ko" target="_blank">자바스크립트 실행 최적화 | Google Developers</a>
- <a href="https://www.w3.org/TR/animation-timing/#dom-windowanimationtiming-requestanimationframe" target="_blank">Timing control for script-based animations | W3C</a>

</div>
