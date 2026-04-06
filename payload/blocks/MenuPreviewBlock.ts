import type { Block } from 'payload'

export const MenuPreviewBlock: Block = {
  slug: 'menuPreviewBlock',
  labels: { singular: 'Menu Preview', plural: 'Menu Previews' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'subtitle', type: 'text', localized: true },
    { name: 'viewFullLabel', type: 'text', localized: true },
  ],
}
