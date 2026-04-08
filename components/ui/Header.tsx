'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { useLocale } from 'next-intl'

interface HeaderProps {
  reservationUrl?: string
  navData?: any
}

export default function Header({ reservationUrl = '#', navData }: HeaderProps) {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks: { label: string; href: string }[] = navData?.navLinks && navData.navLinks.length > 0
    ? navData.navLinks
    : [
        { label: t('menu'), href: '/menu' },
        { label: t('about'), href: '/#about' },
        { label: t('catering'), href: '/#catering' },
        { label: t('jobs'), href: '/#jobs' },
        { label: t('contact'), href: '/#contact' },
      ]

  const reserveLabel = navData?.reserveLabel ?? t('reserve')
  const openMenuLabel = navData?.openMenuLabel ?? t('openMenu')
  const closeMenuLabel = navData?.closeMenuLabel ?? t('closeMenu')

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
      className={`sticky top-0 z-50 bg-[#eee6d9] transition-shadow duration-300 border-b border-[#1e170e]/10 ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px] h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-[13px] shrink-0">
          {/* Bagel icon — 70×52px per Figma */}
          <Image
            src="/logo/icon-dark.png"
            alt=""
            width={70}
            height={52}
            className="object-contain shrink-0"
            priority
          />
          {/* Wordmark — 137×43px per Figma */}
          <img
            src="/logo/wordmark.svg"
            alt="Netherlands Bagels"
            width={137}
            height={43}
            className="shrink-0"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[18px] text-[#1e170e] font-['Inter',sans-serif] font-medium transition-colors hover:text-[#9b5026]"
            >
              {link.label}
            </Link>
          ))}

          {/* Language switcher */}
          <button
            onClick={switchLocale}
            className="flex items-center gap-1.5 text-base text-[#1e170e] font-['Inter',sans-serif] font-medium transition-colors hover:text-[#9b5026] border border-[#1e170e]/20 px-3 py-1 rounded-sm cursor-pointer"
            aria-label={`Switch to ${locale === 'en' ? 'Dutch' : 'English'}`}
          >
            <span>{locale === 'en' ? '🇳🇱' : '🇬🇧'}</span>
            <span>{t('switchLang')}</span>
          </button>

          <a
            href={reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#9b5026] text-white px-6 py-3 text-base font-['Inter',sans-serif] rounded-[12px] hover:bg-[#7d3f1e] transition-colors"
          >
            {reserveLabel}
          </a>
        </nav>

        {/* Mobile burger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(true)}
          aria-label={openMenuLabel}
        >
          <span className="block w-6 h-0.5 bg-[#1e170e]" />
          <span className="block w-6 h-0.5 bg-[#1e170e]" />
          <span className="block w-6 h-0.5 bg-[#1e170e]" />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="relative ml-auto w-72 bg-[#eee6d9] h-full flex flex-col p-8 gap-6">
            <button
              className="self-end text-2xl leading-none text-[#1e170e]"
              onClick={() => setMobileOpen(false)}
              aria-label={closeMenuLabel}
            >
              ×
            </button>
            {/* Mobile logo */}
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
              <Image src="/logo/icon-dark.png" alt="" width={52} height={39} className="object-contain shrink-0" />
              <img src="/logo/wordmark.svg" alt="Netherlands Bagels" width={100} height={31} className="shrink-0" />
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg text-[#1e170e] hover:text-[#9b5026] transition-colors font-['Inter',sans-serif] font-medium"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { switchLocale(); setMobileOpen(false) }}
              className="flex items-center gap-2 text-left text-lg text-[#1e170e] hover:text-[#9b5026] transition-colors font-['Inter',sans-serif] cursor-pointer"
            >
              <span>{locale === 'en' ? '🇳🇱' : '🇬🇧'}</span>
              <span>{t('switchLang')} — {locale === 'en' ? 'Nederlands' : 'English'}</span>
            </button>
            <a
              href={reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto bg-[#9b5026] text-white px-6 py-3 text-base text-center font-['Inter',sans-serif] rounded-[12px] hover:bg-[#7d3f1e] transition-colors"
            >
              {reserveLabel}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
