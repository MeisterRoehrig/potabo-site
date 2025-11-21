'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'

// import { CMSLink } from '@/components/Link'
// import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ media }) => {
  const { setHeaderTheme: _setHeaderTheme } = useHeaderTheme()

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
      {/* Background image fills section */}
      <Media
        className="absolute inset-0 h-full w-full"
        imgClassName="object-cover object-center w-full h-full"
        fill
        priority
        resource={media}
      />

      {/* Stronger readability overlay: solid left block that fades to transparent on the right */}
      <div
        className="pointer-events-none absolute inset-0 bg-background/95"
        style={{
          WebkitMaskImage: 'linear-gradient(90deg, black 20%, transparent 100%)',
          maskImage: 'linear-gradient(90deg, black 20%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex w-full py-32 items-center">
        <div className="container flex items-center">
          <div className="max-w-2xl flex flex-col items-start text-left">
            <h2 className="text-pretty text-xl md:text-2xl font-medium tracking-tight mb-4">
              Digitales Lagermanagement
            </h2>
            <h1 className="text-pretty text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Einfache Software für anspruchsvolle Lager
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 max-w-xl">
              Kartoffellagerung ist komplex genug, die Software dazu sollte es nicht sein. Potabo
              bietet eine intuitive, kostengünstige Lösung, die mit minimalem Aufwand und
              Investitionen sofort Übersicht schafft.
            </p>
            <div className="flex w-full flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="sm:w-auto w-full">
                <a href="#demo">Demo Buchen</a>
              </Button>
              {/* <Button asChild variant="outline" className="sm:w-auto w-full">
                <a href="#">Mehr erfahren</a>
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
