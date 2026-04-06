const bgMap: Record<string, string> = { white: 'bg-white', gray: 'bg-[#f5f5f5]', black: 'bg-black text-white' }
const maxWMap: Record<string, string> = { narrow: 'max-w-2xl', default: 'max-w-[1672px]', wide: 'max-w-[1672px]' }

export default function RichTextBlockComponent({ block }: { block: any }) {
  return (
    <section className={`${bgMap[block.background ?? 'white']} py-12`}>
      <div className={`${maxWMap[block.maxWidth ?? 'default']} mx-auto px-4 sm:px-8 lg:px-[228px]`}>
        <div className="prose prose-lg max-w-none font-['Inter',sans-serif]" />
      </div>
    </section>
  )
}
