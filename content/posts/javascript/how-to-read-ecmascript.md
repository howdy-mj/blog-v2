---
title: 'ECMAScript 스펙 읽는법'
date: '2022-6-4'
tags: ['javascript']
draft: false
---

JavaScript 관련하여 궁금한 점이 있을 때 이것저것 찾다보면 그 종착지는 언제나 ECMAScript였다. 그러나 엄청난 길이의 스크롤을 보고 주눅이 들었고, 차분히 읽어보기로 마음 먹었을 때는 처음 보거나 정의를 알 수 없는 것들이 많이 있었다. 그러다 참조 링크를 계속 타고 들어가서 이해할때 쯔음, 처음에 무엇때문에 이걸 찾아봤는지 까먹는 나를 발견할 수 있었다.

'언젠간 이해가 되겠지' 하면서 ECMAScript를 계속 읽어보던 중, <a href="https://timothygu.me/es-howto/" target="_blank">How to Read the ECMAScript Specification</a> 글을 보고 '나만 어려운게 아니구나'란 안도감이 들었고, 가장 궁금했던 내용들 위주로 작성해보았다.

## ECMAScript, JavaScript의 차이

JavaScript를 공부하는데 왜 ECMAScript를 봐야할까? 이 둘의 차이는 정확히 무엇일까? 그리고 구글링하다보면 ECMA-262, TC39 등 용어 자주 같이 등장하는데 이건 또 뭘까?

### Ecma International

<a href="https://www.ecma-international.org/" target="_blank">Ecma International</a>은 1961년부터 현재까지 국제 정보통신기술(ICT, Information and Communications Technology)과 전자제품(CE, Consumer Electronics)의 표준 규격(standards)을 개발하고 발표하는 곳이다. 우리가 핸드폰 혹은 컴퓨터 등의 전자기기로 사용하는 대부분의 규격을 Ecma에서 관리하고 있다고 볼 수 있다.

현재 관리하고 있는 규격들은 <a href="https://www.ecma-international.org/publications-and-standards/standards/?order=category" target="_blank">여기</a>에서 확인할 수 있다.

### ECMA-262, ECMAScript, TC39

그리고 Ecma International에는 수 많은 규격들이 존재하는데, 그 중 하나가 <a href="https://www.ecma-international.org/publications-and-standards/standards/ecma-262/" target="_blank">ECMA-262</a>이며 곧 ECMAScript다.

> ECMA-262: <span class="variable">This Standard defines the ECMAScript 2021 general-purpose programming language.</span>

ECMAScript는 원래 스크립트 언어로 설계되었으나, 브라우저 외에서 동작할 수 있도록 실행시켜주는 Node.js가 나오면서 범용 프로그래밍 언어로 사용되고 있다.

<details>
  <summary>용어: 스크립트 언어, 범용 프로그래밍 언어</summary>
  <ul style="font-size: 14px;">
      <li><strong>스크립트 언어(scripting language)</strong>: 응용 소프트웨어를 제어하는 언어로 독립적으로 사용할 수 있으며, 컴파일없이 실행가능한 언어다.
      <br>
      - 대표적인 스크립트 언어로는 JavaScript, Python, 셸(Shell) 스크립트가 있다.
      <br>
      *컴파일(compile)은 코드가 실행되기 전에 소스코드 전체를 컴퓨터가 바로 실행할 수 있는 기계어로 변환하는 작업을 말하며, 대표적인 언어는 C언어, Java가 있다.
      </li>
      <li><strong>범용 프로그래밍 언어(general-purpose programming language)</strong>: 다양한 도메인의 소프트웨어를 개발하기 위해 설계된 프로그래밍 언어
      <br>
      - 예를 들어, HTML은 웹 페이지 작성에만 사용되기 때문에 범용 언어가 아니다.
      </li>
  </ul>
</details>

<br>

<div class="img-div" style="width: 70%">
  <img src="https://user-images.githubusercontent.com/58619071/193440871-308b5910-b9b7-4c44-8d91-447b89429896.png" alt="ECMA-262 Classification" class="border">
  <p>ECMA-262 Classification</p>
