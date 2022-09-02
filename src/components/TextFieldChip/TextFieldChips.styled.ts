import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'

const EndAdornmentClose = styled('div')`
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  position: absolute;
`

const TextFieldStyled = styled(TextField)((props) => {
  return `
    max-width: 100%;

    .MuiInputBase-root {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      row-gap: 5px;
      padding: 9px ${props.InputProps?.endAdornment ? '30px' : '9px'} 9px 10px;

      input {
        min-width: 30px;
        width: auto;
        flex-grow: 1;
        text-overflow: ellipsis;
        padding: 7.5px 4px;
        align-self: center;
      }
    }
  `
})

const ChipStyled = styled(Chip)(({ theme }) => {
  return `
    max-width: 100%;
    margin: 2px 4px;
    height: 32px;

    &[aria-disabled="true"] > svg.MuiChip-deleteIcon {
      color: ${theme.palette.action.disabled};
      cursor: default;
    }
  `
})

export default {
  ChipStyled,
  TextFieldStyled,
  EndAdornmentClose
}
