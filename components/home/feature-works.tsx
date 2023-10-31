import { Work } from '@/models'
import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { WorkList } from '../work'

export function FeatureWorks() {
  const workList: Array<Work> = [
    {
      id: '1',
      title: 'Making a design system from scratch',
      createdAt: '1649928430695',
      updatedAt: '1649928430695',
      tagList: ['Dashboard'],
      shortDescription:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      fullDescription: '',
      thumbnailUrl:
        'https://res.cloudinary.com/dktajq8sb/image/upload/v1693438420/airbnb-clone/biuplcgyrpsmsq8qzk9z.jpg'
    },
    {
      id: '2',
      title: 'Making a design system from scratch',
      createdAt: '1649928430695',
      updatedAt: '1649928430695',
      tagList: ['Illustration'],
      shortDescription:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      fullDescription: '',
      thumbnailUrl:
        'https://res.cloudinary.com/dktajq8sb/image/upload/v1692765881/airbnb-clone/gzwavi7yzq8h5i3cbfks.webp'
    },
    {
      id: '3',
      title: 'Making a design system from scratch',
      createdAt: '1649928430695',
      updatedAt: '1649928430695',
      tagList: ['Typography'],
      shortDescription:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      fullDescription: '',
      thumbnailUrl:
        'https://res.cloudinary.com/dktajq8sb/image/upload/v1692694222/airbnb-clone/jy1gf7lrb3jdfp8hndmj.jpg'
    }
  ]

  return (
    <Box component="section" pt={2} pb={4}>
      <Container>
        <Typography variant="h5" mb={2} textAlign={{ xs: 'center', md: 'left' }}>
          Feature works
        </Typography>

        <WorkList workList={workList} />
      </Container>
    </Box>
  )
}
