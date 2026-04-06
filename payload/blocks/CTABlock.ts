import type { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'ctaBlock',
  labels: { singular: 'CTA Section', plural: 'CTA Sections' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'body', type: 'textarea', localized: true },
    {
      name: 'buttons',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'href', type: 'text' },
        { name: 'style', type: 'select', options: [{ label: 'Primary', value: 'primary' }, { label: 'Secondary', value: 'secondary' }, { label: 'Outline', value: 'outline' }], defaultValue: 'primary' },
        { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
}
