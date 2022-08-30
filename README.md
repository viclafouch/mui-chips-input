<div align="center">
  <img src="https://viclafouch.github.io/mui-color-input/img/logo.jpg" width="70" />
</div>
<div align="center">
<h1>MUI color input</h1>
  <p>A color input designed for the React library <a href="https://mui.com/">MUI</a></p>
</div>
<div align="center">

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/viclafouch/mui-color-input/blob/master/LICENSE)
![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)
[![npm](https://img.shields.io/npm/v/mui-color-input)](https://www.npmjs.com/package/mui-color-input)
[![CircleCI](https://circleci.com/gh/viclafouch/mui-color-input/tree/main.svg?style=svg)](https://circleci.com/gh/viclafouch/mui-color-input/tree/main)

</div>

<div align="center">
  <img src="https://github.com/viclafouch/mui-color-input/blob/main/mui-color-input.gif" width="100%" />
</div>

## Installation

```
// with npm
npm install mui-color-input

// with yarn
yarn add mui-color-input
```

The component uses [@ctrl/tinycolor](https://www.npmjs.com/package/@ctrl/tinycolor) for color parsing and formatting.

## Usage

```jsx
import React from 'react'
import { MuiColorInput } from 'mui-color-input'

const MyComponent = () => {
  const [value, setValue] = React.useState('#ffffff')

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  return <MuiColorInput value={value} onChange={handleChange} />
}
```

## [Documentation](https://viclafouch.github.io/mui-color-input/)

## Changelog

Go to [Github Releases](https://github.com/viclafouch/mui-color-input/releases)

## TypeScript

This library comes with TypeScript "typings". If you happen to find any bugs in those, create an issue.

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

## LICENSE

MIT
