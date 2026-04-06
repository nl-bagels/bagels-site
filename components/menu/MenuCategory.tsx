import MenuItem from './MenuItem'

interface MenuItemData {
  id: string
  name: string
  description?: string | null
  price: number
  subcategory?: string | null
  tags?: string[]
  imageUrl?: string | null
  notes?: string | null
  available?: boolean
}

interface MenuCategoryProps {
  slug: string
  label: string
  description?: string | null
  items: MenuItemData[]
}

export default function MenuCategory({ slug, label, description, items }: MenuCategoryProps) {
  // Group by subcategory
  const grouped = items.reduce<Record<string, MenuItemData[]>>((acc, item) => {
    const key = item.subcategory ?? '__default'
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})

  const hasSubcategories =
    Object.keys(grouped).length > 1 ||
    (Object.keys(grouped).length === 1 && !grouped['__default'])

  return (
    <section id={`category-${slug}`} className="py-12 lg:py-16">
      <h2 className="font-['Outfit',sans-serif] font-semibold text-3xl lg:text-[40px] text-black mb-2">
        {label}
      </h2>
      {description && (
        <p className="font-['Inter',sans-serif] text-[#4a5565] text-base mb-8">{description}</p>
      )}

      {Object.entries(grouped).map(([subcat, subcatItems]) => (
        <div key={subcat} className="mb-8">
          {hasSubcategories && subcat !== '__default' && (
            <h3 className="font-['Inter',sans-serif] font-medium text-sm uppercase tracking-widest text-[#4a5565] mb-4 pb-2 border-b border-stone-100">
              {subcat}
            </h3>
          )}
          <div>
            {subcatItems.map((item) => (
              <MenuItem
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                tags={item.tags}
                imageUrl={item.imageUrl}
                notes={item.notes}
                available={item.available}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
