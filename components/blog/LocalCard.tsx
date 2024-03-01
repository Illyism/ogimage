
export default function LocalCard({
  name,
  street,
  postalCode,
  city,
  country,
  phone,
  email,
  website,
}: {
  name: string
  street: string
  postalCode: string
  city: string
  country: string
  phone: string
  email: string
  website: string
}) {
  const domain = website
    .replace(/(^\w+:|^)\/\//, '') // Remove protocol
    .replace(/\/$/, '') // Remove trailing slash
    .replace(/^www\./, '') // Remove www

  return (
    <div
      itemScope
      itemType="http://schema.org/LocalBusiness"
      className="rounded bg-gray-100 p-6 text-center text-gray-800 shadow sm:text-left"
    >
      <div itemProp="name" className="font-bold">
        {name}
      </div>
      <span
        itemProp="address"
        itemScope
        itemType="http://schema.org/PostalAddress"
      >
        <span itemProp="streetAddress">{street}</span>,{' '}
        <span itemProp="postalCode">{postalCode}</span>{' '}
        <span itemProp="addressLocality">{city}</span>,{' '}
        <span itemProp="addressCountry">{country}</span>
      </span>
      {phone && (
        <div>
          Phone: <span itemProp="telephone">{phone}</span>
        </div>
      )}
      {email && (
        <div>
          Email:{' '}
          <a
            href={`mailto:${email}`}
            itemProp="email"
            target="_blank"
          >
            {email}
          </a>
        </div>
      )}
      {website && (
        <div>
          Website:{' '}
          <a
            href={website}
            itemProp="url"
            target="_blank"
          >
            {domain}
          </a>
        </div>
      )}
    </div>
  )
}
