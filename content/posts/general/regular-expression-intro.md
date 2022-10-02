---
title: '정규표현식 알아보기'
date: '2021-09-19'
tags: ['general']
draft: false
---

<span class="definition">정규표현식(Regular Expression)</span>은 일정한 패턴을 가진 문자열의 집할을 표현하기 위해 사용하는 형식 언어<span class="small">(Formal Language: 특정 법칙에 따라 적절하게 구성된 문자열들의 집합)</span>다.

쉽게 말해, 내가 작성한 값이 어떠한 패턴을 준수하고 있는지를 알려준다. 주로 이메일, 비밀번호, 휴대폰번호 등의 패턴이 맞는지 확인할 때 사용한다.

<a href="https://tc39.es/ecma262/multipage/text-processing.html#sec-regexp-regular-expression-objects" target="_blank">ECMAScript 262</a>에서도 정규표현식 객체를 정의하고 있으며, 정규표현식 리터럴과 RegExp 생성자 함수로 생성할 수 있다.

```js
// 1. 정규표현식 리터럴
const regex = /hi/g

// 2. RegExp 생성자 함수
const regex = new RegExp('hi', 'g')
```

일반적으로 자주 사용되는 방법은 정규표현식 리터럴이며, 아래 그림과 같이 구성되어 있다.

<div class="img-refer">
  <img src="https://poiemaweb.com/img/regular_expression.png" alt="정규표현식 리터럴" style="width: 350px;">
  <p>https://poiemaweb.com/js-regexp</p>
</div>

<br>

정규표현식은 <a href="https://www.regexpal.com/" target="_blank">RegEx Tester</a>, <a href="https://regex101.com/" target="_blank">regex101</a>, <a href="https://regexr.com/" target="_blank">RegExr</a> 등에서 테스트해 볼 수 있다.

## 플래그

정규표현식의 플래그는 총 여섯 개가 있으며 검색 방식을 정할 수 있다. 선택적으로 사용할 수 있으며, 순서 구분은 따로 없으며, 하나 이상의 플래그도 사용할 있다.

만약 아무것도 설정하지 않는다면 대소문자를 구별하며, 첫 번째 매칭 대상만 검색한다.

<table>
  <colgroup>
    <col style="width: 60px;">
    <col style="width: 120px;">
    <col>
  </colgroup>
  <tbody style="border-top: 1px solid hsla(0,0%,0%,0.12)">
    <tr>
      <td class="return center ">g</td>
      <td><span class="small">Global</span></td>
      <td>모든 문자열(전역) 검색</td>
    </tr>
    <tr>
      <td class="return center">i</td>
      <td><span class="small">Ignore case</span></td>
      <td>대소문자 구분 없이 검색</td>
    </tr>
    <tr>
      <td class="return center">m</td>
      <td><span class="small">Multi-line</span></td>
      <td>여러 행 검색</td>
    </tr>
    <tr>
      <td class="return center">s</td>
      <td><span class="small">dotAll</span></td>
      <td>`.`에 개행 문자도 매칭(ES2018)</td>
    </tr>
    <tr>
      <td class="return center">u</td>
      <td><span class="small">Unicode</span></td>
      <td>유티코드, 패턴을 유니코드로 취급</td>
    </tr>
    <tr>
      <td class="return center">y</td>
      <td><span class="small">Sticky</span></td>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky" target="_blank">sticky</a> 검색 수행, 문자열의 현재 위치부터 검색 수행</td>
    </tr>
  </tbody>
</table>

가장 자주 사용하는 플래그는 `g`, `i`, `m` 이 세가지다.

## 정규표현식 메서드

정규표현식에서 주로 사용되는 메서드는 <span class="variable">RegExp.prototype.exec</span>, <span class="variable">RegExp.prototype.test</span>, <span class="variable">String.prototype.match</span>다.

### RegExp.prototype.exec

<span class="variable">exec</span> 메서드는 문자열을 검색하여 매칭 결과를 배열로 반환한다. 만약 매칭되는 것이 없으면 null을 반환한다.

```js
const regExp = /hi/

const target = 'hi howdy-mj'
regExp.exec(target) // output: ['hi', index: 0, input: 'hi howdy-mj, Hi!', groups: undefined]

const noTarget = 'howdy-mj'
regExp.exec(noTarget) // output: null
```

또한, <span class="variable">exec</span> 메서드는 플래그를 `g`로 설정하더라도 첫 번째 타겟만 반환한다.

