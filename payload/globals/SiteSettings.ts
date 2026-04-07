import type { GlobalConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    description: 'Global site configuration — announcement bar, contact info, opening hours.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'announcementBar',
      type: 'group',
      label: 'Announcement Bar',
      fields: [
        { name: 'enabled', type: 'checkbox', label: 'Show announcement bar', defaultValue: false },
        { name: 'text', type: 'text', label: 'Announcement Text' },
        { name: 'linkText', type: 'text', label: 'Link Text' },
        { name: 'linkUrl', type: 'text', label: 'Link URL' },
      ],
    },
    { name: 'contactEmail', type: 'email', label: 'Contact Email' },
    { name: 'phone', type: 'text', label: 'Phone Number' },
    { name: 'whatsapp', type: 'text', label: 'WhatsApp Number' },
    { name: 'instagramUrl', type: 'text', label: 'Instagram URL' },
    { name: 'facebookUrl', type: 'text', label: 'Facebook URL' },
    { name: 'address', type: 'text', label: 'Address' },
    {
      name: 'openingHours',
      type: 'richText',
      editor: lexicalEditor({}),
      label: 'Opening Hours (legacy)',
      admin: { description: 'Use the structured opening hours below instead.' },
    },
    { name: 'reservationUrl', type: 'text', label: 'Reservation URL (Tebi)' },
    {
      name: 'menuFooterNote',
      type: 'richText',
      editor: lexicalEditor({}),
      label: 'Menu Page Allergy Note',
      admin: { description: 'Shown at the bottom of the /menu page' },
    },
  ],
}
