'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface HeaderProps {
  reservationUrl?: string
}

const navLinks = [
  { label: 'Menu', href: '/menu' },
  { label: 'About', href: '/#about' },
  { label: 'Catering', href: '/#catering' },
  { label: 'Jobs', href: '/#jobs' },
  { label: 'Contact', href: '/#contact' },
]

export default function Header({ reservationUrl = '#' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          <a
            href={reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#3a7d44] text-white px-6 py-2.5 text-base font-['Inter',sans-serif] hover:bg-[#2d6235] transition-colors"
          >
            Reserve a table →
          </a>
        </nav>

        {/* Mobile burger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
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
              aria-label="Close menu"
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
            <a
              href={reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto bg-[#3a7d44] text-white px-6 py-3 text-base text-center font-['Inter',sans-serif]"
            >
              Reserve a table →
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
