---
title: 'Redux에서 state를 업데이트하는 올바른 방법 (불변을 지켜야하는 이유)'
date: '2020-11-15'
tags: ['redux', react]
draft: false
---

## React가 렌더되는 경우

React가 렌더 되는 경우는 다음과 같다.

1. state나 props가 변경되었을 때
2. `forceUpdate()`를 실행했을 때
3. 부모 컴포넌트가 렌더링 되었을 때

이번 글에서 주목해야할 것은 1번이다. React는 state나 props가 변경되었을 경우에만 리렌더가 된다.

React는 어떻게 state나 props의 변경을 감지할 수 있을까? 먼저 자바스크립트 각 데이터 타입이 어떻게 변경 되는지 알아보자.

## 자바스크립트 데이터 타입

자바스크립트는 크게 원시 타입과 참조 타입으로 나뉜다.

### 원시 타입(Primitive Type)

원시 타입에는 문자열, 숫자, Boolean, null, undefined가 있으며 이는 변경 불가능한(immutable) 값이다.

```js
const str = 'hello'

console.log(str[0]) // output: 'h'
str[0] = 'w' // 에러가 뜨지 않음

console.log(str) // output: 'hello', 바뀌지 않음
```

비록 `str[0] = 'w'`로 했을 때 아무런 에러가 뜨지 않았지만, 다시 str를 콘솔로 찍어보니 바뀌지 않은 것을 확인할 수 있다. 이처럼 원시 타입은 변경 불가능하다.

<br />

### 참조 타입(Reference/Object Type)

참조 타입에는 함수, 객체, 배열이 있으며 변경 가능한(mutable) 값이다.

`배열의 변경`

```js
const fruits = ['apple', 'banana']

fruits.push('mango')
console.log(fruits) // output: ['apple', 'banana', 'mango']
```

`객체의 변경`

```js
const profile = { name: 'kmj' }

profile.name = 'howdy-mj'
profile.gender = 'female'
console.log(profile) // output: { name: 'howdy-mj', gender: 'female' }
```

이처럼 참조 타입은 바로 값이 바뀌는 것을 확인할 수 있다. 하지만 React, Redux는 해당 값이 변경 되지 않았다고 판단할 것이다. 밑의 예시를 보자.

```js
const num = [1, 2, 3]

num === num // output: true
num === [1, 2, 3] // output: false
```

분명 `num`과 `[1, 2, 3]`은 같지만, 자바스크립트는 두 개의 값이 다르다고 알려주고 있다. 이는 참조 타입이 메모리 주소를 '참조'하기 때문이다. (해당 내용은 나중에 새로운 글에서 자세히 작성해보겠다. 우선 밑의 핵심 요약을 보면 감을 잡을 수 있을거라 생각한다)

<br />

### 핵심 요약

원시 타입은 **워드 파일의 복사본을 만든것 처럼, 해당 값을 복사하면 서로가 독립된 값**을 가진다.

```js
var title = '마지막'
var final = title

title = '진짜 마지막'

console.log(title) // output: '진짜 마지막'
console.log(final) // output: '마지막'
```

이처럼 final은 처음에 복사한 title 값을 그대로 가져온 반면, title은 나중에 변경된 값으로 찍힌다.

참조 타입은 **만약 내가 구글 드라이브에 동기화된 파일을 수정하면, 다른 사람 것에서도 자동으로 변경**된다. 단, url 주소는 동일하다.

```js
const profile = { name: 'kmj' }
const copy = profile

profile.name = 'howdy-mj'

console.log(profile) // output: { name: 'howdy-mj' }
console.log(copy) // output: { name: 'howdy-mj' }
```

profile.name을 바꾸자, 기존의 profile과 copy 모두 바뀐 것을 확인할 수 있다.

이렇듯 참조 타입은 값이 바뀌어도 메모리(쉽게 말하면 url) 주소가 똑같기 때문에 React는 데이터가 변경된 것을 알아차리지 못한다. 따라서, 메모리 주소를 바꾸어 React에게 데이터가 변경되었다고 알려주어야 한다. 이는 Redux에서도 똑같이 작용한다.

## Redux의 state 변경 감지 코드

보통 redux를 사용하면,

```js
import { combineReducers } from 'redux'

const songsReducer = () => {
  return [
    { title: '소주 한잔', duration: '4:51' },
    { title: 'Memories', duration: '3:10' },
    { title: '널 좋아하나봐', duration: '3:44' },
    { title: '거짓말이라도 해서 널 보고싶어', duration: '3:48' },
  ]
}

const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === 'SONG_SELECTED') {
    return action.payload
  }
  return selectedSong
}

export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer,
})
```

위와 같은 형태로 모든 reducers를 `combineReducers로` 모아 store에 알려준다.

이때, [combineReducers](https://github.com/reduxjs/redux/blob/master/src/combineReducers.ts) 코드를 보면 Redux가 어떻게 state의 변화를 감지하는지 알 수 있다.

```ts{15, 18}
// ...
let hasChanged = false
const nextState: StateFromReducersMapObject<typeof reducers> = {}
for (let i = 0; i < finalReducerKeys.length; i++) {
  const key = finalReducerKeys[i]
  const reducer = finalReducers[key]
  const previousStateForKey = state[key] // 기존 reducer
  const nextStateForKey = reducer(previousStateForKey, action) // action이 발생한 후, 새로운 reducer
  if (typeof nextStateForKey === 'undefined') {
    // reducers의 return이 undefined이거나 비어있을 때 에러가 나는 이유
    const errorMessage = getUndefinedStateErrorMessage(key, action)
    throw new Error(errorMessage)
  }
  nextState[key] = nextStateForKey
  hasChanged = hasChanged || nextStateForKey !== previousStateForKey
  // 만약 nextState와 previousState가 달라질 경우, hasChanged는 true로 바뀜
}
hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length
// 만약 combineReducer안의 reducer의 개수가 기존과 달라질 경우, hasChange는 true로 바뀜
return hasChanged ? nextState : state // hasChanged가 true라면 새로운 state를 아니라면 기존 state를 반환
```

따라서, Redux에서 state를 바꾸는 가장 올바른 방법은 메모리 주소를 바꾸는 것이다.

위의 예시를 다시 가져와보자.

`배열의 변경`

```js
const fruits = ['apple', 'banana']

// 틀린 방법
fruits.push('mango')
fruits.pop()
fruits[0] = 'peach'

// 올바른 방법
[...state, 'mango']
fruits.filter(fruit => fruit !== 'mango')
fruits.map(fruit => fruit === 'apple' ? 'peach' : fruit)
```

`객체의 변경`

```js
const profile = { name: 'kmj' }

// 틀린 방법
profile.name = 'howdy-mj'
profile.gender = 'female'
delete profile.gender

// 올바른 방법
{ ...state, name: 'howdy-mj' }
{ ...state, gender: 'female' }
_.omit(state, 'gender') // lodash로 제거
```

이러한 번거로움을 없애고자 [immer](https://immerjs.github.io/immer/docs/introduction) 혹은 [immutable-js](https://immutable-js.github.io/immutable-js/) 라이브러리를 사용한다.

아니면 바로 immutable update logic이 있어 바로 state를 변경할 수 있도록 만들어진 [Redux Toolkit](https://redux-toolkit.js.org/)을 사용할 수도 있다.
