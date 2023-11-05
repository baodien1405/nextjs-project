import { Fragment } from 'react'
import Image from 'next/image'
import { Box, Divider, Typography } from '@mui/material'

import { Work } from '@/models'
import { WorkCard } from './work-card'
import { WorkSkeleton } from './work-skeleton'

export interface WorkListProps {
  workList: Array<Work>
  loading?: boolean
}

export function WorkList({ workList, loading }: WorkListProps) {
  if (loading) {
    return (
      <Box>
        {Array.from({ length: 3 }).map((_, index) => (
          <Fragment key={index}>
            <WorkSkeleton />

            <Divider sx={{ my: 3 }} />
          </Fragment>
        ))}
      </Box>
    )
  }

  if (workList.length === 0) {
    return (
      <Box textAlign="center" mt={6}>
        <Image
          src={
            'https://res.cloudinary.com/dktajq8sb/image/upload/v1698912492/nextjs-blog/data-not-found_afmnmk.jpg'
          }
          width={150}
          height={150}
          layout="fixed"
          alt="no data"
        />

        <Typography>No data</Typography>
      </Box>
    )
  }

  return (
    <Box>
      {workList.map((work) => (
        <Fragment key={work.id}>
          <WorkCard work={work} />

          <Divider sx={{ my: 3 }} />
        </Fragment>
      ))}
    </Box>
  )
}
