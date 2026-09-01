import type { GlobalConfig } from 'payload'

const localizedText = (name: string, label: string) => ({
  name,
  type: 'text' as const,
  label,
  localized: true,
})

const localizedTextarea = (name: string, label: string) => ({
  name,
  type: 'textarea' as const,
  label,
  localized: true,
})

export const HomepageContent: GlobalConfig = {
  slug: 'homepage-content',
  label: 'Homepage Content',
  admin: {
    group: 'Content',
    description: 'Text shown in each section of the homepage. Switch locale to edit English or Nederlands.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          label: 'Hero',
          fields: [
            localizedText('title', 'Heading'),
            localizedText('subtitle', 'Subtitle'),
            localizedText('ctaLabel', 'Button Text'),
          ],
        },
        {
          name: 'marquee',
          label: 'Marquee',
          fields: [
            {
              name: 'items',
              type: 'array',
              label: 'Ticker Texts',
              admin: {
                description: 'The texts repeat automatically to create a continuous ticker.',
              },
              fields: [localizedText('text', 'Text')],
            },
          ],
        },
        {
          name: 'menuHighlight',
          label: 'Menu Highlight',
          fields: [
            localizedTextarea('heading', 'Heading'),
            localizedTextarea('subtitle', 'Subtitle'),
            localizedText('ctaLabel', 'Button Text'),
          ],
        },
        {
          name: 'about',
          label: 'About',
          fields: [
            {
              ...localizedTextarea('heading', 'Heading'),
              admin: { description: 'Use a new line to control the heading line break.' },
            },
            localizedTextarea('paragraphOne', 'First Paragraph'),
            localizedTextarea('paragraphTwo', 'Second Paragraph'),
          ],
        },
        {
          name: 'menuPreview',
          label: 'Menu Preview',
          fields: [
            localizedText('heading', 'Heading'),
            localizedText('subtitle', 'Subtitle'),
            localizedText('viewFullLabel', 'Button Text'),
          ],
        },
        {
          name: 'catering',
          label: 'Catering',
          fields: [
            localizedText('heading', 'Heading'),
            localizedTextarea('tagline', 'Tagline'),
            localizedText('ctaLabel', 'Button Text'),
            localizedText('emailSubject', 'Email Subject'),
            localizedTextarea('addons', 'Add-ons Text'),
            localizedTextarea('orderNote', 'Order Note'),
            localizedTextarea('orderContact', 'Order Contact Text'),
            localizedText('deliveryHeading', 'Delivery Heading'),
            localizedText('deliveryPickup', 'Pickup Text'),
            localizedText('deliveryLocal', 'Local Delivery Text'),
            localizedText('deliveryNL', 'Netherlands Delivery Text'),
            localizedText('priceNote', 'Price Note'),
            localizedTextarea('b2bNote', 'B2B Note'),
            {
              name: 'packages',
              type: 'array',
              label: 'Packages',
              fields: [
                localizedText('name', 'Package Name'),
                {
                  name: 'items',
                  type: 'array',
                  label: 'Package Items',
                  fields: [localizedText('item', 'Item')],
                },
              ],
            },
          ],
        },
        {
          name: 'location',
          label: 'Location',
          fields: [
            localizedText('heading', 'Heading'),
            localizedText('addressLabel', 'Address Heading'),
            localizedText('hoursLabel', 'Hours Heading'),
            localizedText('contactLabel', 'Contact Heading'),
            localizedText('whatsappLabel', 'WhatsApp Label'),
            {
              name: 'openingHours',
              type: 'array',
              label: 'Opening Hours',
              fields: [
                localizedText('day', 'Day'),
                localizedText('hours', 'Hours'),
              ],
            },
          ],
        },
        {
          name: 'jobs',
          label: 'Jobs',
          fields: [
            localizedText('heading', 'Heading'),
            localizedTextarea('subtitle', 'Subtitle'),
            localizedText('applyNowLabel', 'Apply Button Text'),
            localizedText('openApplicationLabel', 'Open Application Button Text'),
            localizedText('sendCVLabel', 'Send CV Button Text'),
            localizedText('applicationSubjectPrefix', 'Application Email Subject Prefix'),
            localizedText('openApplicationSubject', 'Open Application Email Subject'),
          ],
        },
      ],
    },
  ],
}
