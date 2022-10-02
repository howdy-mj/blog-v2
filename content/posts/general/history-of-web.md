---
title: '웹 브라우저의 역사'
date: '2022-5-28'
tags: ['general']
draft: false
---

웹 브라우저는 오늘날 우리들이 사용하고 있는 크롬, 사파리, 파이어폭스, IE 등처럼 웹 페이지를 볼 수 있는 프로그램이다. _(해당 글에서는 웹 브라우저만 다루며, 이하 '브라우저'라 칭한다)_

지금의 웹 페이지는 상당히 많은 정보를 담고 있다. 쇼핑몰일 경우, 우리가 사고 싶은 물건을 장바구니에 담고 결제하는 등 다양한 조작이 가능하지만, 최초의 브라우저는 그저 단순히 텍스트로만 이루어진 문서를 볼 수 있는 정적인 페이지였다.

## 최초의 브라우저, WorldWideWeb

1990년, 팀 버너스리(Tim Berners-Lee)는 CERN(유럽 입자 물리 연구소)에 있었는데, 연구 자료의 관리와 공유를 쉽게 하기 위해 어디서든 자료를 열람할 수 있는 시스템을 만들었다.

<div class="img-div" style="width: 500px">
  <img src="https://user-images.githubusercontent.com/58619071/193439623-29c26198-4a01-4600-bafb-3ab0fc8ddf3a.jpg" alt="버너스리의 인콰이어(Enquire) 제안서">
  <p>https://cds.cern.ch/record/2665088</p>
</div>

위 이미지가 당시 연구소에 제출했던 제안서다.

하이퍼링크(참조)를 통해 한 문서에서 다른 문서로 접근할 수 있는 **하이퍼텍스트(Hypertext)**기반의 정보 저장 시스템이다. 그리고 어느 컴퓨터에서든 사용가능하도록 하기 위해, 브라우저가 서버에게 요청해서 문서를 받아올 수 있는 규칙인 **HTTP(Hypertext Transfer Protocol)**, 각 하이퍼링크가 가리키는 고유 주소인 **URI** 그리고 문서의 형식을 **HTML**로 정의했다.

이때 HTTP는 오로지 문서를 가져오는 용도로만 쓰였기 때문에 GET 메서드만 있었다.

<div class="img-div">
  <img src="https://www.w3.org/MarkUp/tims_editor" alt="WorldWideWeb 화면">
  <p>https://www.w3.org/People/Berners-Lee/WorldWideWeb.html</p>
</div>

위 화면이 최초의 브라우저이자 브라우저 에디터인 WorldWideWeb이며, 이를 이용해 만든 최초의 웹사이트는 <a href="http://info.cern.ch/" target="_blank">info.cern.ch</a>이다. 훗날 <a href="https://www.w3.org/" target="_blank">W3C(World Wide Web)</a>와의 이름 충돌을 피하기 위해 Nexus로 이름을 바꾸었다.

<details>
  <summary>용어: W3C(World Wide Web)</summary>
  <ul style="font-size: 14px;">
      <li>웹 표준을 개발하고 장려하는 조직으로 1994년 팀 버너스리를 중심으로 설립되었다.</li>
  </ul>
</details>

## Mosaic, Netscape 그리고 자바스크립트

1993년, 인터넷이 막 보급되면서 사람들이 브라우저를 조금씩 쓰기 시작했는데, 텍스트로만 페이지를 작성하다보니 어느정도 한계가 존재했다.

당시 NCSA에 다니고 있던 마크 앤드리슨(Marc Andreessen)이 최초로 텍스트와 이미지를 함께 보여주는 브라우저 **Mosaic**을 만들었다. 인터넷을 사용하는 사람이 2천만 명도 안되던 시기에, 1년 반만에 2백만 다운로드가 될 정도로 유명한 브라우저가 되었다.

<details>
  <summary>용어: NCSA(National Center for Supercomputing Applications)</summary>
  <ul style="font-size: 14px;">
      <li>1986년에 설립되었으며, 슈퍼 컴퓨터망에서 이용하게 될 각종 프로그램과 통신 규약을 연구하는 국립 슈퍼 컴퓨터 응용 센터다.</li>
  </ul>
</details>

<br>

