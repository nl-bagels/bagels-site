import type { CollectionConfig } from 'payload'

export const MenuCategories: CollectionConfig = {
  slug: 'menu-categories',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'slug', 'sortOrder', 'visible'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'select',
      required: true,
      label: 'Category ID',
      options: [
        { label: 'Savory', value: 'savory' },
        { label: 'Sweet', value: 'sweet' },
        { label: 'Loose Bagels', value: 'loose_bagels' },
        { label: 'Drinks', value: 'drinks' },
        { label: 'Catering', value: 'catering' },
      ],
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      label: 'Display Name',
      localized: true,
    },
    {
      name: 'description',
      type: 'text',
      label: 'Short Description',
      localized: true,
      admin: {
        description: 'Shown below the category title on the menu page',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Sort Order',
      defaultValue: 0,
    },
    {
      name: 'visible',
      type: 'checkbox',
      label: 'Visible',
      defaultValue: true,
    },
  ],
}
