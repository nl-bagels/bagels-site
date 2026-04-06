import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'heroBlock',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'subtitle', type: 'text', localized: true },
    { name: 'ctaLabel', type: 'text', localized: true },
    { name: 'ctaUrl', type: 'text' },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
    { name: 'backgroundVideo', type: 'text', admin: { description: 'URL to background video (mp4)' } },
    { name: 'textColor', type: 'select', options: [{ label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }], defaultValue: 'light' },
  ],
}
