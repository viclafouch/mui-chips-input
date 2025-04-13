import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react'
import { MuiChipsInput } from './index'

export default {
  title: 'MuiChipsInput',
  component: MuiChipsInput
} as Meta<typeof MuiChipsInput>

const theme = createTheme()

export const Primary: StoryFn<typeof MuiChipsInput> = () => {
  const [value, setValue] = React.useState<string[]>(['test'])

  const handleChange = (newValue: string[]) => {
    setValue(newValue)
  }

  return (
    <ThemeProvider theme={theme}>
      <MuiChipsInput
        fullWidth
        sx={{ maxWidth: 400 }}
        value={value}
        disableEdition
        label="Fruits"
        clearInputOnBlur
        onChange={handleChange}
      />
    </ThemeProvider>
  )
}
