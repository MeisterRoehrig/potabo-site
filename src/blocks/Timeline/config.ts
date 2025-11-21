import { Block, Field } from 'payload'
import { LucideIconPicker } from '@/fields/lucide-icon-picker'

export const Timeline: Block = {
  slug: 'timeline',
  interfaceName: 'TimelineBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'items',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Image',
          relationTo: 'media',
        },
        LucideIconPicker({
          name: 'icon',
          label: 'Icon',
        }) as unknown as Field,
      ],
      labels: {
        plural: 'Items',
        singular: 'Item',
      },
    },
  ],
}
