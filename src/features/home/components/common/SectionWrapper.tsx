import { cn } from '@/lib/utils'

export default function SectionWrapper({ children, className }: ReactNodeProps) {
  return <div className={cn('py-14 md:py-24', className)}>{children}</div>
}