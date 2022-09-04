import React from 'react'
import TextFieldChips from '@components/TextFieldChip/TextFieldChips'
import { append, removeIndex, updateIndex } from '@shared/helpers/array'

import type {
  BaseMuiChipsInputProps,
  MuiChipsInputChip,
  MuiChipsInputProps
} from './index.types'

export { MuiChipsInputProps, MuiChipsInputChip }

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
      if (disabled) {
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
        onDeleteAllChips={handleDeleteAllChips}
        clearInputOnBlur={clearInputOnBlur}
        disabled={disabled}
        validate={validate}
        hideClearAll={hideClearAll}
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
  clearInputOnBlur: false,
  hideClearAll: false,
  disableDeleteOnBackspace: false,
  validate: () => {
    return true
  }
} as Required<BaseMuiChipsInputProps>

export { MuiChipsInput }
