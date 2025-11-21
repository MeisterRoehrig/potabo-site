import type { Block } from 'payload'

export const Faq: Block = {
  slug: 'faq',
  interfaceName: 'FaqBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: false,
    },
    {
      name: 'questions',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'question',
          type: 'textarea',
          label: false,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: false,
        },
      ],
      labels: {
        plural: 'Faqs',
        singular: 'Faq',
      },
    },
  ],
}
