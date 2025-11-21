import React from 'react'

import type { TeamBlock as TeamBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'

export const TeamBlock: React.FC<TeamBlockProps> = (props) => {
  const { teamMembers, title, description } = props

  return (
    <section className="py-32">
      <div className="container flex flex-col items-center text-center">
        <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">{title}</h2>
        <p className="text-muted-foreground mb-8 max-w-3xl lg:text-xl">{description}</p>
      </div>
      <div className="container mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers?.map((user) => {
          // Handle the case where user might be just an ID (number) or the full User object
          if (typeof user === 'number') {
            return null
          }

          return (
            <div key={user.id} className="flex flex-col items-center">
              <div className="mb-4 size-20 md:mb-5 lg:size-24 relative overflow-hidden rounded-full border">
                {user.profileImage && typeof user.profileImage === 'object' ? (
                  <Media resource={user.profileImage} fill imgClassName="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-600">
                    {user.name?.charAt(0)?.toUpperCase() ||
                      user.email?.charAt(0)?.toUpperCase() ||
                      '?'}
                  </div>
                )}
              </div>
              <p className="text-center font-medium">{user.name || user.email}</p>
              {user.jobTitle && (
                <p className="text-muted-foreground text-center">{user.jobTitle}</p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
