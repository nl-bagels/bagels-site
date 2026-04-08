import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { getMenuCategories } from '@/lib/payload'

const FALLBACK_IMAGES: Record<string, string> = {
  savory: '/images/menu-savory.jpg',
  sweet: '/images/menu-sweet.jpg',
  loose_bagels: '/images/menu-loose.jpg',
  drinks: '/images/menu-drinks.jpg',
}

export default async function MenuPreview() {
  const t = await getTranslations('menuPreview')

  let cmsCategories: { slug: string; label: string; description: string; imageUrl: string | null }[] = []
  try {
    const raw = await getMenuCategories('en')
    cmsCategories = raw
      .filter((c) => ['savory', 'sweet', 'loose_bagels', 'drinks'].includes(c.slug as string))
      .map((c) => ({
        slug: c.slug as string,
        label: c.label,
        description: c.description ?? '',
        imageUrl:
          c.image && typeof c.image === 'object' && 'url' in c.image
            ? (c.image.url as string)
            : (FALLBACK_IMAGES[c.slug as string] ?? null),
      }))
  } catch {}

  const categories =
    cmsCategories.length > 0
      ? cmsCategories
      : (['savory', 'sweet', 'loose_bagels', 'drinks'] as const).map((slug) => ({
          slug,
          label: t(`categories.${slug}.label`),
          description: t(`categories.${slug}.description`),
          imageUrl: FALLBACK_IMAGES[slug],
        }))

  return (
    <section id="menu" className="bg-[#eee6d9] py-[120px]">
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px]">
        <div className="flex flex-col gap-12 items-center">
          {/* Centered header */}
          <div className="flex flex-col gap-4 items-center text-center">
            <h2
              className="font-['Anton',sans-serif] text-[#1e170e] uppercase"
              style={{ fontSize: 'clamp(40px, 5vw, 60px)', lineHeight: '64px' }}
            >
              {t('heading')}
            </h2>
            <p className="font-['Inter',sans-serif] text-[#484037] text-[20px] leading-[28px]">
              {t('subtitle')}
            </p>
          </div>

          {/* 4-card row */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/menu?category=${cat.slug}`}
                className="bg-[#1e170e] overflow-hidden rounded-[20px] group hover:scale-[1.02] transition-transform duration-300 flex flex-col"
                style={{ minHeight: '426px' }}
              >
                {/* Image — fixed 286px height */}
                <div className="relative w-full shrink-0 overflow-hidden" style={{ height: '286px' }}>
                  {cat.imageUrl ? (
                    <Image
                      src={cat.imageUrl}
                      alt={cat.label}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 286px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#2a1e12]">
                      <span className="text-[#eee6d9]/20 text-6xl">🥯</span>
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2 p-6 flex-1">
                  <h3 className="font-['Anton',sans-serif] text-[24px] text-[#eee6d9] leading-[36px]">
                    {cat.label}
                  </h3>
                  <p className="font-['Inter',sans-serif] text-[#eee6d9] text-[18px] leading-[24px]">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Centered CTA */}
          <Link
            href="/menu"
            className="inline-flex items-center justify-center bg-[#9b5026] text-white px-10 py-4 text-[20px] font-['Inter',sans-serif] rounded-[16px] hover:bg-[#7d3f1e] transition-colors"
          >
            {t('viewFull')}
          </Link>
        </div>
      </div>
    </section>
  )
}
