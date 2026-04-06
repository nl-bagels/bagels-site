import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const RichTextBlock: Block = {
  slug: 'richTextBlock',
  labels: { singular: 'Rich Text', plural: 'Rich Texts' },
  fields: [
    { name: 'content', type: 'richText', editor: lexicalEditor({}), localized: true },
    { name: 'background', type: 'select', options: [{ label: 'White', value: 'white' }, { label: 'Gray', value: 'gray' }, { label: 'Black', value: 'black' }], defaultValue: 'white' },
    { name: 'maxWidth', type: 'select', options: [{ label: 'Narrow', value: 'narrow' }, { label: 'Default', value: 'default' }, { label: 'Wide', value: 'wide' }], defaultValue: 'default' },
  ],
}
