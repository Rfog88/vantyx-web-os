import type { SiteContent } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function FinancingBand({
  financing,
}: {
  financing: SiteContent["financing"];
}) {
  return (
    <section className="bg-inverse-surface text-on-inverse">
      <div className="shell flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          {financing.eyebrow && <Eyebrow onDark>{financing.eyebrow}</Eyebrow>}
          <h2 className="text-headline-section mt-2 text-on-inverse">
            {financing.heading}
          </h2>
          <p className="text-body-base mt-3 text-on-inverse-variant">
            {financing.lede}
          </p>
        </div>
        <Button href={financing.cta.href} variant="primary" className="shrink-0">
          {financing.cta.label}
        </Button>
      </div>
    </section>
  );
}
