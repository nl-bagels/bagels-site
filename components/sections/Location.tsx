import { getTranslations } from 'next-intl/server'

interface LocationProps {
  address?: string
  phone?: string
  whatsapp?: string
  email?: string
}

export default async function Location({
  address = 'Korte Molenstraat 11A, 2513 BH Den Haag, The Netherlands',
  phone = '+31 12 345 6789',
  whatsapp,
  email = 'hello@netherlandsbagels.com',
}: LocationProps) {
  const t = await getTranslations('location')
  const addressLines = address.split(',').map((l) => l.trim())

  const hours = [
    { day: t('days.weekdays'), hours: '7:00 AM – 6:00 PM' },
    { day: t('days.saturday'), hours: '8:00 AM – 6:00 PM' },
    { day: t('days.sunday'), hours: '8:00 AM – 5:00 PM' },
  ]

  return (
    <section id="contact" className="bg-[#eee6d9] py-[120px]">
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px]">
        <div className="flex flex-col lg:flex-row gap-[72px] items-start">
          {/* Map */}
          <div className="w-full lg:flex-1 shrink-0 rounded-[40px] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2452.4!2d4.315!3d52.077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b7a1%3A0x123456!2sKorte%20Molenstraat%2011A%2C%202513%20BH%20Den%20Haag!5e0!3m2!1sen!2snl!4v1"
              width="100%"
              height="480"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Netherlands Bagels location"
              className="w-full h-[320px] lg:h-[480px]"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5 flex-1 min-w-0">
            <h2
              className="font-['Anton',sans-serif] text-[#1e170e] uppercase"
              style={{ fontSize: 'clamp(40px, 5vw, 60px)', lineHeight: '64px' }}
            >
              {t('heading')}
            </h2>

            {/* Address */}
            <div className="flex flex-col gap-2">
              <h3 className="font-['Inter',sans-serif] font-bold text-[24px] text-[#1e170e] leading-[36px]">
                {t('address')}
              </h3>
              <div className="flex flex-col font-['Inter',sans-serif] text-[18px] leading-[28px] text-[#484037]">
                {addressLines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className="flex flex-col gap-2">
              <h3 className="font-['Inter',sans-serif] font-bold text-[24px] text-[#1e170e] leading-[36px]">
                {t('hours')}
              </h3>
              <div className="flex flex-col gap-1 text-[18px] text-[#484037]">
                {hours.map(({ day, hours: h }) => (
                  <div key={day} className="flex items-center justify-between gap-8">
                    <span className="font-['Inter',sans-serif] font-medium text-[#1e170e] whitespace-nowrap">{day}</span>
                    <span className="font-['Inter',sans-serif] font-normal whitespace-nowrap">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-2">
              <h3 className="font-['Inter',sans-serif] font-bold text-[24px] text-[#1e170e] leading-[36px]">
                {t('contact')}
              </h3>
              <div className="flex flex-col font-['Inter',sans-serif] text-[18px] text-[#484037]">
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="leading-[28px] hover:text-[#9b5026] transition-colors"
                >
                  {phone}
                </a>
                {whatsapp && (
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[16px] leading-[24px] hover:text-[#9b5026] transition-colors"
                  >
                    {t('whatsapp')}
                  </a>
                )}
                <a
                  href={`mailto:${email}`}
                  className="leading-[28px] hover:text-[#9b5026] transition-colors"
                >
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
