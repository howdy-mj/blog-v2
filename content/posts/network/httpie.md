---
title: 'HTTPie 소개 및 사용법'
date: '2020-8-26'
tags: ['network']
draft: true
---

_해당 글은 [HTTPie 공식문서](https://httpie.org/docs)를 참고했습니다_

## HTTPie란?

[HTTPie](https://httpie.org/)(h-t-t-pie라 읽음)는 HTTP 클라이언트 커맨트 라인이다.

HTTPie는 디버깅과 APIs, HTTP 서버, 웹 서비스와 상호작용 및 디버깅을 쉽게할 수 있도록 설계되었다. 기존의 [curl](https://curl.haxx.se/)보다 더 사용자 친화적이고 사용하기 쉽다.

### 특징

- 직관적인 문법
- 포맷팅된 터미널 출력으로 가독성 높음
- JSON 지원
- form과 파일 업로드
- HTTPS, 프록시, 인증
- 커스텀 헤더 설정
- 지속 세션
- Wget과 같은 다운로드
- 리눅스, 맥, 윈도우 지원
- 플러그인, 문서

### 설치

macOs는 Homebrew를 통해 설치하는 것을 추천한다.

```shell
$ brew install httpie

# 버전 확인
$ http --version
2.2.0
```

## 사용법

_모든 예시는 HTTPie 서버를 이용한다_

기본 구조는 아래와 같으며, `http --help`를 치면 더 자세히 알 수 있다.

```shell
$ http <메서드> URL
```

메서드가 없으면 `GET`으로 간주한다.

<br />

### curl과 HTTPie 비교

먼저 curl과 HTTPie를 `GET` 했을 때의 출력을 비교해보자.

`curl`

<div style="text-align: center;"><img src="https://user-images.githubusercontent.com/58619071/193441398-72f195c9-c091-48c9-886a-20912bdb0483.png" style="width: 300px">
<p style="font-size: 11px; color: gray;">curl</p></div>

`HTTPie`

<div style="text-align: center;"><img src="https://user-images.githubusercontent.com/58619071/193441401-28d10282-7fca-425b-955f-5395c9dbc1b5.png" style="width: 400px"></div>

같은 것을 요청했음에도 불구하고, curl과 HTTPie가 응답해주는 내용이 다르다.

<br />

### `PUT` 메서드 사용

```shell
$ http PUT httpbin.org/put X-API-Token:123 name=kmj
```

<div style="text-align: center;"><img src="https://user-images.githubusercontent.com/58619071/193441403-f9b30ee1-4e96-4bc3-8500-8635bec5069c.png" style="width: 400px"></div>

정상적으로 데이터가 들어간 것을 볼 수 있다.

브라우저로 'httpbin.org/put'를 들어가면 허용하지 않는 메서드이기 때문에 페이지는 뜨지 않는다.

<br />

### `localhost` 사용

자신이 만든 서버를 띄운 후, HTTPie로 정보를 읽을 수 있다.

```shell
$ http localhost:포트번호 Host:example.com
```

자신이 설정한 포트번호와 Host(선택)을 적고 실행하면 아래처럼 뜬다.

만약 스킴이 비어있다면 `http://`를 기본으로 설정한다.
HTTPie에는 `https` 명령어도 있어서 해당 스킴을 기본으로 사용할 수도 있다.

```shell
$ https example.org
# => https://example.org
```

```shell
$ http localhost:80 Host:kmj
HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: text/html
Date: Tue, 25 Aug 2020 04:21:39 GMT
Transfer-Encoding: chunked
host: kmj

<html><body><p>Homepage</p><img src="https://kdydesign.github.io/2017/07/15/nodejs-npm-tutorial/cover.png"/></body></html>
```

## 자주 쓰는 옵션

- `--headers, -h`: 응답 헤더만 출력
- `--body, -b`: 응답 바디만 출력
- `--verbose, -v`: 전체 HTTP 요청/응답 출력

```shell
# 자세한 정보 출력
$ http -v httpie.org

# 301, 302 응답이 오면 해당 링크로 이동
$ http -v -f http://example.org

# 헤더만 출력
$ http -h http://example.org

# 다운로드
$ http -d exmaple.org/file
```
