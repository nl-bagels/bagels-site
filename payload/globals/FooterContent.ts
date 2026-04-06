import type { GlobalConfig } from 'payload'

export const FooterContent: GlobalConfig = {
  slug: 'footer-content',
  label: 'Footer Content',
  access: { read: () => true },
  fields: [
    { name: 'tagline', type: 'text', localized: true },
    { name: 'since', type: 'text', localized: true },
    { name: 'contactLabel', type: 'text', localized: true },
    { name: 'followUsLabel', type: 'text', localized: true },
    { name: 'copyrightText', type: 'text', localized: true, admin: { description: 'Use {year} as placeholder' } },
    {
      name: 'bottomLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'href', type: 'text' },
      ],
    },
  ],
}
