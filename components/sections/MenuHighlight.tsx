import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'

export default async function MenuHighlight() {
  const t = await getTranslations('menuHighlight')

  return (
    <section className="bg-[#eee6d9] relative overflow-hidden" style={{ minHeight: '831px' }}>
      <div className="max-w-[1672px] mx-auto relative" style={{ minHeight: '831px' }}>

        {/* Left — text, vertically centered */}
        <div
          className="absolute flex flex-col gap-5 z-10"
          style={{ left: '232px', top: '282px', width: '489px' }}
        >
          <h2
            className="font-['Anton',sans-serif] text-[#1e170e] uppercase"
            style={{ fontSize: '72px', lineHeight: '72px' }}
          >
            {t('heading')}
          </h2>
          <p className="font-['Inter',sans-serif] text-[#484037] text-[20px] leading-[28px]" style={{ maxWidth: '474px' }}>
            {t('subtitle')}
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center justify-center self-start bg-[#9b5026] text-white px-10 py-4 text-[20px] font-['Inter',sans-serif] rounded-[16px] hover:bg-[#7d3f1e] transition-colors"
          >
            {t('cta')}
          </Link>
        </div>

        {/* Right — two overlapping images */}
        <div className="absolute" style={{ left: '745px', top: '71px', width: '701px', height: '689px' }}>
          {/* Right image — behind, starts at top */}
          <div className="absolute rounded-[40px] overflow-hidden" style={{ left: '312px', top: 0, bottom: '99px', width: '389px' }}>
            <Image
              src="/images/menu-highlight-2.png"
              alt=""
              fill
              className="object-cover"
              sizes="389px"
            />
          </div>

          {/* Left image — front, offset down */}
          <div className="absolute rounded-[40px] overflow-hidden" style={{ left: 0, top: '99px', bottom: 0, width: '389px' }}>
            <Image
              src="/images/menu-highlight-1.png"
              alt=""
              fill
              className="object-cover"
              sizes="389px"
            />
          </div>
        </div>

        {/* Badge — at intersection of text and images */}
        <div className="absolute z-20" style={{ left: '690px', top: '148px', width: '109px', height: '109px' }}>
          <img
            src="/images/new-menu-badge.svg"
            alt="New Menu"
            width={109}
            height={109}
            className="w-full h-full"
          />
        </div>

      </div>
    </section>
  )
}
