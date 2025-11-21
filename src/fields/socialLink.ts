import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export type socialLinkAppearances = 'default' | 'outline'

export const appearanceOptions: Record<socialLinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
}

type socialLinkType = (options?: {
  appearances?: socialLinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const socialLink: socialLinkType = ({
  appearances,
  disableLabel = false,
  overrides = {},
} = {}) => {
  const socialLinkResult: GroupField = {
    name: 'socialLink',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal socialLink',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const socialLinkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to socialLink to',
      relationTo: ['pages', 'posts', 'redirects'],
      required: true,
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
  ]

  if (!disableLabel) {
    socialLinkTypes.map((socialLinkType) => ({
      ...socialLinkType,
      admin: {
        ...socialLinkType.admin,
        width: '50%',
      },
    }))

    socialLinkResult.fields.push({
      type: 'row',
      fields: [
        ...socialLinkTypes,
        {
          name: 'icon',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Set an icon name from FontAwesome 6 ex. "FaFacebook"',
          },
          label: 'Icon',
          required: true,
        },
      ],
    })
  } else {
    socialLinkResult.fields = [...socialLinkResult.fields, ...socialLinkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.outline]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    socialLinkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the socialLink should be rendered.',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
  }

  return deepMerge(socialLinkResult, overrides)
}
