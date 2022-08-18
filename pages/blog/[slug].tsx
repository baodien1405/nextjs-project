import { Post } from '@/models'
import { getPostList } from '@/utils/posts'
import { Container, Divider } from '@mui/material'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import rehypeDocument from 'rehype-document'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkToc from 'remark-toc'
import { unified } from 'unified'

export interface BlogPageProps {
  post: Post
}

export default function PostDetailPage({ post }: BlogPageProps) {
  if (!post) return null

  return (
    <Container>
      <h1>Post Detail Page</h1>

      <p>{post.title}</p>
      <p>{post.author?.name}</p>
      <p>{post.description}</p>

      <Divider />

      <div dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}></div>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postList = await getPostList()

  return {
    paths: postList.map((post: Post) => ({ params: { slug: post.slug } })),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async (
  context: GetStaticPropsContext
) => {
  const slug = context.params?.slug
  if (!slug) return { notFound: true }

  const postList = await getPostList()
  const post = postList.find((post) => post.slug === slug)
  if (!post) return { notFound: true }

  // parse md to html
  const file = await unified()
    .use(remarkParse)
    .use(remarkToc, { heading: 'agenda.*' })
    .use(remarkRehype)
    .use(rehypeDocument, { title: 'Blog details page' })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(post.mdContent || '')

  post.htmlContent = file.toString()

  return {
    props: {
      post
    }
  }
}
