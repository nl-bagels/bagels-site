import Hero from '@/components/sections/Hero'

export default function HeroBlockComponent({ block, reservationUrl }: { block: any; reservationUrl?: string }) {
  const imageUrl = block.backgroundImage && typeof block.backgroundImage === 'object' && 'url' in block.backgroundImage
    ? (block.backgroundImage.url as string)
    : undefined
  return (
    <Hero
      title={block.title}
      subtitle={block.subtitle}
      ctaLabel={block.ctaLabel}
      ctaUrl={block.ctaUrl || reservationUrl || '#'}
      backgroundImageUrl={imageUrl}
      backgroundVideo={block.backgroundVideo}
      textColor={block.textColor ?? 'light'}
    />
  )
}
