import { Box, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { MainLayout } from '@/components/layout'
import { useWorkDetails } from '@/hooks'
import { WorkForm } from '@/components/work'
import { WorkPayload } from '@/models'

export default function AddEditWorkPage() {
  const router = useRouter()
  const { workId } = router.query
  const isAddMode = workId === 'add'

  const { data: workDetails, isLoading } = useWorkDetails({
    workId: workId as string,
    enabled: router.isReady && !isAddMode
  })

  const handleAddEditForm = (payload: Partial<WorkPayload>) => {
    console.log('🚀 ~ handleAddEditForm ~ payload:', payload)
  }

  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component="h1" variant="h3" fontWeight="bold">
            {isAddMode ? 'Add new work' : `Edit work #${workId}`}
          </Typography>
        </Box>

        <Box>
          {(isAddMode || Boolean(workDetails)) && (
            <WorkForm initialValues={workDetails} onSubmit={handleAddEditForm} />
          )}
        </Box>
      </Container>
    </Box>
  )
}

AddEditWorkPage.Layout = MainLayout
