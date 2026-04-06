import type { Block } from 'payload'

export const CateringBlock: Block = {
  slug: 'cateringBlock',
  labels: { singular: 'Catering Section', plural: 'Catering Sections' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'subtitle', type: 'text', localized: true },
    { name: 'ctaLabel', type: 'text', localized: true },
    { name: 'ctaEmail', type: 'email', admin: { description: 'Overrides site settings email' } },
    {
      name: 'packages',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', localized: true },
        { name: 'subtitle', type: 'text', localized: true },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'item', type: 'text', localized: true },
          ],
        },
      ],
    },
  ],
}
