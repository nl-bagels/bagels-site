'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { useLocale } from 'next-intl'

interface HeaderProps {
  reservationUrl?: string
  orderUrl?: string
  whatsappNumber?: string
  navData?: any
}

export default function Header({ reservationUrl = '#', orderUrl, whatsappNumber, navData }: HeaderProps) {
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

  const reserveLabel = (navData?.reserveLabel ?? t('reserve')).replace(/ ?→$/, '')
  const openMenuLabel = navData?.openMenuLabel ?? t('openMenu')
  const closeMenuLabel = navData?.closeMenuLabel ?? t('closeMenu')

  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`
    : null

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
      <div className="max-w-[1672px] mx-auto px-3 sm:px-4 wide:px-12 h-20 flex items-center justify-between gap-2 sm:gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-[13px] shrink-0 min-w-0">
          <Image
            src="/logo/icon-dark.png"
            alt=""
            width={70}
            height={52}
            className="w-12 sm:w-[70px] h-auto object-contain shrink-0"
            priority
          />
          <img
            src="/logo/wordmark.svg"
            alt="Netherlands Bagels"
            width={137}
            height={43}
            className="w-24 sm:w-[137px] h-auto shrink-0"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-6">
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
            className="flex items-center gap-1 text-sm sm:text-base text-[#1e170e] font-['Inter',sans-serif] font-medium transition-colors hover:text-[#9b5026] border border-[#1e170e]/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-sm cursor-pointer shrink-0"
            aria-label={`Switch to ${locale === 'en' ? 'Dutch' : 'English'}`}
          >
            <span>{locale === 'en' ? '🇳🇱' : '🇬🇧'}</span>
            <span>{t('switchLang')}</span>
          </button>

          {/* WhatsApp icon button - hidden on md/lg, shown on xl+ */}
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('whatsapp')}
              className="hidden xl:flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#1ebe5c] transition-colors shrink-0"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          )}

          {/* Order Online button */}
          {orderUrl && (
            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#9b5026] text-white px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-base font-['Inter',sans-serif] rounded-lg sm:rounded-[12px] hover:bg-[#7d3f1e] transition-colors shrink-0 whitespace-nowrap"
            >
              {t('order')}<span className="hidden wide:inline"> →</span>
            </a>
          )}

          {/* Reserve button */}
          <a
            href={reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1e170e] text-[#eee6d9] px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-base font-['Inter',sans-serif] rounded-lg sm:rounded-[12px] hover:bg-[#3a2e22] transition-colors shrink-0 whitespace-nowrap"
          >
            {reserveLabel}<span className="hidden wide:inline"> →</span>
          </a>
        </nav>

        {/* Mobile burger */}
        <button
          className="xl:hidden flex flex-col gap-1.5 p-2"
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
          <div className="relative ml-auto w-72 bg-[#eee6d9] h-full flex flex-col p-8 gap-6 overflow-y-auto">
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
            <div className="mt-auto flex flex-col gap-3">
              {/* WhatsApp */}
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 text-base text-center font-['Inter',sans-serif] rounded-[12px] hover:bg-[#1ebe5c] transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t('whatsapp')}
                </a>
              )}
              {/* Order Online */}
              {orderUrl && (
                <a
                  href={orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#9b5026] text-white px-6 py-3 text-base text-center font-['Inter',sans-serif] rounded-[12px] hover:bg-[#7d3f1e] transition-colors"
                >
                  {t('order')}
                </a>
              )}
              {/* Reserve */}
              <a
                href={reservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1e170e] text-[#eee6d9] px-6 py-3 text-base text-center font-['Inter',sans-serif] rounded-[12px] hover:bg-[#3a2e22] transition-colors"
              >
                {reserveLabel}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
