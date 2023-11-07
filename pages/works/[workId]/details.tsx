import { Box, Container, Typography } from '@mui/material'
import { MainLayout } from '@/components/layout'

export default function WorkDetailsPage() {
  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component="h1" variant="h3" fontWeight="bold">
            Work Details Page
          </Typography>
        </Box>

        <Box>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, ratione corporis ea dolor
          cupiditate debitis ullam! Labore fuga distinctio eveniet, modi dignissimos quaerat, rem
          repellendus saepe autem ducimus blanditiis sit.
        </Box>
      </Container>
    </Box>
  )
}

WorkDetailsPage.Layout = MainLayout
