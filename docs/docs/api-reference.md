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

## `disableDeleteOnBackspace`

- Type: `boolean`
- Default: `false`

By default, if the input field is empty and the user presses the delete key, the last chip will be deleted. You can disable this logic.

```tsx
<MuiChipsInput disableDeleteOnBackspace />
```

## `validate`

- Type: `(chipValue: string) => boolean | { isError: boolean; textError: string }`
- Default: `() => true`

Set a validation to your new chips.

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