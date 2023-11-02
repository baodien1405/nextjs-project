import { Stack, Box } from '@mui/material'
import dynamic from 'next/dynamic'

import { LayoutProps } from '@/models'
import { Footer } from '../common'

const Header = dynamic(() => import('../common/header'), { ssr: false })

export function MainLayout({ children }: LayoutProps) {
  return (
    <Stack minHeight="100vh">
      <Header />

      <Box flexGrow={1}>{children}</Box>

      <Footer />
    </Stack>
  )
}
