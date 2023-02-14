import React from 'react'
import { vi } from 'vitest'
import EmailIcon from '@mui/icons-material/Email'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  test('should call onAddChip when new chip is added with a custom key in string', async () => {
    const callbackOnAddChip = vi.fn(() => {})
    render(
      <TextFieldChips
        addOnWhichKey="a"
        chips={[]}
        onAddChip={callbackOnAddChip}
      />
    )
    const inputElement = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(inputElement, 'test', { delay: 1 })
    await userEvent.keyboard('{a}')
    expect(callbackOnAddChip).toHaveBeenCalledWith('test')
  })

  test('should call onAddChip when new chip is added with a custom key in array', async () => {
    const callbackOnAddChip = vi.fn(() => {})
    render(
      <TextFieldChips
        addOnWhichKey={['a', 'p']}
        chips={[]}
        onAddChip={callbackOnAddChip}
      />
    )
    const inputElement = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(inputElement, 'test', { delay: 1 })
    await userEvent.keyboard('{p}')
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

  test('should show chip value and chip in color on double click', () => {
    render(<TextFieldChips chips={['test']} />)

    const chip = screen.getByTitle('test')
    fireEvent.doubleClick(chip)

    expect(testUtils.getInputElement().value).toBe('test')
    expect(chip.classList.contains('MuiChipsInput-Chip-Editing')).toBe(true)
  })

  test('should undo editing on re double click', () => {
    render(<TextFieldChips chips={['test']} />)

    const chip = screen.getByTitle('test')
    fireEvent.doubleClick(chip)

    expect(testUtils.getInputElement().value).toBe('test')
    expect(chip.classList.contains('MuiChipsInput-Chip-Editing')).toBe(true)

    fireEvent.doubleClick(chip)

    expect(testUtils.getInputElement().value).toBe('')
    expect(chip.classList.contains('MuiChipsInput-Chip-Editing')).toBe(false)
  })

  test('should not be able to edit a chip when disableEdition is true', () => {
    render(<TextFieldChips chips={['test']} disableEdition />)

    const chip = screen.getByTitle('test')
    fireEvent.doubleClick(chip)

    expect(testUtils.getInputElement().value).toBe('')

    expect(chip.classList.contains('MuiChipsInput-Chip-Editing')).toBe(false)
  })

  test('should update editing chip on click away', () => {
    render(<TextFieldChips chips={['test', 'toto']} />)

    const chip = screen.getByTitle('test')
    fireEvent.doubleClick(chip)

    expect(testUtils.getInputElement().value).toBe('test')
    expect(chip.classList.contains('MuiChipsInput-Chip-Editing')).toBe(true)

    const chip2 = screen.getByTitle('toto')
    fireEvent.doubleClick(chip2)

    expect(testUtils.getInputElement().value).toBe('toto')
    expect(chip.classList.contains('MuiChipsInput-Chip-Editing')).toBe(false)
    expect(chip2.classList.contains('MuiChipsInput-Chip-Editing')).toBe(true)
  })

  test('should not valid chip on double click', () => {
    const callbackValidation = vi.fn(() => {
      return true
    })
    render(<TextFieldChips chips={['test']} validate={callbackValidation} />)

    const chip = screen.getByTitle('test')
    fireEvent.doubleClick(chip)

    expect(callbackValidation).not.toHaveBeenCalled()
  })

  test('should call onEdit prop', async () => {
    const callbackOnEditChip = vi.fn(() => {})
    render(
      <TextFieldChips
        chips={['I like']}
        hideClearAll
        onEditChip={callbackOnEditChip}
      />
    )

    const chip = screen.getByTitle('I like')
    fireEvent.doubleClick(chip)

    await testUtils.typeInInputElement(' apples')
    expect(testUtils.getInputElement().value).toBe('I like apples')
    await userEvent.keyboard('{enter}')

    expect(callbackOnEditChip).toHaveBeenCalledWith('I like apples', 0)
    expect(testUtils.getInputElement().value).toBe('')
    expect(chip.classList.contains('MuiChipsInput-Chip-Editing')).toBe(false)
    expect(screen.getAllByRole('button').length).toBe(1)
  })

  test('should edit chip props with the renderChip prop', () => {
    render(
      <TextFieldChips
        chips={['test']}
        renderChip={(ChipComponent, key, ChipProps) => {
          return (
            <ChipComponent
              key={key}
              {...ChipProps}
              deleteIcon={<EmailIcon />}
            />
          )
        }}
      />
    )

    expect(screen.getByTestId('EmailIcon')).toBeTruthy()
  })

  test('should control the input value', async () => {
    const callbackOnInputChange = vi.fn(() => {})
    render(
      <TextFieldChips
        chips={['test']}
        onInputChange={callbackOnInputChange}
        inputValue="Hello world"
      />
    )

    expect(testUtils.getInputElement().value).toBe('Hello world')

    await testUtils.typeInInputElement(' ')

    expect(callbackOnInputChange).toBeCalledWith('Hello world ')
  })
})
