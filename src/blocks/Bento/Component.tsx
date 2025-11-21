import React from 'react'

import { Media } from '@/components/Media'
import type { BentoBlock as BentoBlockProps } from '@/payload-types'

const CROSS_PATTERN_SRC =
  'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/cross-pattern.svg'

export const BentoBlock: React.FC<BentoBlockProps> = (props) => {
  const {
    title,
    description,
    headingBento1,
    descriptionBento1,
    imageBento1,
    headingBento2,
    descriptionBento2,
    imageBento2,
    headingBento3,
    descriptionBento3,
    imageBento3,
    headingBento4,
    descriptionBento4,
    imageBento4,
  } = props

  const [mutedHeading, accentHeading] = title?.split('|').map((part) => part.trim()) ?? []
  const primaryHeading = accentHeading ? mutedHeading : title

  return (
    <section className="py-32">
      <div className="container mb-24 flex flex-col items-center justify-between gap-6 lg:flex-row">
        <div className="text-3xl font-medium md:w-1/2 lg:w-3/5 lg:text-center lg:text-5xl">
          <h1 className="text-muted-foreground">{primaryHeading}</h1>
          <h1>{accentHeading}</h1>
        </div>
        <div className="text-left text-lg font-medium md:w-1/2 lg:w-2/5 lg:text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae fuga error voluptates
          ut sint obcaecati reiciendis iure voluptatum quia.
        </div>
      </div>
      <div className=" flex justify-center">
        <div className="container px-0 border-muted-foreground/30 relative flex w-full flex-col border border-solid md:w-1/2 lg:w-full">
          <div className=" w-full relative flex flex-col lg:flex-row">
            <div className="border-b-muted-foreground/30 absolute left-[-50px] top-0 h-[1px] w-12 border-b-[1px] border-dashed" />
            <div className="border-r-muted-foreground/30 absolute left-0 top-[-50px] h-12 w-[1px] border-r-[1px] border-dashed" />
            <div className="border-b-muted-foreground/30 absolute right-[-50px] top-0 h-[1px] w-12 border-b-[1px] border-dashed" />
            <div className="border-r-muted-foreground/30 absolute right-0 top-[-50px] h-12 w-[1px] border-r-[1px] border-dashed" />
            <div className="border-muted-foreground/30 flex flex-col justify-between gap-8 border-b border-solid p-8 lg:w-2/5 lg:border-b-0 lg:border-r">
              <div>
                <h2 className="font-semibold">{headingBento1}</h2>
                <p className="text-muted-foreground">{descriptionBento1}</p>
              </div>

              {imageBento1 && (
                <Media
                  className="aaspect-[1.45] h-full w-full object-cover"
                  priority
                  resource={imageBento1}
                />
              )}
            </div>
            <div className="flex flex-col justify-between gap-8 p-8 lg:w-3/5">
              <div>
                <h2 className="font-semibold">{headingBento2}</h2>
                <p className="text-muted-foreground">{descriptionBento2}</p>
              </div>

              {imageBento2 && (
                <Media
                  className="aaspect-[1.45] h-full w-full object-cover"
                  priority
                  resource={imageBento2}
                />
              )}
            </div>
          </div>
          <div className=" w-full relative flex flex-col lg:flex-row border-muted-foreground/30 border-t border-solid">
            <div className="border-b-muted-foreground/30 absolute bottom-0 left-[-50px] h-[1px] w-12 border-b-[1px] border-dashed" />
            <div className="border-r-muted-foreground/30 absolute bottom-[-50px] left-0 h-12 w-[1px] border-r-[1px] border-dashed" />
            <div className="border-b-muted-foreground/30 absolute bottom-0 right-[-50px] h-[1px] w-12 border-b-[1px] border-dashed" />
            <div className="border-r-muted-foreground/30 absolute bottom-[-50px] right-0 h-12 w-[1px] border-r-[1px] border-dashed" />
            <div className="border-muted-foreground/30 flex flex-col justify-between gap-8 border-b border-solid p-8 lg:w-3/5 lg:border-b-0 lg:border-r">
              <div>
                <h2 className="font-semibold">{headingBento2}</h2>
                <p className="text-muted-foreground">{descriptionBento2}</p>
              </div>

              {imageBento2 && (
                <Media
                  className="aaspect-[1.45] h-full w-full object-cover"
                  priority
                  resource={imageBento2}
                />
              )}
            </div>
            <div className="flex flex-col justify-between gap-8 p-8 lg:w-2/5">
              <div>
                <h2 className="font-semibold">{headingBento2}</h2>
                <p className="text-muted-foreground">{descriptionBento2}</p>
              </div>

              {imageBento2 && (
                <Media
                  className="aaspect-[1.45] h-full w-full object-cover"
                  priority
                  resource={imageBento2}
                />
              )}
            </div>
          </div>
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/cross-pattern.svg"
            alt="cross"
            className="absolute left-[-6px] top-[-4px] w-3"
          />
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/cross-pattern.svg"
            alt="cross"
            className="absolute right-[-6px] top-[-4px] w-3"
          />
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/cross-pattern.svg"
            alt="cross"
            className="absolute bottom-[-8px] left-[-6px] w-3"
          />
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/cross-pattern.svg"
            alt="cross"
            className="absolute bottom-[-8px] right-[-6px] w-3"
          />
        </div>
      </div>
    </section>
  )
}
