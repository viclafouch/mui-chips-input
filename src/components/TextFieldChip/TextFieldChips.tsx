import React from 'react'
import Chip from '@components/Chip/Chip'
import CloseIcon from '@mui/icons-material/Close'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import IconButton from '@mui/material/IconButton'
import type { TextFieldProps } from '@mui/material/TextField'
import { KEYBOARD_KEY, KEYBOARD_KEYCODE } from '@shared/constants/event'
import { matchIsBoolean } from '@shared/helpers/boolean'
import { assocRefToPropRef } from '@shared/helpers/ref'
import type {
  MuiChipsInputChip,
  MuiChipsInputChipComponent,
  MuiChipsInputChipProps,
  MuiChipsInputProps
} from '../../index.types'
import Styled from './TextFieldChips.styled'

type TextFieldChipsProps = TextFieldProps & {
  chips: MuiChipsInputChip[]
  onAddChip?: (chip: MuiChipsInputChip) => void
  onEditChip?: (chip: MuiChipsInputChip, chipIndex: number) => void
  clearInputOnBlur?: boolean
  addOnBlur?: boolean
  hideClearAll?: boolean
  disableDeleteOnBackspace?: boolean
  addOnWhichKey?: string | string[]
  disableEdition?: boolean
  inputValue?: string
  validate?: MuiChipsInputProps['validate']
  onInputChange?: (inputValue: string) => void
  onDeleteChip?: (chipIndex: number) => void
  onDeleteAllChips?: () => void
  renderChip?: (
    ChipComponent: MuiChipsInputChipComponent,
    key: React.Key,
    ChipProps: MuiChipsInputChipProps
  ) => React.ReactNode
}

