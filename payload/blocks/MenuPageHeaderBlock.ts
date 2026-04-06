import type { Block } from 'payload'

export const MenuPageHeaderBlock: Block = {
  slug: 'menuPageHeaderBlock',
  labels: { singular: 'Menu Page Header', plural: 'Menu Page Headers' },
  fields: [
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'subtitle', type: 'text', localized: true },
    { name: 'background', type: 'select', options: [{ label: 'White', value: 'white' }, { label: 'Gray', value: 'gray' }], defaultValue: 'gray' },
  ],
}
