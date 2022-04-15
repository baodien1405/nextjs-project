import { Work } from '@/models'
import { Box, Chip, Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import Image from 'next/image'
import React from 'react'

export interface WorkItemProps {
  work: Work
}

export function WorkItem({ work }: WorkItemProps) {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent={{ xs: 'center', md: 'flex-start' }}
      spacing={4}
    >
      <Image src={work.thumbnailUrl} priority width={400} height={320} alt={work.title} />

      <Stack direction="column">
        <Typography variant="h5" fontWeight="bold" mb={2}>
          {work.title}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={3} mb={2}>
          <Chip
            size="small"
            label={
              <Typography fontWeight="bold">{format(Number(work.createdAt), 'yyyy')}</Typography>
            }
            color="info"
          />
          <Typography variant="body1" color="primary.light">
            {work.tagList.join('')}
          </Typography>
        </Stack>
        <Typography>{work.shortDescription}</Typography>
      </Stack>
    </Stack>
  )
}
