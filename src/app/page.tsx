import { activeSite } from "@/config/active-site";
import {
  Header,
  EmergencyBanner,
  Hero,
  TrustBar,
  ServiceGrid,
  FinancingBand,
  Testimonials,
  ServingAreaRow,
  FinalCta,
  Footer,
} from "@/components/site";

/*
 * Home page (V1 "Centered Authority" default + V3's emergency banner as a
 * config-toggled strip). Composed entirely from the library — the only inputs
 * are the `site` content object and the accent token. Swap those to rebrand.
 */
const site = activeSite.content;

export default function Home() {
  return (
    <>
      <EmergencyBanner business={site.business} />
      <Header business={site.business} nav={site.nav} primaryCta={site.primaryCta} />
      <main>
        <Hero hero={site.hero} />
        <TrustBar stats={site.stats} />
        <ServiceGrid
          eyebrow={site.services.eyebrow}
          heading={site.services.heading}
          items={site.services.items}
        />
        {site.financing && <FinancingBand financing={site.financing} />}
        <Testimonials testimonials={site.testimonials} />
        <ServingAreaRow serviceAreas={site.serviceAreas} />
        <FinalCta finalCta={site.finalCta} business={site.business} />
      </main>
      <Footer footer={site.footer} business={site.business} />
    </>
  );
}
