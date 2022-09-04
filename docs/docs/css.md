---
sidebar_position: 5
---

# CSS

Like any component, if you want to override a component's styles using custom classes, you can use the `className` prop.

```jsx
<MuiChipsInput className="my-class-name" />
```

Then, you can use the differents global class names (see below) to target an element of `MuiChipsInput`.


| 	Global class                            | Description                                                                                                                   |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `.MuiChipsInput-TextField`                        | 	Styles applied to the root element.                                                                                                                   |
| `.MuiChipsInput-Chip`                        | 	Styles applied to the [Chip](https://mui.com/material-ui/api/chip/) component.                                                                                                                   |

For example: target the `.MuiChipsInput-Chip` global class name to customize all chips.

## Example with styled-component / emotion

```jsx
import { styled } from 'styled-component' // or emotion
import { MuiChipsInput } from 'mui-chips-input'

const MuiChipsInputStyled = styled(MuiChipsInput)`
  & input {
    color: red;
  }
`

function MyComponent() {
  return <MuiChipsInputStyled />
}
```