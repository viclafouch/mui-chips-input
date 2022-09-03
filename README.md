<div align="center">
<h1>MUI chips input</h1>
  <p>A chips input designed for the React library <a href="https://mui.com/">MUI</a></p>
</div>
<div align="center">

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/viclafouch/mui-chips-input/blob/master/LICENSE)
![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)
[![npm](https://img.shields.io/npm/v/mui-chips-input)](https://www.npmjs.com/package/mui-chips-input)

<div align="center">
  <img src="https://github.com/viclafouch/mui-chips-input/blob/main/mui-chips-input.gif" width="100%" />
</div>

</div>

## Installation

```
// with npm
npm install mui-chips-input

// with yarn
yarn add mui-chips-input
```

## Usage

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

## [Documentation](https://viclafouch.github.io/mui-chips-input/)

## Changelog

Go to [Github Releases](https://github.com/viclafouch/mui-chips-input/releases)

## TypeScript

This library comes with TypeScript "typings". If you happen to find any bugs in those, create an issue.

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

## LICENSE

MIT