</div>

ECMA-262의 분류를 보면, TC39라고 적혀있다. Technical Committees(이하 TC)는 Ecma의 기술 작업을 수행하는 조직이며, 하위에는 TG(Task Group)로 나누어 특정 영역을 관리하게 한다.

TC39는 ECMAScript의 표준화를 관리하며, 언어 문법(language syntax), 의미(semantics), 그리고 라이브러리 및 언어를 지원하는 상호 보완적인 기술이 포함되어 있다. 하위 <a href="https://www.ecma-international.org/technical-committees/tc39/?tab=task-groups" target="_blank">태스크</a>에는 ECMA-262의 ECMAScript 언어, ECMA-402의 ECMASCript 국제화 API 스펙, 보안이 있다. <a href="https://github.com/tc39" target="_blank">Ecma TC39 Github</a>에 가보면 관련 레포들이 있는 걸 확인할 수 있다.

### ECMAScript와 JavaScript

그렇다면 ECMAScript와 JavaScript의 관계는 어떻게 되는걸까?

ECMAScript는 여러 기술을 기반으로 만들어졌는데, 가장 유명한 것이 JavaScript와 JScript이다. 각각 Netscape Navigator 2.0 브라우저와 Microsoft의 IE 3.0 브라우저에서 사용되기 위해 만들어진 언어다. 브라우저마다 사용되는 스크립트 언어가 다르다보니, 같은 웹 페이지인데 브라우저에 따라 동작하지 않는 문제가 발생했다. 이에 Netscape는 표준화를 위해 JavaScript 기술 규격을 Ecma International에 제출하였고, 이것이 곧 ECMA-262(ECMASCript)가 되었다.

사실 Netscape는 JavaScript를 규격 이름으로 제출했지만, 당시 상표권이 Sun Microsystems(현 Oracle)에 있었기 때문에 사용이 불가하여 ECMAScript로 명명되었다.

즉, ECMASCript는 <span class="underline">스크립트 언어들이 모두 호환되도록 만들어진 표준화된 스펙</span>이다. 따라서, ECMAScript는 프로그래밍 언어의 값, 타입, 객체와 프로퍼티, 함수, <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects" target="_blank">표준 빌트인 객체</a> 등 핵심 문법을 규정한다. 그리고 각 브라우저는 ECMAScript를 준수하여 자바스크립트 엔진(ex. Webkit, Gecko, Blink 등)을 구현한다.

실행 환경이 브라우저인지 Node.js인지에 따라 JavaScript에서 지원하는 API가 달라지는데, ECMAScript를 다루는 것은 같다. 브라우저에서 사용할 경우 브라우저가 지원하는 <a href="https://developer.mozilla.org/ko/docs/Web/API" target="_blank">Web API</a>를, Node.js는 <a href="https://nodejs.org/api/globals.html" target="_blank">Node.js 고유의 API</a>를 지원한다.

<div class="img-div" style="width: 50%">
  <img src="https://user-images.githubusercontent.com/58619071/193440877-9e97b663-d59b-427f-83c4-e7539343e477.jpg" alt="JavaScript와 ECMASCript">
  <p>모던 자바스크립트 Deep Dive, 이웅모 (2020), p18</p>
</div>

## ECMAScript에서 다루는 내용

JavaScript와 ECMASCript의 차이를 이해했다면, ECMAScript에서 어떤 내용을 다루는지 파악하기 쉽다.

### 다루는 내용

- 문법(syntax)
  - 원시(primitive) 값이 무엇인지
  - <span class="object">if</span>문
  - <span class="object">for</span>, <span class="object">for-in</span>, <span class="object">for-of</span>, <span class="object">while</span>등의 반복문
- 의미(semantics)
  - <span class="object">var</span>가 어떻게 변수명을 결정하는지
  - <span class="object">if</span>문이 무엇을 평가하고 그 결과 값이 무엇인지
  - <span class="object">for</span>가 어떻게 반복문을 실행하는지
