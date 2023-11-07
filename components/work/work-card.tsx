import { Box, Chip, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

import { path } from '@/constants'
import { Work } from '@/models'
export interface WorkCardProps {
  work: Work
}

export function WorkCard({ work }: WorkCardProps) {
  return (
    <Link href={`${path.works}/${work.id}/details`} passHref>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ cursor: 'pointer' }}>
        <Box width={{ xs: '100%', md: '246px' }} flexShrink={0}>
          <Image
            src={work.thumbnailUrl}
            width={246}
            height={180}
            layout="responsive"
            alt="work thumbnail"
          />
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold">
            {work.title}
          </Typography>

          <Stack direction="row" alignItems="center" my={2}>
            <Chip
              size="small"
              label={new Date(Number(work.createdAt)).getFullYear()}
              color="secondary"
            />
            <Typography ml={3} variant="body1" color="GrayText">
              {work.tagList.join(', ')}
            </Typography>
          </Stack>

          <Typography>{work.shortDescription}</Typography>
        </Box>
      </Stack>
    </Link>
  )
}
