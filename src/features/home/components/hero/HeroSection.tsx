'use client'
import Container from '@/components/layouts/Container'
import { Button } from '@/components/ui/button'
import React from 'react'
import SkillPreview from './SkillPreview'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden" aria-label="Hero section">
      <div className="container mx-auto px-4 py-16 md:py-28 flex flex-col md:flex-row items-center gap-12 md:gap-16">

        {/* ── Left: copy ── */}
        <div className="flex-1 min-w-0 text-left">
          <>
            {/* Heading */}
            <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-[56px] leading-tight">
              Keep every agent skill in one place.
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-md text-base md:text-lg text-muted-foreground">
              A dedicated vault to save, manage, and share your agent skills—privately or with the world.
            </p>

            {/* CTA */}
            <div className="mt-8 flex items-center gap-3">
              <Button className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Get Started
              </Button>
              <Button variant="ghost" className="px-6 py-3 text-sm font-medium">
                Explore Skills
              </Button>
            </div>
          </>
        </div>

        {/* ── Right: skill preview ── */}
        <div className="w-full md:w-auto flex justify-center md:justify-end select-none">
          <SkillPreview />
        </div>

      </div>
    </section>
  )
}
