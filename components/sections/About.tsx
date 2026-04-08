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

          {/* Icon + heading — Figma grid overlap layout */}
          <div className="w-full flex justify-center">
            {/*
              Figma: both icon and heading are in the same grid cell (col-1 row-1).
              Icon: 262×179, at (0,0)
              Heading: ml-[284px] mt-[16px], text-[80px], w-[552px]
            */}
            <div
              className="relative inline-grid"
              style={{ gridTemplateColumns: 'max-content', gridTemplateRows: 'max-content' }}
            >
              {/* Bagel icon — bottom layer */}
              <div
                className="relative"
                style={{ gridColumn: 1, gridRow: 1, width: '262px', height: '179px', zIndex: 1 }}
              >
                <Image
                  src="/logo/icon-light.png"
                  alt=""
                  fill
                  className="object-contain object-center"
                  sizes="262px"
                />
              </div>

              {/* Heading — top layer, offset right */}
              <h2
                className="font-['Anton',sans-serif] text-white uppercase not-italic"
                style={{
                  gridColumn: 1,
                  gridRow: 1,
                  fontSize: 'clamp(36px, 5.5vw, 80px)',
                  lineHeight: '0.925',
                  marginLeft: 'clamp(140px, 19vw, 284px)',
                  marginTop: '16px',
                  width: 'clamp(200px, 38vw, 552px)',
                  zIndex: 2,
                  position: 'relative',
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
