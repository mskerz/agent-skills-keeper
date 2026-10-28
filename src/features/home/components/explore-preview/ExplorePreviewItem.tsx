import Link from 'next/link'
import { CodeXml } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { PreviewSkillItem } from '../../types/content'

interface ExplorePreviewProps extends BaseProps {
  item: PreviewSkillItem
}

// ซ่อน/แสดงตอน hover หรือ focus ที่การ์ด และบนจอสัมผัส (ไม่มี hover) ให้เห็นปุ่ม Copy ตลอด
const showOnActive =
  'opacity-0 group-hover/card:opacity-100 group-focus-within/card:opacity-100 pointer-coarse:opacity-100'
const hideOnActive =
  'group-hover/card:opacity-0 group-focus-within/card:opacity-0 pointer-coarse:opacity-0'

export default function ExplorePreviewItem({ item, className }: ExplorePreviewProps) {
  const { title, description, tags = [], fileCount } = item

  return (
    <Card
      className={cn(
        'border-2 border-border/60 transition-colors hover:border-primary/50   focus-within:border-primary/50',
        className
      )}
    >
      {/* ไอคอน + ป้าย Featured */}
      <CardContent className="flex items-start justify-between">
        <div
          aria-hidden
          className="flex size-8 items-center justify-center rounded-lg bg-secondary text-primary"
        >
          <CodeXml className="size-4" />
        </div>
        <Badge className="bg-primary/15 text-primary">Featured</Badge>
      </CardContent>

      {/* ชื่อ + คำอธิบาย (ตัดที่ 2 บรรทัด) */}
      <CardHeader>
        <CardTitle>
          <h3>{title}</h3>
        </CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>

      {/* แท็ก */}
      {tags.length > 0 && (
        <CardContent className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal text-muted-foreground">
              {tag}
            </Badge>
          ))}
        </CardContent>
      )}

      {/* สถานะ + จำนวนไฟล์ (เปลี่ยนเป็นปุ่ม Copy เมื่อ hover) */}
      <CardFooter className="  justify-between bg-transparent py-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-1.5 rounded-full bg-primary" />
          Public
        </span>

        <div className="relative flex h-6 items-center justify-end">
          {fileCount !== undefined && (
            <span className={cn('transition-opacity', hideOnActive)}>
              {fileCount} {fileCount === 1 ? 'file' : 'files'}
            </span>
          )}
          <Button
            size="xs"
            className={cn('absolute right-0 transition-opacity', showOnActive)}
            aria-label={`Copy ${title} to my skills`}
            nativeButton={false}
            render={<Link href="/auth/login" />}
          >
            Copy
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
