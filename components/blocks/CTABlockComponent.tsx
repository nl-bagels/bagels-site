export default function CTABlockComponent({ block }: { block: any }) {
  const buttons = block.buttons ?? []
  return (
    <section className="bg-white py-16">
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px] text-center">
        {block.heading && <h2 className="font-['Outfit',sans-serif] font-semibold text-4xl text-black mb-4">{block.heading}</h2>}
        {block.body && <p className="font-['Inter',sans-serif] text-[#4a5565] text-lg mb-8 max-w-2xl mx-auto">{block.body}</p>}
        <div className="flex flex-wrap gap-4 justify-center">
          {buttons.map((btn: any, i: number) => {
            const cls = btn.style === 'primary'
              ? 'bg-[#3a7d44] text-white hover:bg-[#2d6235]'
              : btn.style === 'outline'
              ? 'border border-black text-black hover:bg-black hover:text-white'
              : 'bg-black text-white hover:bg-stone-800'
            return (
              <a key={i} href={btn.href} target={btn.openInNewTab ? '_blank' : undefined} rel={btn.openInNewTab ? 'noopener noreferrer' : undefined} className={`px-10 py-4 text-base font-['Inter',sans-serif] transition-colors ${cls}`}>
                {btn.label}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
