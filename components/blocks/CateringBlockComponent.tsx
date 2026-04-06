export default function CateringBlockComponent({ block, siteSettings }: { block: any; siteSettings?: any }) {
  const email = block.ctaEmail || siteSettings?.contactEmail || 'hello@netherlandsbagels.com'
  const packages = block.packages ?? []

  return (
    <section id="catering" className="bg-white py-20 lg:py-24">
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px]">
        <div className="text-center mb-14">
          <h2 className="font-['Outfit',sans-serif] font-semibold text-4xl lg:text-[48px] leading-[57.6px] text-black mb-4">{block.heading}</h2>
          <p className="font-['Inter',sans-serif] text-[#4a5565] text-base lg:text-[18px] max-w-[672px] mx-auto leading-7">{block.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg: any, i: number) => (
            <div key={i} className="bg-[#f5f5f5] p-8">
              <h3 className="font-['Outfit',sans-serif] font-semibold text-[28px] leading-[42px] text-black mb-2">{pkg.name}</h3>
              <p className="font-['Inter',sans-serif] text-[#4a5565] text-base mb-6">{pkg.subtitle}</p>
              <ul className="flex flex-col gap-2">
                {(pkg.items ?? []).map((it: any, j: number) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="text-[#3a7d44] font-['Inter',sans-serif] text-base leading-6 shrink-0">✓</span>
                    <span className="font-['Inter',sans-serif] text-base text-black leading-6">{it.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <a href={`mailto:${email}?subject=Catering Inquiry`} className="bg-[#3a7d44] text-white px-10 py-4 text-base font-['Inter',sans-serif] hover:bg-[#2d6235] transition-colors">
            {block.ctaLabel ?? 'Contact us for catering'}
          </a>
        </div>
      </div>
    </section>
  )
}
