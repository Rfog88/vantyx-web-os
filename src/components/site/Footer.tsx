import type { BusinessInfo, SiteContent } from "@/content/types";

export function Footer({
  footer,
  business,
}: {
  footer: SiteContent["footer"];
  business: BusinessInfo;
}) {
  return (
    <footer className="bg-inverse-surface-deep text-on-inverse">
      <div className="shell grid gap-10 py-16 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <p className="text-headline-card uppercase tracking-tight text-on-inverse">
            {business.name}
          </p>
          <p className="text-body-lede mt-3 max-w-xs text-on-inverse-muted">
            Trustworthy, licensed electrical work for homes and businesses.
          </p>
        </div>
        {footer.columns.map((col) => (
          <div key={col.title}>
            <p className="text-eyebrow text-accent">{col.title}</p>
            <ul className="mt-4 flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[14px] text-on-inverse-variant hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="shell py-5">
          <p className="text-[13px] text-on-inverse-muted">{footer.finePrint}</p>
        </div>
      </div>
    </footer>
  );
}
