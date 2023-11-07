import { CircularProgress, Box } from '@mui/material'

interface SpinnerProps {
  size?: number
}

export function Spinner({ size = 60 }: SpinnerProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%'
      }}
    >
      <CircularProgress size={size} />
    </Box>
  )
}
