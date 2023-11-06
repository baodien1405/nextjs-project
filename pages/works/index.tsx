import { Box, Container, Pagination, Skeleton, Stack, Typography } from '@mui/material'
import { ChangeEvent } from 'react'

import { MainLayout } from '@/components/layout'
import { useWorkList } from '@/hooks'
import { ListParams, WorkFiltersPayload } from '@/models'
import { WorkFilters, WorkList } from '@/components/work'
import { useRouter } from 'next/router'

export default function WorksPage() {
  const router = useRouter()
  const filters: Partial<ListParams> = {
    _page: 1,
    _limit: 3,
    ...router.query
  }
  const initFiltersPayload: WorkFiltersPayload = {
    search: filters.title_like || '',
    selectedTagList: filters.tagList_like?.split('|') || []
  }

  const { data, isLoading } = useWorkList({ params: filters, enabled: router.isReady })

  const { _page, _limit, _totalRows } = data?.pagination || {}
  const totalPages = Boolean(_totalRows) ? Math.ceil(_totalRows / _limit) : 0

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...filters,
          _page: value
        }
      },
      undefined,
      {
        shallow: true
      }
    )
  }

  const handleFiltersChange = (newFilters: WorkFiltersPayload) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...filters,
          _page: 1,
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

        <WorkList workList={data?.data || []} loading={!router.isReady || isLoading} />

        {totalPages > 0 && (
          <Stack alignItems="center">
            <Pagination count={totalPages} page={_page} onChange={handlePageChange} />
          </Stack>
        )}
      </Container>
    </Box>
  )
}

WorksPage.Layout = MainLayout
