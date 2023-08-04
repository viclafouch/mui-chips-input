---
sidebar_position: 3
---

# API Reference

This article discusses the API and props of **MuiChipsInput**. Props are defined within `MuiChipsInputProps`.

## `value`

- Type: `string[]` | `undefined`
- Default: `[]`

```tsx
<MuiChipsInput />
<MuiChipsInput value={['foo', 'bar']} />
```

## `onChange`

- Type: `(value: string[]) => void`
- Default: `undefined`

Gets called once the user adds or removes a chip.

```tsx
const handleChange = (value) => {
  /**
  value: ['foo']
  **/
}

<MuiChipsInput onChange={handleChange} />
```

## `onAddChip`

- Type: `(chipValue: string, chipIndex: number) => void`
- Default: `undefined`

Gets called once the user adds a chip.

```tsx
const handleAddChip = (chipValue, chipIndex) => {
  /**
  chipValue: 'bar'
  chipIndex: 1
  **/
}

<MuiChipsInput value={['foo']} onAddChip={handleAddChip} />
```

## `onDeleteChip`

- Type: `(chipValue: string, chipIndex: number) => void`
- Default: `undefined`

Gets called once the user removes a chip.

```tsx
const handleDeleteChip = (chipValue, chipIndex) => {
  /**
  chipValue: 'foo'
  chipIndex: 0
  **/
}

<MuiChipsInput value={['foo']} onDeleteChip={handleDeleteChip} />
```

## `onEditChip`

- Type: `(chipValue: string, chipIndex: number) => void`
- Default: `undefined`

Gets called once the user has edited a chip. User can edit a chip by double clicking on it.

```tsx
const handleEditChip = (chipValue, chipIndex) => {
  /**
  chipValue: 'bar'
  chipIndex: 0
  **/
}

<MuiChipsInput value={['foo']} onEditChip={handleEditChip} />
```

## `onInputChange`

- Type: `(inputValue) => void`
- Default: `undefined`

Gets called once the user updates the input value.

```tsx
const handleInputChange = (inputValue) => {
  /**
  inputValue: 'hello world'
  **/
}

<MuiChipsInput onInputChange={handleInputChange} />
```

## `clearInputOnBlur`

- Type: `boolean`
- Default: `false`

Clear the input value when the user clicks outside the input.

```tsx
<MuiChipsInput clearInputOnBlur />
```

## `hideClearAll`

- Type: `boolean`
- Default: `false`

Hide the "x" icon button to prevent the user from deleting all the chips.

```tsx
<MuiChipsInput hideClearAll />
```

## `disableEdition`

- Type: `boolean`
- Default: `false`

Prevent the user from editing a chip when double click on it.

```tsx
<MuiChipsInput disableEdition />
```

## `disableDeleteOnBackspace`

- Type: `boolean`
- Default: `false`

By default, if the input field is empty and the user presses the delete key, the last chip will be deleted. You can disable this logic.

```tsx
<MuiChipsInput disableDeleteOnBackspace />
```

## `renderChip`

- Type: `(ChipComponent: MuiChipsInputChipComponent, key: React.Key, ChipProps: MuiChipsInputChipProps) => JSX.Element`
- Default: `undefined`

Custom how to render a Chip element in case if you want to add / edit the [Chip props](https://mui.com/material-ui/api/chip/).

```tsx
<MuiChipsInput renderChip={(Component, key, props) => {
  return <Component {...props} key={key} deleteIcon={<FaceIcon />} />
}} />
```

## `addOnBlur`

- Type: `boolean` | `undefined`
- Default: `undefined`

Enable this option to add a chip when the input element loses focus.

```tsx
<MuiChipsInput addOnBlur />
```

## `validate`

- Type: `(chipValue: string) => boolean | { isError: boolean; textError: string }`
- Default: `() => true`

Set a validation to your new chips, or when user is editing a chip.

```tsx
<MuiChipsInput validate={(chipValue) => chipValue.length >= 3} />
```

You can also display a text error if you need.

```tsx
<MuiChipsInput validate={(chipValue) => {
    return {
      isError: chipValue.length >= 3,
      textError: 'the value must be at least 3 characters long'
    }
  }}
/>
```