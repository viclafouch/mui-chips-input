import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import IconButton from '@mui/material/IconButton'
import type { TextFieldProps } from '@mui/material/TextField'
import Chip from '@components/Chip/Chip'
import { KEYBOARD_KEY } from '@shared/constants/event'
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
  hideClearAll?: boolean
  disableDeleteOnBackspace?: boolean
  disableEdition?: boolean
  validate?: MuiChipsInputProps['validate']
  onInputChange?: (inputValue: string) => void
  onDeleteChip?: (chipIndex: number) => void
  onDeleteAllChips?: () => void
  renderChip?: (
    ChipComponent: MuiChipsInputChipComponent,
    ChipProps: MuiChipsInputChipProps
  ) => JSX.Element
}

const TextFieldChips = React.forwardRef(
  (
    props: TextFieldChipsProps,
    propRef: TextFieldChipsProps['ref']
  ): React.ReactElement => {
    const {
      chips,
      onAddChip,
      onEditChip,
      onDeleteChip,
      onDeleteAllChips,
      InputProps,
      onInputChange,
      disabled,
      clearInputOnBlur,
      validate,
      error,
      helperText,
      hideClearAll,
      inputProps,
      size,
      disableDeleteOnBackspace,
      disableEdition,
      className,
      renderChip,
      ...restTextFieldProps
    } = props
    const [inputValue, setInputValue] = React.useState<string>('')
    const [textError, setTextError] = React.useState<string>('')
    const inputElRef = React.useRef<HTMLDivElement | null>(null)
    const [chipIndexEditable, setChipIndexEditable] = React.useState<
      null | number
    >(null)
    const { onKeyDown, ...restInputProps } = inputProps || {}
    const { inputRef, ...restIInputProps } = InputProps || {}

    const clearTextError = () => {
      setTextError('')
    }

    const updateInputValue = (newInputValue: string) => {
      onInputChange?.(newInputValue)
      setInputValue(newInputValue)
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

    const handleClickAway = () => {
      if (chipIndexEditable !== null) {
        clearChipIndexEditable()
        clearInputValue()
      } else if (clearInputOnBlur) {
        clearInputValue()
      }
    }

    const handleRef = (ref: HTMLDivElement | null): void => {
      // @ts-ignore
      inputElRef.current = ref
      if (propRef) {
        assocRefToPropRef(ref, propRef)
      }
    }

    const validationGuard = (
      chipValue: MuiChipsInputChip,
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      return (callback: () => void) => {
        if (typeof validate === 'function') {
          const validation = validate(chipValue)
          if (validation === false) {
            event.preventDefault()
            return
          }
          if (!matchIsBoolean(validation) && validation.isError) {
            event.preventDefault()
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
      event: React.KeyboardEvent<HTMLInputElement>
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
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      validationGuard(
        chipValue,
        event
      )(() => {
        onAddChip?.(inputValue.trim())
        clearInputValue()
      })
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const isEnter = event.key === KEYBOARD_KEY.enter
      const isBackspace = event.key === KEYBOARD_KEY.backspace
      const inputValueTrimed = inputValue.trim()

      if (isEnter) {
        event.preventDefault()
      }

      if (inputValue.length > 0 && isEnter) {
        if (inputValueTrimed.length === 0) {
          clearInputValue()
        } else if (chipIndexEditable !== null) {
          updateChip(inputValueTrimed, chipIndexEditable, event)
        } else {
          addChip(inputValueTrimed, event)
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

      onKeyDown?.(event)
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

    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        <Styled.TextFieldStyled
          value={inputValue}
          onChange={handleChange}
          ref={propRef}
          className={`MuiChipsInput-TextField ${className || ''}`}
          size={size}
          placeholder="Type and press enter"
          inputProps={{
            onKeyDown: handleKeyDown,
            ...restInputProps
          }}
          disabled={disabled}
          error={Boolean(textError) || error}
          helperText={textError || helperText}
          InputProps={{
            inputRef: handleRef,
            startAdornment: hasAtLeastOneChip
              ? chips.map((chip, index) => {
                  const ChipProps: MuiChipsInputChipProps = {
                    key: `chip-${index}`,
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
                    renderChip(Chip, ChipProps)
                  ) : (
                    <Chip {...ChipProps} />
                  )
                })
              : null,
            endAdornment: !hideClearAll ? (
              <Styled.EndAdornmentClose
                style={{ visibility: hasAtLeastOneChip ? 'visible' : 'hidden' }}
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
            ...restIInputProps
          }}
          {...restTextFieldProps}
        />
      </ClickAwayListener>
    )
  }
)

TextFieldChips.defaultProps = {
  onInputChange: () => {},
  clearInputOnBlur: false,
  hideClearAll: false,
  disableDeleteOnBackspace: false,
  disableEdition: false,
  onDeleteChip: () => {},
  onAddChip: () => {},
  onEditChip: () => {},
  renderChip: undefined,
  onDeleteAllChips: () => {},
  validate: () => {
    return true
  }
}

export default TextFieldChips
