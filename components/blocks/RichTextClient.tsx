'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'

export default function RichTextClient({ data, className }: { data: any; className?: string }) {
  return <RichText data={data} className={className ?? 'rich-text'} />
}
