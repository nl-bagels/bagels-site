import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  access: { read: () => true },
  fields: [
    {
      name: 'navLinks',
      type: 'array',
      label: 'Navigation Links',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    { name: 'reserveLabel', type: 'text', localized: true, label: 'Reserve Button Label' },
    { name: 'openMenuLabel', type: 'text', localized: true, label: 'Open Menu (mobile)' },
    { name: 'closeMenuLabel', type: 'text', localized: true, label: 'Close Menu (mobile)' },
  ],
}
