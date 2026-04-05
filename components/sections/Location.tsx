interface LocationProps {
  address?: string
  phone?: string
  whatsapp?: string
  email?: string
}

export default function Location({
  address = 'Korte Molenstraat 11A, 2513 BH Den Haag, The Netherlands',
  phone = '+31 12 345 6789',
  whatsapp,
  email = 'hello@netherlandsbagels.com',
}: LocationProps) {
  const addressLines = address.split(',').map((l) => l.trim())

  return (
    <section id="contact" className="bg-[#f5f5f5] py-20 lg:py-24">
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px]">
        <h2 className="font-['Playfair_Display',serif] font-semibold text-4xl lg:text-[48px] leading-[57.6px] text-black text-center mb-12">
          Visit Us
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-[48px]">
          {/* Map */}
          <div className="w-full lg:w-[584px] shrink-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2452.4!2d4.315!3d52.077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b7a1%3A0x123456!2sKorte%20Molenstraat%2011A%2C%202513%20BH%20Den%20Haag!5e0!3m2!1sen!2snl!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Netherlands Bagels location"
              className="w-full h-[300px] lg:h-[400px]"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-8 flex-1">
            {/* Address */}
            <div>
              <h3 className="font-['Playfair_Display',serif] font-semibold text-2xl text-black mb-4">
                Address
              </h3>
              <div className="flex flex-col gap-1">
                {addressLines.map((line, i) => (
                  <p key={i} className="font-['Inter',sans-serif] text-[18px] leading-7 text-black">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div>
              <h3 className="font-['Playfair_Display',serif] font-semibold text-2xl text-black mb-4">
                Hours
              </h3>
              <div className="flex flex-col gap-2 max-w-sm">
                {[
                  { day: 'Monday - Friday', hours: '7:00 AM – 6:00 PM' },
                  { day: 'Saturday', hours: '8:00 AM – 6:00 PM' },
                  { day: 'Sunday', hours: '8:00 AM – 5:00 PM' },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex justify-between gap-8">
                    <span className="font-['Inter',sans-serif] font-medium text-base text-black whitespace-nowrap">{day}</span>
                    <span className="font-['Inter',sans-serif] text-base text-[#4a5565] whitespace-nowrap">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-['Playfair_Display',serif] font-semibold text-2xl text-black mb-4">
                Contact
              </h3>
              <div className="flex flex-col gap-2">
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="font-['Inter',sans-serif] text-base text-[#3a7d44] hover:underline"
                >
                  {phone}
                </a>
                {whatsapp && (
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-['Inter',sans-serif] text-base text-[#3a7d44] hover:underline"
                  >
                    WhatsApp
                  </a>
                )}
                <a
                  href={`mailto:${email}`}
                  className="font-['Inter',sans-serif] text-base text-[#3a7d44] hover:underline"
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
