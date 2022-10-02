---
title: 'OTP 동작원리'
date: '2021-12-17'
tags: ['general']
draft: false
---

<div class="intro">
필자가 이해한 내용을 최대한 간단하게 써내려가는 글로, 부족한 부분이나 틀린 내용이 있을 수 있습니다.

피드백은 언제나 환영합니다!

</div>

<br>

스마트폰이 나오기 전, 어느 사이트에 가입할 때 비밀번호를 까먹을 것을 대비하여 '초등학교 때 가장 기억에 남는 선생님 성함은?', '어렸을 적 키웠던 반려동물 이름은?' 등 유저가 여러 개의 질문 중 하나를 선택하고 답변을 저장했다. 하지만 나중에 내가 어떤 질문을 골랐는지 조차 기억이 나지 않는 참사가 일어난다.

이런 참사를 없애고자 문자 인증, 이메일 인증, 보안카드, 아이핀 등을 거쳐 휴대할 수 있는 토큰형 OTP가 나오고, 최근 은행에서는 카드 형태의 OTP를, 더 나아가 OTP를 앱으로 사용할 수 있게 되었다.

<div class="img-div">
  <img src="https://t1.daumcdn.net/cfile/tistory/99B03E335A09530102" alt="은행 OTP">
  <p>https://blog.kakaobank.com/77</p>
</div>

이처럼 유저의 신원을 한 번 더 인증하는 수단을 <span class="definition">MFA(Multi-Factor Authentication)</span>라 한다. 휴대폰 앱으로 은행 업무를 볼 때 공인인증서 외, 카드 비밀번호, 핸드폰 잠금패턴, 지문 혹은 생체인식 등 여러개의 인증 수단이 존재한다.

비밀번호 외 다른 하나의 인증 수단으로 신원을 인증이 가능한 것을 2FA(Two-Factor Authentication)라 한다. 대부분 다 2FA라 보면된다. 최근에 <a href="https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication" target="_blank">Github도 2FA</a>를 필수로 설정하도록 되어 있고, AWS를 사용할 때도 반드시 설정해야 한다.

<br>

사용하다보니 OTP가 어떤 원리로 작동하는지 궁금해졌다.

> 이 숫자만 보고 어떻게 나라는걸 알 수 있을까? 그럼 이 숫자는 서버 어딘가에 있는건가? 인터넷에 연결이 안되어 있어도 사용할 수 있네? 처음 생성할 때 보여주는 Private key(혹은 recovery codes)를 갖고 있다면 언제든 복원이 가능하기도 하고... 등등

## OTP란?

<span class="definition">OTP(One-Time Password)</span>는 특정 알고리즘으로 숫자를 생성하여 본인 인증을 도와주는 프로그램이다. 크게 HOTP와 TOTP 두 종류로 나뉜다.

현재 많이 사용되고 있는 Google OTP, 은행 OTP 등 대부분 TOTP 기반으로 작동되고 있다.

흐름대로 소개하자면 HOTP를 먼저 하는게 맞지만, 우선 우리에게 익숙한 TOTP를 간단하게 설명한 후, HOTP를 살펴보기로 하자.

## TOTP(Time-based One-Time Password)

TOTP 스펙은 <a href="https://datatracker.ietf.org/doc/html/rfc6238" target="_blank">RFC6238</a>에 정리되어 있다.

TOTP는 HOTP 기반으로 나왔으며, HOTP와 다른 점은 시간(Time) 기반이라는 점이다.

<div class="img-div" style="width: 330px;">
  <img src="https://play-lh.googleusercontent.com/-15RNeDrob7WSybEtSGTuGu1gj_-RLP_ywlBl8GwoONBKCURKylarxjt8NAT5QKRK00=w1280-h1304-rw" alt="Google OTP">
  <p>Google OTP</p>
</div>

우측의 원이 한 바퀴 다 돌면(Google OTP는 30초) 새로운 6자리 숫자가 뜬다.

```
TOTP = HOTP(K, T)
```

HOTP의 Counter에서 Time으로 바뀐 알고리즘이다. 기존에 HMAC이 연산 값을 단순하게 증가시키던 HMAC-SHA-1 알고리즘에서 일정 시간마다 값이 변경되도록 한 HMAC-SHA-256이나 HMAC-SHA-512 함수를 사용한다.

<!-- 1. prover(ex. 토큰)와 verifier(인증 혹은 validation 서버)는 OTP 생성기에 현재 Unix 시간을 얻어낼 수 있어야 한다.
2. prover와 verifier는 반드시 동일한 시크릿을 공유하거나 공유 비밀을 생성하기 위한 시크릿 변환에 대한 내용을 공유해야 한다.
3. 키 빌딩 블록은 반드시 HOTP를 이용해야 한다.
4. prover와 verifier는 반드시 같은 타임 스템프 값 x를 사용해야 한다.
5. 각 prover에게 반드시 고유한 시크릿 키를 제공해야 한다.
6. 키는 반드시 무작위로 생성되거나 키 생성 알고리즘으로 제공해야 한다.
7. 키는 조작 방지 기기(tamper-resistant)에 보관될 수 있으며, 인증되지 않은 접근과 사용으로부터 보호되어야 한다. -->

