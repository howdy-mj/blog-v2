---
title: '자바스크립트 map, filter, reduce 동작 원리 알아보기'
date: '2021-2-23'
tags: ['javascript']
draft: false
---

자바스크립트에서 `map()`, `filter()`, `reduce()` 메소드는 배열 요소를 나열하거나, 특정 조건에 맞게 보여줄 때 자주 쓰인다.

이번 글에서는 해당 메소드들의 사용방법 보다는 동작 원리를 알아보고자 해당 메소드들이 for문으로 어떻게 돌아가는지 작성하려 한다.

```js
// 아래 예제에서 모두 해당 데이터를 사용한다
const listData = [
  {
    id: 1,
    text: 'hello',
  },
  {
    id: 2,
    text: 'everyone',
  },
  {
    id: 3,
    text: 'welcome',
  },
  {
    id: 4,
    text: 'to',
  },
  {
    id: 5,
    text: 'my blog',
  },
];
```

### map()

```js
// Array.prototype.map()
arr.map(callback(currentValue[, index[, array]])[, thisArg])
```

```js
const realMapResult = listData.map((list) => list.text);
console.log(realMapResult);
// output: ["hello", "everyone", "welcome", "to", "my blog"]
```

실제 `map()`과 같은 결과를 얻기 위해 아래 처럼 만들었다.

```js
const mockMap = (list) => {
  let result = []; // map()은 새로운 배열을 반환
  for (const i of list) {
    result.push(i.text);
  }
  return result;
};

const result = mockMap(listData);
console.log(result);
// output: ["hello", "everyone", "welcome", "to", "my blog"]
```

### filter()

```js
// Array.prototype.filter()
arr.filter(callback(element[, index[, array]])[, thisArg])
```

`filter()`와 `map()`의 구조는 거의 비슷하다.

```js
const realFilterResult = listData.filter((list) => list.text !== 'everyone');
console.log(realFilterResult);
// output: [
//   {
//     id: 1,
//     text: 'hello',
//   },
//   {
//     id: 3,
//     text: 'welcome',
//   },
//   {
//     id: 4,
//     text: 'to',
//   },
//   {
//     id: 5,
//     text: 'my blog',
//   },
// ]
```

`filter()`는 해당 조건에 맞는 요소가 아닌, 객체들을 반환한다.

```js
const mockFilter = (list) => {
  let result = []; // filter() 역시 새로운 배열을 반환
  for (const i of list) {
    if (i.text !== 'everyone') {
      result.push(i); // 해당 조건에 맞는 객체를 push
    }
  }
  return result;
};

const result = mockFilter(listData);
console.log(result);
// output: [
//   {
//     id: 1,
//     text: 'hello',
//   },
//   {
//     id: 3,
//     text: 'welcome',
//   },
//   {
//     id: 4,
//     text: 'to',
//   },
//   {
//     id: 5,
//     text: 'my blog',
//   },
// ]
```

### reduce()

```js
// Array.prototype.reduce()
arr.reduce(callback[, initialValue])
```

`reduce()` 메서드는 첫 번째 callback 함수에서 reducer() 함수를 실행하고 하나의 결과 값을 반환한다.

reducer() 함수는 네 개의 인자를 받는다.

1. 누산기accumulator (acc): `initialValue`가 있을 경우 `initialValue`이며, 없을 경우 콜백의 반환값을 누적
2. 현재 값 (cur)
3. 현재 인덱스 (idx): `initialValue`가 있을 경우 0, 아니면 1부터 시작
4. 원본 배열 (src)

```js
const array1 = [1, 2, 3, 4];
const resultOfReducer = array1.reduce((accumulator, currentValue, currentIndex, array) => {
  console.log('accumulator', accumulator); // output: 10 11 13 16
  console.log('currentValue', currentValue); // output: 1 2 3 4
  console.log('currentIndex', currentIndex); // output: 0 1 2 3
  console.log('array', array); // output: [1, 2, 3, 4]
  return accumulator + currentValue;
}, 10);
console.log(resultOfReducer); // output: 20
```

```js
// console로 확인해보자면 이와 같다
const resultOfReducer = array1.reduce((accumulator, currentValue, currentIndex, array) => {
  console.log('accumulator', accumulator);
  // output: 10 11 13 16
  // 두 번째 인자의 initialValue가 10이기 때문에 10에서 시작한다
  console.log('currentValue', currentValue);
  // output: 1 2 3 4
  // array1의 값을 하나씩 반환한다
  console.log('currentIndex', currentIndex);
  // output: 0 1 2 3
  // 현재의 index를 하나씩 반환 한다
  console.log('array', array);
  // output: [1, 2, 3, 4]
  // array1을 반환한다
  return accumulator + currentValue;
  // 두개의 값이 더한 채로 accumulator에 누적된다
}, 10);
console.log(resultOfReducer); // output: 20
```

reduce()로 문자열을 출력하면 아래와 같다.

```js
const resultOfReducer = listData.reduce((accumulator, currentValue, currentIndex, array) => {
  return accumulator + currentValue.text + ' ';
}, '');
console.log(resultOfReducer);
// output: "hello everyone welcome to my blog "
```

이를 for문으로 돌리면 아래처럼 작성할 수 있다.

```js
const mockReducer = (list) => {
  let result = '';
  for (const data of list) {
    result += data.text + ' ';
  }
  return result;
};
console.log(mockReducer(listData));
// output: "hello everyone welcome to my blog "
```

<br />

### 보완할 점

- 설명 보완
- find(), some()도 작성해보기

<br />

**참고**

<div style="font-size: 12px;">

- MDN

</div>
