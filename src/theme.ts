import { createTheme } from '@mui/material/styles';
import { grey, deepPurple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: deepPurple,
    divider: deepPurple[700],
    background: {
        default: deepPurple[900],
        paper: deepPurple[900],
    },
    text: {
        primary: '#fff',
        secondary: grey[500],
    },
  },
});

export default theme;