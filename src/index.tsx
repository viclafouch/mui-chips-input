import React from 'react'
import TextFieldChips from '@components/TextFieldChip/TextFieldChips'
import { KEYBOARD_KEY } from '@shared/constants/event'
import { append, removeIndex, updateIndex } from '@shared/helpers/array'

import type {
  MuiChipsInputChip,
  MuiChipsInputChipComponent,
  MuiChipsInputChipProps,
  MuiChipsInputProps
} from './index.types'

export {
  MuiChipsInputProps,
  MuiChipsInputChip,
  MuiChipsInputChipProps,
  MuiChipsInputChipComponent
}

const MuiChipsInput = React.forwardRef(
  (props: MuiChipsInputProps, propRef: MuiChipsInputProps['ref']) => {
    const {
      value,
      onChange,
      onAddChip,
      onInputChange,
      onDeleteChip,
      disabled,
      validate,
      clearInputOnBlur,
      hideClearAll,
      disableDeleteOnBackspace,
      onEditChip,
      renderChip,
      disableEdition,
      addOnWhichKey,
      inputValue,
      ...restTextFieldProps
    } = props as Required<MuiChipsInputProps>

    const handleAddChip = (chipValue: MuiChipsInputChip) => {
      if (disabled) {
        return
      }
      const newValue = append(value, chipValue)
      const newIndex = newValue.length - 1

      onAddChip?.(chipValue, newIndex)
      onChange?.(newValue)
    }

    const handleDeleteChip = (chipIndex: number) => {
      if (disabled) {
        return
      }
      const chip = value[chipIndex]
      onChange?.(removeIndex(value, chipIndex))
      onDeleteChip?.(chip, chipIndex)
    }

    const handleEditChip = (
      chipValue: MuiChipsInputChip,
      chipIndex: number
    ) => {
      if (disabled || disableEdition) {
        return
      }
      onChange?.(updateIndex(value, chipIndex, chipValue))
      onEditChip?.(chipValue, chipIndex)
    }

    const handleDeleteAllChips = () => {
      onChange?.([])
    }

    return (
      <TextFieldChips
        chips={value}
        onAddChip={handleAddChip}
        onInputChange={onInputChange}
        disableDeleteOnBackspace={disableDeleteOnBackspace}
        onDeleteChip={handleDeleteChip}
        onEditChip={handleEditChip}
        renderChip={renderChip}
        onDeleteAllChips={handleDeleteAllChips}
        clearInputOnBlur={clearInputOnBlur}
        disabled={disabled}
        disableEdition={disableEdition}
        validate={validate}
        inputValue={inputValue}
        hideClearAll={hideClearAll}
        addOnWhichKey={addOnWhichKey}
        {...restTextFieldProps}
        ref={propRef}
      />
    )
  }
)

MuiChipsInput.defaultProps = {
  value: [],
  onChange: () => {},
  onAddChip: () => {},
  onDeleteChip: () => {},
  onInputChange: () => {},
  onEditChip: () => {},
  addOnWhichKey: KEYBOARD_KEY.enter,
  clearInputOnBlur: false,
  disableEdition: false,
  hideClearAll: false,
  disableDeleteOnBackspace: false,
  validate: () => {
    return true
  }
}

export { MuiChipsInput }
