"use client"

import Image from 'next/image'
import React from 'react'
import logoDark from '../../../../public/skill-keeper-dark.svg'
import logoLight from '../../../../public/skill-keeper-light.svg'
import { useTheme } from 'next-themes'

function ThemeLogo() {

  
  return (
    <div className="relative w-40 ">
      <Image
        src={logoLight}
        alt="Skills Keeper Logo"
        preload
        className="h-full w-full dark:hidden"
      />

      <Image
        src={logoDark}
        alt="Skills Keeper Logo"
        preload
        className="hidden h-full w-full dark:block"
      />
    </div>
  )
}

export default ThemeLogo
