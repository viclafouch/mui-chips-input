import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'

const ChipStyled = styled(Chip)(({ theme, size }) => {
  return `
    max-width: 100%;
    margin: 2px 4px;
    height: ${size === 'small' ? '26px' : '32px'};


    &[aria-disabled="true"] > svg {
      color: ${theme.palette.action.disabled};
      cursor: default;
    }

    &.MuiChipsInput-Chip-Editing {
      background-color: ${theme.palette.primary.light};
      color: ${theme.palette.primary.contrastText};
    }
  `
})

export default {
  ChipStyled
}