<div class="img-div">
  <img src="https://www.wired.com/images_blogs/thisdayintech/2010/04/mos-10.jpg" alt="Mosaic 브라우저 화면">
  <p>https://www.wired.com/2010/04/0422mosaic-web-browser/</p>
</div>

1994년에 앤드리슨은 Mosaic으로 Netscape라는 회사를 설립하려 했으나, Mosaic의 저작권이 NCSA에 있었기 때문에 다시 무에서 Netscape Navigator라는 브라우저를 새로 만들었다. Mosaic보다 더 완성도 있게 출시해서 얼마 지나지 않아 브라우저 점유율의 90%를 차지하게 되었다.

<br>

<div class="img-div">
  <img src="https://d2bs8hqp6qvsw6.cloudfront.net/article/images/750x750/dimg/netscape-3.jpg" alt="Netscape Navigator 1.0">
  <p>https://www.arnnet.com.au/slideshow/557401/pictures-visual-history-netscape-navigator/</p>
</div>

<br>

### 자바스크립트의 탄생

브라우저를 사용하는 유저들이 많아지다보니, 브라우저 내에 쿠키나 인증 정보를 HTTP header에 담아 서버에 요청하면, 서버가 그 데이터를 이용해 가공한 화면을 보여주기 시작했다. 이렇듯 서버는 동적인 응답을 하기 시작했지만, 브라우저는 여전히 정적인 화면만을 보여주었다.

Netscape는 브라우저 역시 더 동적으로 바뀔 필요가 있음을 느꼈다. HTML은 그대로 작성하면서, 이미지나 플러그인 등을 쉽게 삽입할 수 있는 언어가 필요하다고 생각했다. 그리하여 브렌던 아이크(Brendan Eich)를 영입하게 되었고, 단 10일 만에 자바스크립트를 개발했다.

1996년도에 Netscape Navigator 2.0을 출시하면서 자바스크립트를 지원했고, 1997년에 자바스크립트의 표준화를 위해 기술 규격을 <a href="https://en.wikipedia.org/wiki/Ecma_International" target="_blank">ECMA International</a>에 제출했고, 곧 <a href="https://www.ecma-international.org/publications-and-standards/standards/ecma-262/" target="_blank">ECMA-262</a>의 이름 아래에 ECMAScript 사양이 출범하게 되었다.

<details>
  <summary>용어: ECMA International, ECMAScript</summary>
  <ul style="font-size: 14px;">
      <li><strong>ECMA International</strong>은 정보와 통신 시스템을 위한 국제적 표준화 기구다.</li>
      <li><strong>ECMAScript</strong>는 ECMA International이 ECMA-262 기술 규격에 따라 정의하고 있는 표준화된 스크립트 프로그래밍 언어를 말하며, 자바스크립트의 표준화를 위해 만들어졌다.</li>
      <li>스크립트 언어는 독립된 시스템에서 작동하도록 설계된 프로그래밍 언어다.</li>
      <li>ECMAScript 사양을 읽으면 어떻게 스크립트 언어를 만들어야 할지 알려주며, 자바스크립트 문서를 읽으면 이 스크립트 언어를 어떻게 사용해야 하는지를 알 수 있다.</li>
  </ul>
</details>

<br>

자바스크립트의 등장으로 팝업창을 띄운다던지, 상태바에 메세지를 넣는다던지 등의 브라우저에 동적인 효과를 줄 수 있게 되었다.

## 1차 브라우저 전쟁 (IE vs. Netscape)

1995년, 마이크로소프트에서 Mosaic 코드를 기반으로 인터넷 익스플로러(IE)를 만들면서 1차 브라우저 전쟁이 시작되었다.

1996년 <span class="variable">iframe</span>, CSS 지원, ActiveX 컨트롤, 인라인 멀티미디어 등의 다양한 기능을 포함한 IE 3.0이 나왔으나, 브라우저 점유율을 뺏어오기가 생각보다 쉽지 않았다.

<details>
  <summary>용어: iframe, ActiveX</summary>
  <ul style="font-size: 14px;">
    <li>
      <strong>iframe</strong>: 현재 문서 안에 다른 HTML 페이지를 삽입할 수 있다. 주로 지도, 동영상, 다른 페이지를 삽입할 때 사용한다.
    </li>
    <li>
      <strong>ActiveX</strong>: 응용 프로그램을 컴퓨터에 설치한 후 페이지에 접근하도록 만들어주는 것이다. 자바스크립트나 Adobe Flash는 브라우저 내부에서만 실행되도록 설계되었지만, ActiveX는 외부 프로그램도 설치만하면 바로 실행할수 있어 보안에 무척 취약했다.
    </li>
  </ul>
