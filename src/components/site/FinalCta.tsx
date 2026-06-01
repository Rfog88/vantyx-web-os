import type { BusinessInfo, SiteContent } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { telHref } from "@/lib/phone";

export function FinalCta({
  finalCta,
  business,
  id = "contact",
}: {
  finalCta: SiteContent["finalCta"];
  business: BusinessInfo;
  id?: string;
}) {
  return (
    <section id={id} className="bg-inverse-surface text-on-inverse">
      <div className="shell flex flex-col items-center gap-6 py-16 text-center">
        <h2 className="text-headline-section text-on-inverse">{finalCta.heading}</h2>
        {finalCta.lede && (
          <p className="text-body-base max-w-xl text-on-inverse-variant">
            {finalCta.lede}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button href={finalCta.cta.href} variant="primary">
            {finalCta.cta.label}
          </Button>
          <a
            href={telHref(business.phone)}
            className="inline-flex items-center gap-2 text-[15px] font-bold text-on-inverse hover:text-accent"
          >
            <Icon name="phone" className="h-4 w-4" />
            {business.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
