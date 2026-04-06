import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

interface MenuItemProps {
  name: string
  description?: string | null
  price: number
  tags?: string[]
  imageUrl?: string | null
  notes?: string | null
  available?: boolean
}

export default async function MenuItem({
  name,
  description,
  price,
  tags = [],
  imageUrl,
  notes,
  available = true,
}: MenuItemProps) {
  const t = await getTranslations('menuItem')

  const tagColors: Record<string, string> = {
    vegan: 'bg-green-50 text-green-700',
    new: 'bg-blue-50 text-blue-700',
    popular: 'bg-amber-50 text-amber-700',
    seasonal: 'bg-orange-50 text-orange-700',
  }

  return (
    <div className={`flex gap-4 py-5 border-b border-stone-100 ${!available ? 'opacity-50' : ''}`}>
      {/* Image (optional) */}
      {imageUrl && (
        <div className="relative w-20 h-20 shrink-0 overflow-hidden bg-stone-100">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <span className="font-['Inter',sans-serif] font-medium text-base text-black">
              {name}
            </span>
            {!available && (
              <span className="ml-2 text-xs text-stone-400 font-['Inter',sans-serif]">
                {t('unavailable')}
              </span>
            )}
          </div>
          <span className="font-['Inter',sans-serif] font-medium text-base text-black shrink-0">
            €{price.toFixed(2)}
          </span>
        </div>

        {description && (
          <p className="font-['Inter',sans-serif] text-sm text-[#4a5565] mt-1 leading-5">
            {description}
          </p>
        )}

        {notes && (
          <p className="font-['Inter',sans-serif] text-xs text-[#4a5565] mt-1 italic">
            {notes}
          </p>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`inline-block px-2 py-0.5 text-xs font-['Inter',sans-serif] font-medium rounded-full ${
                  tagColors[tag] ?? 'bg-stone-100 text-stone-600'
                }`}
              >
                {t(`tags.${tag}` as Parameters<typeof t>[0]) ?? tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
