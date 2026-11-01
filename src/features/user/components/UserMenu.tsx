import React from 'react'

import { Button } from '@/components/ui/button';
import { connection } from 'next/server';
import UserDropdown from './UserDropdown';
import Link from 'next/link';
import { getUser } from '@/features/auth/services';

export default async function UserMenu() {
  await connection();
  const state = await getUser();

  return (
    <div className='flex items-center gap-4'>
      {state.isLoggedIn  ? (
        <UserDropdown user={state.profile} email={state.user.email} />
      ) : (
        <>
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href="/auth/login" />}
          >
            Sign in
          </Button>
          <Button
            size="lg"
            className="rounded-md px-3"
            nativeButton={false}
            render={<Link href="/auth/register" />}
          >
            Get Started
          </Button>
        </>
      )}
    </div>
  );
}
