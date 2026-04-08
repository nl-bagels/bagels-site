'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface Category {
  slug: string
  label: string
}

interface MenuNavProps {
  categories: Category[]
  activeCategory: string
}

export default function MenuNav({ categories, activeCategory }: MenuNavProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const navRef = useRef<HTMLDivElement>(null)
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const el = navRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 1, rootMargin: '-81px 0px 0px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleClick = (slug: string) => {
    router.push(`?category=${slug}`, { scroll: false })
    const section = document.getElementById(`category-${slug}`)
    if (section) {
      const offset = 160 // header + nav height
      const top = section.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div
      ref={navRef}
      className={`sticky top-20 z-40 bg-[#eee6d9] transition-shadow ${stuck ? 'shadow-sm border-b border-[#1e170e]/10' : ''}`}
    >
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px]">
        <div className="flex gap-0 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = cat.slug === activeCategory
            return (
              <button
                key={cat.slug}
                onClick={() => handleClick(cat.slug)}
                className={`shrink-0 px-5 py-4 text-base font-['Inter',sans-serif] border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-[#9b5026] text-[#9b5026] font-medium'
                    : 'border-transparent text-[#484037] hover:text-[#1e170e]'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
