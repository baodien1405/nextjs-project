import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
export let theme = createTheme({
  typography: {
    fontFamily: 'Heebo, sans-serif'
  },
  palette: {
    primary: {
      main: '#FF6464',
      light: '#8695A4'
    },
    secondary: {
      main: '#00A8CC',
      light: '#EDF7FA'
    },
    error: {
      main: red.A400
    },
    text: {
      primary: '#21243D'
    }
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'md'
      },
      styleOverrides: {
        maxWidthSm: {
          maxWidth: '680px',

          '@media (min-width: 600px)': {
            maxWidth: '680px'
          }
        },
        maxWidthMd: {
          maxWidth: '860px',

          '@media (min-width: 900px)': {
            maxWidth: '860px'
          }
        }
      }
    },
    MuiLink: {
      defaultProps: {
        underline: 'none'
      },
      styleOverrides: {
        root: {
          color: 'black',

          '&:hover, &.active': {
            color: '#FF6464'
          }
        }
      }
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            color: 'white',
            textTransform: 'capitalize',
            fontSize: 20
          }
        }
      ]
    },
    MuiChip: {
      styleOverrides: {
        root: {
          paddingInline: 2
        }
      },
      variants: [
        {
          props: { color: 'secondary' },
          style: {
            color: 'white',
            backgroundColor: '#142850',
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        {
          props: { color: 'primary' },
          style: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold'
          }
        }
      ]
    }
  }
})

theme = responsiveFontSizes(theme)
