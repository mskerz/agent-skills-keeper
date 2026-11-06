"use client"

import Image from 'next/image'
import React from 'react'

import { LOGO_SYSTEM } from "@/constants/app"

function ThemeLogo() {
  return (
    <div className="relative w-25">
      <Image
        src={LOGO_SYSTEM.light.app}
        alt="Skills Keeper Logo"
        width={100}
        height={25}
        priority
        className="h-full w-full dark:hidden"
      />

      <Image
        src={LOGO_SYSTEM.dark.app}
        alt="Skills Keeper Logo"
        width={100}
        height={25}
        priority
        className="hidden h-full w-full dark:block"
      />
    </div>
  )
}

export default ThemeLogo
