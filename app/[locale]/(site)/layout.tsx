import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import '../../globals.css'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import AnnouncementBar from '@/components/ui/AnnouncementBar'
import StructuredData from '@/components/ui/StructuredData'
import { getSiteSettings, getNavigation, getFooterContent } from '@/lib/payload'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: ['/og-image.jpg'],
      type: 'website',
    },
  }
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound()
  }

  const messages = await getMessages()
  const payloadLocale = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl'

  let settings: Awaited<ReturnType<typeof getSiteSettings>> | null = null
  let navData: Awaited<ReturnType<typeof getNavigation>> | null = null
  let footerData: Awaited<ReturnType<typeof getFooterContent>> | null = null
  try {
    ;[settings, navData, footerData] = await Promise.all([
      getSiteSettings(payloadLocale),
      getNavigation(payloadLocale),
      getFooterContent(payloadLocale),
    ])
  } catch {
    // DB not available during build/dev without env
  }

  const announcement = settings?.announcementBar

  return (
    <html lang={locale} className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {announcement?.enabled && announcement.text && (
            <AnnouncementBar
              text={announcement.text}
              linkText={announcement.linkText ?? undefined}
              linkUrl={announcement.linkUrl ?? undefined}
            />
          )}
          <Header
            reservationUrl={settings?.reservationUrl ?? '#'}
            navData={navData}
          />
          <StructuredData />
          <main>{children}</main>
          <Footer
            address={settings?.address ?? undefined}
            phone={settings?.phone ?? undefined}
            email={settings?.contactEmail ?? undefined}
            instagramUrl={settings?.instagramUrl ?? undefined}
            facebookUrl={settings?.facebookUrl ?? undefined}
            footerData={footerData}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