</details>

<br>

이미 대부분의 사람들이 Netscape Navigator를 사용하고 있었고, 4.5 버전에 메일 기능을 포함하여 Netscape Communicator로 리브랜딩했기 때문이다.

<div class="img-div">
  <img src="https://d2bs8hqp6qvsw6.cloudfront.net/article/images/750x750/dimg/netscape-6.jpg" alt="Netscape Navigator 4.5">
  <p>https://www.arnnet.com.au/slideshow/557401/pictures-visual-history-netscape-navigator/</p>
</div>

<br>

이에 질세라 IE도 Netscape Communicator에 있는 기능들을 포함하고, favicon 아이콘, 동적으로 innerHTML 요소를 업데이트 하는 기능 등 다양한 기능을 추가한 4.0 버전 출시했다.

<div class="img-div">
  <img src="https://www.webdesignmuseum.org/uploaded/web-design-history/internet-explorer-4-0.png" alt="인터넷 익스플로러 4.0">
  <p>https://www.webdesignmuseum.org/web-design-history/internet-explorer-4-0-1997</p>
</div>

<br>

IE 4.0 출시를 축하하기 위해 IE 직원들이 Netscape 본사 앞에 IE 로고인 'e'를 갖다 두었는데, 다음날 Netscape 직원들이 그 위에 자신들의 마스코트인 용을 올려둔 여담도 있다.

<div>
  <div class="img-div" style="width: 400px">
    <img src="https://miro.medium.com/max/1400/1*lGRQrFtYsQ9ExIXUBXSN_g.png" alt="IE 직원이 Netscape 앞에서 로고 배치">
    <p>https://medium.com/@ddprrt/tales-from-the-browser-wars-mozilla-stomps-internet-explorer-799035887cb1</p>
  </div>

  <div class="img-div" style="width: 500px">
    <img src="https://user-images.githubusercontent.com/58619071/193439622-7ac30892-6241-4ed5-90c2-ab099ff07c34.jpg" alt="IE 로고 위에 Netscape 용 배치">
    <p>http://home.snafu.de/tilman/mozilla/stomps.html</p>
  </div>
</div>

그도 그렇듯 당시만 해도 Netscape의 점유율이 72%였고, IE는 18% 밖에 되지 않았다.

<br>

하지만 전세계 90%가 윈도우을 사용하던 시기에 IE를 윈도우의 기본 브라우저로 설정하자 IE의 점유율이 점진적으로 올라갔으며, 2000년부터 80% 이상의 점유율을 가져오면서 1차 브라우저 전쟁에서 승리했다고 볼 수 있다.

<div class="img-div">
  <img src="https://hsto.org/getpro/habr/post_images/dbe/3a1/8aa/dbe3a18aad1a92aebdb3c423714e8966.jpg" alt="브라우저 전쟁">
  <p>https://sudonull.com/post/80379-Never-give-up-how-Netscape-waged-an-unequal-battle-with-Internet-Explorer</p>
</div>

<br>

### FireFox, Safari의 출범

Netscape는 개발을 중단하면서 이를 오픈소스로 풀었는데, 이때 비영리 재단인 Mozilla가 설립하여 이를 이어 받았다. Mozilla 개발자들은 상업적인 요구 때문에 무분별한 기능들이 브라우저에 추가되었다고 생각하여, 이를 전부 제거하고 꼭 필요한 기능을 갖춘 경량화한 브라우저 파이어폭스(Firefox)를 2002년에 출시했다.

<div class="img-div">
  <img src="https://upload.wikimedia.org/wikipedia/commons/3/34/Firefox_1.0.png?20160512163856" alt="Firefox 1.0">
  <p>https://commons.wikimedia.org/wiki/File:Firefox_1.0.png</p>
</div>

2003년, 스티브 잡스에 의해 사파리(Safari) 브라우저가 출시했으며, 매킨토시 운영체제에 탑재되었다. 사파리 역시 브라우저에서 꼭 필요한 기능들을 제공했고, 깔끔한 디자인을 추구했다.

