import LogoKlop from "@/assets/logo_klop.webp";
import KlopDoc1 from "@/assets/klop_1.webp";
import KlopDoc2 from "@/assets/klop_2.webp";
import KlopDoc3 from "@/assets/klop_3.webp";
import { ProjectContentTemplate } from "@/components/project-content-template";
import ImageCarousel from "@/components/image-carousel";

const descriptionBlocks = [
  "E-learning platform developed for the Indonesian Ministry of Public Works during my time with APPA Technologies. Worked on from day-0 and significant functionalities I’ve built were forums with WYSIWYG editors and realtime live chat for broadcasts within the platform",
  "TECH STACK: NEXT.JS, SUPABASE",
];

export default function KlopPage() {
  return (
    <ProjectContentTemplate
      projectName="Klop"
      heroLogo={{
        src: LogoKlop,
        alt: "Klop Logo",
      }}
      descriptionBlocks={descriptionBlocks}
      imagesSection={
        <ImageCarousel
          images={[
            { src: KlopDoc1, alt: "Klop Site Documentation 1" },
            { src: KlopDoc2, alt: "Klop Site Documentation 2" },
            { src: KlopDoc3, alt: "Klop Site Documentation 3" },
          ]}
        />
      }
      projectLink={{ ctaLabel: "Live Site", href: "https://klop.pu.go.id" }}
    />
  );
}
