'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

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
  const navRef = useRef<HTMLDivElement>(null)
  const activeTabRef = useRef<HTMLButtonElement>(null)
  const [stuck, setStuck] = useState(false)
  const [currentSlug, setCurrentSlug] = useState(activeCategory)
  const isClickScrolling = useRef(false)

  // Detect when nav becomes sticky
  useEffect(() => {
    const sentinel = document.createElement('div')
    sentinel.style.cssText = 'position:absolute;height:1px;width:100%;pointer-events:none'
    navRef.current?.parentElement?.insertBefore(sentinel, navRef.current)
    const obs = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { rootMargin: '-81px 0px 0px 0px', threshold: 1 },
    )
    obs.observe(sentinel)
    return () => { obs.disconnect(); sentinel.remove() }
  }, [])

  // Track active category on scroll via IntersectionObserver
  useEffect(() => {
    const NAV_OFFSET = 160
    const observers: IntersectionObserver[] = []

    categories.forEach((cat) => {
      const section = document.getElementById(`category-${cat.slug}`)
      if (!section) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (isClickScrolling.current) return
          if (entry.isIntersecting) setCurrentSlug(cat.slug)
        },
        { rootMargin: `-${NAV_OFFSET}px 0px -40% 0px`, threshold: 0 },
      )
      obs.observe(section)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [categories])

  // Scroll active tab into view in the nav bar
  useEffect(() => {
    activeTabRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [currentSlug])

  const handleClick = (slug: string) => {
    setCurrentSlug(slug)
    router.push(`?category=${slug}`, { scroll: false })

    const section = document.getElementById(`category-${slug}`)
    if (!section) return

    isClickScrolling.current = true
    const offset = 160
    const top = section.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })

    // Re-enable scroll tracking after animation finishes
    setTimeout(() => { isClickScrolling.current = false }, 800)
  }

  return (
    <div
      ref={navRef}
      className={`sticky top-20 z-40 bg-[#eee6d9] transition-shadow ${stuck ? 'shadow-sm border-b border-[#1e170e]/10' : ''}`}
    >
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px]">
        <div className="flex gap-0 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = cat.slug === currentSlug
            return (
              <button
                key={cat.slug}
                ref={isActive ? activeTabRef : null}
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
