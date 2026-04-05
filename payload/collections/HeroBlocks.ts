import type { CollectionConfig } from 'payload'

export const HeroBlocks: CollectionConfig = {
  slug: 'hero-blocks',
  admin: {
    useAsTitle: 'title',
    description: 'Manage hero banners. Only one can be active at a time.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Heading',
      admin: {
        description: 'e.g. Easter Bagel Boxes',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      admin: {
        description: 'e.g. Pre-order your festive box',
      },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'Button Text',
      admin: {
        description: 'e.g. Pre-order now',
      },
    },
    {
      name: 'ctaUrl',
      type: 'text',
      label: 'Button Link',
      admin: {
        description: 'External URL or anchor like /#menu',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      required: true,
    },
    {
      name: 'backgroundVideo',
      type: 'text',
      label: 'Background Video URL',
      admin: {
        description: '(Optional) Overrides image if provided',
      },
    },
    {
      name: 'textColor',
      type: 'select',
      label: 'Text Color',
      defaultValue: 'light',
      options: [
        { label: 'Light (white)', value: 'light' },
        { label: 'Dark (black)', value: 'dark' },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Active',
      defaultValue: false,
      admin: {
        description: 'Only one hero block should be active at a time.',
      },
    },
  ],
}
