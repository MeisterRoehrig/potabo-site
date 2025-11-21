// app/components/Footer/Footer.tsx

import React from 'react'
import { JSX } from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { CMSLink } from '@/components/Link'
import { PotaboLogo } from '@/components/Logo/Potabo-Logo'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import type { Footer as FooterGlobal, Page, Post, Redirect } from '@/payload-types'

import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
  FaGithub,
  FaTiktok,
} from 'react-icons/fa6'
import type { IconType } from 'react-icons'

/* --------------------------------- TYPES ---------------------------------- */

type PayloadReference =
  | { relationTo: 'pages'; value: number | Page }
  | { relationTo: 'posts'; value: number | Post }
  | { relationTo: 'redirects'; value: number | Redirect }

export type PayloadLink = {
  type?: 'reference' | 'custom' | null
  newTab?: boolean | null
  reference?: PayloadReference | null
  url?: string | null
  label: string
}

export type ProductItem = { link: PayloadLink; id?: string | null }
export type CompanyItem = ProductItem
export type RessourcenItem = ProductItem

export type SocialItem = {
  socialLink: {
    type?: 'reference' | 'custom' | null
    newTab?: boolean | null
    reference?: PayloadReference | null
    url?: string | null
    icon: string
  }
  id?: string | null
}

/* ---------------------------- ICON RESOLUTION ------------------------------ */

const icons: Array<[string, IconType]> = [
  ['fainstagram', FaInstagram],
  ['fafacebook', FaFacebook],
  ['falinkedin', FaLinkedin],
  ['fax', FaXTwitter],
  ['faxtwitter', FaXTwitter],
  ['fatwitter', FaXTwitter],
  ['fayoutube', FaYoutube],
  ['fagithub', FaGithub],
  ['fatiktok', FaTiktok],
]

const iconMap: Record<string, IconType> = Object.fromEntries(icons)

function normalize(name: string) {
  return name.trim().toLowerCase()
}

function getFaIcon(name: string): JSX.Element | null {
  const n = normalize(name)
  const Icon =
    iconMap[n] ||
    iconMap[`fa${n}`] || // if someone forgot the prefix
    iconMap[n.replace(/^fa/, 'fa')] // no-op, keeps it safe

  return Icon ? <Icon className="size-5" aria-hidden="true" /> : null
}

/* ------------------------- CMSLink COMPATIBILITY --------------------------- */

// Narrow the reference type to the ones CMSLink can actually consume
type CMSLinkReference = Extract<PayloadReference, { relationTo: 'pages' | 'posts' }>

type BaseCMSLink = {
  label: string
  newTab?: boolean | null
}

type CMSCustomLink = BaseCMSLink & {
  type: 'custom'
  url: string
}

type CMSReferenceLink = BaseCMSLink & {
  type: 'reference'
  reference: CMSLinkReference
  url?: undefined
}

type CMSLinkCompatible = CMSCustomLink | CMSReferenceLink

function toCMSLink(link: PayloadLink): CMSLinkCompatible {
  const { reference, type, url, label, newTab } = link

  // Redirects are turned into plain custom links
  if (type === 'reference' && reference?.relationTo === 'redirects') {
    const redirect = reference.value as Redirect | number
    let resolvedUrl: string = '/'
    if (redirect && typeof redirect === 'object') {
      const r = redirect as Redirect
      if (typeof r.to === 'string' && r.to) {
        resolvedUrl = r.to
      } else if (typeof r.from === 'string' && r.from) {
        resolvedUrl = r.from
      }
    }
    return {
      type: 'custom',
      url: resolvedUrl,
      label,
      newTab: newTab ?? false,
    }
  }

  // Real references (pages, posts)
  if (
    type === 'reference' &&
    reference &&
    (reference.relationTo === 'pages' || reference.relationTo === 'posts')
  ) {
    return {
      type: 'reference',
      reference: reference as CMSLinkReference,
      label,
      newTab: newTab ?? false,
    }
  }

  // Fallback to custom link
  return {
    type: 'custom',
    url: url ?? '#',
    label,
    newTab: newTab ?? false,
  }
}

