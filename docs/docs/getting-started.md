---
sidebar_position: 1
---

# Getting Started

## Install
```bash
npm install mui-chips-input --save
```
or you can use **yarn**
```bash
yarn add mui-chips-input
```

We have completed installing the package.

## Simple usage

Here is a simple usage for using the component:

```jsx
import React from 'react'
import { MuiChipsInput } from 'mui-chips-input'

const MyComponent = () => {
  const [chips, setChips] = React.useState([])

  const handleChange = (newChips) => {
    setChips(newChips)
  }

  return (
    <MuiChipsInput value={chips} onChange={handleChange} />
  )
}
```

## Next.js integration

Learn how to use MUI chips input with Next.js

Once you have installed `MUI Chips Input` in your next.js project, it is important to transpile it as it is an ESM package first.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
 transpilePackages: ['mui-chips-input'],
 // your config
}

module.exports = nextConfig
```

## Congratulations !

That's all, now let's deep dive into the [props](/docs/api-reference).