```js
const regExp = /hi/
const hasTwoTarget = 'hi howdy-mj, hi!'
regExp.exec(hasTwoTarget) // output: ['hi', index: 0, input: 'hi howdy-mj, Hi!', groups: undefined]

const regExpWithG = /hi/g
regExpWithG.exec(hasTwoTarget) // output: ['hi', index: 0, input: 'hi howdy-mj, Hi!', groups: undefined]
```

### RegExp.prototype.test

<span class="variable">test</span> 메서드는 문자열을 검색하여 매칠 결과를 boolean 값으로 반환한다. 회원가입 시 입력한 값이 설정한 패턴과 부합한지 알아보기 위해 주로 사용하는 메서드다.

```js
const regExp = /hi/

const target = 'hi howdy-mj'
regExp.test(target) // output: true

const noTarget = 'howdy-mj'
regExp.test(noTarget) // output: false
```

### String.prototype.match

<span class="variable">match</span> 메서드는 String 표준 빌트인 객체에서 제공하며, 정규 표현식과 매칠 경과를 배열로 반환하며 <span class="variable">exec</span> 메서드와 비슷하다. 다만, `g` 플래그를 사용할 경우, 모든 매칭 결과를 배열로 반환한다.

```js
const regExp = /hi/
const hasTwoTarget = 'hi howdy-mj, hi!'
hasTwoTarget.match(regExp) // output: ['hi']

const regExpWithG = /hi/g
hasTwoTarget.match(regExpWithG) // output: ['hi', 'hi']
```

<br>

이 외, <span class="variable">String.prototype.search</span>, <span class="variable">String.prototype.replace</span>, <span class="variable">String.prototype.split</span> 메서드도 자주 사용된다.

## 특수문자로 패턴 만들기

위의 `/hi/`처럼 정규표현식을 만들 수 있지만, 휴대폰번호를 찾기 위해 `01*-`부터 모든 번호를 다 입력할 수 없다. 따라서 휴대폰 번호와 부합한 특정 패턴을 입력해야하는데, 이때 특수 문자를 사용해 그 패턴을 정의할 수 있다.

> _밑의 예시는 편의상 모두 플래그를 작성하지 않았다_

### 시작 문자

`^`로 찾을 수 있다.

```js
const startWithZeroRegExp = /^0/
const str = '010-1234-1234'
startWithZeroRegExp.test(str) // output: true
```

### 마지막 문자

`$`로 찾을 수 있다.

```js
const endWithZeroRegExp = /0$/
const str1 = '010-1234-1234'
const str2 = '010-1234-1230'
endWithZeroRegExp.test(str1) // output: false
endWithZeroRegExp.test(str2) // output: true
```

### 반복 패턴

<span class="variable">`{m,n}`</span>은 최소 m번, 최대 n번이 반복되는 문자열을 뜻한다. 이때 m과 n사이에 띄어쓰기가 있으면 안되며, 둘 다 양인 정수로, m <= n 조건을 만족해야 한다. 만약 m이 생략된다면 m은 무한으로 취급된다. 만약 {n}만 존재한다면, n번의 문자열을 찾는다.

#### 0회 이상 연속 반복

`*`로 찾을 수 있으며 {0,}과 같다.

```js
const repeatYRegExp = /y*/
const str1 = 'yes'
const str2 = 'es'
repeatYRegExp.test(str1) // output: true
repeatYRegExp.test(str2) // output: true
```

#### 1회 이상 연속 반복

`+`로 찾을 수 있으며, {1,}과 같다.

```js
const repeatYRegExp = /y+/
const str1 = 'yes'
const str2 = 'yyes'
repeatYRegExp.test(str1) // output: true
repeatYRegExp.test(str2) // output: true
```

#### 최대 한 번 반복

`?`로 찾을 수 있으며, {0,1}과 같다.

```js
const repeatYRegExp = /y?/
const str1 = 'yes'
const str2 = 'es'
repeatYRegExp.test(str1) // output: true
repeatYRegExp.test(str2) // output: true
```

### 개행 문자를 제외한 단일 문자

`.`로 찾을 수 있다.

```js
const secondORegExp = /.o/
const str1 = 'oh'
const str2 = 'socket'
secondORegExp.test(str1) // output: false
secondORegExp.test(str2) // output: true
```

### 문자열 검색

`[xyz]`로 설정할 수 있으며, `[ ]` 안의 문자는 or(`|`)와 동일하게 작동한다.

```js
// 1. 영어 대/소문자
const lowerCaseRegExp = /[a-z]/
const upperCaseRegExp = /[A-Z]/

const lowerCase = 'test'
const upperCase = 'TEST'
const test = 'Test'

lowerCaseRegExp.test(lowerCase) // output: true
lowerCaseRegExp.test(upperCase) // output: false

lowerCaseRegExp.test(test) // output: true
upperCaseRegExp.test(test) // output: true

// 2. 숫자
const numberRegExp = /[0-9]/

const onlyNumber = '20210918'
const numberWithString = 'Covid19'

numberRegExp.test(onlyNumber) // output: true
numberRegExp.test(numberWithString) // output: true
```

