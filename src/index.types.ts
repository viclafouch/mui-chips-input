import React from 'react'
import type { ChipProps as MuiChipProps } from '@mui/material/Chip'
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'

type TextFieldProps = Omit<
  MuiTextFieldProps,
  'onChange' | 'select' | 'type' | 'multiline' | 'defaultValue'
>

export type MuiChipsInputChipProps = MuiChipProps & {
  index: number
  label: string
  title: string
  isEditing: boolean
  disableEdition?: boolean
  size: MuiChipProps['size']
  disabled: MuiChipProps['disabled']
  onDelete: (index: number) => void
  onEdit: (index: number) => void
}

export type MuiChipsInputChipComponent =
  React.ElementType<MuiChipsInputChipProps>

export type MuiChipsInputChip = string

export interface BaseMuiChipsInputProps {
  value?: MuiChipsInputChip[]
  onInputChange?: (inputValue: string) => void
  inputValue?: string
  onAddChip?: (chipValue: MuiChipsInputChip, chipIndex: number) => void
  onDeleteChip?: (chipValue: MuiChipsInputChip, chipIndex: number) => void
  onEditChip?: (chipValue: MuiChipsInputChip, chipIndex: number) => void
  onChange?: (value: MuiChipsInputChip[]) => void
  addOnWhichKey?: string[] | string
  renderChip?: (
    ChipComponent: MuiChipsInputChipComponent,
    key: React.Key,
    ChipProps: MuiChipsInputChipProps
  ) => JSX.Element
  hideClearAll?: boolean
  disableEdition?: boolean
  disableDeleteOnBackspace?: boolean
  validate?: (
    chipValue: MuiChipsInputChip
  ) => boolean | { isError: boolean; textError: string }
}

// Discriminated union which allows ClearOnBlur or AddOnBlur, but not both, or neither
type ChipInputBlurBehavior =
  | {
      clearInputOnBlur: true
      addOnBlur?: never
    }
  | {
      clearInputOnBlur?: never
      addOnBlur: true
    }
  | {
      clearInputOnBlur?: false
      addOnBlur?: false
    }

export type MuiChipsInputProps = TextFieldProps &
  BaseMuiChipsInputProps &
  ChipInputBlurBehavior
