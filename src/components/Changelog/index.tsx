'use client'
import React from 'react'
import { Copy, ExternalLink, GitPullRequest, Maximize2 } from 'lucide-react'
import type { Changelog } from '@/payload-types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

interface ChangelogListProps {
  changelogs: Changelog[]
}

export const ChangelogList: React.FC<ChangelogListProps> = ({ changelogs }) => {
  const handleCopy = (changelog: Changelog) => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/changelog/${changelog.slug}`
      navigator.clipboard.writeText(url)
    }
  }

  const handleExternalLink = (changelog: Changelog) => {
    if (changelog.externalLink) {
      window.open(changelog.externalLink, '_blank')
    } else if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/changelog/${changelog.slug}`
      window.open(url, '_blank')
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <section className="overflow-clip py-32">
      <div className="border-border container border-x">
        <div className="relative flex flex-col gap-3 py-8">
          <div className="flex items-center gap-2">
            <GitPullRequest className="size-4" />
            <p className="text-sm font-medium">Changelog</p>
          </div>
          <h1 className="text-3xl font-medium lg:text-4xl">
            Latest Enhancements
            <br /> & Platform News
          </h1>
          <div className="bg-border absolute bottom-0 left-0 right-0 h-px w-[200vw] -translate-x-1/2" />
          <div className="bg-border absolute left-0 right-0 top-0 h-px w-[200vw] -translate-x-1/2" />
        </div>
        <div className="flex flex-col">
          {changelogs.map((changelog, idx) => (
            <Dialog key={changelog.id}>
              <div className="relative flex w-full flex-col gap-4 py-16 lg:flex-row lg:gap-0">
                <div className="left-0 top-2 mt-2 block h-fit lg:sticky">
                  <time className="text-muted-foreground w-36 text-sm font-medium lg:absolute">
                    {formatDate(changelog.publishedAt || changelog.createdAt)}
                  </time>
                </div>
                <div className="flex max-w-prose flex-col gap-4 lg:mx-auto">
                  <h3 className="text-3xl font-medium lg:text-4xl">
                    {changelog.version ? `${changelog.version}: ` : ''}
                    {changelog.title}
                  </h3>
                  <DialogTrigger asChild>
                    <div className="border-border max-h-96 w-full cursor-pointer rounded-lg border overflow-hidden">
                      {changelog.featuredImage && typeof changelog.featuredImage === 'object' && (
                        <Media
                          resource={changelog.featuredImage}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </DialogTrigger>
                  <p className="text-muted-foreground text-sm font-medium">{changelog.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="flex items-center -space-x-2">
                        {changelog.populatedContributors?.slice(0, 3).map((contributor, idx) => (
                          <div
                            key={idx}
                            className="border-border size-6 rounded-full border bg-gray-200 flex items-center justify-center text-xs font-semibold"
                          >
                            {contributor.profileImage ? (
                              <img
                                src={contributor.profileImage}
                                alt={contributor.name || ''}
                                className="size-6 rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-gray-600">
                                {contributor.name?.charAt(0)?.toUpperCase() || '?'}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      {(changelog.populatedContributors?.length || 0) > 3 && (
                        <span className="text-muted-foreground text-sm font-medium">
                          +{(changelog.populatedContributors?.length || 0) - 3} contributors
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-0.5">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Maximize2 className="size-4" />
                              </Button>
                            </DialogTrigger>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Show full release</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleCopy(changelog)}
                            >
                              <Copy className="size-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy link</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleExternalLink(changelog)}
                            >
                              <ExternalLink className="size-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Open in new tab</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
                <div className="bg-border absolute bottom-0 left-0 right-0 h-px w-[200vw] -translate-x-1/2" />
              </div>
              <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-prose">
                <DialogHeader>
                  <DialogTitle className="text-left">
                    {changelog.version ? `${changelog.version}: ` : ''}
                    {changelog.title}
                  </DialogTitle>
                  <DialogDescription className="text-left">{changelog.excerpt}</DialogDescription>
                </DialogHeader>
                {changelog.featuredImage && typeof changelog.featuredImage === 'object' && (
                  <div className="border-border max-h-96 w-full rounded-lg border overflow-hidden">
                    <Media
                      resource={changelog.featuredImage}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="prose dark:prose-invert max-w-none">
                  <RichText data={changelog.content} />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  )
}
