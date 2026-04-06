import type { GlobalConfig } from 'payload'

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
      type: 'array',
      label: 'Opening Hours',
      fields: [
        { name: 'dayLabel', type: 'text', localized: true, label: 'Day(s)', admin: { description: 'e.g. Monday – Friday' } },
        { name: 'hours', type: 'text', label: 'Hours', admin: { description: 'e.g. 7:00 – 18:00' } },
      ],
    },
    { name: 'reservationUrl', type: 'text', label: 'Reservation URL (Tebi)' },
    {
      name: 'siteMetadata',
      type: 'group',
      label: 'SEO / Metadata',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
