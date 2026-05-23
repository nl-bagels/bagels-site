import { getTranslations } from 'next-intl/server'
import { getAnnouncements } from '@/lib/payload'
import RichTextClient from '@/components/blocks/RichTextClient'

const typeColors: Record<string, string> = {
  promo: 'bg-[#9b5026]/10 text-[#9b5026]',
  news: 'bg-[#1e170e]/10 text-[#1e170e]',
  event: 'bg-[#2d6a4f]/10 text-[#2d6a4f]',
}

const typeLabels: Record<string, Record<string, string>> = {
  promo: { en: 'Promo', nl: 'Aanbieding' },
  news: { en: 'News', nl: 'Nieuws' },
  event: { en: 'Event', nl: 'Evenement' },
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations('announcements')
  const items = await getAnnouncements(locale as 'en' | 'nl', 50)

  return (
    <div className="bg-[#eee6d9] min-h-screen">
      {/* Hero */}
      <div className="bg-[#1e170e] px-6 py-20 text-center">
        <h1
          className="font-['Anton',sans-serif] uppercase text-[#eee6d9]"
          style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}
        >
          {t('heading')}
        </h1>
        <p className="font-['Inter',sans-serif] text-[#b39978] text-[18px] mt-4 max-w-[480px] mx-auto">
          {t('subheading')}
        </p>
      </div>

      {/* Articles */}
      <div className="max-w-[860px] mx-auto px-6 py-16 flex flex-col gap-8">
        {items.length === 0 ? (
          <p className="font-['Inter',sans-serif] text-[#484037] text-center text-[16px]">
            {t('empty')}
          </p>
        ) : (
          items.map((item: any) => (
            <article
              key={item.id}
              className="bg-white rounded-[20px] p-8 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className={`inline-block px-3 py-1 text-xs font-['Inter',sans-serif] font-semibold rounded-full uppercase tracking-wide ${
                    typeColors[item.type] ?? typeColors.news
                  }`}
                >
                  {typeLabels[item.type]?.[locale] ?? item.type}
                </span>
                {item.publishedAt && (
                  <span className="text-xs text-[#b39978] font-['Inter',sans-serif]">
                    {new Date(item.publishedAt).toLocaleDateString(locale === 'nl' ? 'nl-NL' : 'en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                )}
              </div>
              <h2 className="font-['Anton',sans-serif] text-[#1e170e] text-[26px] uppercase leading-8">
                {item.title}
              </h2>
              {item.content && (
                <div className="font-['Inter',sans-serif] text-[15px] text-[#484037] leading-6">
                  <RichTextClient data={item.content} />
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  )
}
