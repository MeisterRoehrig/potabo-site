import type { Block } from 'payload'

export const Team: Block = {
  slug: 'team',
  interfaceName: 'TeamBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Our Team',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: 'Meet the people behind our success',
      required: false,
    },
    {
      name: 'teamMembers',
      label: 'Team Members',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
    },
  ],
}