`[]`은 위에 설명 된 `^`, `*`, `+`와도 같이 사용될 수 있다.

단, `[]`내의 `^`은 해당 패턴으로 이루어진 문자열을 제외한 것을 의미한다.

```js
const expectNumberRegExp = /[^0-9]/

const onlyNumber = '20210918'
const numberWithString = 'Covid19'

// 숫자로만 이루어진 것에 대해 false를 반환
expectNumberRegExp.test(onlyNumber) // output: false
expectNumberRegExp.test(numberWithString) // output: true
```

## 간략한 패턴 표현 방식

위와 같이 `[]` 내에 패턴을 작성하는 방법도 있지만, 더 간소한 형식도 있다.

<table>
  <colgroup>
    <col style="width: 50px;">
    <col style="width: 210px;">
    <col>
  </colgroup>
  <tbody style="border-top: 1px solid hsla(0,0%,0%,0.12)">
    <tr>
      <td class="return center ">\d</td>
      <td style="padding-left: 0; padding-right: 0;">숫자</td>
      <td><span class="small">[0-9]</span></td>
    </tr>
    <tr>
      <td class="return center">\D</td>
      <td style="padding-left: 0; padding-right: 0;">숫자가 아닌 것</td>
      <td><span class="small">[^0-9]</span></td>
    </tr>
    <tr>
      <td class="return center">\n</td>
      <td style="padding-left: 0; padding-right: 0;" colspan="2">줄 바꿈 (U+000A)</td>
    </tr>
    <tr>
      <td class="return center">\s</td>
      <td style="padding-left: 0; padding-right: 0;">스페이스, 탭, 줄 바꿈 등을 포함한 하나의 공백</td>
      <td><span class="small">[ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff].</span></td>
    </tr>
    <tr>
      <td class="return center">\S</td>
      <td style="padding-left: 0; padding-right: 0;">공백이 아닌 것</td>
      <td><span class="small">[^ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff].</span></td>
    </tr>
    <tr>
      <td class="return center">\w</td>
      <td style="padding-left: 0; padding-right: 0;">밑줄(_)을 포함한 영문자, 숫자</td>
      <td><span class="small">[A-Za-z0-9_]</span></td>
    </tr>
    <tr>
      <td class="return center">\W</td>
      <td style="padding-left: 0; padding-right: 0;">밑줄(_), 영문자, 숫자가 아닌 것</td>
      <td><span class="small">[^A-Za-z0-9_]</span></td>
    </tr>
  </tbody>
</table>

## 자주 사용하는 정규표현식

### 이메일

```js
const emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
```

### 비밀번호

```js
// 1. 특수문자가 없는 8-20자리 비밀번호
const passwordRegExp = /[A-Za-z0-9]{8,20}/

// 2. 특수문자가 포함된 8-20자리 비밀번호
const passwordRegExp = /^.*(?=^.{8,20}$)(?=.*\W).*$/

// 3. 영어 대문자, 소문자, 숫자, 특수문자 각 1개가 포함된 8-20자리 비밀번호
const passwordRegExp = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).*$/
```

### 핸드폰

```js
// 1. 헨드폰 번호 (ex. 010123401234)
const phoneRegExp = /^01\d{7,8}/

// 2. -를 갖고 있는 핸드폰 번호 (ex. 010-123-1234)
const phoneWithDashRegExp = /^\d{3}-\d{3,4}-\d{4}/

// 3. 지역번호를 포함한 연락처 (ex. 02-1234-1234)
const contactNumber = /^\d{2,3}-\d{3,4}-\d{4}/
```

### 기타

```js
// 숫자로만 이루어진 패턴
const onlyNumberRegExp = /^\d+$/

// 영문자로만 이루어진 패턴
const onlyAlphabetRegExp = /^[a-zA-Z]+$/

// 특수문자로만 이루어진 패턴
const symbolRegExp = /[^a-zA-Z0-9]/

// 특정 확장자 파일 (ex. tx, tsx, js, jsx 확장자)
const fileTypeRegExp = /^[\S]+\.(ts|tsx|js|jsx)$/
```

<br />

**참고**

<div style="font-size: 12px;">

- <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions" target="_blank">MDN - 정규표현식</a>
- 모던 자바스크립트 Deep Dive, 이웅모 (2020)

</div>
