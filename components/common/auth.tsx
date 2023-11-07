import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { path } from '@/constants'
import { useAuth } from '@/hooks'
import { Spinner } from './spinner'

export interface AuthProps {
  children: any
  requireLogin?: boolean
}

export function Auth({ children, requireLogin = false }: AuthProps) {
  const router = useRouter()
  const { profile, firstLoading } = useAuth()

  useEffect(() => {
    // do nothing if not require login
    if (!requireLogin) return

    if (!firstLoading && !profile?.username) router.replace(path.login)
  }, [profile, firstLoading, router, requireLogin])

  if (requireLogin && !profile?.username) return <Spinner />

  return <div>{children}</div>
}
