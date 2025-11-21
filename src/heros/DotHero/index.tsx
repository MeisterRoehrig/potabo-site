'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React from 'react'

import type { Page } from '@/payload-types'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CMSLink } from '@/components/Link'

// import { CMSLink } from '@/components/Link'
// import RichText from '@/components/RichText'

export const DotHero: React.FC<Page['hero']> = ({ preHeading, mainHeading, subHeading, links }) => {
  const { setHeaderTheme: _setHeaderTheme } = useHeaderTheme()
  const normalizedLinks = Array.isArray(links)
    ? links.map((entry: any) => entry?.link ?? entry).filter(Boolean)
    : []

  // Keep header theme consistent with page; no override here to avoid light/dark mismatch

  return (
    <section
      className="
        relative
        overflow-hidden
        -mt-[var(--header-height)]      /* pull hero up under the fixed header */
        pt-[var(--header-height)]       /* keep content below the header */
        min-h-screen
      "
    >
      <div className="container py-32">
        {/* Background pattern with dots */}
        <div className="absolute inset-0 -z-10 w-full bg-[radial-gradient(hsl(var(--primary))_1px,transparent_1px)] opacity-25 [background-size:20px_20px]">
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            {preHeading && (
              <Badge variant="outline" className="bg-background mb-6 px-4 py-1.5 text-sm">
                {preHeading}
              </Badge>
            )}

            {mainHeading && (
              <h1 className="text-foreground bg-clip-text text-5xl font-bold  md:text-6xl lg:text-7xl">
                {mainHeading}
              </h1>
            )}

            {subHeading && (
              <p className="text-muted-foreground mt-6 max-w-xl text-xl">{subHeading}</p>
            )}

            {normalizedLinks.length > 0 && (
              <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
                {normalizedLinks.map((linkData: any, index: number) => (
                  <Button
                    key={linkData.id ?? linkData.url ?? index}
                    size="lg"
                    variant={index === 0 ? 'default' : 'outline'}
                    className="w-full sm:w-auto"
                    asChild
                  >
                    <CMSLink {...linkData} />
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
