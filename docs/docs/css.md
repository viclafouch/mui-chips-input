---
sidebar_position: 5
---

# CSS

Like any component, if you want to override a component's styles using custom classes, you can use the `className` prop.

```jsx
<MuiTelInput className="my-class-name" />
```

Then, you can use the differents global class names (see below) to target an element of `MuiTelInput`.

For example: target the `.MuiTelInput-Flag` global class name to customize the current selected flag.

## Example with styled-component / emotion

```jsx
import { styled } from 'styled-component' // or emotion
import { MuiChipsInput } from 'mui-tel-input'

const MuiChipsInputStyled = styled(MuiChipsInput)`
  & input {
    color: red;
  }
`

function MyComponent() {
  return <MuiChipsInputStyled />
}
```