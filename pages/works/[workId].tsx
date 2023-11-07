import { Box, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { toast } from 'react-toastify'

import { MainLayout } from '@/components/layout'
import { useWorkDetails } from '@/hooks'
import { WorkForm } from '@/components/work'

export default function AddEditWorkPage() {
  const router = useRouter()
  const { workId } = router.query
  const isAddMode = workId === 'add'

  const { data: workDetails, updateWork } = useWorkDetails({
    workId: workId as string,
    enabled: router.isReady && !isAddMode
  })

  const handleSubmit = async (payload: FormData) => {
    try {
      await updateWork(payload)
      toast.success('Update work successfully')
    } catch (error) {
      console.log(error)
    }
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
            <WorkForm initialValues={workDetails} onSubmit={handleSubmit} />
          )}
        </Box>
      </Container>

      <Script src="https://widget.cloudinary.com/v2.0/global/all.js" strategy="afterInteractive" />
    </Box>
  )
}

AddEditWorkPage.Layout = MainLayout