- 표준 빌트인 객체
  - <a class="object" href="https://tc39.es/ecma262/#sec-object-objects" target="_blank">Object</a>, <a class="object" href="https://tc39.es/ecma262/#sec-array-objects" target="_blank">Array</a>, <a class="object" href="https://tc39.es/ecma262/#sec-function-objects" target="_blank">Function</a>, <a class="object" href="https://tc39.es/ecma262/#sec-number-objects" target="_blank">Number</a>, <a class="object" href="https://tc39.es/ecma262/#sec-math-object" target="_blank">Math</a>, <a class="object" href="https://tc39.es/ecma262/#sec-regexp-regular-expression-objects" target="_blank">RegExp</a>,<a class="object" href="https://tc39.es/ecma262/#sec-proxy-objects" target="_blank">Proxy</a>, <a class="object" href="https://tc39.es/ecma262/#sec-map-objects" target="_blank">Map</a>, <a class="object" href="https://tc39.es/ecma262/#sec-promise-objects" target="_blank">Promise</a>, <a class="object" href="https://tc39.es/ecma262/#sec-arraybuffer-objects" target="_blank">ArrayBuffer</a>, <a class="object" href="https://tc39.es/ecma262/#sec-typedarray-objects" target="_blank">TypedArray</a>, <a class="object" href="https://tc39.es/ecma262/#sec-globalthis" target="_blank">globalThis</a>, ...

### 다루지 않는 내용

- 브라우저와 Node.js에서만 동작하는 것
  - <span class="object">console</span>, <span class="object">setTimeout()</span>, <span class="object">setInterval()</span>, <span class="object">clearTimeout()</span>, <span class="object">clearInterval()</span>
- 브라우저에서만 동작하는 것
  - <span class="object">window</span>, <span class="object">alert()</span>, <span class="object">confirm()</span>, DOM, BOM
- Node.js에서만 동작하는 것
  - <span class="object">Buffer</span>, <span class="object">process</span>, <span class="object">global</span>
  - <span class="object">module</span>, <span class="object">exports</span>, <span class="object">require()</span>, <span class="object">\_\_dirname</span>, <span class="object">\_\_filename</span>

## if문으로 ECMASCript 스펙 살펴보기

누구나 다 알법한 <a href="https://tc39.es/ecma262/#sec-if-statement" target="_blank" class="variable">The <span class="object">if</span> Statement</a>으로 ECMASCript 스펙을 살펴보자.

<div class="img-div">
  <img src="https://user-images.githubusercontent.com/58619071/193440876-48fc7aac-2041-4418-a21b-0155f50316d7.png" alt="if문 ECMASCript 스펙">
  <p>if문 ECMAScript 스펙</p>
</div>

<br>

당황할 수 있다.

하지만 우리는 이미 <span class="object">if</span>문이 무엇이고 어떻게 동작하는지 알고 있으니, 차근차근 살펴보자.

### 문법(Syntax)

처음에는 <span class="object">if</span>문의 문법에 대해 설명한다.

<div class="img-div">
  <img src="https://user-images.githubusercontent.com/58619071/193440873-389fb9ab-29e8-4770-9076-048d7a731788.png" alt="if문 syntax">
</div>

<br>

<span class="object">if...else</span> 문과 <span class="object">if</span> 문을 정의한 것으로 보인다. 그런데 문(<span class="variable">Statement</span>)과 표현식(<span class="variable">Expression</span>) 옆에 있는 <span class="notation">[Yield, Await, Return]</span>은 무엇일까?

이건 ECMAScript의 <a href="https://tc39.es/ecma262/#sec-grammar-notation" target="_blank">5.1.5 Grammar Notation</a>에 정의되어 있는데, 필자도 정확하게 이해한 상태가 아니라 이런 것이겠구나 정도로만 작성해보겠다.

<br>

정의하려는 문(Statement)이 <span class="nonterminal">italic</span>체로 표시되어 있으며 콜론(:) 다음에 정의된다.