/* --------------------------- SECTION COMPONENT ----------------------------- */

interface LinkSectionProps {
  title: string
  items: Array<{ link: PayloadLink }>
}

const LinkSection: React.FC<LinkSectionProps> = ({ title, items }) => {
  if (!items?.length) return null

  return (
    <div>
      <h3 className="mb-4 font-bold">{title}</h3>
      <ul className="text-muted-foreground flex-1 space-y-2 text-sm">
        {items.map(({ link }, i) => {
          const converted = toCMSLink(link)
          return (
            <li key={link.label + i} className="hover:text-primary font-medium">
              <CMSLink {...converted} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* ------------------------------ SOCIAL LIST -------------------------------- */

const SocialLinks: React.FC<{ items: SocialItem[] }> = ({ items }) => {
  if (!items.length) return null

  return (
    <ul className="text-muted-foreground flex items-center space-x-6">
      {items.map(({ socialLink }, idx) => {
        const iconEl = getFaIcon(socialLink.icon)
        if (!iconEl) return null

        // Remove "icon" before converting to CMSLink-compatible props
        const { icon, ...rawLink } = socialLink

        // Ensure CMSLink gets no visible label; keep the link target intact
        const safe = toCMSLink({ ...rawLink, label: '' })
        const safeWithTab = { ...safe, newTab: socialLink.newTab ?? true }

        // Provide accessible name via aria-label and visually hidden text
        const aria = icon

        return (
          <li key={idx} className="hover:text-primary font-medium cursor-pointer">
            <CMSLink
              {...safeWithTab}
              appearance="link"
              className="inline-flex items-center"
              aria-label={aria}
            >
              {iconEl}
              <span className="sr-only">{aria}</span>
            </CMSLink>
          </li>
        )
      })}
    </ul>
  )
}

/* ------------------------------- FOOTER ------------------------------------ */

export async function Footer() {
  const currentYear = new Date().getFullYear()
  const copyrightText = `© ${currentYear} Potabo Alle Rechte vorbehalten.`

  const footerData: FooterGlobal = await getCachedGlobal('footer', 1)()

  const social: SocialItem[] = footerData?.Social || []
  const ressourcen: RessourcenItem[] = footerData?.Ressourcen || []
  const company: CompanyItem[] = footerData?.Company || []
  const product: ProductItem[] = footerData?.Product || []
  const description =
    footerData?.description ||
    'Wir behalten den Überblick über Ihre Kartoffeln ob in Kisten, BigBags oder in loser Form und das auf die kostengünstigste Art und Weise.'

  const sections: Array<{ title: string; items: Array<{ link: PayloadLink }> }> = [
    { title: 'Product', items: product },
    { title: 'Company', items: company },
    { title: 'Ressourcen', items: ressourcen },
  ]

  return (
    <footer className="pt-32 w-full">
      <div className="container">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          {/* Left block: logo, description, socials */}
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start lg:max-w-md">
            <PotaboLogo
              url="/"
              variant="logo"
              className="h-8 dark:text-white" /* light and dark in one line */
              aria-label="Potabo home"
            />
            <p className="text-muted-foreground max-w-[70%] text-sm">{description}</p>
            <SocialLinks items={social} />
          </div>

          {/* Right block: three columns */}
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20 lg:ml-auto">
            {sections.map((section, i) => (
              <LinkSection key={section.title + i} title={section.title} items={section.items} />
            ))}
          </div>
        </div>

        <div className="text-muted-foreground mt-8 mb-4 flex flex-col justify-between gap-4 border-t pt-8 pb-2 text-xs font-medium md:flex-row md:items-center md:text-left md:justify-between md:gap-0">
          <p className="order-2 lg:order-1">{copyrightText}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row md:items-center">
            <ThemeSelector />
            <li className="hover:text-primary cursor-pointer">
              <a href="#top">Nach oben ↑</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
