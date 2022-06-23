import { Box, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { format } from 'date-fns'
import { Post } from '@/models'

export interface PostItemProps {
  post: Post
}

export function PostItem({ post }: PostItemProps) {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold">
        {post.title}
      </Typography>

      <Stack my={2} direction="row">
        <Typography variant="body1">
          {format(new Date(post.publishedDate), 'dd MMM yyyy')}
        </Typography>

        <Divider orientation="vertical" sx={{ mx: 2 }} flexItem />

        <Typography variant="body1">{post.tagList.join(', ')}</Typography>
      </Stack>

      <Typography variant="body2">{post.description}</Typography>
    </Box>
  )
}
