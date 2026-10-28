import { ContentItem } from '../../types/content'

interface ItemProps {
  item: ContentItem
}

export default function HowItWorkItem({ item }: ItemProps) {
  return (
    <div className="flex flex-col">
      {/* เส้นบน: เส้นเทาเขียวบางเต็มความกว้าง + ขีดเขียวสั้นที่ต้นเส้น (ตกแต่งอย่างเดียว) */}
      <div aria-hidden className="relative h-0.5 w-full">
        <span className="absolute inset-x-0 top-0 h-1 bg-border" />
        <span className="absolute left-0 top-0 h-1 w-10 bg-primary" />
      </div>

      {/* เลขขั้นตอน 01, 02, 03 */}
      <span className="mt-5 select-none font-mono text-sm text-primary">
        {String(item.id).padStart(2, '0')}
      </span>

      <h3 className="mt-3 text-xl font-medium text-foreground">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
    </div>
  )
}