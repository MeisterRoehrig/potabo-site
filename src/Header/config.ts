import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        {
          name: 'link',
          type: 'group',
          fields: [
            {
              name: 'type',
              type: 'select',
              defaultValue: 'reference',
              options: [
                {
                  label: 'Internal link',
                  value: 'reference',
                },
                {
                  label: 'Custom URL',
                  value: 'custom',
                },
                {
                  label: 'Dropdown',
                  value: 'dropdown',
                },
              ],
            },
            {
              name: 'newTab',
              type: 'checkbox',
              admin: {
                condition: (_, siblingData) => siblingData?.type !== 'dropdown',
                style: {
                  alignSelf: 'flex-end',
                },
              },
              label: 'Open in new tab',
            },
            {
              name: 'reference',
              type: 'relationship',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'reference',
              },
              label: 'Document to link to',
              maxDepth: 1,
              relationTo: ['pages', 'posts'],
            },
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'custom',
              },
              label: 'Custom URL',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData?.type !== 'dropdown',
              },
              label: 'Label',
              required: true,
            },
            {
              name: 'dropdownLabel',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'dropdown',
              },
              label: 'Dropdown Label',
              required: true,
            },
            {
              name: 'dropdownItems',
              type: 'array',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'dropdown',
              },
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  defaultValue: 'reference',
                  options: [
                    {
                      label: 'Internal link',
                      value: 'reference',
                    },
                    {
                      label: 'Custom URL',
                      value: 'custom',
                    },
                  ],
                },
                {
                  name: 'reference',
                  type: 'relationship',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'reference',
                  },
                  label: 'Document to link to',
                  maxDepth: 1,
                  relationTo: ['pages', 'posts'],
                },
                {
                  name: 'url',
                  type: 'text',
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'custom',
                  },
                  label: 'Custom URL',
                },
                {
                  name: 'label',
                  type: 'text',
                  label: 'Label',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                  admin: {
                    description: 'Optional description shown in dropdown',
                  },
                },
                {
                  name: 'newTab',
                  type: 'checkbox',
                  label: 'Open in new tab',
                },
              ],
              label: 'Dropdown Items',
              maxRows: 6,
            },
          ],
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
