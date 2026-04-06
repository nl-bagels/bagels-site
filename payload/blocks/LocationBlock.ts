import type { Block } from 'payload'

export const LocationBlock: Block = {
  slug: 'locationBlock',
  labels: { singular: 'Location Section', plural: 'Location Sections' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'addressLabel', type: 'text', localized: true },
    { name: 'hoursLabel', type: 'text', localized: true },
    { name: 'contactLabel', type: 'text', localized: true },
    { name: 'whatsappLabel', type: 'text', localized: true },
    { name: 'mapEmbedUrl', type: 'text', admin: { description: 'Google Maps embed URL' } },
  ],
}
