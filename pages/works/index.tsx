import { Box, Container, Pagination, Stack, Typography } from '@mui/material'
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
    search: filters.title_like || ''
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
          title_like: newFilters.search
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

        {router.isReady && (
          <WorkFilters initialValues={initFiltersPayload} onSubmit={handleFiltersChange} />
        )}

        <WorkList workList={data?.data || []} loading={isLoading} />

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
