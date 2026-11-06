"use client"
import React from 'react'

import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/input-group'
import { SearchIcon } from 'lucide-react'
import { Kbd } from '@/components/ui/kbd'

export default function SkillsSearchBar() {
  return (
    <div className="relative w-full max-w-sm">
        {/* Input field for searching skills */}
      <InputGroup>
        <InputGroupInput  id="inline-start-input" placeholder="Search skills..." />
        <InputGroupAddon align="inline-start">
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd className='bg-secondary'>Ctrl K</Kbd>
        </InputGroupAddon>
      </InputGroup>

    </div>
  )
}
