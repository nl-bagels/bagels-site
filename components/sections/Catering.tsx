interface CateringProps {
  contactEmail?: string
}

const packages = [
  {
    name: 'Basic',
    subtitle: 'Perfect for small gatherings',
    items: ['Assorted bagels', 'Cream cheese selection', 'Fresh coffee'],
  },
  {
    name: 'Super',
    subtitle: 'Ideal for team meetings',
    items: ['Premium bagel selection', 'Multiple spreads', 'Coffee & tea', 'Fresh fruit'],
  },
  {
    name: 'Brunch',
    subtitle: 'Complete brunch experience',
    items: ['Bagel sandwiches', 'Sweet treats', 'Full beverage service', 'Seasonal salads'],
  },
  {
    name: 'Deluxe',
    subtitle: 'Ultimate catering package',
    items: ['Custom menu', 'Premium ingredients', 'Full setup', 'Dedicated service'],
  },
]

export default function Catering({ contactEmail = 'hello@netherlandsbagels.com' }: CateringProps) {
  return (
    <section id="catering" className="bg-white py-20 lg:py-24">
      <div className="max-w-[1672px] mx-auto px-4 sm:px-8 lg:px-[228px]">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-['Outfit',sans-serif] font-semibold text-4xl lg:text-[48px] leading-[57.6px] text-black mb-4">
            Catering
          </h2>
          <p className="font-['Inter',sans-serif] text-[#4a5565] text-base lg:text-[18px] max-w-[672px] mx-auto leading-7">
            Bring the taste of New York to your next event. We offer catering packages for all occasions.
          </p>
        </div>

        {/* Packages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.name} className="bg-[#f5f5f5] p-8">
              <h3 className="font-['Outfit',sans-serif] font-semibold text-[28px] leading-[42px] text-black mb-2">
                {pkg.name}
              </h3>
              <p className="font-['Inter',sans-serif] text-[#4a5565] text-base mb-6">
                {pkg.subtitle}
              </p>
              <ul className="flex flex-col gap-2">
                {pkg.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#3a7d44] font-['Inter',sans-serif] text-base leading-6 shrink-0">✓</span>
                    <span className="font-['Inter',sans-serif] text-base text-black leading-6">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <a
            href={`mailto:${contactEmail}?subject=Catering Inquiry`}
            className="bg-[#3a7d44] text-white px-10 py-4 text-base font-['Inter',sans-serif] hover:bg-[#2d6235] transition-colors"
          >
            Contact us for catering
          </a>
        </div>
      </div>
    </section>
  )
}
