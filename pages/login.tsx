import { authApi } from '@/components/api-client'
import { useAuth } from '@/hooks'
import { useRouter } from 'next/router'
import React from 'react'

export default function LoginPage() {
  const router = useRouter()
  const { profile, login, logout } = useAuth({
    revalidateOnMount: false
  })

  const handleLoginClick = async () => {
    try {
      await login()
      router.push('/login')
    } catch (error) {
      console.log('Failed to login ', error)
    }
  }
  const handleGetProfileClick = async () => {
    try {
      const res = await authApi.getProfile()
      console.log('res: ', res)
    } catch (error) {
      console.log('Failed to login ', error)
    }
  }
  const handleLogoutClick = async () => {
    try {
      await logout()
      console.log('redirect to login page')
    } catch (error) {
      console.log('Failed to logout ', error)
    }
  }

  console.log(profile)

  return (
    <div>
      <h1>Login Page</h1>

      <p>Profile: {JSON.stringify(profile || {}, null, 4)}</p>

      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleGetProfileClick}>Get Profile</button>
      <button onClick={handleLogoutClick}>Logout</button>
      <button onClick={() => router.push('/about')}>Go to about</button>
    </div>
  )
}
