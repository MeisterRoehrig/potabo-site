import type { TestimonialBlock as TestimonialBlockProps } from '@/payload-types'
import TestimonialCarousel from './Testimonial.client'

type CleanTestimonial = { quote: string; monthPublished: string }

function sanitizeTestimonials(list: TestimonialBlockProps['testimonials']): CleanTestimonial[] {
  if (!list) return []
  return list
    .filter((t): t is { quote: string; monthPublished: string } =>
      Boolean(t?.quote && t?.monthPublished),
    )
    .map((t) => ({
      quote: t.quote as string,
      monthPublished: t.monthPublished as string,
    }))
}

export const TestimonialBlock = ({ testimonials, title, description }: TestimonialBlockProps) => {
  const clean = sanitizeTestimonials(testimonials)

  return (
    <section className="py-32 w-full">
      <TestimonialCarousel testimonials={clean} title={title} description={description} />
    </section>
  )
}
