import type { ChipProps as MuiChipProps } from '@mui/material/Chip'
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'

type TextFieldProps = Omit<
  MuiTextFieldProps,
  'onChange' | 'select' | 'type' | 'multiline' | 'defaultValue'
>

export type MuiChipsInputChipProps = MuiChipProps & {
  key: string
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
  onAddChip?: (chipValue: MuiChipsInputChip, chipIndex: number) => void
  onDeleteChip?: (chipValue: MuiChipsInputChip, chipIndex: number) => void
  onEditChip?: (chipValue: MuiChipsInputChip, chipIndex: number) => void
  onChange?: (value: MuiChipsInputChip[]) => void
  renderChip?: (
    ChipComponent: MuiChipsInputChipComponent,
    ChipProps: MuiChipsInputChipProps
  ) => JSX.Element
  clearInputOnBlur?: boolean
  hideClearAll?: boolean
  disableEdition?: boolean
  disableDeleteOnBackspace?: boolean
  validate?: (
    chipValue: MuiChipsInputChip
  ) => boolean | { isError: boolean; textError: string }
}

export type MuiChipsInputProps = TextFieldProps & BaseMuiChipsInputProps
