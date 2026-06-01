import { midlandsElectric as site } from "@/content/midlands-electric";
import { panelUpgrades as svc } from "@/content/panel-upgrades";
import {
  Header,
  EmergencyBanner,
  Breadcrumb,
  ServiceHero,
  ChecklistSection,
  ProcessSteps,
  TrustBar,
  Faq,
  FinancingBand,
  PlaceholderGallery,
  ServiceGrid,
  FinalCta,
  Footer,
} from "@/components/site";

/*
 * Service-detail template (Panel Upgrades). Header/nav/stats/footer come from the
 * site content; the page body comes from the service content. Same library, new
 * page type — proves the system extends beyond the home.
 */
export default function PanelUpgradesPage() {
  return (
    <>
      <EmergencyBanner business={site.business} />
      <Header business={site.business} nav={site.nav} primaryCta={site.primaryCta} />
      <Breadcrumb trail={svc.breadcrumb} />
      <main>
        <ServiceHero hero={svc.hero} />
        <ChecklistSection included={svc.included} />
        <ProcessSteps process={svc.process} />
        <TrustBar stats={site.stats} />
        <Faq eyebrow={svc.faq.eyebrow} heading={svc.faq.heading} items={svc.faq.items} />
        <FinancingBand financing={svc.financing} />
        <PlaceholderGallery gallery={svc.gallery} />
        <ServiceGrid
          eyebrow={svc.related.eyebrow}
          heading={svc.related.heading}
          items={svc.related.items}
          tone="white"
          id="related"
        />
        <FinalCta finalCta={site.finalCta} business={site.business} />
      </main>
      <Footer footer={site.footer} business={site.business} />
    </>
  );
}
