import type { SiteConfig } from "@/lib/site-config";

function buildLocalBusinessJsonLd(config: SiteConfig) {
  const { business, contact, serviceArea, hero } = config;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.legalName || business.name,
    description: business.tagline,
    telephone: contact.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      addressRegion: contact.address.state,
      postalCode: contact.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: serviceArea.hqLatLng[0],
      longitude: serviceArea.hqLatLng[1],
    },
    areaServed: serviceArea.zips.map((z) => ({
      "@type": "PostalCodeSpecification",
      postalCode: z,
    })),
    openingHours: Object.entries(contact.hours)
      .filter(([, v]) => v && v.toLowerCase() !== "closed")
      .map(([day, v]) => `${day.slice(0, 2).toUpperCase()} ${v.replace(/\s/g, "")}`),
    sameAs: [],
    knowsAbout: config.services.map((s) => s.title),
    foundingDate: business.foundedYear ? `${business.foundedYear}-01-01` : undefined,
    slogan: business.tagline,
    "@id": `https://${contact.email.split("@")[1] || "example.com"}`,
    url: `https://${contact.email.split("@")[1] || "example.com"}`,
    image: hero.image,
  };
}

export function FooterLocalSEO({ config }: { config: SiteConfig }) {
  const jsonLd = buildLocalBusinessJsonLd(config);

  return (
    <footer className="bg-brand-primary py-12 text-white/80">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-2 text-lg font-bold text-white">{config.business.name}</h3>
            {config.business.tagline && (
              <p className="text-sm text-white/70">{config.business.tagline}</p>
            )}
            {config.business.licenseNumber && (
              <p className="mt-3 text-xs tabular text-white/60">
                License #{config.business.licenseNumber}
              </p>
            )}
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white/60">Contact</h3>
            <p className="tabular text-sm">{config.contact.phone}</p>
            <p className="text-sm">{config.contact.email}</p>
            <address className="mt-2 text-sm not-italic text-white/70">
              {config.contact.address.street}
              <br />
              {config.contact.address.city}, {config.contact.address.state} {config.contact.address.zip}
            </address>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white/60">Hours</h3>
            <ul className="space-y-0.5 text-sm">
              {Object.entries(config.contact.hours).map(([day, hrs]) => (
                <li key={day} className="flex justify-between gap-4">
                  <span className="capitalize text-white/70">{day}</span>
                  <span className="tabular">{hrs}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} {config.business.legalName || config.business.name}. All rights reserved.
          </p>
          <p className="mt-1">
            Site built by{" "}
            <a href="https://vantyx.com" className="text-brand-accent hover:underline">
              Vantyx
            </a>
            .
          </p>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </footer>
  );
}
