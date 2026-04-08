import Image from 'next/image'

interface HeroProps {
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaUrl?: string
  backgroundImageUrl?: string
  backgroundVideo?: string
  textColor?: 'light' | 'dark'
}

export default function Hero({
  title,
  subtitle,
  ctaLabel,
  ctaUrl,
  backgroundImageUrl,
  backgroundVideo,
}: HeroProps) {
  const bgSrc = backgroundImageUrl ?? '/images/hero-bg.png'

  return (
    <section className="relative w-full pt-12 pb-12 bg-[#eee6d9]">
      {/* Dark rounded card */}
      <div className="mx-4 sm:mx-6 lg:mx-6 rounded-[40px] overflow-hidden relative bg-[#1e170e]" style={{ minHeight: '640px' }}>

        {/* Background media */}
        {backgroundVideo ? (
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-70"
            autoPlay muted loop playsInline
            poster={bgSrc}
          >
            <source src={backgroundVideo} />
          </video>
        ) : (
          <Image
            src={bgSrc}
            alt="Hero background"
            fill
            className="object-cover opacity-70"
            priority
            sizes="100vw"
          />
        )}

        {/* "NEW YORK STYLE" SVG text overlay at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <img
            src="/images/hero-text.svg"
            alt=""
            className="w-full"
            style={{ opacity: 0.35, display: 'block' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-start text-center px-4 pt-[76px] pb-24 min-h-[640px]">
          <div className="max-w-[638px] mx-auto flex flex-col items-center gap-6">
            <div className="flex flex-col items-center">
              <h1
                className="font-['Anton',sans-serif] text-[#eee6d9] uppercase tracking-[2px] leading-none"
                style={{ fontSize: 'clamp(40px, 5.5vw, 72px)' }}
              >
                {title}
              </h1>
              {subtitle && (
                <p
                  className="font-['Inria_Sans',sans-serif] text-[#eee6d9] mt-2"
                  style={{ fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: '32px' }}
                >
                  {subtitle}
                </p>
              )}
            </div>
            {ctaLabel && ctaUrl && (
              <a
                href={ctaUrl}
                className="inline-flex items-center justify-center bg-white text-[#1e170e] px-10 py-4 text-[20px] font-['Inter',sans-serif] rounded-[16px] hover:bg-[#eee6d9] transition-colors"
              >
                {ctaLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