const TextFieldChips = React.forwardRef(
  // eslint-disable-next-line max-lines-per-function -- forwardRef component with many event handlers that cannot be easily split
  (
    {
      chips,
      onAddChip,
      onEditChip,
      onDeleteChip,
      onInputChange,
      disabled,
      clearInputOnBlur,
      addOnBlur,
      validate,
      error,
      helperText,
      hideClearAll,
      slotProps,
      size,
      disableDeleteOnBackspace,
      disableEdition,
      className,
      renderChip,
      addOnWhichKey,
      onFocus,
      onDeleteAllChips,
      inputRef: inputRefFromProp,
      inputValue: inputValueControlled,
      ...restTextFieldProps
    }: TextFieldChipsProps,
    propRef: TextFieldChipsProps['ref']
  ): React.ReactElement => {
    const [inputValueUncontrolled, setInputValueUncontrolled] =
      React.useState<string>('')
    const [textError, setTextError] = React.useState<string>('')
    const inputElRef = React.useRef<HTMLDivElement | null>(null)
    const isFocusingRef = React.useRef<boolean>(false)
    const isControlled = typeof inputValueControlled === 'string'
    const [chipIndexEditable, setChipIndexEditable] = React.useState<
      null | number
    >(null)

    const clearTextError = () => {
      setTextError('')
    }

    const inputValue = isControlled
      ? (inputValueControlled as string)
      : inputValueUncontrolled

    const updateInputValue = (newInputValue: string) => {
      onInputChange?.(newInputValue)

      if (!isControlled) {
        setInputValueUncontrolled(newInputValue)
      }
    }

    const updateChipIndexEditable = (chipIndex: number) => {
      updateInputValue(chips[chipIndex])
      setChipIndexEditable(chipIndex)
      clearTextError()
    }

    const clearChipIndexEditable = () => {
      setChipIndexEditable(null)
    }

    const clearInputValue = () => {
      clearTextError()
      updateInputValue('')
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      updateInputValue(event.target.value)
    }

    const validationGuard = (
      chipValue: MuiChipsInputChip,
      event?: React.KeyboardEvent<HTMLInputElement>
    ) => {
      return (callback: () => void) => {
        if (typeof validate === 'function') {
          const validation = validate(chipValue)

          if (validation === false) {
            event?.preventDefault()

            return
          }

          if (!matchIsBoolean(validation) && validation.isError) {
            event?.preventDefault()
            setTextError(validation.textError)

            return
          }
        }

        callback()
      }
    }

    const updateChip = (
      chipValue: MuiChipsInputChip,
      chipIndex: number,
      event?: React.KeyboardEvent<HTMLInputElement>
    ) => {
      validationGuard(
        chipValue,
        event
      )(() => {
        onEditChip?.(chipValue, chipIndex)
        clearChipIndexEditable()
        clearInputValue()
      })
    }

    const addChip = (
      chipValue: MuiChipsInputChip,
      event?: React.KeyboardEvent<HTMLInputElement>
    ) => {
      validationGuard(
        chipValue,
        event
      )(() => {
        onAddChip?.(inputValue.trim())
        clearInputValue()
      })
    }

    const handleClickAway = () => {
      if (!isFocusingRef.current) {
        return
      }

      if (chipIndexEditable !== null) {
        clearChipIndexEditable()
        clearInputValue()
      } else if (addOnBlur) {
        if (inputValue.length > 0) {
          const inputValueTrimmed = inputValue.trim()

          if (inputValueTrimmed.length === 0) {
            clearInputValue()
          } else if (chipIndexEditable !== null) {
            updateChip(inputValueTrimmed, chipIndexEditable)
          } else {
            addChip(inputValueTrimmed)
          }
        }
      } else if (clearInputOnBlur) {
        clearInputValue()
      }

      isFocusingRef.current = false
    }

    const handleRef = (ref: HTMLDivElement | null): void => {
      inputElRef.current = ref

      if (inputRefFromProp) {
        assocRefToPropRef(ref, inputRefFromProp)
      }

      if (propRef) {
        assocRefToPropRef(ref, propRef)
      }
    }

    const matchIsValidKeyToAdd = (eventKey: string, eventKeyCode: number) => {
      if (eventKeyCode === KEYBOARD_KEYCODE.ime) {
        return false
      }

      if (addOnWhichKey) {
        if (Array.isArray(addOnWhichKey)) {
          return addOnWhichKey.includes(eventKey)
        }

        return addOnWhichKey === eventKey
      }

      return eventKey === KEYBOARD_KEY.enter
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const isKeyIsAdd = matchIsValidKeyToAdd(event.key, event.keyCode)
      const isBackspace = event.key === KEYBOARD_KEY.backspace
      const inputValueTrimmed = inputValue.trim()

      if (!isKeyIsAdd && event.code === 'Tab') {
        handleClickAway()

        return
      }

      if (isKeyIsAdd) {
        event.preventDefault()
      }

      if (inputValue.length > 0 && isKeyIsAdd) {
        if (inputValueTrimmed.length === 0) {
          clearInputValue()
        } else if (chipIndexEditable !== null) {
          updateChip(inputValueTrimmed, chipIndexEditable, event)
        } else {
          addChip(inputValueTrimmed, event)
        }
      } else if (
        isBackspace &&
        inputValue.length === 0 &&
        chips.length > 0 &&
        !disableDeleteOnBackspace
      ) {
        const chipIndex = chips.length - 1
        onDeleteChip?.(chipIndex)

        if (chipIndexEditable === chipIndex) {
          clearChipIndexEditable()
        }
      }
    }

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      event.preventDefault()
      onFocus?.(event)
      isFocusingRef.current = true
    }

    const handleClearAll = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()

      if (!hideClearAll && !disabled) {
        onDeleteAllChips?.()
        clearInputValue()
        clearChipIndexEditable()
      }
    }

    const handleEdit = (chipIndex: number) => {
      if (chipIndex === chipIndexEditable) {
        clearInputValue()
        clearChipIndexEditable()
      } else {
        updateChipIndexEditable(chipIndex)
      }

      inputElRef.current?.focus()
    }

    const handleDeleteChip = (chipIndex: number) => {
      if (disabled) {
        return
      }

      onDeleteChip?.(chipIndex)

      if (chipIndexEditable !== null) {
        clearChipIndexEditable()
        clearInputValue()
      }
    }

    const hasAtLeastOneChip = chips.length > 0
    const { htmlInput, input, ...restSlotPropsInput } = slotProps || {}

    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        <Styled.TextFieldStyled
          value={inputValue}
          onChange={handleChange}
          ref={propRef}
          className={`MuiChipsInput-TextField ${className || ''}`}
          size={size}
          placeholder="Type and press enter"
          onFocus={handleFocus}
          slotProps={{
            htmlInput: {
              onKeyDown: handleKeyDown,
              enterKeyHint: 'done',
              ref: handleRef,
              // eslint-disable-next-line @typescript-eslint/no-misused-spread -- MUI slotProps are objects, not functions
              ...htmlInput
            },
            input: {
              startAdornment: hasAtLeastOneChip
                ? // eslint-disable-next-line react-hooks/refs -- false positive: renderChip is a render callback, not reading refs
                  chips.map((chip, index) => {
                    const key = `chip-${index}`
                    const ChipProps: MuiChipsInputChipProps = {
                      index,
                      onEdit: handleEdit,
                      label: chip,
                      title: chip,
                      isEditing: index === chipIndexEditable,
                      size,
                      disabled,
                      disableEdition,
                      onDelete: handleDeleteChip
                    }

                    return renderChip ? (
                      renderChip(Chip, key, ChipProps)
                    ) : (
                      <Chip {...ChipProps} key={key} />
                    )
                  })
                : null,
              endAdornment: !hideClearAll ? (
                <Styled.EndAdornmentClose
                  style={{
                    visibility: hasAtLeastOneChip ? 'visible' : 'hidden'
                  }}
                >
                  <IconButton
                    aria-label="Clear"
                    title="Clear"
                    disabled={disabled}
                    size="small"
                    onClick={handleClearAll}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Styled.EndAdornmentClose>
              ) : null,
              // eslint-disable-next-line @typescript-eslint/no-misused-spread -- MUI slotProps are objects, not functions
              ...input
            },
            ...restSlotPropsInput
          }}
          disabled={disabled}
          error={Boolean(textError) || error}
          helperText={textError || helperText}
          {...restTextFieldProps}
        />
      </ClickAwayListener>
    )
  }
)

export default TextFieldChips
