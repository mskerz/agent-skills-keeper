import React from 'react'
import { Button } from '@/components/ui/button'
import { connection } from 'next/server'
import Link from 'next/link'
import { getUser } from '@/features/auth/services'

export default async function UserNavigator() {
  await connection()
  const state = await getUser()

  return (
    <div className="flex items-center gap-4">
      {state.isLoggedIn ? (
        <Button variant="ghost" className="font-sans" render={<Link href="/app" />}>
          ไปยังแอป
        </Button>
      ) : (
        <>
          <Button
            variant="ghost"
            render={<Link href="/auth/login" />}
          >
            Sign in
          </Button>
          <Button
            size="lg"
            className="rounded-md px-3"
            render={<Link href="/auth/register" />}
          >
            Get Started
          </Button>
        </>
      )}
    </div>
  )
}
