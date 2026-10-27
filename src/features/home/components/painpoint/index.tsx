import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ContentItem } from '../../types/content'

const painPoints  :ContentItem[] = [
  {
    id: 1,
    title: 'Scattered everywhere',
    description: 'Your skills live in apps, folders and scratch files.',
  },
  {
    id: 2,
    title: 'No way to share',
    description: 'Sharing means downloading a file and sending it by hand.',
  },
  {
    id: 3,
    title: 'Hard to reuse',
    description: "Found a great skill? You can't just make it yours.",
  },
] 

export default function PainPointSection() {
  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="pain-point-heading"
    >
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Heading */}
        <h2
          id="pain-point-heading"
          className="text-3xl font-semibold tracking-tight leading-tight md:text-[56px]"
        >
          Your skills deserve a home.
        </h2>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {painPoints.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}