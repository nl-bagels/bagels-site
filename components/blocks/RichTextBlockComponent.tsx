import { RichText } from '@payloadcms/richtext-lexical/react'

const bgMap: Record<string, string> = {
  white: 'bg-[#eee6d9]',
  gray: 'bg-[#f5f5f5]',
  black: 'bg-[#1e170e] text-[#eee6d9]',
}

export default function RichTextBlockComponent({ block }: { block: any }) {
  return (
    <section className={`${bgMap[block.background ?? 'white']} py-12`}>
      <div className="max-w-[860px] mx-auto px-6 lg:px-8">
        {block.content && (
          <RichText
            data={block.content}
            className="prose prose-lg max-w-none font-['Inter',sans-serif] prose-headings:font-['Anton',sans-serif] prose-headings:uppercase prose-headings:text-[#1e170e] prose-p:text-[#484037] prose-li:text-[#484037] prose-a:text-[#9b5026] prose-a:underline"
          />
        )}
      </div>
    </section>
  )
}
