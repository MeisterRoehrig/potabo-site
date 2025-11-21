import type { Field } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Dot Hero',
          value: 'dotHero',
        },
      ],
      required: true,
    },

    {
      name: 'preHeading',
      label: 'Pre Heading',
      type: 'text',
    },
    {
      name: 'mainHeading',
      label: 'Main Heading',
      type: 'text',
    },
    {
      name: 'subHeading',
      label: 'Sub Heading',
      type: 'textarea',
    },

    linkGroup({
      overrides: {
        label: 'Buttons',
        maxRows: 2,
      },
    }),

    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
