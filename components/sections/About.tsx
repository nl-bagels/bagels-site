import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

interface AboutProps {
  imageUrl?: string
}

export default async function About({ imageUrl }: AboutProps) {
  const t = await getTranslations('about')

  return (
    <section id="about" className="bg-[#9b5026] py-[120px]">
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[435px]">
        <div className="flex flex-col gap-8 items-center">

          {/* Mobile: icon on top, heading below. Desktop: Figma grid overlap */}
          <div className="w-full flex justify-center">

            {/* Mobile layout — stacked */}
            <div className="flex lg:hidden flex-col items-center gap-4 text-center">
              <div className="relative w-[160px] h-[110px]">
                <Image src="/logo/icon-light.png" alt="" fill className="object-contain" sizes="160px" />
              </div>
              <h2
                className="font-['Anton',sans-serif] text-white uppercase"
                style={{ fontSize: 'clamp(36px, 10vw, 56px)', lineHeight: '0.925' }}
              >
                No-Nonsense<br />New York Bagels
              </h2>
            </div>

            {/* Desktop layout — Figma grid overlap */}
            <div
              className="hidden lg:inline-grid"
              style={{ gridTemplateColumns: 'max-content', gridTemplateRows: 'max-content' }}
            >
              <div
                className="relative"
                style={{ gridColumn: 1, gridRow: 1, width: '262px', height: '179px', zIndex: 1 }}
              >
                <Image src="/logo/icon-light.png" alt="" fill className="object-contain object-center" sizes="262px" />
              </div>
              <h2
                className="font-['Anton',sans-serif] text-white uppercase not-italic"
                style={{
                  gridColumn: 1, gridRow: 1,
                  fontSize: '80px', lineHeight: '0.925',
                  marginLeft: '284px', marginTop: '16px',
                  width: '552px', zIndex: 2, position: 'relative',
                }}
              >
                No-Nonsense<br />New York Bagels
              </h2>
            </div>

          </div>

          {/* Body text */}
          <div className="flex flex-col gap-3 text-center w-full">
            <p className="font-['Inter',sans-serif] text-[#eee6d9] text-[20px] leading-[28px]">
              {t('p1')}
            </p>
            <p className="font-['Inter',sans-serif] text-[#eee6d9] text-[20px] leading-[28px]">
              {t('p2')}
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
