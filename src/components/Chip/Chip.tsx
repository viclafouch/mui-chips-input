import React from 'react'
import { ChipProps as MuiChipsProps } from '@mui/material/Chip'
import { KEYBOARD_KEY } from '@shared/constants/event'

import Styled from './Chip.styled'

type ChipProps = MuiChipsProps & {
  index: number
  onDelete: (index: number) => void
  onEdit: (index: number) => void
  isEditing: boolean
}

const Chip = (props: ChipProps) => {
  const {
    className,
    index,
    onDelete,
    disabled,
    onEdit,
    isEditing,
    ...restChipProps
  } = props

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === KEYBOARD_KEY.enter) {
      onDelete(index)
    }
  }

  const handleDelete = () => {
    onDelete(index)
  }

  const handleDoubleClick = () => {
    if (!disabled) {
      onEdit(index)
    }
  }

  return (
    <Styled.ChipStyled
      className={`MuiChipsInput-Chip ${
        isEditing ? 'MuiChipsInput-Chip-Editing' : ''
      }`}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      onDoubleClick={handleDoubleClick}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onDelete={handleDelete}
      {...restChipProps}
    />
  )
}

export default Chip
