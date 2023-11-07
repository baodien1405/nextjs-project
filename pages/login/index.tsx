import { Box, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

import { LoginForm } from '@/components/auth'
import { useAuth } from '@/hooks'
import { LoginPayload } from '@/models'
import { decodeUrl, getErrorMessage } from '@/utils'
import { toast } from 'react-toastify'
import { path } from '@/constants'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth({
    revalidateOnMount: false
  })

  const handleLoginSubmit = async (payload: LoginPayload) => {
    try {
      await login(payload)

      const backUrl = router.query?.back_to ? decodeUrl(router.query?.back_to as string) : path.home
      router.push(backUrl)
    } catch (error) {
      const message = getErrorMessage(error)
      toast.error(message)
    }
  }

  return (
    <Box>
      <Paper
        elevation={4}
        sx={{
          mx: 'auto',
          mt: 8,
          p: 4,
          maxWidth: '480px',
          textAlign: 'center'
        }}
      >
        <Typography component="h1" variant="h5" mb={3}>
          Login
        </Typography>

        <LoginForm onSubmit={handleLoginSubmit} />
      </Paper>
    </Box>
  )
}
