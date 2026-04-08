import { getTranslations } from 'next-intl/server'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import MenuHighlight from '@/components/sections/MenuHighlight'
import About from '@/components/sections/About'
import MenuPreview from '@/components/sections/MenuPreview'
import Catering from '@/components/sections/Catering'
import Location from '@/components/sections/Location'
import Jobs from '@/components/sections/Jobs'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import { getActiveHero, getOpenJobs, getSiteSettings, getPageBySlug } from '@/lib/payload'

export const revalidate = 60

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'hero' })
  const payloadLocale = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl'

  let hero = null
  let openJobs: Awaited<ReturnType<typeof getOpenJobs>> = []
  let settings: Awaited<ReturnType<typeof getSiteSettings>> | null = null
  let homePage = null

  try {
    ;[hero, openJobs, settings, homePage] = await Promise.all([
      getActiveHero(),
      getOpenJobs(),
      getSiteSettings(payloadLocale),
      getPageBySlug('/', payloadLocale),
    ])
  } catch {
    // DB not available in dev without env vars
  }

  // If a published homepage page exists in Payload with layout blocks, use BlockRenderer
  const layout = (homePage?.layout ?? []) as any[]
  if (layout.length > 0) {
    return (
      <BlockRenderer
        blocks={layout}
        siteSettings={settings}
        openJobs={openJobs.map((j) => ({ id: String(j.id), title: j.title }))}
      />
    )
  }

  // Fallback: hardcoded sections in Figma order
  const heroImage =
    hero?.backgroundImage &&
    typeof hero.backgroundImage === 'object' &&
    'url' in hero.backgroundImage
      ? (hero.backgroundImage.url as string)
      : undefined

  return (
    <>
      {/* 1. Hero — dark rounded card */}
      <Hero
        title={hero?.title ?? t('title')}
        subtitle={hero?.subtitle ?? t('subtitle')}
        ctaLabel={hero?.ctaLabel ?? t('cta')}
        ctaUrl={hero?.ctaUrl ?? settings?.reservationUrl ?? '#'}
        backgroundImageUrl={heroImage}
        backgroundVideo={hero?.backgroundVideo ?? undefined}
        textColor={(hero?.textColor as 'light' | 'dark') ?? 'light'}
      />

      {/* 2. Marquee ticker — brown strip */}
      <Marquee />

      {/* 3. MenuHighlight — "New Fresh Summer Menu" with overlapping photos */}
      <MenuHighlight />

      {/* 4. About — brown #9b5026 section with logo + heading */}
      <About />

      {/* 5. OurMenu — 4 dark category cards on vanilla bg */}
      <MenuPreview />

      {/* 6. Catering — dark rounded card with 4 white package tiles */}
      <Catering contactEmail={settings?.contactEmail ?? undefined} />

      {/* 7. Visit Us — map + address/hours/contact */}
      <Location
        address={settings?.address ?? undefined}
        phone={settings?.phone ?? undefined}
        whatsapp={settings?.whatsapp ?? undefined}
        email={settings?.contactEmail ?? undefined}
      />

      {/* 8. Join Our Team — brown section with photos */}
      <Jobs
        jobs={openJobs.map((j) => ({
          id: String(j.id),
          title: j.title,
        }))}
        contactEmail={settings?.contactEmail ?? undefined}
      />
    </>
  )
}
