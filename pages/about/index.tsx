import { Auth } from '@/components/common'
import { MainLayout } from '@/components/layout'
import { useAuth } from '@/hooks'
import { useRouter } from 'next/router'
import React from 'react'

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
  const router = useRouter()
  const { profile, logout } = useAuth()

  const handleLogoutClick = async () => {
    try {
      await logout()
      router.push('/login')
    } catch (error) {
      console.log('Failed to logout ', error)
    }
  }

  return (
    <Auth>
      <h1>About Page</h1>

      <div>
        <button onClick={handleLogoutClick}>Logout</button>
      </div>
    </Auth>
  )
}

AboutPage.Layout = MainLayout
