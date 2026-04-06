import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { getMenuCategories } from '@/lib/payload'

export default async function MenuPreviewBlockComponent({ block }: { block: any }) {
  return (
    <section id="menu" className="bg-[#f5f5f5] py-20 lg:py-24">
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px]">
        <div className="text-center mb-12">
          <h2 className="font-['Outfit',sans-serif] font-semibold text-4xl lg:text-[48px] leading-[57.6px] text-black mb-4">
            {block.heading}
          </h2>
          <p className="font-['Inter',sans-serif] text-[#4a5565] text-base lg:text-[18px]">{block.subtitle}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {/* We render a placeholder grid — actual categories come from menu-categories collection */}
          {['savory', 'sweet', 'loose_bagels', 'drinks'].map((slug) => (
            <Link key={slug} href={`/menu?category=${slug}`} className="bg-white overflow-hidden group hover:shadow-md transition-shadow">
              <div className="relative w-full aspect-square overflow-hidden bg-stone-100">
                <div className="w-full h-full flex items-center justify-center bg-stone-100">
                  <span className="text-stone-300 text-4xl">🥯</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-['Outfit',sans-serif] font-semibold text-2xl text-black mb-2 capitalize">{slug.replace('_', ' ')}</h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link href="/menu" className="bg-black text-white px-10 py-4 text-base font-['Inter',sans-serif] hover:bg-stone-800 transition-colors">
            {block.viewFullLabel ?? 'View Full Menu'}
          </Link>
        </div>
      </div>
    </section>
  )
}
