---
title: '이미지: 래스터와 벡터'
date: '2021-09-09'
tags: ['general']
draft: false
---

프로젝트에 사용할 이미지를 고를 때, 항상 PNG를 먼저 찾는다.

아이콘이나 로고는 확대해도 깨지지 않는 SVG로 하지만 정확한 이유를 잘 몰라서 알아보았다.

<div style="margin-bottom: 40px"></div>

### 래스터와 벡터

이미지의 종류는 크게 래스터와 벡터 두 가지로 나뉘며, 요약하면 아래의 표와 같다.

| 래스터(Raster)          | 벡터(Vector)        |
|:---------------------|:------------------|
| 픽셀 기반                | 수학적 연산 기반         |
| 사진, 그림               | 아이콘, 로고           |
| 다양한 색상               | 색 표현에 한계          |
| 비교적 작은 용량            | 비교적 큰 용량          |
| JPG(JPEG), GIF, PNG  | SVG, AI, PDF      |

<div class="img-refer">
  <img src="https://intransitstudios.com/wp-content/uploads/2019/05/bitmap-vs-vector.jpg" alt="pixels vs. vectors: 폰트">
  <p>https://cottonginprinting.com/image-file-types/</p>
</div>

<div class="img-refer">
  <img src="https://vector-conversions.com/images/vector-vs-raster-jawlensky.jpg" alt="pixels vs. vectors: 그림">
  <p>https://vector-conversions.com/vectorizing/raster_vs_vector.html</p>
</div>

## 래스터(Raster)

픽셀(점)이 모여 이루어진 이미지로, 사진과 그림 같이 섬세한 색상을 표현해야 하는 이미지에서 사용된다.

이미지를 늘리거나 줄이면 원본 이미지에 손상이 가서 가장자리가 매끄럽지 않게 계단처럼 보이는 현상(without anti-alias)이 나타나며, 우리는 통상 '이미지가 깨졌다'고 한다.

<div class="img-refer">
  <img src="https://www.computerhope.com/jargon/a/anti-alias.jpg" alt="anti-alias" style="width: 200px">
  <p>https://www.computerhope.com/jargon/a/antialias.htm</p>
</div>

래스터에 다양한 확장자가 존재하는데, 그 중에서도 가장 자주 쓰이는 JPEG, GIF와 PNG에 대해 알아보자.

### JPEG(Joint Photographic Experts Group)

JPEG는 정지된 이미지를 위해 만들어진 손실 압축 파일 형식이다. 손실 압축은 사람의 눈에 거슬리지 않을 정도로 원본을 훼손하여 압축 효과를 극대화 시키는 알고리즘이다. 이미지를 압축하면 이미지의 뭉개짐이 심해지지만, 크기가 작아져서 웹에서 많이 사용되고 있다.

하지만 JPEG는 투명 색상을 지원하지 않으며, 선명한 선, 문자 등이 많은 이미지는 JPEG보다 비손실 압축 방식인 GIF나 PNG 형식을 사용하는 것이 좋다.

### GIF(Graphics Interchange Format)

GIF는 비손실 압축 방식이며 원본을 훼손하지 않는다. 그래픽을 압축하여 빠르게 전송하기 위해 개발된 형식이다. 이미지 손상이 비교적 적고 용량이 작아서 전송속도가 빠르다. GIF는 투명도 지원 외에도, 애니메이션도 지원하지만 256색 제한이 존재한다.

### PNG(Portable Network Graphics)

PNG는 GIF의 256색 제한을 극복하여 트루 컬러를 표현할 수 있으며, GIF에는 없는 브라우저의 투명성을 지원하여 인터넷 그래픽에 최적화 되어있다. 또한, PNG 역시 비손실 압축 방식으로 압축을 하더라도 이미지의 품질을 저하하지 않는다.

PNG는 텍스트, 선 등에 적합하고 주로 투명 배경이 필요한 경우에 사용된다. 색상이 화려하거나 선이 많은 이미지의 경우 JPEG 대비 용량이 꽤 증가한다.

프로젝트 내에 포함한 이미지는 투명한 배경색이 있으며 한 번 압축시킨 후에 올리기 때문에 비손실 압축인 PNG를 주로 사용한다.

## 벡터(Vector)

벡터는 수학적 연산에 의해 선분과 면으로 이루어진 이미지라 확대해도 깨지지 않아, 로고나 아이콘 작업에 많이 사용된다. 하지만 다양한 색을 표현하는 데는 한계가 있어 최대한 단순한 색상으로 조합해서 사용한다.

웹 개발 할때 가장 자주 사용하는 SVG가 벡터의 대표적인 예다.

### SVG(Scalable Vector Graphics)

SVG는 XML 기반 마크업 언어로 W3C의 주도하에 오픈 웹 표준이고, 대부분의 브라우저가 SVG를 지원한다.

SVG는 x, y 좌표값을 갖으며 `<svg>`의 path로 이를 정확히 그려낼 수 있다. 또한, path에는 색상, 모양, 굵기 등의 다양한 정보를 입력할 수 있다. 그 외에도 circle, rect를 통해 해당 모양도 만들 수 있다. 다양한 SVG 요소 레퍼런스는 <a href="https://developer.mozilla.org/ko/docs/Web/SVG/Element" target="_blank">여기</a>에서 볼 수 있다.

<br />

**참고**

<div style="font-size: 12px;">

- <a href="https://vector-conversions.com/vectorizing/raster_vs_vector.html" target="_blank">Raster vs Vector</a>
- <a href="https://parkdauer.tistory.com/23" target="_blank">벡터와 래스터는 어떻게 다를까?</a>
- <a href="https://shlee1353.github.io/2019/09/26/css-raster-vector/" target="_blank">래스터(Raster) 이미지와 벡터(Vector) 이미지 for CSS 속성</a>
- <a href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Adding_vector_graphics_to_the_Web" target="_blank">Adding vector graphics to the Web</a>
- <a href="https://www.howtogeek.com/howto/30941/whats-the-difference-between-jpg-png-and-gif/" target="_blank">What’s the Difference Between JPG, PNG, and GIF?</a>

</div>
