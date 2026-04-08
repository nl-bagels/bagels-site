import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'

export default async function MenuHighlight() {
  const t = await getTranslations('menuHighlight')

  return (
    <section className="bg-[#1e170e] py-[80px] lg:py-[100px] overflow-hidden">
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* Left — text */}
          <div className="flex flex-col gap-5 lg:w-[440px] shrink-0">
            <h2
              className="font-['Anton',sans-serif] text-[#eee6d9]/30 uppercase"
              style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 1 }}
            >
              {t('heading')}
            </h2>
            <p className="font-['Inter',sans-serif] text-[#eee6d9]/50 text-[18px] leading-[26px] max-w-[400px]">
              {t('subtitle')}
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center self-start bg-[#9b5026] text-white px-8 py-4 text-[18px] font-['Inter',sans-serif] rounded-[14px] hover:bg-[#7d3f1e] transition-colors mt-2"
            >
              {t('cta')}
            </Link>
          </div>

          {/* Right — two portrait images side by side with badge */}
          <div className="relative flex-1 flex gap-3 lg:gap-4 min-w-0">

            {/* Badge — top-left of image group */}
            <div className="absolute -top-5 left-0 z-10" style={{ width: '110px', height: '110px' }}>
              <img
                src="/images/new-menu-badge.svg"
                alt="New Menu"
                width={110}
                height={110}
              />
            </div>

            {/* Left image — starts lower */}
            <div
              className="flex-1 rounded-[32px] overflow-hidden bg-[#2a1e12] mt-16"
              style={{ minHeight: '520px' }}
            >
              <Image
                src="/images/menu-highlight-1.png"
                alt="Menu highlight"
                width={600}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right image — starts at top */}
            <div
              className="flex-1 rounded-[32px] overflow-hidden bg-[#2a1e12]"
              style={{ minHeight: '520px' }}
            >
              <Image
                src="/images/menu-highlight-2.png"
                alt="Menu highlight"
                width={600}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
