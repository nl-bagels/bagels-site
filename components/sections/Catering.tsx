import { getTranslations } from 'next-intl/server'

interface CateringProps {
  contactEmail?: string
}

const packageKeys = ['basic', 'super', 'brunch', 'deluxe'] as const

export default async function Catering({ contactEmail = 'hello@netherlandsbagels.com' }: CateringProps) {
  const t = await getTranslations('catering')

  const packages = packageKeys.map((key) => ({
    name: t(`packages.${key}.name`),
    items: t.raw(`packages.${key}.items`) as string[],
  }))

  return (
    <section id="catering" className="bg-[#eee6d9] px-3 sm:px-4 lg:px-6">
      {/* Dark rounded card */}
      <div className="bg-[#1e170e] rounded-[40px] py-12 sm:py-20 lg:py-[120px] px-3 sm:px-8 lg:px-[228px] flex flex-col gap-6 sm:gap-12 items-center">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:gap-4 items-center text-center text-[#eee6d9] max-w-[672px] px-2">
          <h2
            className="font-['Anton',sans-serif] uppercase"
            style={{ fontSize: 'clamp(28px, 4vw, 60px)', lineHeight: '1.2' }}
          >
            {t('heading')}
          </h2>
          <p className="font-['Inter',sans-serif] font-normal text-base sm:text-[20px] leading-relaxed sm:leading-[28px]">
            {t('tagline')}
          </p>
        </div>

        {/* Packages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 wide:grid-cols-4 gap-3 sm:gap-4 w-full">
          {packages.map((pkg) => (
            <div key={pkg.name} className="bg-white rounded-2xl sm:rounded-[24px] flex flex-col overflow-hidden">
              {/* Name */}
              <div className="p-4 sm:p-8 pb-2 sm:pb-4">
                <h3 className="font-['Anton',sans-serif] text-lg sm:text-[24px] leading-tight sm:leading-[36px] text-[#1e170e]">
                  {pkg.name}
                </h3>
              </div>
              {/* Items */}
              <div className="flex flex-col gap-2 p-4 sm:p-8 pt-2 sm:pt-4 flex-1">
                {pkg.items.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 mt-0.5 shrink-0 text-[#9b5026]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="font-['Inter',sans-serif] text-xs sm:text-[15px] text-[#1e170e] leading-snug sm:leading-[22px]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons callout */}
        <p className="font-['Anton',sans-serif] text-[#eee6d9] text-[22px] uppercase text-center tracking-wide">
          {t('addons')}
        </p>

        {/* CTA */}
        <a
          href={`mailto:${contactEmail}?subject=Catering Inquiry`}
          className="inline-flex items-center justify-center bg-white text-[#1e170e] px-10 py-4 text-[20px] font-['Inter',sans-serif] rounded-[16px] hover:bg-[#eee6d9] transition-colors"
        >
          {t('cta')}
        </a>

        {/* Order & Delivery info */}
        <div className="flex flex-col gap-6 items-center text-center w-full max-w-[640px]">
          {/* Order note */}
          <div className="bg-white/10 rounded-[16px] px-8 py-6 flex flex-col gap-2">
            <p className="font-['Inter',sans-serif] font-semibold text-[#eee6d9] text-[15px]">
              {t('orderNote')}
            </p>
            <p className="font-['Inter',sans-serif] text-[#b39978] text-[14px]">
              {t('orderContact')}
            </p>
          </div>

          {/* Delivery */}
          <div className="flex flex-col gap-2 text-[#eee6d9]">
            <p className="font-['Anton',sans-serif] text-[18px] uppercase tracking-wide">
              {t('deliveryHeading')}
            </p>
            <ul className="flex flex-col gap-1">
              {(['deliveryPickup', 'deliveryLocal', 'deliveryNL'] as const).map((key) => (
                <li key={key} className="font-['Inter',sans-serif] text-[14px] text-[#b39978]">
                  {t(key)}
                </li>
              ))}
            </ul>
            <p className="font-['Inter',sans-serif] text-[12px] text-[#b39978]/60 mt-1">
              {t('priceNote')}
            </p>
          </div>
        </div>

        {/* B2B note */}
        <p className="font-['Inter',sans-serif] text-[14px] text-[#b39978] text-center max-w-[480px]">
          {t('b2bNote')}
        </p>
      </div>
    </section>
  )
}
