import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { MuiChipsInput, MuiChipsInputProps } from './index'
import * as testUtils from './testUtils'

import '@testing-library/jest-dom'

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
  test('should not crash', () => {
    render(<MuiChipsInput />)
  })

  test('should display chips', () => {
    render(<MuiChipsInput value={['foo', 'bar']} />)
    expect(screen.getByTitle('foo')).toBeTruthy()
    expect(screen.getByTitle('bar')).toBeTruthy()
  })

  test('should call onAddChip when new chip is added', async () => {
    const callbackOnAddChip = vi.fn(() => {})
    render(<MuiChipsInputControlled onAddChip={callbackOnAddChip} />)
    await testUtils.addChip('test')
    expect(callbackOnAddChip).toHaveBeenCalledWith('test', 0)
    expect(screen.getByTitle('test')).toBeTruthy()
  })

  test('should call onDeleteChip when a chip is deleted', () => {
    const callbackOnDeleteChip = vi.fn(() => {})
    render(
      <MuiChipsInputControlled
        value={['test', 'foo', 'bar']}
        onDeleteChip={callbackOnDeleteChip}
      />
    )
    testUtils.deleteChip(1)
    expect(callbackOnDeleteChip).toHaveBeenCalledWith('foo', 1)
    expect(screen.queryByTitle('foo')).toBeFalsy()
  })

  test('should call onChange when user add chip', async () => {
    const callbackOnChange = vi.fn(() => {})
    render(
      <MuiChipsInputControlled
        value={['test', 'foo', 'bar']}
        onChange={callbackOnChange}
      />
    )
    await testUtils.addChip('toto')
    expect(callbackOnChange).toHaveBeenCalledWith([
      'test',
      'foo',
      'bar',
      'toto'
    ])
    expect(screen.getByTitle('toto')).toBeTruthy()
  })

  test('should call onChange when user delete chip', () => {
    const callbackOnChange = vi.fn(() => {})
    render(
      <MuiChipsInputControlled
        value={['test', 'foo', 'bar']}
        onChange={callbackOnChange}
      />
    )
    testUtils.deleteChip(2)
    expect(callbackOnChange).toHaveBeenCalledWith(['test', 'foo'])
    expect(screen.queryByTitle('bar')).toBeFalsy()
  })

  test('should call onInputChange when user update input', async () => {
    const callbackOnInputChange = vi.fn(() => {})
    render(
      <MuiChipsInputControlled
        value={['test', 'foo', 'bar']}
        onInputChange={callbackOnInputChange}
      />
    )
    await testUtils.typeInInputElement('query')
    expect(callbackOnInputChange).toHaveBeenCalled()
  })

  test('should not delete chip when disabled', () => {
    const callbackOnChange = vi.fn(() => {})
    const callbackOnDelete = vi.fn(() => {})
    render(
      <MuiChipsInputControlled
        value={['test', 'foo', 'bar']}
        disabled
        onDeleteChip={callbackOnDelete}
        onChange={callbackOnChange}
      />
    )
    testUtils.deleteChip(2)
    expect(callbackOnChange).not.toHaveBeenCalled()
    expect(callbackOnDelete).not.toHaveBeenCalled()
  })

  test('should not add chip when disabled', async () => {
    const callbackOnChange = vi.fn(() => {})
    const callbackOnAdd = vi.fn(() => {})
    render(
      <MuiChipsInputControlled
        value={['test', 'foo', 'bar']}
        disabled
        onAddChip={callbackOnAdd}
        onChange={callbackOnChange}
      />
    )
    await testUtils.addChip('toto')
    expect(callbackOnChange).not.toHaveBeenCalled()
    expect(callbackOnAdd).not.toHaveBeenCalled()
  })
})
