import React from 'react'

import type { Post } from '@/payload-types'

import { Card } from '@/components/Card'

export type RelatedPostsProps = {
  className?: string
  docs?: (Post | string)[]
  introContent?: any
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  const hasRelatedPosts = docs && docs.length > 0

  if (!hasRelatedPosts) {
    return null
  }

  return (
    <div className={className}>
      {introContent && <div className="mb-8">{/* Render intro content here if needed */}</div>}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          // Filter out posts without slugs to prevent rendering issues
          if (!doc.slug) return null

          // Map Post to CardPostData, ensuring meta.image is string | Media | null | undefined
          const cardDoc = {
            ...doc,
            meta: doc.meta
              ? {
                  ...doc.meta,
                  image: typeof doc.meta.image === 'number' ? undefined : doc.meta.image,
                }
              : undefined,
          }
          return <Card key={doc.id || index} doc={cardDoc} relationTo="posts" showCategories />
        })}
      </div>
    </div>
  )
}
