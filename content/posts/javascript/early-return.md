---
title: '자바스크립트 Early return'
date: '2021-12-3'
tags: ['javascript']
draft: false
---

개발 하다보면 조건문 사용이 잦은데, 이를 어떻게 작성해야 가독성이 좋고 불필요한 로직 실행을 줄일 수 있을까 생각하게 된다.

<span class="return">switch문</span>이나 <span class="return">삼항연산자</span>는 어떤 값으로 분기처리 할 때 사용한다. 반면, 조건이 복잡한 경우 <span class="return">if문</span>을 사용하지만 이를 중첩으로 사용할 경우 코드가 한 없이 복잡해진다.

제일 최악인 상황은 나중에 내가 짠 코드임에도 불구하고 다시 처음부터 어떤 조건으로 분기 처리했는지 봐야할 때다. 이런 고통스러운 상황을 피하기 위해 Early return을 하려는 편이다.

### Early return

Early return은 조건과 맞지 않는 결과를 일찍 반환하는 것이다. 그래서 `if/else` 대신 `if/return`을 사용한다.

#### 장점

- 소거법을 사용하여 빠르게 return하기 때문에 코드 전체를 보지 않아도 된다
- 코드 가독성이 좋아진다

<br />

기존 회원에게는 5% 할인 쿠폰을, 오늘 이후에 가입한 회원에게 신규회원 이벤트 팝업을 띄워주는 조건문을 만들어보자.

```js
const openEventPopup = () => {
  const isCreatedBeforeEventUser = userCreatedDate - new Date() < 0

  if (isCreatedBeforeEventUser) {
    return <DiscountCouponModal />
  } else {
    return <NewbieEventModal />
  }
}
```

이는 주로 운영한지 오래 되어 신규 회원보다 기존 회원이 더 많을 경우에 사용한다.

만약 서비스를 갓 오픈 하여 기존 회원보다 신규 회원이 더 많을 경우, 위의 코드는 불필요한 일을 여러 번 반복하는 꼴이다. 따라서, 신규 회원 팝업을 early return 하는 것이 좋다.

```js
// 기존 회원보다 신규 회원이 더 많을 경우
const openEventPopup = () => {
  const isCreatedAfterEventUser = new Date() - userCreatedDate < 0

  if (isCreatedAfterEventUser) {
    return <NewbieEventModal />
  }
  return <DiscountCouponModal />
}
```

만약 성별에 따라 주고자하는 할인 쿠폰이 다를 경우를 가정해보자.

```js
const getRoom = (userGender, category) => {
  const gender = ['male', 'female']
  if (!gender.includes(userGender)) {
    return '성별을 입력해주세요'
  }

  const isMale = userGender === 'male'
  const isFemale = userGender === 'female'

  if (isMale) {
    if (category) {
      // 특정 카테고리에 따른 할인 쿠폰
    }
    // 남성 제품 중 어디서나 사용 가능한 할인 쿠폰
  }

  if (isFemale) {
    if (category) {
      // 특정 카테고리에 따른 할인 쿠폰
    }
    // 여성 제품 중 어디서나 사용 가능한 할인 쿠폰
  }
}
```

만약 성별을 정확히 입력하지 않았다면, 바로 에러 메세지를 보여주기 때문에 아래의 로직을 수행하지 않는다.
성별을 입력했고, 특정 카테고리 내에 들어갔을 경우 그에 대응하는 할인 쿠폰을 보여준다.

<br />

하지만 필요없는 곳까지 early return을 쓸 경우, 되려 가독성을 해할 수도 있다.

```js
const updateName = name => {
  // 불필요한 return
  if (!name) {
    return
  }
  this.name = name
}
```

위 코드는 아래처럼 사용하면 더 깔끔하게 읽힌다.

```js
const updateName = name => {
  if (name) {
    this.name = name
  }
}
```

<br />

**참고**

<div style="font-size: 12px;">

- <a href="https://betterprogramming.pub/are-early-returns-any-good-eed4b4d03866" target="_blank">Are Early Returns Any Good?</a>
- <a href="https://medium.com/swlh/return-early-pattern-3d18a41bba8" target="_blank">Return Early Pattern</a>

</div>
