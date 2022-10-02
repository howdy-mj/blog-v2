---
title: 'URI란? (feat. URL, URN)'
date: '2020-8-21'
tags: ['network']
draft: false
---

<p style="color: gray; font-style: italic">해당 문서는 <span style="font-weight: bold;">RFC 3986</span>을 기준으로 작성되었습니다.</p>

URI(Uniform Resource Identifier, 통합 자원 식별자)는 언제 어디서든 늘 같은 리소스(텍스트, 이미지, 비디오 등)를 보여줄 수 있도록 해주는 식별자이다.

## 1. URI 구조

```shell
scheme:[//[user[:password]@]host[:port]][/path][?query][#fragment]
```

- scheme과 host를 제외하고는 모두 선택 사항이다.
- `[user[:password]@]host[:port]` 는 authority로 묶을 수 있다.

<br />

**다른 예시:**

```
ftp://file.fileserver.com/entries/01
http://www.ietf.org/rfc/rfc2396.txt
mailto:John.Doe@example.com
news:comp.infosystems.www.servers.unix
tel:+1-816-555-1212
telnet://192.0.2.16:80/
urn:oasis:names:specification:docbook:dtd:xml:4.1.2
http://www.ietf.org/rfc/rfc2396.txt
```

- 콜론(`:`)은 2개로 묶인 쌍에서 좌우 구분을 위한 인자이다.
- 더블 슬래쉬(`//`)는 어떤 시작을 알린다.

<br />

### 스킴(Scheme)

어떤 프로토콜을 사용할지 알린다.

```shell
scheme = 영문 * (영문 / 숫자 / "+" / "-" / "." )
```

첫 문자부터 콜론(`:`) 직전이 스킴이며, 영문, 숫자, 더하기(`+`), 점(`.`), 하이픈(`-`)으로 구성될 수 있으며, 영문은 소문자로 쓴다.

자주 쓰는 스킴으로 http, https, ftp, mailto, file, data 등이 있다.

