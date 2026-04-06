export default function AllergiesNoteBlockComponent({ block }: { block: any }) {
  return (
    <div className="bg-[#f5f5f5] py-12 mt-8">
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px]">
        <div className="max-w-2xl">
          {block.heading && (
            <h3 className="font-['Outfit',sans-serif] font-semibold text-xl text-black mb-3">{block.heading}</h3>
          )}
          {block.body && (
            <p className="font-['Inter',sans-serif] text-[#4a5565] text-base leading-relaxed">{block.body}</p>
          )}
        </div>
      </div>
    </div>
  )
}
