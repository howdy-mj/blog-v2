---
title: '자바스크립트 비동기 함수 알아보기'
date: '2020-6-26'
tags: ['javascript']
draft: false
---

<div style="font-size: 14px; font-style: italic;">
해당 글보다 2022.2.1에 새로 작성한 <a href="https://www.howdy-mj.me/javascript/asynchronous-programming/" target="_blank">자바스크립트의 비동기 프로그래밍</a> 글을 봐주세요!

</div>

## 비동기(Asynchronous) 함수란?

자바스크립트는 <a href="https://www.howdy-mj.me/node/about-node.js/#%EC%8A%A4%EB%A0%88%EB%93%9Cthread" target="_blank">싱글스레드</a>이기 때문에 한 번에 하나의 작업만 수행할 수 있다. 이를 해결하기 위해 **비동기**가 생겼다.

비동기란 특정 코드의 처리가 끝나기 전에 다음 코드를 실행할 수 있는 것을 뜻한다.

카페에 비유하자면, 만약 알바생이 한 명이라면 주문과 음료 제조를 동시에 하지 못한다. 하지만 여러 명이 있다면, 한명이 주문을 받으면 그 순서에 맞게 다른 사람이 음료 제조를 하여 주문과 음료 제조를 동시에 할 수 있다.

자바스크립트는 즉시 처리하지 못하는 이벤트들을 이벤트 루프에 모아 놓고, 먼저 처리해야하는 이벤트를 실행한다.

자바스크립트에서 가장 대표적인 비동기 처리 사례에는 `setTimeout()`이 있으며 일정 시간 뒤에 함수를 실행시키는 것이다.

```js
console.log('Start')

setTimeout(function() {
  console.log('5초 후 실행')
}, 5000)

console.log('End')
```

위와 같은 코드가 있다면 console에는 'Start', 'End'가 바로 찍히고 그 다음에 '5초 후 실행'이 찍힌다.

## 비동기 방식

자바스크립트에는 콜백 함수, Promise, async await 이렇게 크게 3가지 비동기 방식이 존재한다.

<br />

### 콜백(Callback) 함수

자바스크립트 비동기하면 '콜백 지옥'이라는 단어를 몇 번 봤을 것이다.

콜백 함수는 하나만 썼을 때는 간단하지만, 비동기로 함수의 매개 변수에 다른 콜백 함수가 중첩되어 사용된다면 그 코드를 보기에 굉장히 어렵고 유지보수도 힘들어진다.

```js
step1(function(value1) {
  step2(function(value2) {
    step3(function(value3) {
      step4(function(value4) {
        step5(function(value5) {
          step6(function(value6) {
            // Do something with value6
          })
        })
      })
    })
  })
})
```

이 코드에서 에러를 잡기 위해서는 각 콜백 함수마다 에러 처리를 써야하는데 그럼 코드량도 어마어마해진다.

```js
step1(function(err, value1) {
  if (err) {
    console.log(err)
    return
  }
  step2(function(err, value2) {
    if (err) {
      console.log(err)
      return
    }
    step3(function(err, value3) {
      if (err) {
        console.log(err)
        return
      }
      step4(function(err, value4) {
        // ,...
      })
    })
  })
})
```

<br />

### Promise

<span class="fix">위의 콜백 문제를 해결하기 위해 ES2015에 Promise가 도입되었다.</span> 콜백 함수의 error, success의 처리를 보다 간단하게 하기 위해 Promise가 생겼다.

Promise는 latency, delay(지연) 때문에 현재 당장 얻을 수 없지만 가까운 미래에 얻을 수 있는 데이터에 접근하기 위한 방법을 제공한다. Promise로 비동기 작업이 완료된 후 결과 값을 받을 수 있다.

### Promise 생성 및 상태

Promise는 `new Promise()`로 생성할 수 있으며, 종료될 때 세 가지 상태를 갖는다.

- Pending(대기): 이행하거나 거부되지 않은 초기 상태
- Fulfilled(이행): 완료되어 프로미스가 결과 값을 반환해준 상태
- Rejected(거부): 실패하거나 오류가 발생항 상태

<div style="text-align: center;">
<img src="https://mdn.mozillademos.org/files/8633/promises.png" alt="Promise">
<p style="font-size: 10px;">https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise</p>
</div>

Promise는 `resolve`와 `reject` 2개의 인자를 받으며, 비동기 처리가 성공하면 `resolve`가 호출되고, 실패하면 `reject`가 호출된다.

