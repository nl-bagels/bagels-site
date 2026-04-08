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
    vegan: 'bg-[#1e170e]/10 text-[#1e170e]',
    new: 'bg-[#9b5026]/10 text-[#9b5026]',
    popular: 'bg-[#b39978]/20 text-[#484037]',
    seasonal: 'bg-[#9b5026]/10 text-[#9b5026]',
  }

  return (
    <div className={`flex gap-4 py-5 border-b border-[#1e170e]/10 ${!available ? 'opacity-50' : ''}`}>
      {/* Image (optional) */}
      {imageUrl && (
        <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-[8px] bg-[#1e170e]/10">
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
            <span className="font-['Inter',sans-serif] font-medium text-base text-[#1e170e]">
              {name}
            </span>
            {!available && (
              <span className="ml-2 text-xs text-[#484037] font-['Inter',sans-serif]">
                {t('unavailable')}
              </span>
            )}
          </div>
          <span className="font-['Inter',sans-serif] font-medium text-base text-[#9b5026] shrink-0">
            €{price.toFixed(2)}
          </span>
        </div>

        {description && (
          <p className="font-['Inter',sans-serif] text-sm text-[#484037] mt-1 leading-5">
            {description}
          </p>
        )}

        {notes && (
          <p className="font-['Inter',sans-serif] text-xs text-[#484037] mt-1 italic">
            {notes}
          </p>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`inline-block px-2 py-0.5 text-xs font-['Inter',sans-serif] font-medium rounded-full ${
                  tagColors[tag] ?? 'bg-[#1e170e]/10 text-[#484037]'
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
