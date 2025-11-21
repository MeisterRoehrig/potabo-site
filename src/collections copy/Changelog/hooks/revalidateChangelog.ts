import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateChangelog: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  if (doc._status === 'published') {
    const path = `/changelog/${doc.slug}`

    try {
      revalidatePath(path)
      revalidatePath('/changelog')
      revalidateTag('changelog')
      req.payload.logger.info(`Revalidated changelog at path: ${path}`)
    } catch (error) {
      req.payload.logger.error(`Error revalidating changelog at path: ${path}`, error)
    }
  }

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  try {
    revalidatePath('/changelog')
    revalidateTag('changelog')
    req.payload.logger.info(`Revalidated changelog list after deletion`)
  } catch (error) {
    req.payload.logger.error(`Error revalidating after changelog deletion`, error)
  }

  return doc
}
