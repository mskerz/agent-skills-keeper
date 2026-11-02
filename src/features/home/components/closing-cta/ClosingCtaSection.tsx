import React from 'react'
import ScreenSection from '../common/ScreenSection'
import { HOME_SECTIONS } from '../../constants/sections'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ClosingCtaSection({ id = HOME_SECTIONS.closing_cta.id, className }: BaseProps) {
    return (
        <ScreenSection id={id} className={className} aria-labelledby="closing-cta-heading">
            <div className="container mx-auto px-4">
                <div className="relative overflow-hidden rounded-[20px] border bg-card/50 px-6 py-24 text-center md:py-32">
                    {/* 1) พื้นลายจุด: ตรงกลางจางหาย เห็นชัดที่ขอบ เพื่อไม่ให้รบกวนข้อความ */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_at_center,transparent_30%,black_85%)]"
                    />

                    {/* 2) แสงเขียวจางๆ ตรงกลาง */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
                    />
                    {/* 3 Main Content */}
                    <div className="relative flex flex-col items-center">
                        <h2
                            id="closing-cta-heading"
                            className="max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
                        >
                            Ready to keep your skills?
                        </h2>
                        <p className="mt-4 max-w-md text-muted-foreground">
                            Create an account and bring every agent skill into one place.
                        </p>

                        <Button
                            className="mt-8 h-11 rounded-md px-6 text-sm font-medium"
                            nativeButton={false}
                            render={<Link href="/auth/register" />}
                        >
                            Get Started
                        </Button>
                    </div>
                </div>
            </div>


        </ScreenSection>
    )
}
