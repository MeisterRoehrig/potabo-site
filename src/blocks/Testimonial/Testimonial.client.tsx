'use client'
import React, { useEffect, useState } from 'react'
import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

type Props = {
  testimonials: { quote: string; monthPublished: string }[]
  title: string
  description: string
}

export default function TestimonialCarousel({ testimonials, title, description }: Props) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on('select', () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  return (
    <>
      <Carousel setApi={setApi}>
        <div className="text-center">
          <h1 className="mt-4 text-4xl font-semibold">{title}</h1>
          <p className="mt-6 font-medium text-muted-foreground max-w-4xl mx-auto">{description}</p>
        </div>
        <CarouselContent className="mt-4 ">
          {testimonials.map(({ quote, monthPublished }, index) => {
            const displayDate = format(new Date(monthPublished), 'MMMM yyyy', { locale: de })

            return (
              <CarouselItem
                key={index}
                className="basis-full shrink-0 flex justify-center items-center px-4 md:px-8 cursor-pointer select-none"
              >
                <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
                  <p className="mb-8 font-medium md:px-8 lg:text-3xl">&ldquo;{quote}&rdquo;</p>
                  <p className="mb-1 text-sm font-medium md:text-lg">{displayDate}</p>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>

      {/* dots */}
      <div className="container flex justify-center py-16">
        {testimonials.map((_, index) => (
          <Button key={index} variant="ghost" size="sm" onClick={() => api?.scrollTo(index)}>
            <div
              className={`size-2.5 rounded-full ${index === current ? 'bg-primary' : 'bg-input'}`}
            />
          </Button>
        ))}
      </div>
    </>
  )
}
