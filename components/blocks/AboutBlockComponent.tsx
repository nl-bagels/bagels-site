import Image from 'next/image'

export default function AboutBlockComponent({ block }: { block: any }) {
  const imageUrl = block.image && typeof block.image === 'object' && 'url' in block.image
    ? (block.image.url as string)
    : undefined
  const headingLines = (block.heading ?? '').split('\n')
  const usps = block.usps ?? []

  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="flex-1 max-w-[584px]">
            <h2 className="font-['Outfit',sans-serif] font-semibold text-4xl lg:text-[48px] leading-[1.2] lg:leading-[57.6px] text-black mb-9">
              {headingLines.map((line: string, i: number) => (
                <span key={i}>{line}{i < headingLines.length - 1 && <br />}</span>
              ))}
            </h2>
            <div className="flex flex-col gap-4">
              {block.p1 && <p className="font-['Inter',sans-serif] text-base lg:text-[18px] leading-[1.7] text-black">{block.p1}</p>}
              {block.p2 && <p className="font-['Inter',sans-serif] text-base lg:text-[18px] leading-[1.7] text-black">{block.p2}</p>}
            </div>
            {usps.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mt-10">
                {usps.map(({ icon, label }: { icon: string; label: string }, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-2xl">{icon}</span>
                    <span className="font-['Inter',sans-serif] text-sm font-medium text-black">{label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-full lg:w-[584px] shrink-0">
            <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden">
              {imageUrl ? (
                <Image src={imageUrl} alt="Netherlands Bagels interior" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 584px" />
              ) : (
                <div className="w-full h-full bg-stone-200 flex items-center justify-center">
                  <span className="text-stone-400 text-sm">{block.photoSoonLabel ?? 'Photo coming soon'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
