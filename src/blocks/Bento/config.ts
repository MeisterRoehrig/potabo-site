import type { Block } from 'payload'

export const Bento: Block = {
  slug: 'bento',
  interfaceName: 'BentoBlock',
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
      type: 'collapsible',
      label: 'Bento 1',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'headingBento1',
          type: 'text',
          label: 'Heading',
        },
        {
          name: 'descriptionBento1',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'imageBento1',
          type: 'upload',
          label: 'Image',
          relationTo: 'media',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Bento 2',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'headingBento2',
          type: 'text',
          label: 'Heading',
        },
        {
          name: 'descriptionBento2',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'imageBento2',
          type: 'upload',
          label: 'Image',
          relationTo: 'media',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Bento 3',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'headingBento3',
          type: 'text',
          label: 'Heading',
        },
        {
          name: 'descriptionBento3',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'imageBento3',
          type: 'upload',
          label: 'Image',
          relationTo: 'media',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Bento 4',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'headingBento4',
          type: 'text',
          label: 'Heading',
        },
        {
          name: 'descriptionBento4',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'imageBento4',
          type: 'upload',
          label: 'Image',
          relationTo: 'media',
        },
      ],
    },
  ],
}