<div class="img-div">
  <img src="https://www.zdnet.com/a/img/resize/c9c5a82b2c448fd195a51386318e766dc0a2b4df/2014/11/28/5b528fda-76ad-11e4-b569-d4ae52e95e57/safari-i1.jpg?auto=webp&width=1092" alt="Safari 1.0">
  <p>https://www.zdnet.com/pictures/safari-1-0/</p>
</div>

## Ajax의 탄생

**Ajax(Asynchronous JavasScript And XML)**는 자바스크립트를 사용하여 브라우저가 서버에게 비동기적으로 데이터를 요청하고, 서버가 보내준 데이터를 받아서 웹페이지를 동적으로 업데이트하는 방식을 말한다. _(해당 글은 비동기에 대해 다루지 않는다)_

<details>
  <summary>용어: XML(eXtensible Markup Language)</summary>
  <ul style="font-size: 14px;">
    <li>W3C에서 개발된 특수한 목적을 갖는 마크업 언어로, 인터넷에 연결된 시스템끼리 데이터를 쉽게 주고 받을 수 있게 한다.</li>
    <li>HTML은 문자의 크기나 색깔 등 데이터 표현 방식에 치중되어 문서 구조 정보 파악이 어렵다. 반면 XML은 단순히 데이터 교환을 위해 구조만을 정의하고 있다. 또한 HTML과 달리 브라우저에서만 열리는 것이 아니라, 어느 환경에서도 모두 읽을 수 있다.</li>
  </ul>
</details>

<br>

Ajax는 브라우저에서 제공하는 Web API인 <span class="variable">XMLHttpRequest</span> 객체를 기반으로 동작한다.

<span class="variable">XMLHttpRequest</span>는 1999년 마이크로소프트에서 개발되었지만 보급이 되지 않다가, 2005년 구글이 Gmail, 구글 맵 등에 사용하면서 널리 퍼졌다. 그리고 2006년 W3C는 <span class="variable">XMLHttpRequest</span> 객체를 위한 첫 번째 명세를 생성했으며, 지금은 <a href="https://xhr.spec.whatwg.org/" target="_blank">웹 표준</a>이 되었다.

Ajax가 나오기 전에는, 어떤 몇 개의 단어가 수정되어 브라우저가 이를 서버에 요쳥하면, 서버는 다시 그 페이지 전체를 만들어 전달해주었고, 브라우저는 이를 보여주기 위해 새로고침되어 화면을 보여주었다. 그리고 브라우저는 서버에서 응답을 받을 때까지 아무것도 하지 못하고 기다려야 했다.

<div class="img-div" style="text-align: center">
  <img src="https://user-images.githubusercontent.com/58619071/193439620-97e80160-67cc-4471-b3c9-3ffc2d428a69.png" alt="Ajax">
  <p>https://web.archive.org/web/20061107032631/http://www.adaptivepath.com/publications/essays/archives/000385.php</p>
</div>

반면, Ajax가 나오고 나서는 업데이트 할 부분의 데이터만 서버에게 요청하고 받기 때문에 불필요한 데이터 통신이 발생하지 않으며, 새로고침없이 업데이트할 수 있게 되었다.

## IE의 문제, 그리고 크롬의 승리

IE는 1차 브라우저 전쟁에서 승리하기 위해 너무나 많은 기능들이 추가했는데, 웹 표준을 지켜지지 않은 문제도 있었다. 2000년 초반에 나온 파이어폭스, 사파리 역시 이와 같은 문제를 타파하고자 만들었다.

그리고 2008년, 이 흐름을 놓치지 않고 구글에서 크롬(Chrome) 브라우저를 출시했다.

특히, 2010년 애플의 스티븐 잡스가 <a href="https://newslang.ch/wordpress/wp-content/uploads/2020/06/Thoughts-on-Flash.pdf" target="_blank" class="variable">Thoughts on Flash</a>에서 HTML5, CSS, JavaScript와 같은 웹 표준을 적용할 것이며, 보안, 배터리 성능, 멀티 터치가 불가능 그리고 서드파티 라이브러리를 사용할 경우 의존성이 높아져 새로운 기능 개발이 어렵다는 이유로 iOS에서 Adobe Flash를 사용하지 않을 것이라 발표하면서 더 주목받았다.

