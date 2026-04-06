import { getPayload } from 'payload'
import configPromise from '@payload-config'

type Locale = 'en' | 'nl'

// Singleton payload instance for server-side use
export async function getPayloadClient() {
  return getPayload({ config: configPromise })
}

// Typed fetch helpers

export async function getSiteSettings(locale: Locale = 'en') {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings', locale, fallbackLocale: 'en' })
}

export async function getActiveHero() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'hero-blocks',
    where: { isActive: { equals: true } },
    limit: 1,
  })
  return result.docs[0] ?? null
}

export async function getMenuItems(category?: string, locale: Locale = 'en') {
  const payload = await getPayloadClient()
  const where: import('payload').Where = {
    available: { equals: true },
    ...(category ? { category: { equals: category } } : {}),
  }
  const result = await payload.find({
    collection: 'menu-items',
    where,
    sort: 'sortOrder',
    limit: 500,
    locale,
    fallbackLocale: 'en',
  })
  return result.docs
}

export async function getMenuCategories(locale: Locale = 'en') {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'menu-categories',
    where: { visible: { equals: true } },
    sort: 'sortOrder',
    limit: 20,
    locale,
    fallbackLocale: 'en',
  })
  return result.docs
}

export async function getOpenJobs() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'jobs',
    where: { isOpen: { equals: true } },
    sort: '-publishedAt',
    limit: 20,
  })
  return result.docs
}

export async function getNavigation(locale: Locale = 'en') {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'navigation', locale, fallbackLocale: 'en' })
}

export async function getFooterContent(locale: Locale = 'en') {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'footer-content', locale, fallbackLocale: 'en' })
}

export async function getPageBySlug(slug: string, locale: Locale = 'en') {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
    locale,
    fallbackLocale: 'en',
    depth: 3,
  })
  return result.docs[0] ?? null
}

export async function getAllPublishedPages() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: { status: { equals: 'published' } },
    limit: 1000,
    select: { slug: true },
  })
  return result.docs
}
