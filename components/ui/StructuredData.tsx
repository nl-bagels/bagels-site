export default function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['FoodEstablishment', 'LocalBusiness'],
    name: 'Netherlands Bagels',
    description: 'Freshly baked New York-style bagels in The Hague. 100% Halal.',
    url: 'https://netherlandsbagels.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Korte Molenstraat 11A',
      addressLocality: 'Den Haag',
      postalCode: '2513 BH',
      addressCountry: 'NL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.077,
      longitude: 4.315,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '08:00',
        closes: '17:00',
      },
    ],
    servesCuisine: 'American, Bagels',
    hasMenu: 'https://netherlandsbagels.com/menu',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
