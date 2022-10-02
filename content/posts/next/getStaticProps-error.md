---
title: 'Next.js getStaticProps undefined 에러'
date: '2020-7-06'
tags: ['next']
draft: false
---

## getStaticProps() undefined 에러 해결하기

pre-render에서 데이터를 fetch해오기 위해 Next 9.3에서 권장하는 `getStaticProps()`를 이용하여 불러왔다.

하지만 분명히 [공식 홈페이지](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)에서 한대로 컴포넌트에 props로 넘겨주었는데, 막상 실행시켰을 때는 `undefined`가 뜬다.

```js
function Blog({ posts }) {
  return (
    <ul>
      {posts.map(post => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()
  return {
    props: { posts },
  }
}

export default Blog
```

아직 이 개념이 나온지 몇 달이 되지 않아 구글링하며 preview나 mdx도 시도해보고 `next.config.js`에서 설정도 하면서 며칠 삽질 했는데 정말 너무 간단하게 해결됐다...

사용할 컴포넌트에 `{ props }` 값이 아닌 `props` 자체를 넘겨주면 된다.

필자는 카테고리 `list`를 `getStaticProps()`로 불러와 사용했기에 해당 예제로 바꾸겠다.

```js
export async function getStaticProps() {
  const res = await fetch(CATEGORY)
  const list = await res.json()
  return {
    props: { list },
  }
}

export default function HomePage(props) {
  console.log(props);

  return (...)
}
```

<p style="text-align: center; font-size: 14px;"><img src="https://user-images.githubusercontent.com/58619071/193441670-ceab5c2a-ff77-4a54-a2d9-6f1736956ac8.png" />
console.log 결과
</p>

따라서 아래와 같이 변수에 할당하여 사용했다.

```js
const categoryfromAPI = props.pageProps.list
const contentList = categoryfromAPI.content_types
const stackList = categoryfromAPI.stacks
const creatorList = categoryfromAPI.channels
```

이제 pre-render 단계에서 데이터를 fetch해오기 때문에 렌더링 될때 깜빡임이 없어졌다.
