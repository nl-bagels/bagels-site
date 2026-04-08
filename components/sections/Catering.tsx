import { getTranslations } from 'next-intl/server'

interface CateringProps {
  contactEmail?: string
}

const packageKeys = ['basic', 'super', 'brunch', 'deluxe'] as const

export default async function Catering({ contactEmail = 'hello@netherlandsbagels.com' }: CateringProps) {
  const t = await getTranslations('catering')

  const packages = packageKeys.map((key) => ({
    name: t(`packages.${key}.name`),
    subtitle: t(`packages.${key}.subtitle`),
    items: t.raw(`packages.${key}.items`) as string[],
  }))

  return (
    <section id="catering" className="bg-[#eee6d9] px-6">
      {/* Dark rounded card — 24px margin on each side */}
      <div className="bg-[#1e170e] rounded-[40px] py-[120px] px-4 sm:px-12 lg:px-[228px] flex flex-col gap-12 items-center">
        {/* Header */}
        <div className="flex flex-col gap-4 items-center text-center text-[#eee6d9] max-w-[672px]">
          <h2
            className="font-['Anton',sans-serif] uppercase"
            style={{ fontSize: 'clamp(40px, 5vw, 60px)', lineHeight: '64px' }}
          >
            {t('heading')}
          </h2>
          <p className="font-['Inter',sans-serif] font-normal text-[20px] leading-[28px]">
            {t('subtitle')}
          </p>
        </div>

        {/* Packages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {packages.map((pkg) => (
            <div key={pkg.name} className="bg-white rounded-[24px] flex flex-col overflow-hidden">
              {/* Name & subtitle */}
              <div className="p-8 pb-4">
                <h3 className="font-['Anton',sans-serif] text-[28px] leading-[40px] text-[#1e170e]">
                  {pkg.name}
                </h3>
                <p className="font-['Inter',sans-serif] text-[#484037] text-[16px] leading-[20px] mt-1">
                  {pkg.subtitle}
                </p>
              </div>
              {/* Items */}
              <div className="flex flex-col gap-2 p-8 pt-4 flex-1">
                {pkg.items.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    {/* Checkmark */}
                    <svg
                      className="w-6 h-6 shrink-0 text-[#9b5026]"
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
                    <span className="font-['Inter',sans-serif] text-[16px] text-[#1e170e] leading-[24px]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href={`mailto:${contactEmail}?subject=Catering Inquiry`}
          className="inline-flex items-center justify-center bg-white text-[#1e170e] px-10 py-4 text-[20px] font-['Inter',sans-serif] rounded-[16px] hover:bg-[#eee6d9] transition-colors"
        >
          {t('cta')}
        </a>
      </div>
    </section>
  )
}
