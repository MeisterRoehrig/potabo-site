import type { CollectionAfterReadHook } from 'payload'

export const populateAuthors: CollectionAfterReadHook = async ({ doc, req }) => {
  if (doc?.contributors && Array.isArray(doc.contributors)) {
    const populatedContributors = []

    for (const contributor of doc.contributors) {
      if (typeof contributor === 'object' && contributor !== null) {
        populatedContributors.push({
          id: contributor.id,
          name: contributor.name || contributor.email,
          profileImage: contributor.profileImage || null,
        })
      }
    }

    doc.populatedContributors = populatedContributors
  }

  return doc
}