<div style="margin-bottom: 20px;">
  <div><span class="nonterminal">IfStatement</span> :</div>
  <div class="nonterminal">
    &nbsp; &nbsp; &nbsp; &nbsp;  <span class="terminal">if (</span> Expression <span class="terminal">)</span> Statement <span class="terminal">else</span> Statement
  </div>
  <div class="nonterminal">
    &nbsp; &nbsp; &nbsp; &nbsp;  <span class="terminal">if (</span> Expression <span class="terminal">)</span> Statement <span class="normal">[lookahead ≠ <span class="terminal">else</span>]</span>
  </div>
</div>

<span class="nonterminal">IfStatement</span> 옆에 있는 <span class="notation">[Yield, Await, Return]</span>은 <span class="variable">[parameters]</span>라 하며, 해당 문이 반환할 수 있는 값으로 해석했다. _(의역이며, 밑의 예시에서 다시 살펴보자)_

<span class="variable">parameters</span>는 하나 혹은 그 이상이 있을 수 있고, 모든 곳에서 반드시 모든 <span class="variable">parameter</span>를 참조하는 것은 아니다. 그리고 `+`는 해당 값을 필수로 포함하라는 뜻이며, `?Yield`는 상위에 `_Yield`가 있는 것에서만 붙는다는 뜻이다.

<span class="variable">`[In]`</span>은 <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Expressions_and_Operators#relational_operators" target="_blank">관계연산자(relational operator)</a>로 두 개의 관계를 비교하는 것으로 항상 Boolean 값으로 반환된다. 이를 <span class="object">for...in</span>의 in과 혼동하지 않아야 한다.

```js
// ifStatement을 해당 if문 외부의 블럭 요소(여기서는 checkIsFemale 함수)라 이해하고 작성했다.
// 하지만 틀린 내용일수 있으니 문맥 이해하는 정도로만 넘겨주었으면 좋겠다.
const checkIsFemale = (gender) => {
  if (gender === 'female') {
    return true;
  }
};
```

`checkIsFemale`은 return 값만 존재하는 문이다. 따라서 지금은

```
IfStatement_Return:
  Expression_In {       # 두 개의 관계를 비교하는 표현식
    Statement_Return    # return이 있는 문
  }
```

만약

```js
const checkIsFemale = async () => {
  const gender = await getUserGender();
  if (gender === 'female') {
    return true;
  }
};
```

였다면,

```
IfStatement_Await_Return:
  Expression_In {
    Statement_Await_Return
  }
```

이 되는 것이다.

<!-- 만약 suffix로 <span class="opt">opt</span>이 붙어있다면, 그건 옵셔널하다는 뜻이다. -->

마지막으로 [lookahead ≠ <span class="terminal">else</span>]는, 바로 뒤에 오는 토큰(최소 단위)가 else가 아니다. _(제대로 이해 못한 것 같아 추후 보충 필요)_

<br>

요약된 문법 내용은 <a href="https://tc39.es/ecma262/#sec-grammar-summary" target="_blank">A Grammar Summary</a>에서 볼 수 있다.

### Static Semantics

정적 의미론(Static Semantics)은 코드가 실행되기 전에 해당 의미가 유의미한지 파악하며, 주로 초기 오류(Early errors)를 잡는데 사용된다. 초기 오류는 <span class="object">eval</span>이 호출되어 평가되는 시점에 보고되며, 평가 코드의 평가를 중단할 수 있다. 초기 오류가 아닌 모든 오류는 런타임 오류(runtime errors)다.

<div class="img-div">
  <img src="https://user-images.githubusercontent.com/58619071/193440874-c257e7ee-f1a4-4637-9261-63ea5f8e9281.png" alt="if문 static semantics">
</div>

<br>

<span class="object">if</span>문에서 Early error가 나는 경우는 한 가지다.

<a class="variable" href="https://tc39.es/ecma262/#sec-islabelledfunction" target="_blank">IsLabelledFunction</a>은 문(Statement, 이하 stmt)을 인자로 받으며 Boolean을 반환하는 추상 연산자(abstract operation)이다. <span class="variable">IsLabelledFunction</span>이 true를 반환하는 조건은 stmt 내부에 함수 선언문이 있는 경우다.

