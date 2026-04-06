'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { useLocale } from 'next-intl'

interface HeaderProps {
  reservationUrl?: string
}

export default function Header({ reservationUrl = '#' }: HeaderProps) {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: t('menu'), href: '/menu' as const },
    { label: t('about'), href: '/#about' as const },
    { label: t('catering'), href: '/#catering' as const },
    { label: t('jobs'), href: '/#jobs' as const },
    { label: t('contact'), href: '/#contact' as const },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function switchLocale() {
    const nextLocale = locale === 'en' ? 'nl' : 'en'
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 border-b border-black/10 ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px] h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <div className="w-12 h-12 bg-[#3a7d44] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs text-center leading-tight">NB</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base text-black font-['Inter',sans-serif] transition-colors hover:text-[#3a7d44]"
            >
              {link.label}
            </Link>
          ))}

          {/* Language switcher */}
          <button
            onClick={switchLocale}
            className="text-base text-black font-['Inter',sans-serif] transition-colors hover:text-[#3a7d44] border border-black/20 px-3 py-1 rounded-sm"
            aria-label={`Switch to ${locale === 'en' ? 'Dutch' : 'English'}`}
          >
            {t('switchLang')}
          </button>

          <a
            href={reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#3a7d44] text-white px-6 py-2.5 text-base font-['Inter',sans-serif] hover:bg-[#2d6235] transition-colors"
          >
            {t('reserve')}
          </a>
        </nav>

        {/* Mobile burger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(true)}
          aria-label={t('openMenu')}
        >
          <span className="block w-6 h-0.5 bg-black" />
          <span className="block w-6 h-0.5 bg-black" />
          <span className="block w-6 h-0.5 bg-black" />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative ml-auto w-72 bg-white h-full flex flex-col p-8 gap-6">
            <button
              className="self-end text-2xl leading-none"
              onClick={() => setMobileOpen(false)}
              aria-label={t('closeMenu')}
            >
              ×
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg text-black hover:text-[#3a7d44] transition-colors font-['Inter',sans-serif]"
              >
                {link.label}
              </Link>
            ))}
            {/* Mobile language switcher */}
            <button
              onClick={() => { switchLocale(); setMobileOpen(false) }}
              className="text-left text-lg text-black hover:text-[#3a7d44] transition-colors font-['Inter',sans-serif]"
            >
              {t('switchLang')} — {locale === 'en' ? 'Nederlands' : 'English'}
            </button>
            <a
              href={reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto bg-[#3a7d44] text-white px-6 py-3 text-base text-center font-['Inter',sans-serif]"
            >
              {t('reserve')}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