```js
const promise = new Promise((res, rej) => {
  setTimeout(() => {
    res('성공')
  }, 1000)
})
```

### Promise Chaining

Promise의 또 다른 특징은 체이닝(chaining)인데, `.then()`을 이용해서 여러개의 Promise를 이을 수 있다는 것이다.

```js
new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve(0)
  }, 2000)
})
  .then(function(result) {
    console.log(result) // output: 0
    return result + 10
  })
  .then(function(result) {
    console.log(result) // output: 10
    return result + 20
  })
  .then(function(result) {
    console.log(result) // output: 30
  })
```

`.then()`으로 앞의 return 값을 받아서 최종 console 값이 30이 된 걸 볼 수 있다.

이 외, Promise에서 에러 처리를 할 수도 있는데 보통 `catch()`를 사용한다.

```js
const promise = new Promise((res, rej) => {
  setTimeout(() => {
    rej('에러 발생')
  }, 1000)
})

promise.then(res => console.log(res)).catch(err => console.error(err))
// output: 에러 발생
```

그러나 Promise도 중첩으로 인해 콜백과 동일한 hell이 발생할 수 있다.

<br />

#### Quiz: 어떤게 먼저 실행될까?

```js
console.log('hi')

setTimeout(function() {
  console.log('0.1')
}, 100)

Promise.resolve()
  .then(function() {
    console.log('first')
  })
  .then(function() {
    console.log('second')
  })

setTimeout(function() {
  console.log('0')
}, 0)

console.log('end')
```

정답은

```
hi
end
first
second
0
0.1
```

순 이다.

`setTimeout()`과 `Promise`는 모두 비동기 함수이지만, setTimeout은 태스크 큐지만, Promise는 비동기 중에서도 먼저 실행되는 마이크로태스크 큐에 들어있기 때문에 먼저 실행이 된다. 이벤트 루프는 콜 스택이 비면 먼저 마이크로태스크 큐에서 대기하고 있는 함수를 실행 하고, 이후에 태스크 큐에서 대기하고 있는 함수를 가져와 실행한다.

<br />

### async await

async await를 ES2017에 등장한 것인데, <span class="fix">Promise의 메서드 체이닝을 더 깔끔한 코드를 작성할 수 있게끔 만들어진 것이다.</span> 콜백 hell을 없애줄 수 있게 되었다.

async await의 기본 구조를 아래와 같다.

```js
const getSomthing = async () => {
  await doSomething()
}
```

함수 앞에 `async`를 붙이고, 비동기 처리할 코드 앞에 `await`를 붙인다.

[MDN 예문](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function)을 가져와 보겠다.

```js
const asyncFunc = async () => {
  console.log('calling')
  await setTimeout(() => console.log('resolved'), 2000)
}

asyncFunc()
```

이렇게 실행하면 먼저 `calling`이 찍히고, 2초 뒤에 `resolved`가 찍히는 것을 볼 수 있다.

<br />

async await도 `try`와 `catch`로 성공 및 에러 여부를 감지할 수 있다.

Promise와 async await의 코드 차이를 한번에 보자.

`Promise`

```js
const promise = new Promise((res, rej) => {
  console.log('first')
  setTimeout(() => {
    res('2초 후')
  }, 2000)
  console.log('end of function')
})

promise.then(res => console.log(res)).catch(err => console.error(err))
```

`async await`

```js
const asyncFunc = async () => {
  try {
    console.log('first')
    await setTimeout(() => console.log('2초 후'), 2000)
  } catch (err) {
    console.log(err)
  }
  console.log('end of function')
}

asyncFunc()
```

두 함수의 결과 모두 `first`, `end of function`이 바로 찍히고, 2초 후에 `2초 후`가 console에 찍힌다.

같은 비동기 함수임에도 async await을 사용하면 코드를 더 깔끔하게 작성할 수 있다.

<br />

**참고**

<div style="font-size: 12px;">

- https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/
- https://joshua1988.github.io/web-development/javascript/js-async-await/
- https://velog.io/@yejinh/%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%8C%8C%ED%97%A4%EC%B9%98%EA%B8%B0
- https://librewiki.net/wiki/%EC%BD%9C%EB%B0%B1_%EC%A7%80%EC%98%A5
- https://www.daleseo.com/js-async-callback/
- https://ithub.tistory.com/223

</div>
