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
  textColor = 'light',
}: HeroProps) {
  const textClass = textColor === 'light' ? 'text-white' : 'text-black'

  return (
    <section className="relative w-full h-[55vh] md:h-screen min-h-[480px] max-h-[997px] overflow-hidden">
      {/* Background */}
      {backgroundVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={backgroundImageUrl}
        >
          <source src={backgroundVideo} />
        </video>
      ) : backgroundImageUrl ? (
        <Image
          src={backgroundImageUrl}
          alt="Hero background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-stone-800" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1
            className={`font-['Playfair_Display',serif] font-semibold text-4xl sm:text-5xl md:text-[72px] leading-[1.2] md:leading-[86.4px] mb-6 ${textClass}`}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={`font-['Inter',sans-serif] text-lg md:text-2xl leading-8 mb-8 ${textClass}`}
            >
              {subtitle}
            </p>
          )}
          {ctaLabel && ctaUrl && (
            <a
              href={ctaUrl}
              className="inline-block bg-[#3a7d44] text-white px-10 py-4 text-base md:text-lg font-['Inter',sans-serif] hover:bg-[#2d6235] transition-colors"
            >
              {ctaLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
