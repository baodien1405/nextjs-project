import { Box, Button, Chip, Container, Stack, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import sanitizeHtml from 'sanitize-html'

import { MainLayout } from '@/components/layout'
import { Work } from '@/models'
import { useAuth } from '@/hooks'
import { path } from '@/constants'

export interface WorkPageProps {
  work: Work
}

export default function WorkDetailsPage({ work }: WorkPageProps) {
  const router = useRouter()
  const { isLoggedIn } = useAuth()

  if (router.isFallback) {
    return <div style={{ fontSize: '2rem', textAlign: 'center' }}>Loading...</div>
  }

  if (!work) return null

  return (
    <Box>
      <Container>
        <Stack mb={4} mt={8} direction="row" justifyContent="space-between" alignItems="center">
          <Typography component="h1" variant="h3" fontWeight="bold">
            {work.title}
          </Typography>

          {isLoggedIn && (
            <Button
              variant="contained"
              size="small"
              sx={{ fontSize: '18px' }}
              onClick={() => router.push(`${path.works}/${work.id}`)}
            >
              Edit
            </Button>
          )}
        </Stack>

        <Stack direction="row" alignItems="center" my={2}>
          <Chip
            size="small"
            label={new Date(Number(work.createdAt)).getFullYear()}
            color="primary"
          />
          <Typography ml={3} variant="body1" color="GrayText">
            {work.tagList.join(', ')}
          </Typography>
        </Stack>

        <Typography>{work.shortDescription}</Typography>

        <Box
          component="div"
          dangerouslySetInnerHTML={{ __html: work.fullDescription }}
          sx={{
            img: {
              maxWidth: '100%'
            }
          }}
        />
      </Container>
    </Box>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.API_URL}/api/works?_page=1&_limit=3`)
  const data = await response.json()

  return {
    paths: data.data.map((work: any) => ({ params: { workId: work.id } })),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<WorkPageProps> = async (
  context: GetStaticPropsContext
) => {
  const workId = context.params?.workId
  if (!workId) return { notFound: true }

  const response = await fetch(`${process.env.API_URL}/api/works/${workId}`)
  const data = await response.json()

  // sanitize HTML
  data.fullDescription = sanitizeHtml(data.fullDescription, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
  })

  return {
    props: {
      work: data
    },
    revalidate: 300 // 300s
  }
}

WorkDetailsPage.Layout = MainLayout
