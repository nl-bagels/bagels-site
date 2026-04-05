import { Suspense } from 'react'
import type { Metadata } from 'next'
import MenuNav from '@/components/menu/MenuNav'
import MenuCategory from '@/components/menu/MenuCategory'
import { getMenuItems, getMenuCategories, getSiteSettings } from '@/lib/payload'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Menu | Netherlands Bagels',
  description:
    'Explore our full menu: savory bagel sandwiches, sweet treats, loose bagels, drinks and catering options. All 100% halal.',
}

const FALLBACK_CATEGORIES = [
  { slug: 'savory', label: 'Savory', description: 'Classic bagel sandwiches with fresh ingredients', sortOrder: 0, visible: true },
  { slug: 'sweet', label: 'Sweet', description: 'Indulgent bagels and sweet treats', sortOrder: 1, visible: true },
  { slug: 'loose_bagels', label: 'Loose Bagels', description: 'Fresh bagels to take home', sortOrder: 2, visible: true },
  { slug: 'drinks', label: 'Drinks', description: 'Coffee, tea, and specialty beverages', sortOrder: 3, visible: true },
  { slug: 'catering', label: 'Catering', description: 'Packages for events and meetings', sortOrder: 4, visible: true },
]

interface Props {
  searchParams: Promise<{ category?: string }>
}

export default async function MenuPage({ searchParams }: Props) {
  const params = await searchParams
  const activeCategory = params.category ?? FALLBACK_CATEGORIES[0].slug

  let categories = FALLBACK_CATEGORIES
  let allItems: Awaited<ReturnType<typeof getMenuItems>> = []
  let settings: Awaited<ReturnType<typeof getSiteSettings>> | null = null

  try {
    const [rawCategories, items, siteSettings] = await Promise.all([
      getMenuCategories(),
      getMenuItems(),
      getSiteSettings(),
    ])
    if (rawCategories.length > 0) {
      categories = rawCategories.map((c) => ({
        slug: c.slug,
        label: c.label,
        description: c.description ?? null,
        sortOrder: c.sortOrder ?? 0,
        visible: c.visible ?? true,
      }))
    }
    allItems = items
    settings = siteSettings
  } catch {
    // DB not available
  }

  // Group items by category
  const itemsByCategory = allItems.reduce<Record<string, typeof allItems>>((acc, item) => {
    const cat = item.category as string
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {})

  return (
    <>
      {/* Page hero */}
      <div className="bg-[#f5f5f5] py-16 text-center">
        <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px]">
          <h1 className="font-['Playfair_Display',serif] font-semibold text-4xl lg:text-[56px] leading-tight text-black">
            Our Menu
          </h1>
          <p className="font-['Inter',sans-serif] text-[#4a5565] text-lg mt-4">
            Handcrafted with love, baked fresh daily
          </p>
        </div>
      </div>

      {/* Sticky category nav */}
      <Suspense>
        <MenuNav categories={categories} activeCategory={activeCategory} />
      </Suspense>

      {/* Menu content */}
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px] divide-y divide-stone-100">
        {categories.map((cat) => {
          const items = (itemsByCategory[cat.slug] ?? []).map((item) => {
            const imageUrl =
              item.image &&
              typeof item.image === 'object' &&
              'url' in item.image
                ? (item.image.url as string)
                : null

            return {
              id: String(item.id),
              name: item.name,
              description: item.description ?? null,
              price: item.price,
              subcategory: item.subcategory ?? null,
              tags: (item.tags as string[] | undefined) ?? [],
              imageUrl,
              notes: item.notes ?? null,
              available: item.available ?? true,
            }
          })

          return (
            <MenuCategory
              key={cat.slug}
              slug={cat.slug}
              label={cat.label}
              description={cat.description}
              items={items}
            />
          )
        })}
      </div>

      {/* Allergy note */}
      <div className="bg-[#f5f5f5] py-12 mt-8">
        <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px]">
          <div className="max-w-2xl">
            <h3 className="font-['Playfair_Display',serif] font-semibold text-xl text-black mb-3">
              Allergies & Info
            </h3>
            <p className="font-['Inter',sans-serif] text-[#4a5565] text-base leading-relaxed">
              Please inform us of any allergies before ordering. Our kitchen is{' '}
              <strong className="text-black">NOT</strong> safe for celiacs. All our products are
              100% halal. Prices may vary — please check in-store for the latest menu.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
