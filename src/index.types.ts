import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'

type TextFieldProps = Omit<
  MuiTextFieldProps,
  'onChange' | 'select' | 'type' | 'multiline' | 'defaultValue'
>

export type MuiChipsInputChip = string

export interface BaseMuiChipsInputProps {
  value?: MuiChipsInputChip[]
  onInputChange?: (inputValue: string) => void
  onAddChip?: (chipValue: MuiChipsInputChip, chipIndex: number) => void
  onDeleteChip?: (chipValue: MuiChipsInputChip, chipIndex: number) => void
  onEditChip?: (chipValue: MuiChipsInputChip, chipIndex: number) => void
  onChange?: (value: MuiChipsInputChip[]) => void
  clearInputOnBlur?: boolean
  hideClearAll?: boolean
  disableDeleteOnBackspace?: boolean
  validate?: (
    chipValue: MuiChipsInputChip
  ) => boolean | { isError: boolean; textError: string }
}

export type MuiChipsInputProps = TextFieldProps & BaseMuiChipsInputProps
