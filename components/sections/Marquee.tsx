'use client'

interface MarqueeProps {
  text?: string
}

const BAGEL_ICON = (
  <svg
    viewBox="0 0 25 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block w-[22px] h-[25px] shrink-0"
    aria-hidden="true"
  >
    <ellipse cx="12.5" cy="14" rx="10" ry="12" stroke="#eee6d9" strokeWidth="2" fill="none" />
    <ellipse cx="12.5" cy="14" rx="4" ry="5" stroke="#eee6d9" strokeWidth="2" fill="none" />
  </svg>
)

const ITEMS = [
  'No-Nonsense New York Bagels',
  'Netherlands Bagels',
  'No-Nonsense New York Bagels',
  'Netherlands Bagels',
  'No-Nonsense New York Bagels',
  'Netherlands Bagels',
  'No-Nonsense New York Bagels',
  'Netherlands Bagels',
]

export default function Marquee() {
  return (
    <div className="bg-[#b39978] h-[62px] overflow-hidden relative w-full">
      <div className="absolute inset-0 flex items-center">
        <div
          className="flex gap-8 items-center animate-marquee"
          style={{ width: 'max-content' }}
        >
          {/* Doubled for seamless loop */}
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-8 shrink-0">
              <span
                className="font-['Anton',sans-serif] text-[#eee6d9] uppercase text-[28px] leading-none whitespace-nowrap"
              >
                {item}
              </span>
              {BAGEL_ICON}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
