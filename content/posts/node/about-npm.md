---
title: 'npm: 소개, 설치, 명령어, 배포'
date: '2020-6-4'
tags: ['node']
draft: false
---

## 1. npm이란?

React, Vue, Angular 등 자바스크립트 프레임워크를 사용해 본 사람이라면 `npm`이란 단어를 많이 접해봤을 것이다.

하지만 npm이 무엇이고, 어떻게 사용되는지 아는 사람은 많이 없다고 생각한다.

[npm](https://www.npmjs.com/)은 Node Package Manager의 줄임말로 Node.js 기반 패키지(모듈)<span style="font-size: 14px; font-style: italic">(\*moudule: 애플리케이션을 이루는 기본 조각, 쉽게 말해 어떤 물건을 만들기 위해 쓰는 부품)</span>들을 모아둔 저장소이다.

Node.js에서 제공하는 내장 모듈도 있으며, 사용자들이 직접 만든 유저모듈도 있다. npm은 이런 모듈(패키지)의 관리를 원활하게 도와준다.

<br>

npm은 세 가지 요소로 구성되어 있다.

**1. [Website](https://www.npmjs.com/)**

- 웹사이트를 통해 패키지들을 찾고, 관련 문서를 볼 수 있으며, 패키지를 공유하고 배포할 수 있다.

**2. [CLI](https://docs.npmjs.com/cli/npm)**

- Command Line Interface의 줄임말로, 터미널을 뜻한다.
- 대부분의 개발자들이 CLI를 통해 npm 패키지 업데이트/설치/제거/관리를 할 수 있다.

**3. [Registry](https://docs.npmjs.com/misc/registry)**

- 레지스트리는 큰 규모의 public 데이터베이스를 뜻하며, npm 레지스트리에는 자바스크립트 소프트웨어와 메타 정보들이 들어 있다.
- 현재 npm 레지스트리에는 100만개 이상의 패키지가 존재한다.
- package.json에 `private: true`를 설정하면 공개적 배포를 막아 줄 수 있다. (기본적으로 개인이 만든 CRA는 다 true로 설정되어 있다.)

## 2. npm으로 무엇을 할 수 있을까?

- 패키지의 코드들을 자신의 앱에 맞게 조정하거나, 그대로 사용할 수 있다.
- 바로 사용 가능한 독립적인 툴들을 다운로드 받을 수 있다.
- [npx](https://www.npmjs.com/package/npx)를 사용하여 다운로드하지 않고 패키지를 실행할 수 있다.
- 어디에서든 npm 사용자끼리 코드를 공유할 수 있다.
- 특정 개발자에게만 코드를 제한할 수 있다.
- 패키지 유지관리, 코딩 및 개발자를 조정하는 [Orgs](https://docs.npmjs.com/orgs/)(조직)을 만들 수 있다.
- [Orgs](https://docs.npmjs.com/orgs/)로 가상 팀을 구성할 수 있다.
- 여러 버전의 코드 및 코드 종속성 관리가 가능하다.
- 기존 코드가 업데이트 될 때 앱도 쉽게 업데이트 할 수 있다.
- 같은 문제를 다양한 방법으로 푸는 해결책을 찾을 수 있다.
- 유사한 문제와 프로젝트를 진행 중인 다른 개발자를 찾을 수 있다.

<br>

공식 홈페이지에 들어가기 전까지 npm은 단순하게 패키지를 설치하는 거라고만 알고 있었다.
하지만 단순히 패키지를 다운받는 것에 그치지 않고, npm [커뮤니티](https://npm.community/)에 자주 들어가보면 나에게 필요한 것을 많이 찾을 수 있을 것 같다.

## 3. npm 설치하기

npm은 Node.js를 통해 다운받아야 한다.

Node의 설치 유무를 보기 위해 버전 체크를 해보자.

```shell
node -v
npm -v
```

아무 숫자도 뜨지 않는다면 [다운로드](https://nodejs.org/en/download/)를 받아야 한다.

다운로드를 하고 다시 버전을 쳐보면 정상적으로 숫자가 나오는 것을 확인할 수 있다.

그 후, `package.json` 생성을 위해 아래와 같은 코드를 치자.

```shell
npm init
# or 질문 없이 바로 시작하고 싶다면
npm init -y
```

`package.json`은 프로젝트의 mainfest<span style="font-size: 11px;">(\*컴퓨팅에서 집합의 일부 또는 논리정연한 단위인 파일들의 그룹을 위한 메타데이터를 포함하는 파일)</span> 파일이다. 프로젝트 정보와 **의존성(dependencies) 관리**가 가능하며 작성된 `package.json` 문서로 어느 곳에서든 동일한 개발 환경을 구축할 수 있게 해준다.

그렇다면 이 **의존성 관리**가 무엇인지 알아보자.

초기의 자바스크립트는 간단한 작업을 위해 만들어졌지만, 웹 기술이 빠르게 발전하면서 점점 더 복잡한 코드가 늘어났다. 때문에 코드를 기능이나 페이지 단위로 분리하고 있지만, 아래 처럼 복잡한 의존 관계를 피할 수 없게 되었다.

<img src="https://user-images.githubusercontent.com/35218826/59730495-9501c800-927d-11e9-9ba3-4e5d7b3b7301.png" alt="의존 관계">
<p style="text-align: center; font-size: 10px">https://ui.toast.com/fe-guide/ko_DEPENDENCY-MANAGE/</p>

### 모듈의 필요성

자바스크립트는 파일이 나뉘어도 모두 같은 전역 스코프를 사용하며, 의도치 않게 다른 파일에 영향을 줄 수 있다. 하지만 자바스크립트 모듈 방식을 사용하면, 모듈의 독립된 스코프로 전역 스코프의 오염을 막을 뿐만 아니라 모듈 의존성을 코드로 작성할 수 있다. 따라서 복잡한 자바스크립트를 효율적으로 관리하기 위해서는 모듈 단위 개발을 해야 한다.

**모듈 스코프**
모듈 스코프는 전역과 분리된 모듈만의 독립된 스코프이다. 모듈 스코프에 선언된 변수나 함수는 외부에서 접근할 수 없고, 별도로 `export`한 변수와 함수만 외부에서 접근할 수 있다. (ex. `<script type="module" src="./A.js>`)

<span class="file-location">A.js</span>

```js
const name = 'foo'
export function getName() {
  return name
}
```

<span class="file-location">B.js</span>

```js
import { getName } from 'A'

export function sayHello() {
  alert('Hello' + getName()) // Hello foo
}
```

모듈로 로드한 A.js에 정의된 name은 모듈 스코프에 포함한다. 따라서 B.js에서 name에 바로 접근할 수 없고 export된 getName 함수로만 name을 읽을 수 있다. 이처럼 모듈 스코프를 사용하면 전역 스코프가 여러 변수로 오염되는 것을 막을 수 있다. 또한, 코드 상에서 명시적으로 모듈을 가져오기 때문에 코드로 모듈간 의존성을 파악할 수 있다.

### npm을 통한 외부 패키지 의존성 관리

위처럼 `script`태그로 자바스크립트 파일을 import 한다면, 필요한 패키지를 의존성에 맞게 일일이 나열해야 하고 각 패키지의 버전을 알맞게 관리해야 한다. 하지만 npm을 사용하면 이 모든 것을 `package.json`으로 관리할 수 있다.

`package.json`에 패키지 이름과 버전 등의 기본적인 정보와 해당 패키지의 의존성을 기입해야 한다.

`package.json`

```json
{
  "name": "project-name", // 이름
  "version": "1.0.0", // 버전
  "keywords": [
    // 키워드, 배열로 작성
    "howdy",
    "mj"
  ],
  "description": "", // 설명
  "main": "index.js",
  "scripts": {
    // 스크립트
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "MJ", // 작성자
  "license": "MIT",
  "dependencies": {
    // 이 패키지를 실행하기 위해 필요한 의존성 정의
    // 해당 패키지가 동작하는데 필요한 패키지로 배포나 번들 시에 포함
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-scripts": "3.4.1",
    "react-spring": "^9.0.0-rc.3"
  },
  "devDependencies": {
    // 이 패키지를 개발할 때 필요한 의존성 정의
    // 개발 단계에서만 필요하므로 배포나 번들 시에 포함되지 않음
  }
}
```

**번들러?**

번들러는 의존성이 있는 모듈 코드를 하나(또는 여러개)의 파일로 만들어주는 도구이다.

처음부터 하나의 js파일로 만드는 방법도 있겠지만, 그러기엔 코드가 너무 복잡해져서 유지보수도 힘들다. 따라서 처음에 아예 따로 만든 다음에 번들링 작업을 진행하는 것이다.

브라우저 환경에서는 CommonJS나 일부 ES6 Module로 작성된 코드를 바로 실행할 수 없으므로(크롬은 ES6 Module 지원), 모듈 코드를 분석하고 자바스크립트 모듈 스펙에 따라 새로운 코드로 가공이 필요하다. 이런 역할을 번들러가 해주고 있으며, 현재 [webpack](https://webpack.js.org/)이 각광받고 있다.

<img src="https://miro.medium.com/max/1400/1*SL6RVjoNQaUdii2Qh9XeZg.png" alt="webpack">
<p style="text-align: center; font-size: 10px">https://medium.com/@paul.allies/webpack-managing-javascript-and-css-dependencies-3b4913f49c58</p>

<br>

하지만 같은 `package.json`을 설치하더라도 설치 시점에 따라 설치되는 패키지가 완벽히 같지 않을 수 있다. 왜냐하면 설치 시점에 의존 패키지가 업데이트 되었을 수도 있기 때문이다. 때문에 완벽히 같은 <span style="font-style: italic">node modules</span>를 설치하기 위해 npm 5부터 `package-lock.json`이 생겼다.

`package-lock.json`은 자동으로 생성되고 현재 설치된 패키지들의 버전과 의존성 관계를 모두 저장한다. 따라서 사용자가 개발 환경 그대로의 의존성 있는 패키지를 설치하여 사용할 수 있다.

`package-lock.json`예시:

```json{10, 25}
"react-redux": {
  "version": "7.2.0",
  "resolved": "https://registry.npmjs.org/react-redux/-/react-redux-7.2.0.tgz",
  "integrity": "sha512-EvCAZYGfOLqwV7gh849xy9/pt55rJXPwmYvI4lilPM5rUT/1NxuuN59ipdBksRVSvz0KInbPnp4IfoXJXCqiDA==",
  "requires": {
    "@babel/runtime": "^7.5.5",
    "hoist-non-react-statics": "^3.3.0",
    "loose-envify": "^1.4.0",
    "prop-types": "^15.7.2",
    "react-is": "^16.9.0"
  }
},
"react-router": {
  "version": "5.2.0",
  "resolved": "https://registry.npmjs.org/react-router/-/react-router-5.2.0.tgz",
  "integrity": "sha512-smz1DUuFHRKdcJC0jobGo8cVbhO3x50tCL4icacOlcwDOEQPq4TMqwx3sY1TP+DvtTgz4nm3thuo7A+BK2U0Dw==",
  "requires": {
    "@babel/runtime": "^7.1.2",
    "history": "^4.9.0",
    "hoist-non-react-statics": "^3.1.0",
    "loose-envify": "^1.3.1",
    "mini-create-react-context": "^0.4.0",
    "path-to-regexp": "^1.7.0",
    "prop-types": "^15.6.2",
    "react-is": "^16.6.0",
    "tiny-invariant": "^1.0.2",
    "tiny-warning": "^1.0.0"
  }
},
```

`react-redux`, `react-router` 모두 `react-is`라는 패키지를 참조하지만 서로 다른 버전을 사용하고 있다.

<br>

## 4. npm 버전

![semantic versioning](https://user-images.githubusercontent.com/58619071/193441952-a6f1addc-5db9-492f-a949-d6d2a2275dad.jpeg)

<p style="text-align: center; font-size: 10px">https://medium.com/beginners-guide-to-mobile-web-development/introduction-to-npm-and-basic-npm-commands-18aa16f69f6b</p>

모든 패키지에는 세 가지 숫자가 존재하며 순서대로 major, minor, patch이다.

**major**는 기존 코드를 깨뜨릴 만큼 큰 변화가 업데이트 됐을 때 바뀐다.

**minor**는 기존 코드를 유지하면서 새로운 기능이 추가 되었을 때 사용한다.

**patch**는 버그를 수정했을 때 사용한다.

`예시`

```json
"dependencies": {
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-scripts": "3.4.1",
    "react-spring": "^9.0.0-rc.3"
  },
```

다운 받은 패키지 숫자 앞에 ~와 ^가 있는 것을 볼 수 있다.

틸트(~)는 마이너 버전을 갱신한다. (ex. `~1.2.3`은 1.2.3부터 1.3.0 미만까지를 포함한다.)

캐럿(^)은 정식버전에서 마이너와 패치 버전을 변경한다. (ex. `^1.2.3`은 1.2.3부터 2.0.0 미만 까지를 포함한다.)

원래 React는 ~(틸트)로 버전관리를 진행했었지만, 이는 마이너 버전을 바꾸기 때문에 하위 호환성이 지켜지지 않아 에러가 날 수 있다. 때문에 현재는 ^(캐럿)로 진행하여, 마이너 버전을 업데이트하지 않고 패치버전만 업데이트 한다.

만약, 특정 버전의 패키지를 다운받고 싶다면 아래처럼 쓰면 된다:

```shell
npm install 패키지명@x.y.z
```

## 5. npm 명령어

### Getting help:

```shell
npm help # npm 관련 도움
npm <command> -h # 특정 command 도움
```

<p style="text-align: center"><img src="https://user-images.githubusercontent.com/58619071/193441953-518a9872-31b3-4f67-b0f4-ba8632c66687.png" alt="npm help"></p>
<p style="text-align: center; font-size: 12px">npm help 쳤을 때 화면</p>

### Installing packages:

두 가지 설치 방법이 있다.

첫 번째, 오직 현재 폴더(directory)에서만 패키지를 사용할 것이라면 **로컬**에 설치 한다.

```shell
npm install 패키지명
```

두 번째, 현재 폴더뿐만 아니라 어디서든 패키지를 사용할 것이라면 **전역**에 설치한다.

```shell
npm install 패키지명 -g
```

### Updating packages:

설치한 패키지가 새로운 기능을 가진 버전으로 업데이트 될 때가 있다.

이럴 때 update란 명령어를 사용하면 된다.

```shell
npm update 패키지명    # 특정 패키지 업데이트
npm update            # 전체 패키지 업데이트
npm update 패키지명 -g # 전역 패키지 업데이트
```

### Uninstalling packages:

설치했던 패키지가 더이상 필요 없어진다면 패키지를 삭제해서 `node_modules`안의 내용도 없애 주는 것이 좋다.

```shell
npm uninstall 패키지명
# or
npm r 패키지명

# 전역에서 삭제
npm uninstall 패키지명 -g
# or
npm r 패키지명 -g
```

### Installing from package.json:

프로젝트를 공유할 때 용량이 큰 _node modules_ 를 공유하기보단, `package.json`을 공유하면 다른 사람도 쉽게 패키지를 다운 받을 수 있다.

```shell
npm install
```

### List of installed packages:

설치한 패키지를 확인하는 방법은 직접 `package.json`을 열어보는 방법과 CLI에 치는 방법이 있다.

```shell
npm list
```

## 6. npm 배포하기

npm 배포를 하려면 먼저 [npm 회원가입](https://www.npmjs.com/signup)이 필요하다.

### npm 로그인

회원가입을 했다면 터미널에서 `npm login`을 입력하고 계정 정보를 입력해야 한다.

```shell
$ npm login
# Username:
# Password:
# Email
Logged in as howdy-mj on https://registry.npmjs.org/
```

제대로 로그인이 됐는지 확인하고 싶다면 `npm whoami`를 입력하면 본인의 Username이 출력될 것이다.

### 패키지명 결정

패키지를 배포하기 위해서는 패키지명을 정해야 한다.

사용하고 싶은 패키지명이 중복되는지 npm 사이트에서 검색하거나, 터미널에서 `npm info 패키지명`을 입력하면 확인할 수 있다.

정보가 나온다면 이미 존재하는 패키지명이고, `404` 에러가 뜨면 아직 없는 패키지명이라 사용 가능하다.

### 패키지 생성

우선 `howdy-first`라는 폴더를 만들고 안에 `package.json` 파일을 만들어 주겠다.

<span class="file-location">package.json</span>

```json
{
  "name": "howdy-first",
  "version": "0.1.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "MIT"
}
```

_해당 패키지를 배포할 때는 name과 version만 썼다_

### 패키지 배포

이제 터미널에 `npm publish`를 입력하면 배포가 완료된다.

```shell
$ npm publish
D:\VSCode\hooks-practice\src\howdy-first>npm publish
npm notice
npm notice package: howdy-first@0.0.0
npm notice === Tarball Contents ===
npm notice 589B UseTitle.js
npm notice 54B  package.json
npm notice === Tarball Details ===
npm notice name:          howdy-first
npm notice version:       0.0.0
...,
+ howdy-first@0.0.0
```

[howdy-first 패키지 보러가기](https://www.npmjs.com/package/howdy-first)

<p style="font-size: 13px; font-style: italic">피드백은 언제나 환영합니다!</p>

<br>

**참고**

<div style="font-size: 12px;">

- https://www.npmjs.com/
- https://medium.com/beginners-guide-to-mobile-web-development/introduction-to-npm-and-basic-npm-commands-18aa16f69f6b
- https://medium.com/@shgautam/why-package-json-npm-basics-cab3e8cd150
- https://www.daleseo.com/js-npm-publish/

</div>
