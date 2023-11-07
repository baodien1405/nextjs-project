import { Box, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { toast } from 'react-toastify'

import { MainLayout } from '@/components/layout'
import { useWorkAdd, useWorkDetails } from '@/hooks'
import { WorkForm } from '@/components/work'
import { getErrorMessage } from '@/utils'

export default function AddEditWorkPage() {
  const router = useRouter()
  const { workId } = router.query
  const isAddMode = workId === 'add'

  const { data: workDetails, updateWork } = useWorkDetails({
    workId: workId as string,
    enabled: router.isReady && !isAddMode
  })

  const addNewWork = useWorkAdd()

  const handleSubmit = async (payload: FormData) => {
    try {
      let newWork = null
      if (isAddMode) {
        newWork = await addNewWork(payload)
        toast.success(`Add work successfully, ${newWork?.id}`)
      } else {
        newWork = await updateWork(payload)
        toast.success('Update work successfully')
      }

      router.push('/works?_page=1&_limit=3')
    } catch (error) {
      const message = getErrorMessage(error)
      toast.error(message)
    }
  }

  if (!router.isReady) return null

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
AddEditWorkPage.requireLogin = true
