import { LayoutProps } from '@/models'
import { Container, Stack } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import React from 'react'
import { Footer, Header } from '../common'

export function MainLayout({ children }: LayoutProps) {
  return (
    <Stack minHeight="100vh">
      <Header />

      <Container maxWidth="sm" sx={{ bgcolor: 'red' }}>
        SM CONTAINER
      </Container>
      <Container maxWidth="md" sx={{ bgcolor: 'blue' }}>
        MD CONTAINER
      </Container>

      <Box flexGrow={1}>
        <h1>Main Layout</h1>

        <Link href="/">
          <a>Home</a>
        </Link>

        <Link href="/blog">
          <a>Blog</a>
        </Link>

        <Link href="/works">
          <a>Works</a>
        </Link>

        {children}
      </Box>

      <Footer />
    </Stack>
  )
}
