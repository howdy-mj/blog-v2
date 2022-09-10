---
title: Introducing howdy-nextjs-starter!
tags: [nextjs, howdy]
date: '2022-09-11'
summary: Guide of this blog
---

## howdy-nextjs.starter

This is a [Next.js](https://nextjs.org/), [styled-components](https://styled-components.com/)
, [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) blogging starter template.

Use npm `8.1.2`, node `v16.13.1` version.

### Features

- Supports `.md` and `.mdx`
- Search posts with title and tag
- Code highlight and title
- Light and dark theme
- Comment with utterances
- SEO friendly with RSS feed
- Google Analytics

### Quick start Guide

1. Personalize `config/metaData.ts`
2. Add posts or snippets in `content/posts` or `content/snippets`
3. Deploy on [Vercel](https://vercel.com/)

### Development

Install and run the development server:

```shell
npm run dev 
```

Open http://localhost:3000 to see your app.

## Project structure

```txt
howdy-nextjs-starter/
    ├── config/
    │   └── metaData.ts
    ├── content/
    │   ├── about
    │   ├── posts
    │   └── snippets
    ├── public/
    │   ├── favicons
    │   └── images
    └── styles
```

I only display what you have to edit for build yours, but you can edit whatever you want.

### Config

You can edit the site information in `config/metaData.js`.

Such as your name, email, SNS ID, Google Analytics ID, etc.

You can also activate or deactivate the page you want, but 'Blog' page is required.

## Content Frontmatter

```txt
title (required)
date (required)
tags (optional)
lastmod (optional)
draft (optional, if none provided it will be published)
summary (optional)
thumbnailUrl (options)
```

Example of frontmatter:

```txt
title: Write your post with it!
date: '2022-09-12'
tags: [first-post]
lastmod: '2022-09-15'
draft: false
summary: Checkout the howdy-nextjs-starter template
thumbnailUrl: 'https://avatars.githubusercontent.com/u/58619071?v=4'
```

### Draft

If is a `draft: true` content, in local you will see with 'Draft' badge.

![Draft](/content/introducing-howdy-nextjs-starter/draft.png)


