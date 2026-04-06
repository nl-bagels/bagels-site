import type { Block } from 'payload'

export const AboutBlock: Block = {
  slug: 'aboutBlock',
  labels: { singular: 'About Section', plural: 'About Sections' },
  fields: [
    { name: 'heading', type: 'textarea', required: true, localized: true, admin: { description: 'Use \\n for line breaks' } },
    { name: 'p1', type: 'textarea', localized: true },
    { name: 'p2', type: 'textarea', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'photoSoonLabel', type: 'text', localized: true, defaultValue: 'Photo coming soon' },
    {
      name: 'usps',
      type: 'array',
      localized: false,
      fields: [
        { name: 'icon', type: 'text', admin: { description: 'Emoji or icon character' } },
        { name: 'label', type: 'text', localized: true },
      ],
    },
  ],
}
