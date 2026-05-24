import { siteConfig } from "@site-config";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { HeroLocal } from "@/components/HeroLocal";
import { TrustBar } from "@/components/TrustBar";
import { ServicesGrid } from "@/components/ServicesGrid";
import { GoogleReviewsEmbed } from "@/components/GoogleReviewsEmbed";
import { BeforeAfterGallery } from "@/components/BeforeAfterGallery";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { FinancingCTA } from "@/components/FinancingCTA";
import { BookingForm } from "@/components/BookingForm";
import { FooterLocalSEO } from "@/components/FooterLocalSEO";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {siteConfig.contact.emergency24_7 && <EmergencyBanner config={siteConfig} />}
      <HeroLocal config={siteConfig} />
      <TrustBar config={siteConfig} />
      <ServicesGrid config={siteConfig} />
      <GoogleReviewsEmbed config={siteConfig} />
      <BeforeAfterGallery config={siteConfig} />
      <ServiceAreaMap config={siteConfig} />
      {siteConfig.financing?.enabled && <FinancingCTA config={siteConfig} />}
      <BookingForm config={siteConfig} />
      <FooterLocalSEO config={siteConfig} />
    </main>
  );
}
