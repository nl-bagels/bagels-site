import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'isOpen', 'publishedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Job Title',
      admin: {
        description: 'e.g. Bagel Baker',
      },
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({}),
      label: 'Job Description',
    },
    {
      name: 'isOpen',
      type: 'checkbox',
      label: 'Position Open',
      defaultValue: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Published Date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
  ],
}
