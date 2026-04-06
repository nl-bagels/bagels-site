import Link from 'next/link'
import Image from 'next/image'

const categories = [
  {
    slug: 'savory',
    label: 'Savory',
    description: 'Classic bagel sandwiches with fresh ingredients',
    imageUrl: null as string | null,
  },
  {
    slug: 'sweet',
    label: 'Sweet',
    description: 'Indulgent bagels and sweet treats',
    imageUrl: null as string | null,
  },
  {
    slug: 'loose_bagels',
    label: 'Loose Bagels',
    description: 'Fresh bagels to take home',
    imageUrl: null as string | null,
  },
  {
    slug: 'drinks',
    label: 'Drinks',
    description: 'Coffee, tea, and specialty beverages',
    imageUrl: null as string | null,
  },
]

export default function MenuPreview() {
  return (
    <section id="menu" className="bg-[#f5f5f5] py-20 lg:py-24">
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px]">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-['Outfit',sans-serif] font-semibold text-4xl lg:text-[48px] leading-[57.6px] text-black mb-4">
            Our Menu
          </h2>
          <p className="font-['Inter',sans-serif] text-[#4a5565] text-base lg:text-[18px]">
            Discover our selection of handcrafted bagels and more
          </p>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/menu?category=${cat.slug}`}
              className="bg-white overflow-hidden group hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative w-full aspect-square overflow-hidden bg-stone-100">
                {cat.imageUrl ? (
                  <Image
                    src={cat.imageUrl}
                    alt={cat.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 286px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-stone-100">
                    <span className="text-stone-300 text-4xl">🥯</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-['Outfit',sans-serif] font-semibold text-2xl text-black mb-2">
                  {cat.label}
                </h3>
                <p className="font-['Inter',sans-serif] text-[#4a5565] text-base leading-6">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <Link
            href="/menu"
            className="bg-black text-white px-10 py-4 text-base font-['Inter',sans-serif] hover:bg-stone-800 transition-colors"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  )
}
