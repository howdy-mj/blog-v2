---
title: 'HTTP란? HTTP 메세지, 웹의 구성요소'
date: '2020-8-27'
tags: ['network']
draft: false
---

<p style="color: gray; font-style: italic">해당 글은 <span style="font-weight: bold;"><a href="https://www.rfc-editor.org/info/rfc7230" target="_blank">HTTP/1.1 - RFC7230 문서</a></span>를 기준으로 작성되었습니다.</p>

> HTTP는 브라우저와 서버가 대화를 할 때 사용하는 것이다. HTTP를 이해하면 웹의 동작 원리를 이해한 다는 것이며, 웹 서버와 네트워크를 관리할 때 정확한 근거로 올바른 판단을 내릴 때 도움이 될 수 있다.

## HTTP란?

**HTTP**(HyperText Transfer Protocol)는 브라우저와 서버가 서로 소통을 할 수 있도록 만들어진 규약이다.

<br />

### 우리가 보는 웹은 모두 HTTP 요청/응답으로 보여지는 화면이다

사용자는 주소창에 URL을 입력하면 원했던 화면이 뜬다.

이때 주소창에 URL을 입력하고 엔터를 누르는 행위가 HTTP 요청을 보내는 것이고, 웹 페이지가 뜨는 것이 응답을 받은 것이다.

<a href="https://howdy-mj.me/network/what-is-uri/" target="_blank">URI란? (feat. URL, URN)</a>

<div style="text-align: center;"><img src="https://user-images.githubusercontent.com/58619071/193441537-d07f2854-aa13-4760-9685-e2b5545bac6e.png"></div>

구글에서 Network 탭을 보면 요청(Request)과 응답(Response) 내용을 확인할 수 있다.

<br />

### HTTP는 어떻게 정해질까?

HTTP는 IETF(인터넷국제표준화기구)에서 **RFC 문서** 채택을 통해 이루어진다.

IETF는 인터넷과 TCP/IP의 기술 표준을 정하는 국제적 기구이다. 어떤 사람이 기술 표준에 대한 초안을 작성해 배포하면, 서로 의견을 제시하며 토론하고 최종적으로 받아들여 지는 것을 인터넷 표준으로 채택한다. 이런 초안을 RFC(Request for Comments)라고 하며 '비평을 기다리는 문서'의 의미를 갖는다.

RFC 편집자는 매 문서에 일련번호와 함께 배포하며, 절대 폐지되거나 수정되지 않는다. 만약 어떤 RFC 문서의 수정이 필요하다면, 수정된 문서를 다시 출판해야 한다. 이런 덮어쓰는 방식을 통해 RFC는 인터넷 표준의 역사를 나타내기도 한다.

<br />

### HTTP 특징

- 메세지 교환 형태의 프로토콜: 클라이언트가 보고 싶은 걸 서버에 요청하면 응답이 옴
- 비연결성(Connectionless): 클라이언트와 서버가 한 번 연결을 맺은 후, 클라이언트의 요청을 서버가 응답하면 맺었던 연결을 끊음. 불특정 다수의 통신을 줄여 더 많은 연결이 가능하지만, 동일한 요청을 새로 요청해야 함
- 무상태(Stateless): 이전 상태를 유지 하지 않음. 상태를 기억하기 위해서 쿠키, 세션, 토큰이 도입 됨

## HTTP 메세지

그렇다면 HTTP의 요청과 응답은 어떻게 생겼을까? 아래 그림과 같이 메세지 형태를 취하고 있다.

<div class="img-refer">
  <img src="https://www.oreilly.com/library/view/http-the-definitive/1565925092/httpatomoreillycomsourceoreillyimages96838.png" style="width: 600px">
  <p>https://www.oreilly.com/library/view/http-the-definitive/1565925092/ch01s05.html</p>
</div>

HTTP 메세지는 요청과 응답으로 나뉘고 모두 `시작줄, 헤더, 본문`으로 이루어져 있다.

### 요청(Request)

```
Request Line: <메세드> <요청 URL> <버전>
Headers: <헤더>

Body: <본문>
```

### 응답(Response)

```
Status Line: <버전> <상태코드> <사유 구절>
Headers: <헤더>

Body: <본문>
```

<p style="font-style: italic; color: gray;">* 시작줄을 공통으로 Start Line이라 하는데, 요청은 Request Line으로, 응답은 Status Line이라 부를 수 있다.</p>

- 마지막은 CRLF로 줄바꿈 한다.

