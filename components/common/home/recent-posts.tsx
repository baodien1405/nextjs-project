import { Post } from '@/models'
import { Box, Container, Stack, Typography, Link as MuiLink } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { PostCard } from './post-card'

export function RecentPosts() {
  const postList: Array<Post> = [
    {
      id: '1',
      title: 'Making a design system from scratch',
      publishedDate: '2022-06-23T10:00:00Z',
      tagList: ['Design', 'Pattern'],
      slug: '',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
    },
    {
      id: '2',
      title: 'Creating pixel perfect icons in Figma',
      publishedDate: '2022-06-24T10:00:00Z',
      tagList: ['Figma', 'Icon Design'],
      slug: '',
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
    }
  ]

  return (
    <Box component="section" bgcolor="secondary.light" pt={2} pb={4}>
      <Container>
        <Stack
          direction="row"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5">Recent posts</Typography>
          <Link href="/blog" passHref>
            <MuiLink sx={{ display: { xs: 'none', md: 'inline' } }}>View all</MuiLink>
          </Link>
        </Stack>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          sx={{
            '& > div': {
              width: {
                xs: '100%',
                md: '50%'
              }
            }
          }}
        >
          {postList.map((post: Post) => (
            <Box key={post.id}>
              <PostCard post={post} />
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
