import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import * as testUtils from '../../testUtils'
import TextFieldChips from './TextFieldChips'

import '@testing-library/jest-dom'

describe('components/TextFieldChips', () => {
  test('should not crash', () => {
    render(<TextFieldChips chips={[]} />)
  })

  test('should display chips', () => {
    render(<TextFieldChips chips={['foo', 'bar']} />)
    expect(screen.getByTitle('foo')).toBeTruthy()
    expect(screen.getByTitle('bar')).toBeTruthy()
  })

  test('should call onAddChip when new chip is added with enter key', async () => {
    const callbackOnAddChip = vi.fn(() => {})
    render(<TextFieldChips chips={[]} onAddChip={callbackOnAddChip} />)
    const inputElement = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(inputElement, 'test', { delay: 1 })
    await userEvent.keyboard('{enter}')
    expect(callbackOnAddChip).toHaveBeenCalledWith('test')
  })

  test('should call onDeleteChip when user use backspace without disableDeleteOnBackspace', () => {
    const callbackOnDeleteChip = vi.fn(() => {})
    render(
      <TextFieldChips chips={['test']} onDeleteChip={callbackOnDeleteChip} />
    )
    fireEvent.focus(testUtils.getInputElement())
    fireEvent.keyDown(testUtils.getInputElement(), {
      key: 'Backspace',
      code: 8,
      charCode: 8
    })
    expect(callbackOnDeleteChip).toHaveBeenCalledWith(0)
  })

  test('should not call onDeleteChip when user use backspace with disableDeleteOnBackspace', () => {
    const callbackOnDeleteChip = vi.fn(() => {})
    render(
      <TextFieldChips
        chips={['test']}
        disableDeleteOnBackspace
        onDeleteChip={callbackOnDeleteChip}
      />
    )
    fireEvent.focus(testUtils.getInputElement())
    fireEvent.keyDown(testUtils.getInputElement(), {
      key: 'Backspace',
      code: 8,
      charCode: 8
    })
    expect(callbackOnDeleteChip).not.toHaveBeenCalled()
  })

  test('should call onDeleteChip when user click on the svg icon', () => {
    const callbackOnDeleteChip = vi.fn(() => {})
    render(
      <TextFieldChips chips={['test']} onDeleteChip={callbackOnDeleteChip} />
    )
    const deleteSvg = screen.getByTestId('CancelIcon')
    fireEvent.click(deleteSvg)
    expect(callbackOnDeleteChip).toHaveBeenCalledWith(0)
  })

  test('should call onInputChange user updates the input', async () => {
    const callbackOnInputChange = vi.fn(() => {})
    render(
      <TextFieldChips chips={['test']} onInputChange={callbackOnInputChange} />
    )
    const inputElement = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(inputElement, 'test', { delay: 1 })
    expect(callbackOnInputChange).toHaveBeenCalled()
  })

  test('should call onInputChange user updates the input', async () => {
    const callbackOnInputChange = vi.fn(() => {})
    render(
      <TextFieldChips chips={['test']} onInputChange={callbackOnInputChange} />
    )
    const inputElement = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(inputElement, 'test', { delay: 1 })
    expect(callbackOnInputChange).toHaveBeenCalled()
  })

  test('should clear input on blur when clearInputOnBlur', async () => {
    const callbackOnInputChange = vi.fn(() => {})
    render(
      <TextFieldChips
        chips={['test']}
        clearInputOnBlur
        onInputChange={callbackOnInputChange}
      />
    )

    expect(testUtils.getInputElement().value).toBe('')
    await testUtils.typeInInputElement('foo')
    expect(testUtils.getInputElement().value).toBe('foo')
    fireEvent.click(document)

    expect(testUtils.getInputElement().value).toBe('')
    expect(callbackOnInputChange).toHaveBeenCalledWith('')
  })

  test('should not clear input on blur when no clearInputOnBlur', async () => {
    const callbackOnInputChange = vi.fn(() => {})
    render(
      <TextFieldChips chips={['test']} onInputChange={callbackOnInputChange} />
    )

    expect(testUtils.getInputElement().value).toBe('')
    await testUtils.typeInInputElement('foo')
    expect(testUtils.getInputElement().value).toBe('foo')
    expect(callbackOnInputChange).toHaveBeenCalledTimes(3)
    fireEvent.click(document)

    expect(testUtils.getInputElement().value).toBe('foo')
    expect(callbackOnInputChange).toHaveBeenCalledTimes(3)
  })

  test('should show error text on validation failed', async () => {
    const callbackOnAddChip = vi.fn(() => {})
    render(
      <TextFieldChips
        chips={['test']}
        onAddChip={callbackOnAddChip}
        validate={() => {
          return {
            isError: true,
            textError: 'foo'
          }
        }}
      />
    )

    await testUtils.addChip('bar')
    expect(testUtils.getInputElement().value).toBe('bar')
    expect(callbackOnAddChip).not.toHaveBeenCalled()
    expect(screen.getByText('foo')).toBeTruthy()
    expect(screen.getByText('foo').className.includes('Mui-error')).toBe(true)
  })

  test('should show not error text on validation is false', async () => {
    const callbackOnAddChip = vi.fn(() => {})
    render(
      <TextFieldChips
        chips={['test']}
        onAddChip={callbackOnAddChip}
        validate={() => {
          return false
        }}
      />
    )

    await testUtils.addChip('bar')
    expect(testUtils.getInputElement().value).toBe('bar')
    expect(callbackOnAddChip).not.toHaveBeenCalled()
  })

  test('should reset input when value is only spaces', async () => {
    const callbackOnAddChip = vi.fn(() => {})
    const callbackOnInputChange = vi.fn(() => {})
    render(
      <TextFieldChips
        chips={['test']}
        onInputChange={callbackOnInputChange}
        onAddChip={callbackOnAddChip}
      />
    )

    await testUtils.addChip('     ')
    expect(testUtils.getInputElement().value).toBe('')
    expect(callbackOnAddChip).not.toHaveBeenCalled()
    expect(callbackOnInputChange).toHaveBeenLastCalledWith('')
  })

  test('should show clear all chips and can clear all', () => {
    const callbackOnDeleteAll = vi.fn(() => {})
    render(
      <TextFieldChips
        chips={['test', 'foo', 'bar']}
        onDeleteAllChips={callbackOnDeleteAll}
      />
    )

    expect(testUtils.getClearAllButton()).toBeVisible()

    testUtils.clearAllChips()

    expect(callbackOnDeleteAll).toHaveBeenCalled()
  })

  test('should hide clear all chips when no chips', () => {
    render(<TextFieldChips chips={[]} />)

    expect(testUtils.getClearAllButton()).not.toBeVisible()
  })

  test('should hide clear all chips when hideClearAll', () => {
    render(<TextFieldChips chips={['test', 'bar']} hideClearAll />)

    expect(testUtils.getClearAllButton()).toBeFalsy()
  })
})
