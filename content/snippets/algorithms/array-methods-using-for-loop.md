---
title: array methods using for loop
tags: [algorithms, javascript]
date: '2022-11-04'
---


## Array.prototype.sort()

```js
// 작은 수 순으로 정렬
 for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] < arr[j]) {
        const target = arr[i]
        arr[i] = arr[j]
        arr[j] = target
      }  
    }
  }
```
