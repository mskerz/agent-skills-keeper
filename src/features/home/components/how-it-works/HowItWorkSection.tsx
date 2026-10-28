import HowItWorkItem from './HowItWorkItem'
import { ContentItem } from '../../types/content'
import { HOME_SECTIONS } from '../../constants/sections'
import { cn } from '@/lib/utils'
import ScreenSection from '../common/ScreenSection'

const items: ContentItem[] = [
  {
    id: 1,
    title: 'Create',
    description: 'Write a SKILL.md, describe it to AI, or import one you already have.',
  },
  {
    id: 2,
    title: 'Keep',
    description: 'One library for all your skills, with their files attached.',
  },
  {
    id: 3,
    title: 'Share',
    description: 'Send a link. Others can preview, copy or download it as a zip.',
  },
]

export default function HowItWorkSection({id=HOME_SECTIONS.howItWorks.id,className}:BaseProps) {
  return (
    <ScreenSection
      id={id}
      className={cn('relative overflow-hidden', className)}
      aria-labelledby="how-it-works-heading"
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="py-2">
          <h2
            
            className="text-3xl font-semibold tracking-tight leading-tight md:text-[56px]"
          >
            Make it. Keep it. Share it.
          </h2>
          <p className="mt-4 text-muted-foreground">
            From a blank file to a skill anyone can open.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((item) => (
            <HowItWorkItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </ScreenSection>
  )
}
