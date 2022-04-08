import { authApi } from '@/components/api-client'
import React from 'react'

export default function LoginPage() {
  const handleLoginClick = async () => {
    try {
      await authApi.login({
        username: 'test1',
        password: '121qwe'
      })
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
      await authApi.logout()
    } catch (error) {
      console.log('Failed to logout ', error)
    }
  }

  return (
    <div>
      <h1>Login Page</h1>

      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleGetProfileClick}>Get Profile</button>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  )
}
