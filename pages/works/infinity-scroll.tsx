import { Box, Button, CircularProgress, Container, Skeleton, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useInView } from 'react-intersection-observer'

import { MainLayout } from '@/components/layout'
import { WorkFilters, WorkList } from '@/components/work'
import { useWorkListInfinity } from '@/hooks'
import { ListParams, ListResponse, Work, WorkFiltersPayload } from '@/models'

export default function WorksPage() {
  const router = useRouter()
  const filters: Partial<ListParams> = {
    ...router.query
  }

  const initFiltersPayload: WorkFiltersPayload = {
    search: filters.title_like || '',
    selectedTagList: filters.tagList_like?.split('|') || []
  }

  const { data, isLoading, isValidating, size, setSize } = useWorkListInfinity({
    params: filters,
    enabled: router.isReady,
    options: {
      revalidateOnFocus: false
    }
  })

  const { ref } = useInView({
    onChange(inView) {
      if (inView) setSize((x) => x + 1)
    }
  })

  const workList: Array<Work> =
    data?.reduce((result: Array<Work>, currentPage: ListResponse<Work>) => {
      result.push(...currentPage.data)

      return result
    }, []) || []

  const totalRows = data?.[0]?.pagination?._totalRows || 0
  const showLoadMore = totalRows > workList.length
  const loadingMore = isValidating && workList.length > 0

  const handleFiltersChange = (newFilters: WorkFiltersPayload) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...filters,
          title_like: newFilters.search,
          tagList_like: newFilters.tagList_like
        }
      },
      undefined,
      {
        shallow: true
      }
    )
  }

  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component="h1" variant="h3" fontWeight="bold">
            Work
          </Typography>
        </Box>

        {router.isReady ? (
          <WorkFilters initialValues={initFiltersPayload} onSubmit={handleFiltersChange} />
        ) : (
          <Skeleton
            variant="rectangular"
            height={40}
            sx={{ display: 'inline-block', width: '100%', mt: 2, mb: 1, verticalAlign: 'middle' }}
          />
        )}

        <WorkList workList={workList} loading={!router.isReady || isLoading} />

        {showLoadMore && (
          <Box textAlign="center">
            <Button
              ref={ref}
              variant="contained"
              onClick={() => setSize((x) => x + 1)}
              disabled={loadingMore}
            >
              Load more {loadingMore && <CircularProgress size={24} />}
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  )
}

WorksPage.Layout = MainLayout
