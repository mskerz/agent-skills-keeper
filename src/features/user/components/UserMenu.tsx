import React from 'react'
import { connection } from 'next/server'
import { getUser } from '@/features/auth/services'
import UserDropdown from './UserDropdown'

export default async function UserMenu() {
  await connection()
  const state = await getUser()

  if (!state.isLoggedIn) {
    return null
  }

  return <UserDropdown user={state.profile} email={state.user.email} />
}
