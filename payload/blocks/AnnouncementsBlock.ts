import type { Block } from 'payload'

export const AnnouncementsBlock: Block = {
  slug: 'announcementsBlock',
  labels: { singular: 'Announcements Block', plural: 'Announcements Blocks' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      admin: { description: 'Optional section heading. Leave blank to hide.' },
    },
    {
      name: 'maxItems',
      type: 'number',
      label: 'Max items to show',
      defaultValue: 3,
      min: 1,
      max: 12,
    },
  ],
}
