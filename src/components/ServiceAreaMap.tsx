import type { SiteConfig } from "@site-config";
import { MapPin } from "lucide-react";

function buildMapboxUrl(lat: number, lng: number, zoom: number, w = 800, h = 400): string | null {
  const token = process.env.MAPBOX_TOKEN;
  if (!token) return null;
  const style = "light-v11";
  const marker = `pin-l-marker+f59e0b(${lng},${lat})`;
  return `https://api.mapbox.com/styles/v1/mapbox/${style}/static/${marker}/${lng},${lat},${zoom},0/${w}x${h}@2x?access_token=${token}`;
}

function zoomForRadius(radiusMiles: number): number {
  if (radiusMiles <= 5) return 12;
  if (radiusMiles <= 15) return 11;
  if (radiusMiles <= 30) return 10;
  if (radiusMiles <= 60) return 9;
  return 8;
}

export function ServiceAreaMap({ config }: { config: SiteConfig }) {
  const [lat, lng] = config.serviceArea.hqLatLng;
  const zoom = zoomForRadius(config.serviceArea.radiusMiles);
  const mapUrl = buildMapboxUrl(lat, lng, zoom);

  return (
    <section className="bg-white py-16 md:py-24" id="service-area">
      <div className="mx-auto max-w-5xl px-6">
        <header className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
            Where we work
          </p>
          <h2 className="mt-2 text-3xl font-bold text-brand-primary md:text-4xl">
            Serving {config.serviceArea.radiusMiles} miles around {config.contact.address.city}
          </h2>
        </header>

        <div className="grid gap-6 md:grid-cols-[1fr_280px]">
          <div className="aspect-[2/1] overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
            {mapUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={mapUrl} alt={`Service area map centered on ${config.contact.address.city}`} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-center text-brand-muted">
                <div className="flex flex-col items-center gap-2">
                  <MapPin className="h-8 w-8 text-brand-accent" aria-hidden="true" />
                  <span className="text-sm font-medium">{config.contact.address.city}, {config.contact.address.state}</span>
                </div>
              </div>
            )}
          </div>

          <aside className="rounded-lg bg-gray-50 p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-muted">
              ZIPs we cover
            </h3>
            <ul className="flex flex-wrap gap-2">
              {config.serviceArea.zips.map((z) => (
                <li key={z} className="tabular rounded bg-white px-2 py-1 text-xs font-medium text-brand-text ring-1 ring-gray-200">
                  {z}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
