import { MainLayout } from '@/components/layout'
import { NextPageWithLayout } from '@/models'
import { Box } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPageWithLayout = () => {
  return <Box>Home Page</Box>
}

Home.Layout = MainLayout

export default Home
