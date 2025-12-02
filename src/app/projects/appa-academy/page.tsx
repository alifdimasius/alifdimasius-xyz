import ImageCarousel from "@/components/image-carousel";
import { ProjectContentTemplate } from "@/components/project-content-template";
import LogoAppa from "@/assets/logo_appa.webp";
import AppaAcademyDoc1 from "@/assets/appa_1.webp";
import AppaAcademyDoc2 from "@/assets/appa_2.webp";

const descriptionBlocks = [
  "Football school management system developed for various grassroots football teams all around Indonesia. Developed most of the functionalities within the web application, most notably their subscription and payment system which leveraged the Midtrans API",
  "TECH STACK: NEXT.JS, SUPABASE, MIDTRANS",
];

const images = [
  { src: AppaAcademyDoc1, alt: "APPA Academy Documentation 1" },
  { src: AppaAcademyDoc2, alt: "APPA Academy Documentation 2" },
];

export default function AppaAcademyPage() {
  return (
    <ProjectContentTemplate
      projectName="APPA Academy"
      heroLogo={{
        src: LogoAppa,
        alt: "APPA Academy Logo",
      }}
      descriptionBlocks={descriptionBlocks}
      imagesSection={<ImageCarousel images={images} />}
      projectLink={{ ctaLabel: "Live Site", href: "https://appa-academy.com" }}
    />
  );
}
