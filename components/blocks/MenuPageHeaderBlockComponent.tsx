const bgMap: Record<string, string> = { white: 'bg-white', gray: 'bg-[#f5f5f5]' }

export default function MenuPageHeaderBlockComponent({ block }: { block: any }) {
  return (
    <div className={`${bgMap[block.background ?? 'gray']} py-16 text-center`}>
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px]">
        <h1 className="font-['Outfit',sans-serif] font-semibold text-4xl lg:text-[56px] leading-tight text-black">
          {block.heading}
        </h1>
        {block.subtitle && (
          <p className="font-['Inter',sans-serif] text-[#4a5565] text-lg mt-4">{block.subtitle}</p>
        )}
      </div>
    </div>
  )
}
