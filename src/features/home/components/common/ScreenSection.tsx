import { cn } from '@/lib/utils'
import SectionWrapper from './SectionWrapper'

interface ScreenSectionProps extends ReactNodeProps {
  'aria-label'?: string
  'aria-labelledby'?: string
}

export default function ScreenSection({ id, className, children, ...aria }: ScreenSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'flex min-h-[calc(100svh-4rem)] snap-start snap-always flex-col justify-center',
        className
      )}
      {...aria}
    >
      {/* ระยะห่างบน-ล่างของทุก section อยู่ที่ SectionWrapper ที่เดียว */}
      <SectionWrapper>{children}</SectionWrapper>
    </section>
  )
}