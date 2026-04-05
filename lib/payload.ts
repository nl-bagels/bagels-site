import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Singleton payload instance for server-side use
export async function getPayloadClient() {
  return getPayload({ config: configPromise })
}

// Typed fetch helpers

export async function getSiteSettings() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings' })
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

export async function getMenuItems(category?: string) {
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
  })
  return result.docs
}

export async function getMenuCategories() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'menu-categories',
    where: { visible: { equals: true } },
    sort: 'sortOrder',
    limit: 20,
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
