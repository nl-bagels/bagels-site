import RichTextClient from './RichTextClient'

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
          <RichTextClient data={block.content} />
        )}
      </div>
    </section>
  )
}
