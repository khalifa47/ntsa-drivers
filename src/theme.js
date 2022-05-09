import { createTheme } from '@mui/material/styles';
import { yellow } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        primary: {
            main: yellow[800],
        }
    },
    typography: {
        fontFamily: `${['"Varela Round"', 'cursive',].join(',')}!important`,
    },
    components: {
        MuiTextField: {
            defaultProps: {
                size: 'small'
            }
        },
        MuiLoadingButton: {
            defaultProps: {
                size: 'small',
                variant: 'contained'
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    padding: 'padding: .3125rem 1rem;!important'
                }
            }
        }
    }
});