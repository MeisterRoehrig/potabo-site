'use client'

import { ChevronRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utilities/ui'
import type { Header } from '@/payload-types'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { CMSLink } from '@/components/Link'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { PotaboLogo } from '@/components/Logo/Potabo-Logo'

type Props = {
  header: Header
}

export const HeaderClient: React.FC<Props> = ({ header }) => {
  // Initialize with current document theme to avoid flash / mismatch
  const { headerTheme, setHeaderTheme: _setHeaderTheme } = useHeaderTheme()
  const [theme, setTheme] = useState<string | null>(headerTheme ?? null)
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const navItems = header?.navItems || []

  // Helper function to determine if a nav item has dropdown
  const hasDropdown = (item: any) => {
    return (
      item.link?.type === 'dropdown' ||
      ((item.link as any)?.dropdownItems && (item.link as any).dropdownItems.length > 0)
    )
  }

  // Helper function to get the label for navigation items
  const getLabel = (item: any) => {
    return item.link?.label || item.link?.reference?.title || item.link?.url || 'Link'
  }

  // Helper function to get the href for navigation items
  const getHref = (item: any) => {
    if (item.link?.type === 'reference' && item.link?.reference) {
      if (typeof item.link.reference === 'object') {
        return `/${item.link.reference.slug}` || '#'
      }
    }
    return item.link?.url || '#'
  }

  // On navigation, clear any previous page-specific override
  useEffect(() => {
    _setHeaderTheme(null)
  }, [pathname, _setHeaderTheme])

  // Sync context theme changes
  useEffect(() => {
    if (headerTheme !== theme) {
      setTheme(headerTheme ?? null)
    }
  }, [headerTheme, theme])

  const headerBarRef = useRef<HTMLElement | null>(null)

  // Measure header bar height and expose as CSS variable for layout adjustments (hero overlap)
  useEffect(() => {
    const el = headerBarRef.current
    if (!el) return
    const resizeObserver = new ResizeObserver(() => {
      const h = el.offsetHeight
      // include top offset (top-2 / top-4 spacing) by reading computed style
      const computed = window.getComputedStyle(el)
      const topOffset = parseFloat(computed.top) || 0
      document.documentElement.style.setProperty('--header-height', `${h + topOffset}px`)
    })
    resizeObserver.observe(el)
    return () => resizeObserver.disconnect()
  }, [])

  return (
    <header className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <section
        ref={headerBarRef}
        className="fixed container left-1/2 top-2 z-50 -translate-x-1/2 rounded-md border bg-background/70 backdrop-blur-xl lg:top-4"
      >
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <PotaboLogo
            url="/"
            variant="logo"
            className="h-8 text-potabored" /* light and dark in one line */
            aria-label="Potabo Logo"
          />
          {/* Desktop Navigation */}
          <NavigationMenu className="max-lg:hidden">
            <NavigationMenuList>
              {navItems.map((item, index) => {
                const label = getLabel(item)

                return hasDropdown(item) ? (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuTrigger className="bg-transparent! px-1.5 data-[state=open]:bg-accent/50">
                      {label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-[400px] space-y-2 p-4">
                        {(item.link as any)?.dropdownItems?.map(
                          (dropdownItem: any, dropdownIndex: number) => (
                            <li key={dropdownIndex}>
                              <NavigationMenuLink asChild>
                                <CMSLink
                                  {...dropdownItem}
                                  className="group flex gap-4 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="transition-transform duration-300 group-hover:translate-x-1">
                                    <div className="mb-1 text-sm leading-none font-medium">
                                      {dropdownItem.label ||
                                        dropdownItem.reference?.title ||
                                        'Dropdown Item'}
                                    </div>
                                    {dropdownItem.description && (
                                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                        {dropdownItem.description}
                                      </p>
                                    )}
                                  </div>
                                </CMSLink>
                              </NavigationMenuLink>
                            </li>
                          ),
                        )}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={index}>
                    <Link
                      href={getHref(item)}
                      className={cn(
                        'relative bg-transparent px-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors',
                      )}
                    >
                      {getLabel(item)}
                    </Link>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2.5">
            <Link href="/admin" className="max-lg:hidden">
              <Button variant="outline">
                <span className="relative z-10">Demo</span>
              </Button>
            </Link>

            {/* Hamburger Menu Button (Mobile Only) */}
            <button
              className="relative flex size-8 text-muted-foreground lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              <div className="absolute top-1/2 left-1/2 block w-[18px] -translate-x-1/2 -translate-y-1/2">
                <span
                  aria-hidden="true"
                  className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${
                    isMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${
                    isMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${
                    isMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Navigation */}
        <div
          className={cn(
            'fixed inset-x-0 top-[calc(100%+1rem)] flex flex-col rounded-2xl border bg-background p-6 transition-all duration-300 ease-in-out lg:hidden',
            isMenuOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-4 opacity-0',
          )}
        >
          <nav className="flex flex-1 flex-col divide-y divide-border">
            {navItems.map((item, index) => {
              const label = getLabel(item)

              return hasDropdown(item) ? (
                <div key={index} className="py-4 first:pt-0 last:pb-0">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === label ? null : label)}
                    className="flex w-full items-center justify-between text-base font-medium text-primary"
                  >
                    {label}
                    <ChevronRight
                      className={cn(
                        'size-4 transition-transform duration-200',
                        openDropdown === label ? 'rotate-90' : '',
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-300',
                      openDropdown === label
                        ? 'mt-4 max-h-[1000px] opacity-100'
                        : 'max-h-0 opacity-0',
                    )}
                  >
                    <div className="space-y-3 rounded-lg bg-muted/50 p-4">
                      {(item.link as any)?.dropdownItems?.map(
                        (dropdownItem: any, dropdownIndex: number) => (
                          <CMSLink
                            key={dropdownIndex}
                            {...dropdownItem}
                            className="group block rounded-md p-2 transition-colors hover:bg-accent"
                            onClick={() => {
                              setIsMenuOpen(false)
                              setOpenDropdown(null)
                            }}
                          >
                            <div className="transition-transform duration-200 group-hover:translate-x-1">
                              <div className="font-medium text-primary">
                                {dropdownItem.label ||
                                  dropdownItem.reference?.title ||
                                  'Dropdown Item'}
                              </div>
                              {dropdownItem.description && (
                                <p className="mt-1 text-sm text-muted-foreground">
                                  {dropdownItem.description}
                                </p>
                              )}
                            </div>
                          </CMSLink>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div key={index} onClick={() => setIsMenuOpen(false)}>
                  <Link
                    href={getHref(item)}
                    className={cn(
                      'py-4 text-base font-medium text-primary transition-colors first:pt-0 last:pb-0 hover:text-primary/80',
                    )}
                  >
                    {getLabel(item)}
                  </Link>
                </div>
              )
            })}
          </nav>

          {/* Mobile Auth Button */}
          <div className="pt-4 border-t border-border mt-4">
            <Link href="/admin" className="block">
              <Button variant="outline" className="w-full">
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </header>
  )
}
