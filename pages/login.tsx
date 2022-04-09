import { authApi } from '@/components/api-client'
import { useAuth } from '@/hooks'
import React from 'react'

export default function LoginPage() {
  const { profile, login, logout } = useAuth({
    revalidateOnMount: false
  })

  const handleLoginClick = async () => {
    try {
      await login()
      console.log('redirect to dashboard')
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

  return (
    <div>
      <h1>Login Page</h1>

      <p>Profile: {JSON.stringify(profile || {}, null, 4)}</p>

      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleGetProfileClick}>Get Profile</button>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  )
}
