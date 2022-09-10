---
title: Prettier and Eslint setting
tags: [prettier, eslint]
date: '2022-09-01'
summary: .pretterrc.json and .eslintrc.json
---


```json:.prettierrc.json
{
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

```json:.eslintrc.json
{
  "root": true,
  "extends": [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "next"
  ],
  "rules": {
    "no-unused-vars": "off",
    "no-undef": "off"
  }
}

```
