---
title: Write .md file
tags: [markdown, example]
date: '2022-09-10'
summary: Example of code block
---

A sample post with markdown.


## Code Blocks

### Basic usage

```js
const a = 1;
const b = 2;

const sum = (a, b) => {
  return a + b
}
```

If you hover over a code block, you can see the copy button with icon.

You can click that button to copy the code.

### Highlight

You can highlight the code like:

````txt
```ts {3-5}
const howdy = 'mj';

const greeting = (name: string)=> {
  return `Howdy, ${name}!`
}

greeting(howdy)
```
````

will appear as:

```ts {3-5}
const howdy = 'mj';

const greeting = (name: string)=> {
  return `Howdy, ${name}!`
}

greeting(howdy)
```

### Filename

You can also write your filename like:

````txt
```json:next.config.js
module.exports = ({
  reactStrictMode: true,
  swcMinify: true
});
```
````

will appear as:

```json:next.config.js
module.exports = ({
  reactStrictMode: true,
  swcMinify: true
});
```