<br />

### 1. 시작줄

요청은 무엇을 해야 하는지, 응답은 무슨 일이 일어났는지 알려 준다.

**[ 요청 ]**

```http
GET /doc/test.html HTTP/1.1
```

- 메서드(Method): 서버에 무엇을 해야 하는지 알려주는 것
- 요청 URL(Request target): 요청이 어디로 전송 되는지 알려주는 URL
- 버전(Version): HTTP 버전 (메세지의 구조를 결정하기 때문에 HTTP 버전을 알려줘야 함)

**[ 응답 ]**

```http
HTTP/1.1 200 OK
```

- 버전(Version): HTTP 버전 명시
- 상태 코드(Status Code): (숫자) 컴퓨터가 알아듣는 언어
- 사유 구절(Reason-phrase): (문자) 사람이 알아듣는 언어

<br />

### 2. 헤더

헤더는 크게 **일반(General) 헤더**, **요청(Request)/응답(Response) 헤더**, **엔터티(Entity) 헤더**로 나뉘며 모두 `key: value` 형식으로 작성한다.

**a. 일반 헤더:** 메세지에 대한 기본적인 정보 제공

```http
Via: 1.1 proxy-62.irenes-sip.net
Connection: kepp-alive
```

- Via: 어떤 중개자(프록시, 게이트웨이)를 거쳐 왔는지 보여 줌
- Connection: 클라이언트와 서버가 요청/응답 연결에 대한 옵션을 정할 수 있음

**b. 요청 헤더**: 서버에게 요청의 세부 정보 제공

```http
Accept: */*
User-Agent: Mozilla/5.0
Cookie: 쿠키 값
```

- Accept: 해당 요청이 받을 수 있는 미디어 타입
- User-Agent: 요청을 보내는 클라이언트(주체)의 정보 (ex. 브라우저 정보, ip주소 등)
- Cookie: 클라이언트가 서버에게 토큰을 전달할 때 사용

**c. 응답 헤더**: 브라우저에게 응답의 세부 정보 제공

```http
Server: gws
Age:
Set-Cookie:
```

- Server: 서버 애플리케이션의 이름과 버전
- Age: 응답이 얼마나 오래 되었는지
- Set-Cookie: 서버가 클라이언트를 인증할 수 있도록 토큰 설정할 때 사용

**d. 엔터티 헤더**: 바디의 컨텐츠를 나타냄

```http
Content-Type: text/html, application/json; charset=UTF-8
Content-Length: 345
```

- Content-Type: 본문의 MIME 타입을 서술 (보통 확장자 기반 타입 연계)
- Content-Length: 본문의 길이나 크기

<details>
    <summary>용어: MIME</summary>
      <span style="font-weight: bold; font-size: 14px;">MIME(Multipurpose Internet Mail Extensions)</span>: 자료 파일 변환을 위한 포맷
    <ul style="font-size: 14px;">
      <li>웹 서버는 받은 요청이 어떤 것인지 빠르게 알아내기 모든 HTTP 객체 데이터에 MIME 타입을 붙임</li>
      <li>MIME에는 메세지 종류를 나타내는 <span class="variable">content-type</span>, 메세지 인코딩 방식을 나타내는 <span class="variable">content-transfer-encoding</span> 등 같은 정보 정의</li>
      <li>MIME 타입은 type/subtype 형식으로 타입텍스트, 이미지, 오디오 등이, 서브타입에는 어떤 타입인지 구체적으로 서술</li>
    </ul>
  </details>

<br />

### 3. 본문

선택 사항으로 이미지, 비디오, 텍스트 등 여러 종류의 데이터를 담을 수 있다.

`GET, HEAD, DELETE, OPTIONS`처럼 리소스를 가져오는 요청은 보통 본문이 비어 있다.

## 웹의 구성요소

브라우저와 서버 간의 통신을 더 안전하고 효율적으로 하기 위해 중개자 역할을 하는 구성 요소가 나왔다. 대표적인 것으로 캐시, 프록시, 게이트웨이 등이 있다.

### 캐시(Cache)

처음에 여는데 오래 걸렸던 사이트를 다시 들어가면 처음보다 빠르게 켜질 때가 있다. 이는 브라우저가 문서의 사본을 HTTP 헤더 지시에 따라 보관한 덕분이다. 캐시는 불필요한 데이터 전송을 줄여 시간과 비용을 줄여 준다.

_(HTTP 캐시와 브라우저 캐시의 차이는 추후 작성)_