- URI 스킴 목록: [IANA 공식 URI Schemes](http://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml)

<br />

### Authority

authority는 사용자 정보, 호스트, 포트번호의 조합이다.

```
authority = [ userinfo "@" ] host [ ":" port ]
```

- 더블 슬래쉬(`//`)로 시작하여 그 다음 슬래쉬(`/`), 물음표(`?`), 혹은 크로스해치(`#`)으로 구분되거나, URI의 마지막 부분이 될 수도 있다.
- 콜론(`:`)으로 호스트와 포트번호를 나뉜다.

**사용자 정보(User Information)**

```
userinfo = username ":" password
```

- username만 있을 수도 있고 password까지 다 있을 수도 있다.
- 만약 사용자 정보가 있다면 `@`로 끝난다.

**호스트(Host)**

인터넷 상에서 유익할 식별

```
host = IP-literal / IPv4address / reg-name
```

- 우리가 '홈페이지 주소'라 떠올리면 생각나는 naver, google과 같은 것이며, IP 주소가 올 수도 있다.
- `127.0.0.1`은 localhost를 가리킨다.

**포트(Port)**

보통 스킴이 기본 포트를 정의해준다. (ex. HTTP는 80, HTTPS는 43) 만약 따로 포트를 지정했다면 써줘야 한다.

```
port = 숫자
```

<br />

### 경로(Path)

리소스에 대한 경로이다.

```
path = /                 ; "/"로 시작하거나 비어있음
     = / path-absolute   ; "/"로 시작
     = / path-nonscheme  ; non-colon segment로 시작
     = / path-rootless   ; segment로 시작
     = / path-empty      ; 비어있음
```

- 물음표(`?`)나 크로스해치(`#`) 앞에서 종료되거나, URI의 끝일 수 있다.

<br />

### 쿼리(Query)

요청받을 리소스의 범위를 좁히기 위해 질문이나 질의로 식별할 수 있다.

```shell
query = * (문자 / "/" / "?" )
```

- 물음표(`?`)로 시작되고 크로스해치(`#`)으로 끝나거나 URI의 끝일 수 있다.
- `key=value` 형식을 가진다.

`https://www.google.co.kr/search?q=코로나`에서, 경로는 `/search`이고 쿼리가 `q=코로나`이다.

<br />

### 부분 식별자(fragment identifier)

북마크 역할을 한다.

```shell
fragment = * (문자 / "/" / "?" )
```

- 크로스해치(`#`)로 시작되고 URI의 마지막이다.
- 부분 식별자의 요청은 서버에 보내지지 않는다.

<br />

### URI 예시

`https://john.doe@www.example.com:123/forum/questions/?tag=networking&order=newest#top`

```
scheme: https
authority:
	- userinfo: john.doe
	- host: www.example.com
	- port: 123
	- path: forum/questions
query: tag=networking&order=newest
fragment: top
```

## 2. 절대, 상대, 기준 URI

URI에는 절대 URI, 상대 URI, 기준 URI가 존재한다.

- 절대(Absolute) URI: 모든 전체 경로를 다 기술한 URI

  ```
  https://www.google.co.kr/search?q=코로나
  https://www.coupang.com/np/campaigns/82/components/194176
  ```

- 상대(Relative) URI: 전체 경로 중, 기준 URI로부터 상대적 경로 표현

  ```
  /search?q=코로나
  /np/campaigns/82/components/194176
  ```

- 기준(Base) URI: 상대 URI만 보면 URI의 기준이 어디인지 알 수없어 기준 URI를 지정하며, 보통 HTML의 Head 요소 안에 `<base href="https://www.coupang.com">` 요소에 표시

## 3. URI 하위 종류

URI는 URL과 URN로 분류될 수 있다.

<div style="text-align: center; "><img src="https://www.cbtnuggets.com/blog/wp-content/uploads/2018/11/URI-URL-URN@2x.png" style="width: 300px">
<p style="font-size: 11px; color: gray;">https://www.cbtnuggets.com/blog/technology/networking/networking-basics-whats-the-difference-between-uri-url-and-urn</p></div>

> A URI can be further classified as a locator, a name, or both.

<div style="text-align: center;"><img src="https://user-images.githubusercontent.com/58619071/193441590-5d6b386c-df66-413b-99b4-a3dac93cb131.png">
<p style="font-size: 11px; color: gray;">Wikipedia</p></div>

- 위가 URL, 밑이 URN이다.

### URL(Uniform Resource Locator)

URL은 현재 우리가 홈페이지 주소를 불렀을 때 사용하는 형식으로, 위에서 설명한 구조 모두 URL이다.

정확히 어디에 있는지 경로까지 다 구체적으로 서술해야 접근이 가능하다.

_HTTP 명세에서는 URI를 더 일반화된 개념으로 사용하지만, 실제 HTTP 애플리케이션에서는 URL을 사용한다._

### URN(Uniform Resource Name)

URN은 현재 그 리소스가 어디에 있든 상관없이 이름만으로 리소스를 식별한다.

URL의 문제점은, 만약 `howdy-mj.me/web/web-server-and-was/` 에서 web이라는 카테고리를 network로 변경했을 때, 그 이전에 URL을 가져갔던 사람은 변경된 주소로 들어가지 못한다.

하지만 URN은 위치가 바뀌었더라도 리소스의 위치를 찾을 수 있다.

<br />

**참고**

<div style="font-size: 12px;">

- [RFC3986 - Uniform Resource Identifier](https://tools.ietf.org/pdf/rfc3986.pdf)
- [http://www.ktword.co.kr/abbr_view.php?m_temp1=2340](http://www.ktword.co.kr/abbr_view.php?m_temp1=2340)
- [https://mygumi.tistory.com/139](https://mygumi.tistory.com/139)

</div>
