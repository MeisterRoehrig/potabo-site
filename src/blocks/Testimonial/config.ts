import type { Block } from 'payload'

export const Testimonial: Block = {
  slug: 'testimonial',
  interfaceName: 'TestimonialBlock',

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'testimonials',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          label: false,
        },
        {
          name: 'monthPublished',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'monthOnly',
              displayFormat: 'MMMM yyyy',
            },
          },
        },
      ],
      labels: {
        plural: 'Testimonials',
        singular: 'Testimonial',
      },
    },
  ],
}