### TOTP 동작원리

```js
// 이해를 돕기 위해 임의로 만든 예시 코드입니다.
const secretKey = 'totp_scret_key' // 클라이언트와 서버가 각각 갖고 있는 시크릿 키
const totp = TOTP(secretKey) // 시크릿 키로 만들어진 TOTP 값

const currentOtpValue = totp.now() // output: '123456' (현재 OTP 값)
totp.exec(currentOtpValue) // output: true (현재 클라이언트의 OTP에 써져있는 값)

// 30초 후 실행시
totp.exec('123456') // output: false
```

TOTP는 처음에 바코드나 일정 길이의 문자열이 secretKey가 된다(간혹 recovery codes가 있는 곳도 존재한다). 따라서 이 키를 저장해두면, OTP를 잃어버려도 복구가 가능하다. 그리고 특정 시간(보통 30초 혹은 60초)마다 그 다음 값으로 변경된다. 하지만 클라이언트와 서버의 시간이 차이 때문에 제대로 인증이 되지 않는 경우도 있기 때문에 동기화할 수 있는 방법도 필요하다.

Google OTP에서도 비밀번호를 올바르게 입력했는데 인증 오류가 뜬다면 먼저 기기의 시간이 현지 시간과 일치한지, 그리고 OTP 내에서 시간 재동기화를 안내하고 있다.

카카오뱅크에도 이를 염두해두어 시간을 재설정하는 페이지가 존재한다.

<div class="img-div" style="width: 330px;">
  <img src="https://user-images.githubusercontent.com/58619071/193439810-53dd9ac4-b33a-4dce-9722-61a8c4dcaddb.png" alt="카카오뱅크 OTP">
  <p>카카오뱅크 OTP 시간 재설정</p>
</div>

<!-- ### TOTP 알고리즘

|     |                                                        |
| :-- | :----------------------------------------------------- |
| X   | 초 단위의 타임 스탭(time step), 기본 값은 30초이다.    |
| T0  | Unix 타임으로 타임 스텝을 카운팅한다, 기본 값은 0이다. |

T는 정수로 초기 counter 시간 T0와 현재 Unix 시간 사이의 타임 스텝을 수를 나타낸다.

```
T = (Current Unix time - T0) / X

예시
T0 = 0이고, 타임 스탭 X = 30, T = 1에서 현재 Unix 타임이 59초라면, T =2
``` -->

## HOTP(HMAC-based One-Time Password)

HOTP 상세 스펙은 <a href="https://datatracker.ietf.org/doc/html/rfc4226" target="_blank">RFC4226</a>에서 볼 수 있다.

스펙 문서에는 HOTP 알고리즘의 성립을 위한 최소 조건 6가지가 있는데, 그 중 가장 재미있었던 조건은 <i>"핸드폰에서 입력하기 쉽도록 '오직 숫자'로만 하는것도 괜찮다"</i>는 내용이었다. (지금은 별의 별 문자도 다 validation하는데 말이다..)

### HOTP 동작원리

다시 본론으로 돌아와서, TOTP가 HOTP 기반으로 만들어졌는데, 차이점은 counter 기반이라는 것이다. HOTP는 counter 값으로 클라이언트와 서버의 값이 일치하는지 확인한다. counter는 오직 클라이언트와 서버만 알 수 있는 대칭키 암호다.

<details>
  <summary>용어: 대칭키 암호(Symmetric-key)</summary>
  <ul class="small">
    <li>암호화와 복호화에 같은 암호 키를 쓰는 알고리즘으로 송/수신자가 같은 암호 키를 공유해야 한다</li>
  </ul>
</details>

```js
// 이해를 돕기 위해 임의로 만든 예시 코드입니다.
const secretKey = 'hotp_secret_key' // 클라이언트와 서버가 각각 갖고 있는 시크릿 키
const hotp = HOTP(secretKey) // 시크릿 키로 만들어진 HOTP 값

const firstHotpValue = hotp.at(1) // output: '123' (counter가 1일때의 값)
hotp.exec('123', firstHotpValue) // output: true
hotp.exec('123', firstHotpValue) // output: false
```

secretKey는 클라이언트와 서버가 각각 갖고 있으며, 시크릿 키와 counter를 조합하여 값의 일치 여부를 판단한다.

하지만 HOTP의 취약점은 클라이언트와 서버의 counter의 업데이트 주기가 다르고 암호의 생명주기가 너무 길다는 것이다. 클라이언트의 counter 값은 인증을 요청할때마다 증가되고, 서버의 counter 값은 인증이 성공했을 때만 증가한다.

따라서 클라이언트 counter 값이 1일 때 요청을 보내면, 서버는 아직 1인데 클라이언트는 2로 변경된다. 그래서 서버는 그 다음 counter 값으로 넘어가 클라이언트 값과 일치하는지 확인해야 한다.

