import { useAuth } from '@/hooks'
import { LayoutProps } from '@/models'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Auth } from '../common'

export function AdminLayout({ children }: LayoutProps) {
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
      <h1>Admin Layout</h1>
      <div>Side bar</div>

      <p>Profile: {JSON.stringify(profile)}</p>

      <div>
        <button onClick={handleLogoutClick}>Logout</button>
      </div>

      <Link href="/">
        <a>Home</a>
      </Link>

      <Link href="/about">
        <a>About</a>
      </Link>

      <div>{children}</div>
    </Auth>
  )
}
