import React from 'react'
import { KEYBOARD_KEY } from '@shared/constants/event'

import type { MuiChipsInputChipProps } from '../../index.types'
import Styled from './Chip.styled'

type ChipProps = MuiChipsInputChipProps

const Chip = (props: ChipProps) => {
  const {
    className,
    index,
    onDelete,
    disabled,
    onEdit,
    isEditing,
    disableEdition,
    ...restChipProps
  } = props

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === KEYBOARD_KEY.enter) {
      onDelete(index)
    }
  }

  const handleDelete = (event: MouseEvent) => {
    event?.preventDefault?.()
    event?.stopPropagation?.()
    onDelete(index)
  }

  const handleDoubleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement
    // Return if click on a svg icon
    if (target.textContent !== restChipProps.label) {
      return
    }
    if (!disabled) {
      onEdit(index)
    }
  }

  return (
    <Styled.ChipStyled
      className={`MuiChipsInput-Chip ${
        isEditing ? 'MuiChipsInput-Chip-Editing' : ''
      } ${className || ''}`}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      onDoubleClick={disableEdition ? undefined : handleDoubleClick}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onDelete={handleDelete}
      {...restChipProps}
    />
  )
}

export default Chip