```js
if (true) {
  function test() {
    // TS1252: Function declarations are not allowed inside blocks in strict mode when targeting 'ES3' or 'ES5'.
    console.log('test');
  }
}
```

위 처럼 if문 안에 함수 선언문을 존재할 경우, IDE에서 바로 빨간 밑줄과 함께 에러 메세지를 보여준다.

### Runtime Semantics

런타임 의미론(Runtime Semantics)은 반드시 런타임에 호출되어야 하는 의미론을 명시하는 알고리즘을 말한다. 해당 부분이 주로 개발자가 사용하는 로직이며, 주로 어떻게 평가되는지 알려준다.

<div class="img-div">
  <img src="https://user-images.githubusercontent.com/58619071/193440875-d1f6546e-3cc9-4691-b9cf-a59c878bc2df.png" alt="if문 runtime semantics">
</div>

초록색으로 되어 있는 <span class="notation">value</span>를 클릭하면 매칭되는 단어들이 같은 색으로 칠해져 읽기 더 수월하다.

<div class="explain" style="margin-bottom: 20px;">
*해당 글에서 <span class="variable">Completion Record</span>와 <span class="variable">UpdateEmpty()</span>가 무엇인지 서술하지 않지만, 이해하는데 무리는 없을 것이다. 
</div>

<span class="object">if..else</span> 문만 해석하자면 아래와 같다.

<ol>
  <li><span class="nonterminal" style="background-color: #FBFF32">exprRef</span>를 조건문의 결과라 가정하고,</li>
  <li><span class="nonterminal" style="background-color: #FC87A2">exprValue</span>는 <span class="nonterminal" style="background-color: #FBFF32">exprRef</span>의 값을 Boolean으로 반환한 값이라면,</li>
  <li><span class="nonterminal" style="background-color: #FC87A2">exprValue</span>가 true라면,</li>
    - a. <span class="nonterminal" style="background-color: #96E786">stmtCompletion</span>이 첫 번째 <span class="nonterminal">Statement</span>를 평가한 결과값으로 한다.
  <li>그 외라면, </li>
    - b. <span class="nonterminal" style="background-color: #96E786">stmtCompletion</span>이 두 번째 <span class="nonterminal">Statement</span>를 평가한 결과값으로 한다.
  <li>반환값을 결정한다. (if문에 return이 있다면 그 값을 반환하고, 아니라면 <span class="return">undefined</span>를 반환한다)</li>
</ol>

## 맺음

항상 ECMAScript를 읽으면서 '이게 도대체 뭘까...'하면서 찾아보지 않고 그냥 넘기다보니 계속 모르는 상태로 있었다. 앞으로도 계속 이렇게 넘어하면 완전히 이해할 수 없다고 생각이 들어서 하나하나 뜯어보았다.

물론 지금도 완벽하게 이해하고 작성한 건 아니다. 그렇지만 이번에 습득한 내용을 토대로 하나씩 개념을 익혀가다보면, 언젠가는 ECMAScript의 규격을 이해할 수 있지 않을까란 생각이 든다.

<br>

**참고**

<div style="font-size: 12px;">

- <a href="https://www.ecma-international.org/" target="_blank">Ecma International</a>
- <a href="https://tc39.es/ecma262/" target="_blank">ECMAScript 2023</a> (작성일 기준 2022.5.26 버전)
- <a href="https://www.freecodecamp.org/news/whats-the-difference-between-javascript-and-ecmascript-cba48c73a2b5/" target="_blank">What’s the difference between JavaScript and ECMAScript?</a>
- 모던 자바스크립트 Deep Dive, 이웅모 (2020)
- <a href="https://v8.dev/blog/understanding-ecmascript-part-3" target="_blank">Understanding the ECMAScript spec, part 3</a>
- <a href="https://timothygu.me/es-howto/" target="_blank">How to Read the ECMAScript Specification</a>
- <a href="https://stackoverflow.com/questions/46022919/what-are-yield-await-in-return-in-ecmascript-grammar" target="_blank">What are [Yield, Await, In, Return] in EcmaScript grammar</a>

</div>
