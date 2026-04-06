import { notFound } from 'next/navigation'
import { getAllPublishedPages, getPageBySlug, getOpenJobs, getSiteSettings } from '@/lib/payload'
import BlockRenderer from '@/components/blocks/BlockRenderer'

export const revalidate = 60

const RESERVED_SLUGS = ['menu', 'jobs']

export async function generateStaticParams() {
  try {
    const pages = await getAllPublishedPages()
    return pages
      .filter((p) => {
        const s = (p as any).slug as string | null | undefined
        return s && !RESERVED_SLUGS.includes(s) && s !== '/'
      })
      .map((p) => ({ slug: ((p as any).slug as string).split('/').filter(Boolean) }))
  } catch {
    return []
  }
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>
}) {
  const { locale, slug } = await params
  const slugStr = slug.join('/')
  const payloadLocale = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl'

  let page = null
  let settings = null
  let openJobs: any[] = []

  try {
    ;[page, settings, openJobs] = await Promise.all([
      getPageBySlug(slugStr, payloadLocale),
      getSiteSettings(payloadLocale),
      getOpenJobs(),
    ])
  } catch {
    // DB not available
  }

  if (!page) notFound()

  const layout = (page.layout ?? []) as any[]

  return (
    <BlockRenderer
      blocks={layout}
      siteSettings={settings}
      openJobs={openJobs.map((j) => ({ id: String(j.id), title: j.title, description: j.description }))}
    />
  )
}