만약 유저가 인증 요청을 할 때마다 성공했으면 문제 되지 않지만, 만약 인증을 마치지 않은 채 재요청을 한다면, 클라이언트와 서버의 counter 값이 몇 단계 차이난다. 따라서 서버는 클라이언트와 counter 값을 맞추기 위해 이후의 counter 값을 순회하면서 맞는 값을 찾으려 한다. 만약 최대 허용 횟수를 초과했을 경우, 서버는 해당 계정을 잠그고 초기화한 다음 유저에게 알린다.

#### HMAC(Hash-based Message Authentication Code)이란?

HOTP 값은 <a href="https://datatracker.ietf.org/doc/html/rfc2104" target="_blank">RFC2104</a>의 HMAC-SHA-1 알고리즘을 사용하여 구한다.

시크릿 키로 어떤 값을 확인하는 메커니즘을 message authentication codes(MAC)라 부른다. 그리고 이를 해싱 함수로 암호화한 것을 HMAC 메커니즘이라 한다.

<details>
  <summary>용어: 해시(Hash)</summary>
  <ul class="small">
    <li><strong>해시(Hash)</strong>는 다양한 길이를 가진 데이터를 고정된 길이의 데이터로 반환한 값이다. </li>
    <li>단방향으로만 사용할 수 있어서, 암호화된 결과 값과 암호화할 때 사용한 해시 값을 알더라도 원본이 무엇인지 찾을 수 없다.</li>
    <li>대표적으로 MD5, SHA-1 알고리즘이 존재한다.</li>
  </ul>
</details>

### HOTP 알고리즘

```
HOTP(K,C) = Truncate(HMAC-SHA-1(K,C))
```

HMAC-SHA-1이 반환한 값은 160 비트이기 때문에 유저가 입력하기 편하도록 변환(truncate)해야 한다.

|     |                                                                                                                                                                                   |
| :-- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C   | 8 비트로 된 counter 값, moving factor<span class="small">(\*동적으로 변하는 값이라 의역)</span>. 이 값은 반드시 HOTP 생성기(클라이언트)와 HOTP 검증기(서버)와 동기화 되어야 한다. |
| K   | 클라이언트와 서버가 공유하는 시크릿 키이다. 각 HOTP 생성기마다 고유한 시크릿 키가 존재한다.                                                                                       |
| T   | 쓰로틀링(throttling) 파라미터. 만약 이 값이 성공적으로 인증을 시도하지 못한다면, 서버는 연결을 거부한다.                                                                          |
| s   | 재동기화(resynchronization) 파라미터. 서버는 연속된 counter 값을 대입해서 수신된 값과 일치한지 확인한다.                                                                          |

`T`와 `s`는 위에서 클라이언트와 서버의 counter 값이 일치하지 않을때 작동한다.

`T`는 핸드폰 비밀번호를 잘못 입력했을 경우, 그 횟수만큼 재시도할 수 있는 시간이 점점 길어지는 알고리즘이다. 예를 들어 T가 5라면, 처음 실패할 경우 `5*1`로 5초 뒤에 입력이 가능하고, 두 번째인 경우 `5*2`로 10초로 늘어나는걸 말한다. 그리고 입력 가능한 최대 횟수를 초과하면, 핸드폰이 완전히 잠긴다.

HOTP 서버의 counter 값은 오직 HOTP 인증이 성공한 후에 증가되지만, 클라이언트에 있는 counter 값은 유저가 인증 요청을 할 때마다 변경된다. 따라서 서버와 토큰의 counter 값이 달라질 수 있어서 재동기화가 필요하다. 따라서 `s`는 서버를 바라보고, 만약 서버의 값과 클라이언트 값이 일치하지 않는다면, 서버는 그 다음의 `s` 값을 확인하여 두 개의 값과 일치하는지 확인한다.

## 의문점

인증 서버는 어디에 있는걸까?

HOTP, TOTP의 서버는 동일한 데 시크릿 키에 따라 인증 값이 다른걸까? 찾게 된다면 추가할 예정이다.

<br>

**참고**

<div style="font-size: 12px;">

- <a href="https://datatracker.ietf.org/doc/html/rfc2104" target="_blank">RFC2104</a>
- <a href="https://datatracker.ietf.org/doc/html/rfc4226" target="_blank">RFC4226</a>
- <a href="https://datatracker.ietf.org/doc/html/rfc6238" target="_blank">RFC6238</a>
- <a href="https://www.authonet.com/authentication.php" target="_blank">What is OTP/2FA/MFA?</a>
- <a href="https://www.onelogin.com/learn/otp-totp-hotp" target="_blank">
  What’s the Difference Between OTP, TOTP and HOTP?</a>
- <a href="https://ldap.or.kr/1373-2/" target="_blank">One Time Password(OTP)의 개념 및 동작방식. LDAP을 활용한 OTP 인증.</a>

</div>

<!-- - <a href="" target="_blank"></a> -->

<!-- - http://blog.tinisles.com/2011/10/google-authenticator-one-time-password-algorithm-in-javascript/

- https://levelup.gitconnected.com/how-google-authenticator-hmac-based-one-time-password-and-time-based-one-time-password-work-17c6bdef0deb

- https://medium.com/@tilaklodha/google-authenticator-and-how-it-works-2933a4ece8c2 -->