<br>

곧 본격적인 2차 브라우저 전쟁이 일어났지만, 대중들도 가벼운 브라우저를 원해서 인지, 크롬의 대대적인 업데이트 때문인지 승부는 금방 판가름 났다.

2011년도에 크롬은 9.0 버전에서 대량의 업데이트를 한 번에 풀면서 인기를 끌었다. WebGL을 정식으로 지원하여 자체 그래픽 렌더링을 지원하고, 크롬 웹스토어를 따로 만들어 유저가 원하는 부가기능을 설치할 수 있도록 하는 등, 1년만에 버전 9에서 16으로 올랐다.

<div class="img-div">
  <img src="https://user-images.githubusercontent.com/58619071/193439621-d07a77d9-1c1e-43d1-8075-1c6e4cb34cfc.png" alt="브라우저 2차 전쟁">
  <p>https://gs.statcounter.com/browser-market-share/desktop/worldwide/#monthly-200901-202204</p>
</div>

2015년도부터 크롬이 50% 이상의 점유율을 꾸준히 유지해오고 있다.

마이크로소프트에서도 웹 표준을 지키는 레이아웃 엔진을 포함한 마이크로소프트 엣지(Microsoft Edge) 브라우저를 출시했으며, 2020년 브라우저 엔진을 크로미움 기반으로 바꾼 신 버전의 엣지가 출시되었다.

(드디어 2022년 6월 15일부터 Windows 10버전에서 IE의 서비스 지원이 <a href="https://docs.microsoft.com/ko-kr/lifecycle/announcements/internet-explorer-11-end-of-support" target="_blank">종료</a>된다!)

<br >

### 소결론

브라우저의 역사를 조사해보면서 프론트엔드 기술 발전이 왜 이렇게 빠른지 알 수 있었다. 처음에는 그저 단순한 정적 페이지를 보여주면 됐지만, 지금은 유튜브처럼 영상을 볼 수도 있고, 후원도 가능하며, 댓글도 달 수 있는 등 유저가 직접 페이지와 상호작용할 수 있어졌다. 정말 짧은 시간 내에 발전했다.

웹 페이지의 형태가 발전하면서 브라우저도 변화하는데, 브라우저마다 사용하는 엔진이 다르고, 표준을 지키지 않은 기능들 때문에 크로스 브라우징 이슈도 처리해줘야 한다. 브라우저 엔진은 주로 '렌더링 엔진' 또는 '레이아웃 엔진'이라 불리며, 웹 페이지를 읽고 사람이 이해할 수 있는 문서로 표시하는 역할을 한다. _(브라우저 엔진 관련해서 나중에 글로 작성해볼 예정이다.)_

이에 발 맞춰 jQuery, AngularJS, React 그리고 Next.js가 나온 것 같다. 물론 지금도 새로운 브라우저(ex. Brave, 네이버 웨일 등)들이 나오고는 있지만 이전만큼의 격변은 아닌 것 같다. 그렇다면 과연 프론트엔드 기술도 어느정도 안정기를 가질 수 있을까? 궁금하다.

<br>

**참고**

<div style="font-size: 12px;">

- <a href="https://en.wikipedia.org/wiki/Browser_wars" target="_blank">Browser Wars | Wikipedia</a>
- <a href="https://medium.com/@ddprrt/tales-from-the-browser-wars-mozilla-stomps-internet-explorer-799035887cb1" target="_blank">Tales from the Browser wars: Mozilla stomps Internet Explorer</a>
- <a href="https://www.mozilla.org/en-US/firefox/browsers/browser-history/" target="_blank">The History of Web Browsers</a>
- <a href="https://sudonull.com/post/80379-Never-give-up-how-Netscape-waged-an-unequal-battle-with-Internet-Explorer" target="_blank">Never give up: how Netscape waged an unequal battle with Internet Explorer</a>
- <a href="https://www.arnnet.com.au/slideshow/557401/pictures-visual-history-netscape-navigator/" target="_blank">In Pictures: A visual history of Netscape Navigator</a>
- <a href="https://ko.wikipedia.org/wiki/Ajax" target="_blank">AJAX | Wikipedia</a>
- <a href="https://ko.wikipedia.org/wiki/XML?tableofcontents=1" target="_blank">XML | Wikipedia</a>

</div>
