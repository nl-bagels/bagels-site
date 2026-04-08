import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function MenuHighlight() {
  const t = await getTranslations('menuHighlight')

  return (
    <section className="bg-[#eee6d9] py-[120px] overflow-hidden">
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 items-center">

          {/* Left — text */}
          <div className="flex flex-col gap-5 lg:w-[490px] shrink-0 z-10">
            <h2
              className="font-['Anton',sans-serif] text-[#1e170e] uppercase"
              style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 1 }}
            >
              {t('heading')}
            </h2>
            <p className="font-['Inter',sans-serif] text-[#484037] text-[20px] leading-[28px] max-w-[474px]">
              {t('subtitle')}
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center self-start bg-[#9b5026] text-white px-10 py-4 text-[20px] font-['Inter',sans-serif] rounded-[16px] hover:bg-[#7d3f1e] transition-colors mt-2"
            >
              {t('cta')}
            </Link>
          </div>

          {/* Right — two overlapping rounded images */}
          <div className="relative flex-1 h-[480px] lg:h-[690px] min-w-0">
            {/* Right photo (behind, top-right) */}
            <div
              className="absolute rounded-[40px] overflow-hidden bg-[#2a1e12]"
              style={{
                right: 0,
                top: 0,
                bottom: '14%',
                width: '55%',
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[#eee6d9]/10 text-8xl">🥯</span>
              </div>
            </div>
            {/* Left photo (front, offset down) */}
            <div
              className="absolute rounded-[40px] overflow-hidden bg-[#3a2a1a]"
              style={{
                left: 0,
                top: '14%',
                bottom: 0,
                width: '55%',
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[#eee6d9]/10 text-8xl">🥯</span>
              </div>
            </div>
            {/* Badge / seal */}
            <div
              className="absolute z-10 bg-[#9b5026] rounded-full flex items-center justify-center"
              style={{
                width: '109px',
                height: '109px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <span className="text-[#eee6d9] text-2xl">🔥</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
