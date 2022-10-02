---
title: '자바스크립트의 형 변환(Type Conversions)'
date: '2022-03-21'
tags: ['javascript']
draft: false
---

개발하다 보면 string을 number로, number를 string으로 혹은 boolean으로 형 변환을 해야 할 때가 존재한다.

형 변환을 하는 방법에는 여러 개가 있는데 각각의 차이점이 무엇인지 궁금해서 찾아보았다.

<p class="intro">아래 코드 모두 console을 생략하고, 우측의 주석이 반환된 결과 값이다.</p>

## string으로 변환

가장 간단한 방법으로는 `+`가 있다.

```js
1 + '1' // '11'
```

하지만 `undefined`나 `null`, `NaN` 같은 값들도 그대로 문자열로 반환하여 따로 예외 처리가 필요하다.

```js
1 + '2' + undefined // '12undefined'
2 + '2' + null // '22null'
3 + '2' + NaN // '32NaN'
```

### String()

```js
String(1) // '1'
String(true) // 'true'
String(false) // 'false'
String(null) // 'null'
String(undefined) // 'undefined'
```

### Object.prototype.toString()

```js
true.toString() // 'true'
false.toString() // 'false'

const one = 1
one.toString() // '1'
```

`toString()`은 인자로 전달한 그 숫자의 진수로 변환해준다. 만약 아무것도 전달하지 않으면 기본 값으로 10진수로 변환한다.

주의할 점이 있다면, 숫자, `null`, `undefined`를 바로 호출하면 SyntaxError가 뜬다.

```js
1.toString(); // Uncaught SyntaxError: Invalid or unexpected token

null.toString() // Error: Cannot read properties of null
undefined.toString() // Error: Cannot read properties of undefined
```

반면 빈 객체, 빈 배열을 하면 예상 외의 값이 반환된다.

```txt
({}.toString()) // '[object Object]'
([]).toString() // ''
```

_추후 내용 추가_

## number로 변환

가장 간단한 방법으로는 `/`나 `*` 가 있다.

`true`는 1로, `false`와 `null` 0으로 묵시적 형 변환을 한 다음에 계산된다.

```js
// 1. '/' 사용
'6' / 2 // 3
true / 2 // 0.5
false / 2 // 0
null / 2 // 0

// 2. '*' 사용
'6' * 2 // 12
true * 2 // 2
false * 2 // 0
null * 2 // 0
```

하지만 숫자 외 문자가 포함된 문자열이나, `undefined`는 인식하지 못하고 <span class="return">NaN</span>을 반환한다.

```js
'hello' / 2 // NaN
'he1' / 2 // NaN

undefined / 2 // NaN
undefined * 2 // NaN
```

단, `null`은 결과 값이 조금 다르다.

```js
2 * null // 0
null / 2 // 0

2 / null // Infinity
```

### Number()

빈 문자열, 빈 배열, `null`은 <span class="return">0</span>을 반환하고, 숫자 외의 문자가 포함된 문자열, `undefined`, 빈 객체는 <span class="return">NaN</span>을 반환한다.

```js
Number('123') // 123
Number('123.1') // 123.1

Number(true) // 1
Number(false) // 0

// 0 반환
Number('')
Number([])
Number(null)

// NaN 반환
Number('howdy')
Number('mj123')
Number('123kim')
Number(undefined)
Number({})
```

### parseInt()

위의 예제를 그대로 가져와서 실행해보면 아래와 같은 결과가 나온다.

```js
parseInt('123') // 123
parseInt('123.1') // 123

// NaN 반환
parseInt(true)
parseInt(false)

// NaN 반환
parseInt('')
parseInt([])
parseInt(null)

// NaN 반환
parseInt('howdy')
parseInt('h123')

parseInt('123kim') // 123
```

falsy, truthy와 상관없이 숫자가 들어간 것만 반환해주며, 정수로만 변환해준다.

그리고 앞에 띄어쓰기가 존재하는 숫자+문자 혼합일 경우, 숫자인 곳 까지만 정수로 변환한다.

```js
parseInt(' 3 ') // 3
parseInt(' 3.2 ') // 3
parseInt(' 1mj23') // 1
parseInt(' 123howdy') // 123
```

### parseFloat()

위의 예제를 그대로 가져와보자.

```js
parseFloat('123') // 123
parseFloat('123.1') // 123.1
parseFloat('314e-2') // 3.14
parseFloat('0.0314E+2') // 3.14

// NaN 반환
parseFloat(true)
parseFloat(false)

// NaN 반환
parseFloat('')
parseFloat([])
parseFloat(null)

// NaN 반환
parseFloat('howdy')
parseFloat('h123')

parseFloat('123kim') // 123

parseFloat(' 3 ') // 3
parseFloat(' 3.2 ') // 3.2
parseFloat(' 1mj23') // 1
parseFloat(' 123howdy') // 123
parseFloat(' 123.2howdy') // 123.2
```

parseInt()와 달리 항상 10진수를 사용하며 소수점 모두 숫자로 변환해준다.

단, `parseInt()`와 `parseFloat()` 모두 BigInt를 Number로 반환하여 매우 큰 수나 매우 작은 수일 경우 정확한 값을 반환하지 못한다.

```js
parseFloat(Number.MIN_SAFE_INTEGER) // -9007199254740991
parseFloat(Number.MAX_SAFE_INTEGER) // 9007199254740991

parseInt(900719925474099267n) // 900719925474099300
parseInt('900719925474099267n') // 900719925474099300

parseFloat(900719925474099267n) // 900719925474099300
parseFloat('900719925474099267n') // 900719925474099300
```

추후 BigInt 관련해서 글을 써 볼 예정이다.

## boolean으로 변환

간단한 방법으로는 변환하고 싶은 값의 앞에 `!!`를 붙여주면 된다.

```js
// true 반환
!!true
!!1
!!'howdy'
!![]
!!{}

// false 반환
!!false
!!0
!!''
!!undefined
!!null
```

빈 배열이나 빈 객체가 <span class="return">false</span>를 반환한다고 생각할 수 있지만, <span class="return">true</span>를 반환한다는 점을 주의해야 한다.

### Boolean()

숫자 `0`, 빈 문자열(`''`), `null`, `undefined`, `NaN`은 <span class="return">false</span>를 반환하고, 이 외의 값은 모두 <span class="return">true</span>를 반환한다.

```js
// true 리턴
Boolean(1)
Boolean('howdy')
Boolean(' ')
Boolean(Number.MAX_SAFE_INTEGER)

// false 리턴
Boolean(0)
Boolean('')
Boolean(null)
Boolean(undefined)
Boolean(NaN)
```

<br>

**참고**

<div style="font-size: 12px;">

- <a href="https://developer.mozilla.org/ko/" target="_blank">MDN</a>

</div>
