import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MuiFileInput } from './index'

export default {
  title: 'MuiColorInput',
  component: MuiFileInput
} as ComponentMeta<typeof MuiFileInput>

const theme = createTheme()

export const Primary: ComponentStory<typeof MuiFileInput> = () => {
  return (
    <ThemeProvider theme={theme}>
      <MuiFileInput />
    </ThemeProvider>
  )
}
