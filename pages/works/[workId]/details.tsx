import { Box, Chip, Container, Stack, Typography } from '@mui/material'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'

import { MainLayout } from '@/components/layout'
import { Work } from '@/models'

export interface WorkPageProps {
  work: Work
}

export default function WorkDetailsPage({ work }: WorkPageProps) {
  console.log('🚀 ~ WorkDetailsPage ~ work:', work)
  const router = useRouter()

  if (router.isFallback) {
    return <div style={{ fontSize: '2rem', textAlign: 'center' }}>Loading...</div>
  }

  if (!work) return null

  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component="h1" variant="h3" fontWeight="bold">
            Work Details Page
          </Typography>
        </Box>

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

  return {
    props: {
      work: data
    },
    revalidate: 300 // 300s
  }
}

WorkDetailsPage.Layout = MainLayout
