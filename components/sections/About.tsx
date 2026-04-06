import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

interface AboutProps {
  imageUrl?: string
}

export default async function About({ imageUrl }: AboutProps) {
  const t = await getTranslations('about')

  const usps = [
    { icon: '🗽', label: t('usps.recipe') },
    { icon: '🌿', label: t('usps.natural') },
    { icon: '✅', label: t('usps.halal') },
    { icon: '🎉', label: t('usps.catering') },
  ]

  const headingLines = t('heading').split('\n')

  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="flex-1 max-w-[584px]">
            <h2 className="font-['Outfit',sans-serif] font-semibold text-4xl lg:text-[48px] leading-[1.2] lg:leading-[57.6px] text-black mb-9">
              {headingLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < headingLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <div className="flex flex-col gap-4">
              <p className="font-['Inter',sans-serif] text-base lg:text-[18px] leading-[1.7] text-black">
                {t('p1')}
              </p>
              <p className="font-['Inter',sans-serif] text-base lg:text-[18px] leading-[1.7] text-black">
                {t('p2')}
              </p>
            </div>

            {/* USPs */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {usps.map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-2xl">{icon}</span>
                  <span className="font-['Inter',sans-serif] text-sm font-medium text-black">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-[584px] shrink-0">
            <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Netherlands Bagels interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 584px"
                />
              ) : (
                <div className="w-full h-full bg-stone-200 flex items-center justify-center">
                  <span className="text-stone-400 text-sm">{t('photoSoon')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
