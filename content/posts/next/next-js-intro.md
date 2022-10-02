---
title: 'Next.js 설치, 라우팅, 구동방식'
date: '2020-7-03'
tags: ['next']
draft: false
---

본 글은 [공식 문서](https://nextjs.org/docs/getting-started) 기준으로 작성되었습니다.

## 소개

React는 CSR이기에 SEO가 안된다는 치명적인 단점이 있다. 물론 cra eject로 설정하여 적용할 수 있지만, 번거롭기 때문에 더 편리하게 사용할 수 있는 Next.js(이하 Next)가 나왔다.

Next가 나오면서 SSR가 되며, 더 빠르게 페이지를 불러오기 위해 코드 스프릿도 지원한다.

## 설치

_해당 글은 next 9.4.4 버전으로 작성되었습니다._

```shell
$ npx create-next-app 폴더명
$ npm install next react react-dom
```

정상적으로 설치 되었다면 `package.json`에 아래와 같은 scripts가 있는 걸 확인할 수 있다.

```json
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
},
```

`react`와 달리 생성 후 아무것도 존재하지 않는다. 그래서 폴더부터 하나씩 만들어야 한다.
`pages` 폴더에 `index.js`를 만들어보자.

폴더 구조

```
node_modules/
pages
└─ index.js
package.json
packgae-lock.json
```

<span class="file-location">index.js</span>

```js
function HomePage() {
  return <div>Welcome to Next.js!</div>
}

export default HomePage
```

그 후, `npm run dev`로 서버를 돌리면 http://localhost:3000 에서 서버가 열린다.

```shell
$ npm run dev

ready - started server on http://localhost:3000
event - compiled successfully
event - build page: /next/dist/pages/_error
wait  - compiling...
event - compiled successfully
event - build page: /
wait  - compiling...
event - compiled successfully
```

`npm run dev`을 하면 위의 코드가 CLI창에 뜨면서 `.next`라는 폴더가 생기는 것을 볼 수 있다.

<p style="text-align: center;"><img src="https://user-images.githubusercontent.com/58619071/193441782-fd682b64-cc46-4512-9a93-b9cd52bed4c5.png">
</p>

이를 통해 next는 자동으로 컴파일과 빌드(웹팩과 바벨로)를 진행하며 `/`에 페이지를 정적으로 페이지를 만드는 것을 확인할 수 있다.

## Router

React와 달리 Next는 static한 페이지를 만들며, `pages` 폴더 안에 있는 js 파일이 하나의 URL처럼 작동된다.

그렇다면 about 페이지를 만들어보자.

```
node_modules/
pages
├─ index.js
└─ about.js
package.json
packgae-lock.json
```

<span class="file-location">pages/about.js</span>

```js
function About() {
  return <div>About</div>
}

export default About
```

그리고 `pages/index.js`에 Link를 추가해주자.

```js
import Link from 'next/link'

function HomePage() {
  return (
    <div>
      Welcome to Next.js!
      <br />
      <Link href="/about">About</Link>
    </div>
  )
}

export default HomePage
```

<p style="text-align: center"><img src="https://user-images.githubusercontent.com/58619071/193441784-c459acb6-df5a-42ad-8353-9a04fb5a675a.png" ></p>

그러면 위와 같은 화면이 렌더되며, About을 누르면 `localhost:3000/about`에 생성한 `about.js` 화면이 표시된다.

## Next의 SSR

여기까지 와서 나는 Next가 어떻게 SSR이 가능한지 궁금해졌다.

그러기 위해서는 Next의 구동 순서에 대해 알아야한다.

Next는 `_app.js`와 `_document.js`가 제일 처음에 실행된다. 두 파일 모두 `pages` 폴더 안에 있어야 한다.

우리가 맨 처음에 프로젝트를 생성할 때 없는 파일이지만, Next 자체에서 제공하는 로직으로 실행된다. 따라서 프로젝트 입맛에 맞게 만들기 위해서는 커스터마이징을 해야 하는데 바로 이 두개의 파일에서 진행된다.

두 파일 모두 Server only file로 클라이언트 단에서 사용하는 함수(ex. addEventlistner, window 등)를 사용하면 안된다.

<h3>_app.js</h3>

최초로 실행되는 파일로, Client에서 띄워지는 전체 컴포넌트의 레이아웃이라 이해하면 된다. 공통 레이아웃으로 최초에 실행되어 내부에 들어갈 컴포넌트들을 실행한다.

```js
import React from 'react'
import App from 'next/app'

function App {
  render() {
    const { Component, ...other } = this.props
    return <Component {...other} />
  }
}

export default App
```

여기서 `Component`란 props로 받은 페이지들을 뜻한다.

<h3>_document.js</h3>

그 다음에 `_document.js`가 실행되는데, 이는 `_app.js`에서 구성한 HTML이 어떤 형태로 들어갈지 구성해주는 것이다.

```js
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
```

<h3>getInitialProps</h3>

React에서 프로젝트를 진행하면 렌더링 후에 `componentDidMount`나 `useEffect()`로 데이터를 불러와야 한다. 하지만 Next에서는 `getInitialProps`를 통해 데이터를 미리 불러와 한 번에 렌더링이 가능하다. 미리 데이터를 불러옴으로 속도가 빨라지며, 코드 상의 처리가 깔끔해진다.

_Next 9.3 이후로는 `getStaticProps`나 `getServerSideProps` 사용을 권장한다. 아래에서 더 자세히 설명._

만약 어디에서나 공통된 데이터가 필요하다면 `_app.js`에 `getInitialProps`를 붙이면 되고, 각기 다른 데이터가 필요하다면 페이지마다 `getInitialProps`를 붙이면 된다.

각 페이지마다 `getInitialProps`를 붙이는 방법은 아래와 같다.

```js
function Page({ stars }) {
  return <div>Next stars: {stars}</div>
}

Page.getInitialProps = async ctx => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}

export default Page
```

**주의**:

- `getInitialProps`으로 리턴되는 객체는 Date, Map, Set으로 사용되는 것이 아닌 순수 객체여야 한다.
- `getInitialProps`은 자식 컴포넌트에서 사용할 수 없으며, 오로지 default export 컴포넌트에서만 사용할 수 있다.

**Context Object**

`getInitialProps`는 `context`라는 단일 인자를 받는데, 설정하지 않는다면 기본값으로 설정된다.

- `pathname` - `pages` 폴더 안에 있는 현재 Route
- `query` - 객체로 이루어진 쿼리스트링, ex. /category?id=phone에서 {id: 'phone'}
- `asPath` - query를 포함한 `String`의 실제 경로, ex. /category?id=phone 전체 경로
- `req` - HTTP request object (server only)
- `res` - HTTP response object (server only)
- `err` - Error object if any error is encountered during the rendering

## Data fetching

Next 9.3에서는 `getInitialProps`보다 `getStaticProps`와 `getServerSideProps` 사용을 권장한다.

간단히 먼저 소개하자면,

- `getStaticProps` (Static Generation): 빌드(build)할 때 데이터를 불러옴
- `getStaticPaths` (Static Generation): 데이터에 기반하여 pre-render때 특정한 동적 라우팅 구현
- `getServerSideProps` (Server-side Rendering): 요청(request)아 있을 때 데이터를 불러옴

<h3>getStaticProps</h3>

어떤 페이지에서 `getStaticProps` 함수를 `async`로 export하면, `getStaticProps`에서 리턴되는 props를 가지고 페이지를 pre-render 한다.

```js
export async function getStaticProps(context) {
  return {
    props: {}, // 컴포넌트로 넘어갈 props
  }
}
```

`context`에 몇 가지 매개변수가 존재한다.

- `params`: 페이지의 동적 라우팅에 사용되는 라우트 매개변수를 지닌다. 페이지 이름이 `[id].js`라면 `params`는 `{id: ...}`로 보인다.
- `preview`: true일 때 preview 모드가 된다.
- `previewData`: `setPreviewData`로 설정한 preview data를 지닌다.

기본적인 틀은 아래와 같다.

```js
// getStaticProps()에 의해 build 시간에 게시물이 채워진다
function Blog({ posts }) {
  return (
    <ul>
      {posts.map(post => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}

// 아래 함수는 서버 단에서 build 시간에 호출된다.
// 클라이언트 단에서 호출되지 않으므로, 직접 데이터베이스 쿼리에도 접근 가능하다.
export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  // By returning { props: posts }을 리턴하여 Blog 컴포넌트는 build 시간에 'posts'를 props로 받는다.
  return {
    props: {
      posts,
    },
  }
}

export default Blog
```

**`getStaticProps`를 사용해야 될 때:**

- 페이지를 렌더링 하는데 사용자의 요청보다 먼저 build 시간에 필요한 데이터를 가져올 때
- headless CMS에서 데이터가 올 때
- 공개적으로 캐시될 수 있는 데이터(특정 유저가 아닌)
- 페이지가 사전 렌더링(ex. SEO)되어야 하고 엄청 빨라야 할 때(getStatidProps는 HTML과 JSON 파일을 생성하며, 이 두 파일 모두 CDN에서 성능을 위해 캐시할 수 있음)

<h3>getStaticPaths</h3>

동적 라우팅이 필요하다면 `getStaticPaths`로 경로 리스트를 정의해야하고, HTML에 build 시간에 렌더되어야 한다.

Next는 pre-render에서 정적으로 `getStaticPaths`에서 호출하는 경로들을 가져올 것이다.

```js
export async function getStaticPaths() {
  return {
    paths: [
      { params: { ... } }
    ],
    fallback: true or false
  };
}
```

**[paths](https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required)**

- `paths`는 동적 라우팅 경로를 pre-render한다. (ex. `pages/posts/[id].js`)

- `params`는 페이지 이름에 사용되는 매개변수와 일치해야 한다.
  만약 페이지 이름이 `pages/posts/[postId]/[commentId]`라면, `params`는 `postId`와 `commentId`를 포함해야 한다.

- 만약 페이지 이름이 `pages/[...slug]`와 같이 모든 경로를 사용한다면, `params`는 slug가 담긴 배열이어야 한다.

**[fallback](https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required)**

- `false`라면 `getStaticPaths`로 리턴되지 않은 것은 모두 404 페이지가 뜰 것이다.
- `true`라면 `getStaticPaths`로 리턴되는 것은 build 시간에 HTML이 렌더될 것이다.

```js
return {
  paths: [
    { params: { id: '1' } },
    { params: { id: '2' } }
  ],
  fallback: ...
}
```

<h3>getServerSideProps</h3>

어떤 페이지에서 `getServerSideProps` 함수를 `async`로 export하면, Next는 각 요청(request)마다 리턴되는 데이터를 `getServerSideProps`로 pre-render한다.

```js
export async function getServerSideProps(context) {
  return {
    props: {}, // 컴포넌트로 넘어갈 props
  }
}
```

**Context Object**

`getServerSideProps`의 `context`는 `getStaticProps`의 것과 비슷한다.

- `params` - 만약 해당 페이지가 동적 라우팅이 사용된다면 `params`는 라우팅 매개변수를 지닌다. 페이지 이름이 `[id].js`라면 `params`는 `{id: ...}`
- `req` - HTTP request object
- `res` - HTTP response object
- `query` - 쿼리스트링
- `preview`: true일 때 preview 모드가 된다.
- `previewData`: `setPreviewData`로 설정한 preview data를 지닌다.

```js
function Page({ data }) {
  // 렌더 데이터...
}

// 매 요청마다 호출된다
export async function getServerSideProps() {
  // 외부 API에서 데이터 호출
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  // 페이지에 props로 데이터 보내기
  return { props: { data } }
}

export default Page
```

**`getServerSideProps`를 사용해야 될 때:**

- 요청(request)할 때 데이터를 가져와야 하는 페이지를 미리 렌더해야 할때 사용한다. 서버가 모든 요청에 대한 결과를 계산하고, 추가 구성 없이 CDN에 의해 결과를 캐시할 수 없기 때문에 첫 번째 바이트까지의 시간(TTFB)은 `getStaticProps`보다 느리다.
- 만약 미리 렌더를 하지 않아도 될 경우, [클라이언트 단](https://nextjs.org/docs/basic-features/data-fetching#fetching-data-on-the-client-side)에서 데이터를 불러오는 것을 고려해야 한다.

<br />

**참고**

<div style="font-size: 12px;">

- https://nextjs.org/
- https://velog.io/@cyranocoding/Next-js-%EA%B5%AC%EB%8F%99%EB%B0%A9%EC%8B%9D-%EA%B3%BC-getInitialProps

</div>
