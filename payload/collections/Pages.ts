import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/HeroBlock.ts'
import { AboutBlock } from '../blocks/AboutBlock.ts'
import { MenuPreviewBlock } from '../blocks/MenuPreviewBlock.ts'
import { CateringBlock } from '../blocks/CateringBlock.ts'
import { LocationBlock } from '../blocks/LocationBlock.ts'
import { JobsListBlock } from '../blocks/JobsListBlock.ts'
import { RichTextBlock } from '../blocks/RichTextBlock.ts'
import { CTABlock } from '../blocks/CTABlock.ts'
import { MenuPageHeaderBlock } from '../blocks/MenuPageHeaderBlock.ts'
import { AllergiesNoteBlock } from '../blocks/AllergiesNoteBlock.ts'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL path. Use "/" for homepage, "menu" for /menu, etc.' },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        AboutBlock,
        MenuPreviewBlock,
        CateringBlock,
        LocationBlock,
        JobsListBlock,
        RichTextBlock,
        CTABlock,
        MenuPageHeaderBlock,
        AllergiesNoteBlock,
      ],
    },
  ],
}
