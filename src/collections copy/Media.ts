import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (process.env.DEBUG_MEDIA) {
          req?.payload?.logger?.debug({
            scope: 'media.beforeChange',
            user: req?.user?.id,
            alt: data?.alt,
            filename: data?.filename,
            mimeType: data?.mimeType,
          })
        }
      },
    ],
    afterChange: [
      ({ doc, operation, req }) => {
        if (process.env.DEBUG_MEDIA) {
          req?.payload?.logger?.debug({
            scope: 'media.afterChange',
            id: doc.id,
            operation,
            url: doc.url,
            sizes: Object.keys(doc.sizes || {}),
          })
        }
      },
    ],
    afterRead: [
      ({ doc, req }) => {
        if (process.env.DEBUG_MEDIA) {
          req?.payload?.logger?.debug({
            scope: 'media.afterRead',
            id: doc?.id,
            url: doc?.url,
          })
        }
        return doc
      },
    ],
  },
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../uploads'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
