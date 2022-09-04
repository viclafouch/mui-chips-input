---
sidebar_position: 4
---

# TypeScript

This package is written in **TypeScript**. So you don't need to create your own types. Here an example if you use **TypeScript**.

**Nota bene**: Props are defined within the `MuiChipsInputProps` interface.

```tsx
import React from 'react'
import {
  MuiChipsInput,
  MuiChipsInputChip,
} from 'mui-chips-input'

const MyComponent = () => {
  const [value, setValue] = React.useState<MuiChipsInputChip[]>([])

  const handleChange = (newValue: MuiChipsInputChip[]) => {
    setValue(newValue)
  }

  return (
    <MuiChipsInput
      value={value}
      onChange={handleChange}
      size="medium"
      hideClearAll
    />
  )
}
```
