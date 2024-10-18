import React from 'react'
import { vi } from 'vitest'
import { render } from '@testing-library/react'
import { MuiChipsInput, MuiChipsInputProps } from './index'
import * as testUtils from './testUtils'
import '@testing-library/jest-dom/vitest'

const MuiChipsInputControlled = (props: Partial<MuiChipsInputProps>) => {
  const { onChange, value, ...rest } = props
  const [state, setState] = React.useState<string[]>(value || [])

  const handleChange = (newValue: string[]) => {
    setState(newValue)
    onChange?.(newValue)
  }

  return <MuiChipsInput value={state} onChange={handleChange} {...rest} />
}

describe('components/MuiChipsInput', () => {
  test('should display chips', () => {
    const screen = render(<MuiChipsInput value={['foo', 'bar']} />)
    expect(screen.getByTitle('foo')).toBeTruthy()
    expect(screen.getByTitle('bar')).toBeTruthy()
  })
  test('should call onAddChip when new chip is added', async () => {
    const callbackOnAddChip = vi.fn(() => {})
    const screen = render(
      <MuiChipsInputControlled onAddChip={callbackOnAddChip} />
    )
    await testUtils.addChip(screen, 'test')
    expect(callbackOnAddChip).toHaveBeenCalledWith('test', 0)
    expect(screen.getByTitle('test')).toBeTruthy()
  })
  test('should call onDeleteChip when a chip is deleted', async () => {
    const callbackOnDeleteChip = vi.fn(() => {})
    const screen = render(
      <MuiChipsInputControlled
        value={['test', 'foo', 'bar']}
        onDeleteChip={callbackOnDeleteChip}
      />
    )
    await testUtils.deleteChip(screen, 1)
    expect(callbackOnDeleteChip).toHaveBeenCalledWith('foo', 1)
    expect(screen.queryByTitle('foo')).toBeFalsy()
  })
  test('should call onChange when user add chip', async () => {
    const callbackOnChange = vi.fn(() => {})
    const screen = render(
      <MuiChipsInputControlled
        value={['test', 'foo', 'bar']}
        onChange={callbackOnChange}
      />
    )
    await testUtils.addChip(screen, 'toto')
    expect(callbackOnChange).toHaveBeenCalledWith([
      'test',
      'foo',
      'bar',
      'toto'
    ])
    expect(screen.getByTitle('toto')).toBeTruthy()
  })
  test('should call onChange when user delete chip', async () => {
    const callbackOnChange = vi.fn(() => {})
    const screen = render(
      <MuiChipsInputControlled
        value={['test', 'foo', 'bar']}
        onChange={callbackOnChange}
      />
    )
    await testUtils.deleteChip(screen, 2)
    expect(callbackOnChange).toHaveBeenCalledWith(['test', 'foo'])
    expect(screen.queryByTitle('bar')).toBeFalsy()
  })

  test('should call onInputChange when user update input', async () => {
    const callbackOnInputChange = vi.fn(() => {})
    const screen = render(
      <MuiChipsInputControlled
        value={['test', 'foo', 'bar']}
        onInputChange={callbackOnInputChange}
      />
    )
    await testUtils.typeInInputElement(screen, 'query')
    expect(callbackOnInputChange).toHaveBeenCalled()
  })

  test('should not add chip when disabled', async () => {
    const callbackOnChange = vi.fn(() => {})
    const callbackOnAdd = vi.fn(() => {})
    const screen = render(
      <MuiChipsInputControlled
        value={['test', 'foo', 'bar']}
        disabled
        onAddChip={callbackOnAdd}
        onChange={callbackOnChange}
      />
    )
    await testUtils.addChip(screen, 'toto')
    expect(callbackOnChange).not.toHaveBeenCalled()
    expect(callbackOnAdd).not.toHaveBeenCalled()
  })

  test('should assign inputRef to the input element', () => {
    const inputRef = React.createRef<HTMLInputElement>()
    const screen = render(
      <MuiChipsInput inputRef={inputRef} inputValue="good dogo" />
    )
    const input = screen.getByDisplayValue('good dogo')
    expect(inputRef.current).toBe(input)
  })
})
