import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import TextFieldChips from './TextFieldChips'

import '@testing-library/jest-dom'

describe('components/TextFieldChips', () => {
  test('should not crash', () => {
    render(
      <TextFieldChips chips={[]} onAddChip={() => {}} onDeleteChip={() => {}} />
    )
  })

  test('should display chips', () => {
    render(
      <TextFieldChips
        chips={['foo', 'bar']}
        onAddChip={() => {}}
        onDeleteChip={() => {}}
      />
    )
    expect(screen.getByTitle('foo')).toBeTruthy()
    expect(screen.getByTitle('bar')).toBeTruthy()
  })

  test('should call onAddChip when new chip is added with enter key', async () => {
    const callbackOnAddChip = vi.fn(() => {})
    render(
      <TextFieldChips
        chips={[]}
        onAddChip={callbackOnAddChip}
        onDeleteChip={() => {}}
      />
    )
    const inputElement = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(inputElement, 'test', { delay: 1 })
    await userEvent.keyboard('{enter}')
    expect(callbackOnAddChip).toHaveBeenCalledWith('test')
  })

  test('should call onDeleteChip when user click on the svg icon', () => {
    const callbackOnDeleteChip = vi.fn(() => {})
    render(
      <TextFieldChips
        chips={['test']}
        onAddChip={() => {}}
        onDeleteChip={callbackOnDeleteChip}
      />
    )
    const deleteSvg = screen.getByTestId('CancelIcon')
    fireEvent.click(deleteSvg)
    expect(callbackOnDeleteChip).toHaveBeenCalledWith(0)
  })

  test('should call onInputChange user updates the input', async () => {
    const callbackOnInputChange = vi.fn(() => {})
    render(
      <TextFieldChips
        chips={['test']}
        onAddChip={() => {}}
        onDeleteChip={() => {}}
        onInputChange={callbackOnInputChange}
      />
    )
    const inputElement = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(inputElement, 'test', { delay: 1 })
    expect(callbackOnInputChange).toHaveBeenCalled()
  })

  test('should call onInputChange user updates the input', async () => {
    const callbackOnInputChange = vi.fn(() => {})
    render(
      <TextFieldChips
        chips={['test']}
        onAddChip={() => {}}
        onDeleteChip={() => {}}
        onInputChange={callbackOnInputChange}
      />
    )
    const inputElement = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(inputElement, 'test', { delay: 1 })
    expect(callbackOnInputChange).toHaveBeenCalled()
  })
})
