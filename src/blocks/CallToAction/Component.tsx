import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button' // added

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="bg-muted flex w-full flex-col overflow-hidden rounded-lg md:rounded-xl lg:flex-row lg:items-center">
          <div className="w-full shrink-0 self-stretch lg:w-1/2">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
              alt="placeholder hero"
              className="aspect-3/2 w-full rounded-t-md object-cover md:rounded-l-md md:rounded-t-none"
            />
          </div>
          <div className="w-full shrink-0 px-4 py-6 md:p-8 lg:w-1/2 lg:px-16">
            <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              Wir sind für Sie da
            </h3>
            {richText ? (
              <div className="mb-8 lg:text-lg">
                <RichText className="mb-0" data={richText} enableGutter={false} />
              </div>
            ) : (
              <p className="text-muted-foreground mb-8 lg:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia
                fugiat omnis! Porro facilis quo animi consequatur. Explicabo.
              </p>
            )}
            <div className="flex flex-col gap-4">
              {(links || []).length > 0 ? (
                (links || []).map(({ link }, i) => <CMSLink key={i} size="lg" {...link} />)
              ) : (
                <Button size="lg">Get Started</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
