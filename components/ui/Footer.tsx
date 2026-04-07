import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

interface FooterProps {
  address?: string
  phone?: string
  email?: string
  instagramUrl?: string
  facebookUrl?: string
  footerData?: any
}

export default async function Footer({
  address = 'Korte Molenstraat 11A, 2513 BH Den Haag',
  phone = '+31 12 345 6789',
  email = 'hello@netherlandsbagels.com',
  instagramUrl = '#',
  facebookUrl = '#',
  footerData,
}: FooterProps) {
  const t = await getTranslations('footer')
  const currentYear = new Date().getFullYear()

  const tagline = footerData?.tagline ?? t('tagline')
  const since = footerData?.since ?? t('since')
  const contactLabel = footerData?.contactLabel ?? t('contact')
  const followUsLabel = footerData?.followUsLabel ?? t('followUs')
  const copyrightText = footerData?.copyrightText
    ? footerData.copyrightText.replace('{year}', String(currentYear))
    : t('copyright', { year: currentYear })
  const bottomLinks: { label: string; href: string }[] = footerData?.bottomLinks && footerData.bottomLinks.length > 0
    ? footerData.bottomLinks
    : [
        { label: t('terms'), href: '/terms' },
        { label: t('privacy'), href: '/privacy' },
      ]

  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px] pt-12 pb-0">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 pb-10">
          {/* Brand */}
          <div className="lg:w-[384px] shrink-0">
            <div className="w-16 h-16 bg-[#3a7d44] rounded-full flex items-center justify-center mb-5">
              <span className="text-white font-bold text-sm">NB</span>
            </div>
            <p className="text-[#99a1af] text-base leading-6">{tagline}</p>
            <p className="text-[#99a1af] text-base leading-6">{since}</p>
          </div>

          {/* Contact */}
          <div className="lg:w-[384px] shrink-0 lg:ml-8">
            <h4 className="font-['Inter',sans-serif] font-medium text-base text-white mb-4">{contactLabel}</h4>
            <div className="flex flex-col gap-2">
              {address.split(',').map((line, i) => (
                <p key={i} className="text-[#99a1af] text-base">{line.trim()}</p>
              ))}
              <p className="text-[#99a1af] text-base">{phone}</p>
              <p className="text-[#99a1af] text-base">{email}</p>
            </div>
          </div>

          {/* Follow */}
          <div className="lg:w-[384px] shrink-0 lg:ml-8">
            <h4 className="font-['Inter',sans-serif] font-medium text-base text-white mb-4">{followUsLabel}</h4>
            <div className="flex gap-4">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-6 h-6 text-[#99a1af] hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-6 h-6 text-[#99a1af] hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1e2939] py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[#99a1af] text-sm">{copyrightText}</p>
          <div className="flex gap-6">
            {bottomLinks.map((link) => (
              <Link key={link.href} href={link.href as any} className="text-[#99a1af] text-sm hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
