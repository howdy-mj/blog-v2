---
title: 'Debounce와 Throttle'
date: '2022-1-26'
tags: ['javascript']
draft: false
---

디바운스(Debounce)와 쓰로틀(Throttle)은 예전부터 들어왔지만, 실무에서는 직접 구현하기 보다 lodash를 사용했기 때문에 정확히 어떻게 동작 되는지 몰랐다.

해당 글에서는 간단하게 `useDebounce`와 `useThrottle` hooks를 만들어서 설명해보려 한다.

## 언제 사용하는가?

debounce와 throttle 모두 특정 함수의 호출 횟수를 줄여서, 웹 성능이 저하 되는 것을 방지하기 위해 사용된다.

예를 들어, 브라우저 크기 조절이나 지도에서 마커가 이동 중에는 주소가 변경되지 않는 것, 입력 창에 어떤 제품을 입력하고 몇 초 지나서 하단에 추천 검색어가 뜨는 것, 여러 번 클릭했음에도 한 번만 실행되는 것 등, 모두 어느 정도의 텀을 두고 유저에게 보여진다. 이처럼 주로 api 호출이나 DOM 이벤트의 실행을 줄일 때 사용된다.

<br/>

필자가 생각한 '간단한' 정의는 아래와 같으며, 아래 hooks 예시를 통해 자세히 알아보자.

- **debounce**: 일정 시간 이후에 함수를 호출한다.

- **throttle**: 일정 시간마다 함수를 호출한다.

_(아래 예시에서 일정 시간은 모두 1초다)_

<br />

### useDebounce

<iframe src="https://codesandbox.io/embed/usedebounce-gu0mx?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;"
title="useDebounce"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

위 예시처럼, input에 입력한 text는 바로 바뀌지만, debounceText는 입력한 후에 일정 시간 이후에 바뀌는 것을 볼 수 있다.

<span class="file-location">useDebounce.ts</span>

```ts
import { useEffect, useState } from 'react'

const useDebounce = (value: string, time: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timerId = setTimeout(() => {
      // 일정 시간 이후에 변경한다
      // 변경 사항이 생긴다면, 그로부터 time을 다시 센다
      return setDebouncedValue(value)
    }, time)
    // 기능 수행을 완료하면 구독을 해제한다
    return () => clearTimeout(timerId)
  }, [value, time])

  // 변경된 값을 return
  return debouncedValue
}

export default useDebounce
```

<span class="file-location">App.tsx</span>

```ts
const debouncedText = useDebounce(text, 1000)
```

`useDebounce`는 변경된 값을 return하기 때문에 변수에 할당해서 사용할 수 있다. 여기서 주의할 점은, **text에 변경사항이 생긴다면 그로부터 일정 시간이 지나야 함수를 호출한다**는 점이다.

### useThrottle

<iframe src="https://codesandbox.io/embed/usethrottle-w1xb6?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;"
title="useThrottle"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

그에 반해, throttle은 일정 시간마다 함수를 호출한다.

<span class="file-location">useThrottle.ts</span>

```ts
import { useEffect, useState } from 'react'

const useThrottle = (callbackFunc: () => void, time: number): any => {
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    if (!isWaiting) {
      callbackFunc()
      setIsWaiting(true) // 함수가 호출되자마자 true로 바꾸어 호출 중단

      setTimeout(() => {
        // 특정 시간 이후에 false로 바꾸어 재호출
        setIsWaiting(false)
      }, time)
    }
  }, [callbackFunc, isWaiting, time])
}

export default useThrottle
```

형태도 useEffect와 비슷하다.

<span class="file-location">App.tsx</span>

```ts
useEffect(() => {
  const interval = setInterval(() => setCount(count => count + 1), 100)
  return () => clearInterval(interval)
}, [])

useThrottle(() => {
  setThrottledCount(throttledCount + 1)
}, 1000)
```

debounce와 달리 연속적으로 api를 호출(ex. 추천검색어, 무한스크롤)이 필요할 때 일정 시간마다 호출하여 실행한다.

`useThrottle`은 최소한의 스펙을 구현하기 위해 작성한 것으로 추후 무한스크롤 관련 글 작성할 때 더 다뤄볼 예정이다.

## 문제점

debounce와 throttle 모두 `setTimeout`이라는 Web API에 의해 실행된다. 그러나 `setTimeout`, `setInterval`은 정확한 지연시간을 보장해주지 않는다. 실제로 `useThrottle` 예제를 몇 번 새로고침하다보면 count와 throttleCount의 숫자가 불규칙하게 변하는 것을 확인할 수 있다. 때문에 정교한 작업의 개발이 필요하다면 다른 방법을 찾아봐야 한다.

<br />

**참고**

<div style="font-size: 12px;">

- <a href="https://css-tricks.com/the-difference-between-throttling-and-debouncing/" target="_blank">The Difference Between Throttling and Debouncing</a>
- <a href="https://pks2974.medium.com/throttle-%EC%99%80-debounce-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-2335a9c426ff" target="_blank">Throttle 와 Debounce 개념 정리하기</a>
- <a href="https://webclub.tistory.com/607" target="_blank">디바운스(Debounce)와 스로틀(Throttle ) 그리고 차이점</a>

</div>
