import { FeatureWorks, HeroSection, RecentPosts } from '@/components/common/home'
import { Seo } from '@/components/common/seo'
import { MainLayout } from '@/components/layout'
import { NextPageWithLayout } from '@/models'
import { Box } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPageWithLayout = () => {
  return (
    <Box>
      <Seo
        data={{
          title: 'NextJS Blog',
          description: 'Create a blog page with NextJS',
          url: 'https://nextjs-project-post.vercel.app/',
          thumbnailUrl:
            'https://images.velog.io/images/bigbrothershin/post/c375d3e6-21db-4fa6-9a2a-0c0c66819adf/nextjs%20image.jpeg'
        }}
      />

      <HeroSection />
      <RecentPosts />
      <FeatureWorks />
    </Box>
  )
}

Home.Layout = MainLayout

export default Home
