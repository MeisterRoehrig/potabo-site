'use client'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Media, Post } from '@/payload-types'

export type CardPostData = {
  id?: number | string
  title?: string | null // Allow null like Payload types
  slug?: string | null // Allow null like Payload types
  categories?: Post['categories']
  meta?: {
    description?: string | null
    image?: string | Media | null
  } | null
  authors?: Post['authors']
  publishedAt?: string | null
  createdAt?: string
  updatedAt?: string
}

export type CardPageData = {
  id?: number | string
  title?: string | null
  slug?: string | null
  meta?: {
    description?: string | null
    image?: string | Media | null
  } | null
}

export type Props = {
  className?: string
  doc?: CardPostData | CardPageData
  relationTo?: 'posts' | 'pages'
  showCategories?: boolean
  title?: string
}

export const Card: React.FC<Props> = (props) => {
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, title, meta } = doc || {}
  const categories =
    relationTo === 'posts' && doc && 'categories' in doc ? doc.categories : undefined

  // Don't render if no slug (including null slugs)
  if (!slug) {
    return null
  }

  const href = relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`

  return (
    <div className={className}>
      <a href={href} className="block group">
        <div className="aspect-[16/9] overflow-hidden rounded-lg border border-border mb-4">
          {meta?.image && typeof meta.image === 'object' ? (
            <img
              src={meta.image.url || ''}
              alt={meta.image.alt || title || ''}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground">
              <span>No image</span>
            </div>
          )}
        </div>

        {showCategories && categories && categories.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {categories.map((category) => {
              if (typeof category === 'object' && category.title) {
                return (
                  <span
                    key={category.id}
                    className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                  >
                    {category.title}
                  </span>
                )
              }
              return null
            })}
          </div>
        )}

        <h3 className="text-lg font-semibold group-hover:underline">
          {titleFromProps || title || 'Untitled'}
        </h3>

        {meta?.description && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{meta.description}</p>
        )}
      </a>
    </div>
  )
}
