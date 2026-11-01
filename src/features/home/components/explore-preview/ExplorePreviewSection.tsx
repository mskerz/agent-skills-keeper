import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ExplorePreviewItem from './ExplorePreviewItem'
import { PreviewSkillItem } from '../../types/content'
import { HOME_SECTIONS } from '../../constants/sections'
import { cn } from '@/lib/utils'
import ScreenSection from '../common/ScreenSection'
 

const skills: PreviewSkillItem[] = [
    {
        id: 1,
        title: 'code-review',
        description: 'Reviews pull requests for bugs and style.',
        tags: ['Code', 'Review'],
        fileCount: 3,
    },
    {
        id: 2,
        title: 'commit-message',
        description: 'Writes clear commits from your staged diff.',
        tags: ['Git'],
        fileCount: 1,
    },
    {
        id: 3,
        title: 'sql-tuner',
        description: 'Explains slow queries and suggests indexes.',
        tags: ['Data', 'SQL'],
        fileCount: 2,
    },
]

export default function ExplorePreviewSection({ id = HOME_SECTIONS.explore.id, className }: BaseProps) {
    return (
        <ScreenSection
            id={id} className={cn("relative overflow-hidden",className)}
            aria-labelledby="explore-preview-heading"
        >
            <div className="container mx-auto px-4">
                {/* Heading */}
                <div className="flex flex-col gap-4 py-2 md:flex-row md:items-start md:justify-between">
                    <div>
                        <h2
                            id="explore-preview-heading"
                            className="text-3xl font-semibold tracking-tight leading-tight md:text-[56px]"
                        >
                            See what others share.
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            Browse public skills, and copy any into your own library.
                        </p>
                    </div>

                    <Button
                        variant="secondary"
                        size="lg"
                        nativeButton={false}
                        render={<Link href="/auth/login" />}
                        className="shrink-0 self-start sm:self-auto px-3 py-2"
                    >
                        <span className="text-lg">Browse All</span>
                        <ArrowRight className="size-4" />
                    </Button>
                </div>

                {/* Skill cards grid */}
                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {skills.map((item) => (
                        <ExplorePreviewItem key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </ScreenSection>
    )
}
