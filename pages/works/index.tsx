import { Box, Container, Pagination, Stack, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'

import { MainLayout } from '@/components/layout'
import { useWorkList } from '@/hooks'
import { ListParams } from '@/models'
import { WorkList } from '@/components/work'

export default function WorksPage() {
  const [filters, setFilters] = useState<Partial<ListParams>>({
    _page: 1,
    _limit: 3
  })
  const { data, isLoading } = useWorkList({ params: filters })

  const { _page, _limit, _totalRows } = data?.pagination || {}
  const totalPages = Boolean(_totalRows) ? Math.ceil(_totalRows / _limit) : 0

  const handlePageChange = (event: ChangeEvent<unknown>, newPage: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _page: newPage
    }))
  }

  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component="h1" variant="h3" fontWeight="bold">
            Work
          </Typography>
        </Box>

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
