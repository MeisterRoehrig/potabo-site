import { cn } from '@/utilities/ui'
import React from 'react'
import { ArrowRight } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Media } from '@/components/Media'
import type { Post } from '@/payload-types'

// Create a more flexible type that works with both full posts and card data
export type CollectionArchivePost = {
  id?: string | number // Allow both string and number
  title?: string | null
  slug?: string | null // Allow null values like Payload types
  categories?: Post['categories']
  authors?: Post['authors']
  publishedAt?: string | null
  createdAt?: string
  updatedAt?: string
  meta?: Post['meta']
  content?: Post['content']
}

export type Props = {
  posts: CollectionArchivePost[]
  heading?: string
  description?: string
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const {
    posts,
    heading = 'Blog Posts',
    description = 'Discover the latest insights and tutorials about modern web development, UI design, and component-driven architecture.',
  } = props

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <section className="py-32">
      <div className="container flex flex-col items-center gap-16">
        <div className="text-center">
          <h2 className="mx-auto mb-6 text-3xl font-semibold text-pretty md:text-4xl lg:max-w-3xl">
            {heading}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">{description}</p>
        </div>

        <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
          {posts?.map((post, index) => {
            if (typeof post === 'object' && post !== null && post.slug) {
              // Convert id to string for consistent key handling
              const postId = post.id ? String(post.id) : post.slug || String(index)

              return (
                <Card
                  key={postId}
                  className="order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2"
                >
                  <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
                    <div className="sm:col-span-5">
                      <div className="mb-4 md:mb-6">
                        <div className="flex flex-wrap gap-3 text-xs tracking-wider text-muted-foreground uppercase md:gap-5 lg:gap-6">
                          {post.categories?.map((category) => {
                            if (typeof category === 'object' && category.title) {
                              return <span key={category.id}>{category.title}</span>
                            }
                            return null
                          })}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                        <a href={`/posts/${post.slug}`} className="hover:underline">
                          {post.title || 'Untitled Post'}
                        </a>
                      </h3>
                      {post.meta?.description && (
                        <p className="mt-4 text-muted-foreground md:mt-5">
                          {post.meta.description}
                        </p>
                      )}
                      <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
                        {post.authors && post.authors.length > 0 && (
                          <>
                            <span className="text-muted-foreground">
                              {typeof post.authors[0] === 'object' && post.authors[0].name
                                ? post.authors[0].name
                                : 'Unknown Author'}
                            </span>
                            <span className="text-muted-foreground">•</span>
                          </>
                        )}
                        <span className="text-muted-foreground">
                          {formatDate(
                            post.publishedAt || post.createdAt || new Date().toISOString(),
                          )}
                        </span>
                      </div>
                      <div className="mt-6 flex items-center space-x-2 md:mt-8">
                        <a
                          href={`/posts/${post.slug}`}
                          className="inline-flex items-center font-semibold hover:underline md:text-base"
                        >
                          <span>Read more</span>
                          <ArrowRight className="ml-2 size-4 transition-transform" />
                        </a>
                      </div>
                    </div>
                    <div className="order-first sm:order-last sm:col-span-5">
                      <a href={`/posts/${post.slug}`} className="block">
                        <div className="aspect-[16/9] overflow-clip rounded-lg border border-border">
                          {post.meta?.image && typeof post.meta.image === 'object' ? (
                            <Media
                              resource={post.meta.image}
                              className="h-full w-full object-cover transition-opacity duration-200 hover:opacity-70"
                            />
                          ) : (
                            <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground">
                              <span>No image</span>
                            </div>
                          )}
                        </div>
                      </a>
                    </div>
                  </div>
                </Card>
              )
            }
            return null
          })}
        </div>
      </div>
    </section>
  )
}
