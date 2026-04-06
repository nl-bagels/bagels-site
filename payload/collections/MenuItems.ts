import type { CollectionConfig } from 'payload'

export const MenuItems: CollectionConfig = {
  slug: 'menu-items',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'available'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Item Name',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      localized: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Price (€)',
      admin: {
        description: 'Enter price in euros, e.g. 12.5 for €12.50',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Category',
      options: [
        { label: 'Savory', value: 'savory' },
        { label: 'Sweet', value: 'sweet' },
        { label: 'Loose Bagels', value: 'loose_bagels' },
        { label: 'Drinks', value: 'drinks' },
        { label: 'Catering', value: 'catering' },
      ],
    },
    {
      name: 'subcategory',
      type: 'text',
      label: 'Subcategory',
      localized: true,
      admin: {
        description: 'e.g. Bagel Sandwiches, Iced Drinks',
      },
    },
    {
      name: 'tags',
      type: 'select',
      hasMany: true,
      label: 'Tags',
      options: [
        { label: 'Vegan', value: 'vegan' },
        { label: 'New', value: 'new' },
        { label: 'Popular', value: 'popular' },
        { label: 'Seasonal', value: 'seasonal' },
        { label: 'Gluten Free', value: 'gluten_free' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo',
      admin: {
        description: 'Optional. Card will be text-only if not provided.',
      },
    },
    {
      name: 'available',
      type: 'checkbox',
      label: 'Available',
      defaultValue: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Sort Order',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first within the category',
      },
    },
    {
      name: 'notes',
      type: 'text',
      label: 'Notes',
      localized: true,
      admin: {
        description: 'e.g. Add scrambled egg +€2',
      },
    },
  ],
}
