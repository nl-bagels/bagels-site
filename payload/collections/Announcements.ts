import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  labels: { singular: 'Announcement', plural: 'Announcements' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'isActive', 'publishedAt'],
    description: 'News, promotions, and events shown on the homepage and /news page.',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'news',
      options: [
        { label: 'Promotion / Deal', value: 'promo' },
        { label: 'News', value: 'news' },
        { label: 'Event', value: 'event' },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({}),
      localized: true,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Show publicly',
      defaultValue: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Published date',
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'expiresAt',
      type: 'date',
      label: 'Expires on (optional)',
      admin: { date: { pickerAppearance: 'dayOnly' }, description: 'Leave empty to show indefinitely.' },
    },
  ],
}
