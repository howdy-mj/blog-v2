---
title: 'Next.js에서 userAgent 정보 가져오기'
date: '2021-1-20'
tags: ['next']
draft: false
---

<div style="font-size: 12px; font-style: italic;">
업데이트: 2021.01.26
<br />
<br />
업데이트: 2021.05.23 <br />
- 주요 내용: getServerSideProps (댓글 달아주신 sixmen님 감사합니다)
</div>

<br />

Next.js에서 라이브러리 설치 없이 유저가 사용하는 기기를 탐지하는 방법에 대해 알아보자.

해당 글은 next `^10.0.3`, react `^17.0.1`, typescript `^4.1.3` 버전으로 작성되었다.

## userAgent 정보 가져오기

만들어진 Next 프로젝트의 `pages/index.tsx`에서 아래와 같이 작성하면 된다.

```tsx
// 'pages/index.tsx'에서 getInitialProps 사용
import { NextPage, NextPageContext } from 'next'
import Head from 'next/head'

interface Props {
  userAgent: string
}

const Home: NextPage<Props> = ({ userAgent }) => {
  console.log('index', userAgent)
  return (
    <div>
      <Head>
        <title>howdy-mj</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>Hello World!</div>
    </div>
  )
}

Home.getInitialProps = async ({ req }: NextPageContext) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return { userAgent }
}

export default Home
```

그럼 console에서 아래와 같이 정상적으로 필자가 사용하는 기기의 정보를 가져올 수 있다.

```
Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36
```

<br />

하지만 이렇게 사용하기에 걸리는 점이 있었다. 필자는 어느 페이지를 띄우든 특정 브라우저(ex. IE)를 통해 들어오는 유저에게 모달창을 띄우고 싶었다. 그래서 서버사이드 렌더링 단에서 구해보기로 했다.

### 1. getStaticProps

Next 9.3 이상에서 `getInitialProps` 대신 `getStaticProps` 사용을 권장하고 있지만, 정작 `getStaticProps`으로는 사용중인 기기 정보를 얻을 수 없었다.

```tsx{25-28}
// 'pages/index.tsx'에서 getStaticProps를 사용하면 에러 발생
import { NextPage, NextPageContext } from 'next'
import Head from 'next/head'

interface Props {
  userAgent?: string
}

const Home: NextPage<Props> = ({ userAgent }) => {
  console.log('index', userAgent)

  return (
    <div>
      <Head>
        <title>howdy-mj</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>Hello World!</div>
    </div>
  )
}

export const getStaticProps = ({ req }: NextPageContext) => {
  const userAgent =
    typeof navigator === 'undefined'
      ? req.headers['user-agent']
      : navigator.userAgent

  return { props: { userAgent } }
}
```

처음에 navigator가 undefined되어 `typeof navigator === 'undefined'` 조건을 넣었지만, 여전히 `TypeError: Cannot read property 'headers' of undefined`라는 타입 에러를 뱉으며 결과를 얻을 수 없었다.

이는 `getStaticProps`가 정적 화면인 HTML 페이지만을 보여주기 때문이다. 따라서, 이 화면이 완성되는 시점에서 브라우저는 어느 기기에서 볼지 알 수 없다.

### 2. getServerSideProps

`getStaticProps`이 빌드 타임에 데이터를 가져오는 정적 생성이라면, `getServerSideProps`는 매 요청때마다 데이터를 가져오는 서버사이드 렌더링이다.

```tsx{22-25}
import Head from 'next/head'

interface Props {
  userAgent: string
}

const Home = ({ userAgent }: Props) => {
  console.log('index page', userAgent)

  return (
    <div>
      <Head>
        <title>howdy-mj</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>Hello World!</div>
    </div>
  )
}

export const getServerSideProps = ({ req }) => {
  const userAgent = req.headers['user-agent']
  return { props: { userAgent } }
}

export default Home
```

`getServerSideProps` 역시 서버에서 렌더링이 되기 때문에, 아직 브라우저는 이를 인지하지 못하기 때문에 `window`가 undefined이다. 그렇기 때문에 서버에 요청 보낸 후 응답으로 받는 `req`로 값을 가져와야 한다.

