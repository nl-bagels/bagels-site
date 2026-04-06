import { getTranslations } from 'next-intl/server'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import MenuPreview from '@/components/sections/MenuPreview'
import Catering from '@/components/sections/Catering'
import Location from '@/components/sections/Location'
import Jobs from '@/components/sections/Jobs'
import { getActiveHero, getOpenJobs, getSiteSettings } from '@/lib/payload'

export const revalidate = 60

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'hero' })

  let hero = null
  let openJobs: Awaited<ReturnType<typeof getOpenJobs>> = []
  let settings: Awaited<ReturnType<typeof getSiteSettings>> | null = null

  try {
    ;[hero, openJobs, settings] = await Promise.all([
      getActiveHero(),
      getOpenJobs(),
      getSiteSettings(),
    ])
  } catch {
    // DB not available in dev without env vars
  }

  const heroImage =
    hero?.backgroundImage &&
    typeof hero.backgroundImage === 'object' &&
    'url' in hero.backgroundImage
      ? (hero.backgroundImage.url as string)
      : undefined

  return (
    <>
      <Hero
        title={hero?.title ?? t('title')}
        subtitle={hero?.subtitle ?? t('subtitle')}
        ctaLabel={hero?.ctaLabel ?? t('cta')}
        ctaUrl={hero?.ctaUrl ?? settings?.reservationUrl ?? '#'}
        backgroundImageUrl={heroImage}
        backgroundVideo={hero?.backgroundVideo ?? undefined}
        textColor={(hero?.textColor as 'light' | 'dark') ?? 'light'}
      />
      <About />
      <MenuPreview />
      <Catering contactEmail={settings?.contactEmail ?? undefined} />
      <Location
        address={settings?.address ?? undefined}
        phone={settings?.phone ?? undefined}
        whatsapp={settings?.whatsapp ?? undefined}
        email={settings?.contactEmail ?? undefined}
      />
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
