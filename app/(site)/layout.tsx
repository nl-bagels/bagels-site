import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import '../globals.css'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import AnnouncementBar from '@/components/ui/AnnouncementBar'
import StructuredData from '@/components/ui/StructuredData'
import { getSiteSettings } from '@/lib/payload'

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

export const metadata: Metadata = {
  title: 'Netherlands Bagels | New York-Style Bagels in The Hague',
  description:
    'Freshly baked New York-style bagels in The Hague. Dine in, takeaway and catering. 100% Halal.',
  openGraph: {
    title: 'Netherlands Bagels | New York-Style Bagels in The Hague',
    description:
      'Freshly baked New York-style bagels in The Hague. Dine in, takeaway and catering. 100% Halal.',
    images: ['/og-image.jpg'],
    type: 'website',
  },
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let settings: Awaited<ReturnType<typeof getSiteSettings>> | null = null
  try {
    settings = await getSiteSettings()
  } catch {
    // DB not available during build/dev without env
  }

  const announcement = settings?.announcementBar

  return (
    <html lang="nl" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        {announcement?.enabled && announcement.text && (
          <AnnouncementBar
            text={announcement.text}
            linkText={announcement.linkText ?? undefined}
            linkUrl={announcement.linkUrl ?? undefined}
          />
        )}
        <Header reservationUrl={settings?.reservationUrl ?? '#'} />
        <StructuredData />
        <main>{children}</main>
        <Footer
          address={settings?.address ?? undefined}
          phone={settings?.phone ?? undefined}
          email={settings?.contactEmail ?? undefined}
          instagramUrl={settings?.instagramUrl ?? undefined}
          facebookUrl={settings?.facebookUrl ?? undefined}
        />
      </body>
    </html>
  )
}
