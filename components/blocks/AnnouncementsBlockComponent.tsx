import { getTranslations } from 'next-intl/server'
import { getAnnouncements } from '@/lib/payload'
import { Link } from '@/i18n/navigation'
import RichTextClient from './RichTextClient'

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

interface AnnouncementsBlockComponentProps {
  block: { heading?: string; maxItems?: number }
  locale?: string
}

export default async function AnnouncementsBlockComponent({
  block,
  locale = 'en',
}: AnnouncementsBlockComponentProps) {
  const t = await getTranslations('announcements')
  const items = await getAnnouncements(locale as 'en' | 'nl', block.maxItems ?? 3)

  if (items.length === 0) return null

  return (
    <section className="bg-[#eee6d9] px-3 sm:px-6 py-12 sm:py-20">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-6 sm:gap-10">
        {block.heading && (
          <h2
            className="font-['Anton',sans-serif] uppercase text-[#1e170e] text-center"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
          >
            {block.heading}
          </h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.map((item: any) => (
            <div
              key={item.id}
              className="bg-white rounded-xl sm:rounded-[20px] p-4 sm:p-8 flex flex-col gap-3 sm:gap-4"
            >
              <div className="flex items-center justify-between gap-3">
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
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                )}
              </div>
              <h3 className="font-['Inter',sans-serif] font-semibold text-[18px] text-[#1e170e] leading-6">
                {item.title}
              </h3>
              {item.content && (
                <div className="font-['Inter',sans-serif] text-[14px] text-[#484037] leading-5 line-clamp-3">
                  <RichTextClient data={item.content} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            href="/news"
            className="font-['Inter',sans-serif] text-[#9b5026] font-medium text-[16px] hover:underline"
          >
            {t('viewAll')} →
          </Link>
        </div>
      </div>
    </section>
  )
}
