import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import MenuNav from '@/components/menu/MenuNav'
import MenuCategory from '@/components/menu/MenuCategory'
import { getMenuItems, getMenuCategories, getSiteSettings } from '@/lib/payload'

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'menuPage.metadata' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

const FALLBACK_CATEGORY_SLUGS = ['savory', 'sweet', 'loose_bagels', 'drinks', 'catering'] as const

interface Props {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string }>
}

export default async function MenuPage({ params, searchParams }: Props) {
  const { locale } = await params
  const resolvedSearch = await searchParams
  const t = await getTranslations({ locale, namespace: 'menuPage' })
  const tCats = await getTranslations({ locale, namespace: 'menuPreview.categories' })

  const FALLBACK_CATEGORIES = [
    { slug: 'savory', label: tCats('savory.label'), description: tCats('savory.description'), sortOrder: 0, visible: true },
    { slug: 'sweet', label: tCats('sweet.label'), description: tCats('sweet.description'), sortOrder: 1, visible: true },
    { slug: 'loose_bagels', label: tCats('loose_bagels.label'), description: tCats('loose_bagels.description'), sortOrder: 2, visible: true },
    { slug: 'drinks', label: tCats('drinks.label'), description: tCats('drinks.description'), sortOrder: 3, visible: true },
  ]

  const activeCategory = resolvedSearch.category ?? FALLBACK_CATEGORIES[0].slug

  let categories = FALLBACK_CATEGORIES
  let allItems: Awaited<ReturnType<typeof getMenuItems>> = []

  const payloadLocale = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl'

  try {
    const [rawCategories, items] = await Promise.all([
      getMenuCategories(payloadLocale),
      getMenuItems(undefined, payloadLocale),
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
  } catch {
    // DB not available
  }

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
          <h1 className="font-['Outfit',sans-serif] font-semibold text-4xl lg:text-[56px] leading-tight text-black">
            {t('heading')}
          </h1>
          <p className="font-['Inter',sans-serif] text-[#4a5565] text-lg mt-4">
            {t('subtitle')}
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
            <h3 className="font-['Outfit',sans-serif] font-semibold text-xl text-black mb-3">
              {t('allergiesHeading')}
            </h3>
            <p className="font-['Inter',sans-serif] text-[#4a5565] text-base leading-relaxed">
              {t('allergiesText')}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
