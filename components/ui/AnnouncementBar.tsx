'use client'

import { useEffect, useState } from 'react'

interface AnnouncementBarProps {
  text: string
  linkText?: string
  linkUrl?: string
}

export default function AnnouncementBar({ text, linkText, linkUrl }: AnnouncementBarProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('announcement-dismissed')
    if (!dismissed) setVisible(true)
  }, [])

  if (!visible) return null

  return (
    <div className="bg-[#3a7d44] text-white text-sm py-2 px-4 flex items-center justify-center gap-3 relative">
      <span>{text}</span>
      {linkText && linkUrl && (
        <a
          href={linkUrl}
          className="underline font-medium hover:no-underline"
        >
          {linkText}
        </a>
      )}
      <button
        onClick={() => {
          localStorage.setItem('announcement-dismissed', '1')
          setVisible(false)
        }}
        aria-label="Dismiss announcement"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-lg leading-none"
      >
        ×
      </button>
    </div>
  )
}
