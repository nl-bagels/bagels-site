import type { Block } from 'payload'

export const AllergiesNoteBlock: Block = {
  slug: 'allergiesNoteBlock',
  labels: { singular: 'Allergies Note', plural: 'Allergies Notes' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'body', type: 'textarea', localized: true },
  ],
}