```tsx
interface Props {
  userAgent: string
  header: any
}

const Home = ({ userAgent, header }: Props) => {
  console.log('index page', userAgent)
  console.log('header', header)

  return (
    // ...생략
  )
}

export const getServerSideProps = ({ req }) => {
  const userAgent = req.headers['user-agent']
  return { props: { userAgent, header: req.headers } }
}

export default Home
```

console을 찍어보면, 아래처럼 header가 잘 들어오는 것을 확인할 수 있다.

```
header {
  host: 'localhost:3000',
  connection: 'keep-alive',
  'cache-control': 'max-age=0',
  'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
  'sec-ch-ua-mobile': '?0',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-dest': 'document',
  referer: 'http://localhost:3000/',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
}
```

### getStaticProps와 getServerSideProps의 차이

Next.js에서는 `getStaticProps`의 사용을 추천하는 주요 이유는 성능 때문이다. `getStaticProps`은 빌드 될 때 생성된 HTML을 나중에 요청할 때 재사용하는 형태이다. 그리고 사용자의 요청 전에 CSR을 통해 데이터를 추가적으로 가져올 수 있다.

반면, `getServerSideProps`는 매 요청때마다 HTML이 다시 생성되고, 정적으로 페이지가 생성되는 것보다 느리다. 매 렌더링 마다 데이터를 다시 요청하기 때문에 반드시 필요한 경우에만 사용하는 것을 권장한다.

## 모든 페이지에서 userAgent 알아내기

`pages/_app.tsx`에서 제일 처음에 `getInitialProps`를 사용한 코드를 넣으면 `ReferenceError: navigator is not defined`와 같은 에러가 나왔다. 이는 SSR이기 때문에 CSR에서 알 수 있는 window나 브라우저 관련 변수를 잡아내지 못하는 것이다.

위에서 쓴 것처럼 서버 사이드 단에서 잡고 싶었지만, <a href="https://nextjs.org/docs/advanced-features/custom-app#caveats" target="_blank">공식문서</a>를 보면 현재 `App`에서는 `getStaticProps`나 `getServerSideProps`와 같은 데이터 fetching 메서드를 지원하지 않기 때문에 사용이 불가하다. 따라서 useEffect를 사용할 수 밖에 없었다.

### 1. \_app에서 getInitialProps 사용

```tsx{17, 27-30}
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/reset';
import theme from '../styles/theme';

interface userAgentProps {
  userAgent: string;
}

function MyApp(
  { Component, pageProps }: AppProps,
  { userAgent }: userAgentProps,
) {
  console.log('_app userAgent:', userAgent); // output: undefined

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { userAgent };
};

export default MyApp;
```

### 2. \_app에서 useEffect 사용

```tsx
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/reset';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const [isIE, setIsIE] = useState<boolean>(false);
  const [isChrome, SetIsChrome] = useState<boolean>(false);

  useEffect(() => {
    const IE = navigator.userAgent.match(/MSIE|rv:|IEMobile/i);
    const Chrome = navigator.userAgent.match(/Chrome/i);
    setIsIE(Boolean(IE));
    SetIsChrome(Boolean(Chrome));
  }, []);

  console.log('isIE', isIE); // output: false
  console.log('isChrome', isChrome); // output: true

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

하지만 `currentBrowser` 값은 boolean으로 뜨기 때문에 필자가 원하던 모달창은 띄울 수 있었다.

## 정리

특정 페이지에서의 사용 기기를 알고 싶다면, 해당 페이지 내에서 `getServerSideProps`를 사용하면 된다.

전체 페이지에서 사용 기기를 알고 싶다면, `pages/_app.tsx`의 `useEffect`로 특정 브라우저인지 아닌지를 Boolean 값으로 반환하면 된다.

<br />

### 궁금점

<span style="font-style: italic; text-decoration: line-through;">getInitialProps와 getStaticProps의 차이, 그리고 넘긴 props가 왜 undefined인지 궁금하다.</span> => 댓글로 달아주신 sixmen님 다시 한 번 감사드립니다:)

<br />

**참고**

<div style="font-size: 12px;">

- https://nextjs.org/docs/api-reference/data-fetching/getInitialProps

</div>
