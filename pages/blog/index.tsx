import { GetStaticProps, GetStaticPropsContext } from 'next'
import React from 'react'
import Link from 'next/link'
import { getPostList } from '@/utils/posts'
import { Post } from '@/models'
import { MainLayout } from '@/components/layout'
import { PostItem } from '@/components/blog'
import { Box } from '@mui/system'
import { Container, Divider } from '@mui/material'

export interface BlogListPageProps {
  posts: Post[]
}

export default function BlogListPage({ posts }: BlogListPageProps) {
  return (
    <Container>
      <h1>Blog</h1>

      <Box component="ul" sx={{ p: 0, listStyleType: 'none' }}>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>
              <a>
                <PostItem post={post} />
              </a>
            </Link>

            <Divider sx={{ my: 3 }} />
          </li>
        ))}
      </Box>
    </Container>
  )
}

BlogListPage.Layout = MainLayout

export const getStaticProps: GetStaticProps<BlogListPageProps> = async () => {
  // server-side
  // build-time
  // convert markdown files into javascript object
  const postList = await getPostList()

  return {
    props: {
      posts: postList
    }
  }
}