<br />

### 프록시(Proxy)

프록시는 클라이언트와 서버의 중개자로 같은 프로토콜을 사용하는 둘 이상의 애플리케이션을 연결한다.

프록시는 실용적이고 유용한 일을 처리한다. 예를 들면 어린이에게 부적절한 사이트 필터, 문서 접근 제어, 보안 방화벽, 웹 캐시, 익명화 프록시 등이 있다.

**프록시와 게이트웨이 차이점**:
프록시와 밑에 설명하는 게이트웨이는 모두 중개자 역할을 한다. 하지만 프록시는 같은 프로토콜을 사용하는 애플리케이션을 연결한다면, 게이트웨이는 서로 다른 프로토콜을 사용하는 애플리케이션을 연결한다.

<div style="text-align: center;"><img src="https://user-images.githubusercontent.com/58619071/193441544-b533b563-0b7e-49e5-b7ef-9282ce5a3d98.png">
<p style="font-size: 11px; color: gray;">http://tlog.tammolo.com/blog/6-a52d91c3-232f-4b33-b9f3-4ef47fbbf973/</p></div>

<br />

### 게이트웨이(Gateway) (a.k.a 리버스 프록시)

게이트웨이는 서로 다른 프로토콜과 애플리케이션을 연결해준다. 우리가 WiFi를 사용하여 인터넷을 하려 할때, PC가 공유기, 인터넷 회사 라우터를 거쳐 인터넷에 연결이 되는 것 역시 게이트웨이다.

<div style="text-align: center;"><img src="https://user-images.githubusercontent.com/58619071/193441546-79ba270e-a7e9-4e61-824a-e7f83aabfab9.png">
<p style="font-size: 11px; color: gray;">http://tlog.tammolo.com/blog/8-c3068a1a-9ace-450d-a87e-e3cc6213955e/</p></div>

HTTP/FTP와 HTTP/POP 등은 다른 프로토콜이란 걸 바로 알 수 있지만, HTTP/CGI는 이해가 잘 안돼서 찾아봤다.

_('클라이언트 측 프로토콜/서버 측 프로토콜'로 작성한다.)_

<details>
    <summary>용어: FTP, POP</summary>
    <ul style="font-size: 14px;">
      <li><span style="font-weight: bold;">FTP(File Transfer Protocol)</span>: 파일을 교환하기 위해 사용</li>
      <li><span style="font-weight: bold;">POP(Post Office Protocol)</span>: 이메일을 가져오는데 사용</li>
    </ul>
</details>

<br />

**참고**

<div style="font-size: 12px;">

- HTTP 완벽 가이드, 2014, 인사이트
- <a href="https://httpwg.org/" target="_blank">The IETF HTTP Working Group</a>
- <a href="https://developer.mozilla.org/ko/docs/Web/HTTP/Messages" target="_blank">MDN - HTTP 메시지</a>
- <a href="https://evan-moon.github.io/2019/11/10/header-of-tcp/" target="_blank">TCP의 헤더에는 어떤 정보들이 담겨있는걸까?</a>
- <a href="https://www.oreilly.com/library/view/http-the-definitive/1565925092/ch04s01.html" target="_blank">O'Reilly - TCP Connections
  </a>
- <a href="https://medium.com/webeveloper/http-요청과-응답-2209bc82f239" target="_blank">HTTP 요청과 응답</a>
- <a href="http://www.ktword.co.kr/abbr_view.php?m_temp1=1829" target="_blank">정보통신기술용어해설 - Proxy 프록시, 프락시</a>
- <a href="https://bohemihan.tistory.com/entry/3일차-8-활용-CGI-소개" target="_blank">CGI 소개</a>
- <a href="https://tools.ietf.org/pdf/rfc3875.pdf" target="_blank">The Common Gateway Interface (CGI) Version 1.1</a>
- <a href="https://www.oreilly.com/openbook/cgi/ch01_01.html" target="_blank">O'Reilly - The Common Gateway Interface (CGI)</a>
- <a href="http://lnr.irb.hr/ebooks/1575211416/ch17.htm" target="_blank">Combining JavaScript, CGI, and SSI</a>
- <a href="http://www.whizkidtech.redprince.net/cgi-bin/tutorial" target="_blank">CGI Programming Is Simple!</a>
- <a href="https://gmlwjd9405.github.io/2018/09/14/process-vs-thread.html" target="_blank">[OS] 프로세스와 스레드의 차이</a>

</div>
