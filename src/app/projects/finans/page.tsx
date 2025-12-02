import { ProjectContentTemplate } from "@/components/project-content-template";
import LogoFinans from "@/assets/logo_finans.webp";
import FinansDoc1 from "@/assets/finans_1.webp";
import FinansDoc2 from "@/assets/finans_2.webp";
import FinansDoc3 from "@/assets/finans_3.webp";
import FinansDoc4 from "@/assets/finans_4.webp";
import Image from "next/image";

const descriptionBlocks = [
  "Used as a study on Core Data and SwiftUI. By the end of the study I developed an expense and income tracking app for money management.",
  "TECH STACK: SWIFTUI, CORE DATA",
];

export default function FinansPage() {
  const images = [
    { src: FinansDoc1, alt: "Finans Documentation 1" },
    { src: FinansDoc2, alt: "Finans Documentation 2" },
    { src: FinansDoc3, alt: "Finans Documentation 3" },
    { src: FinansDoc4, alt: "Finans Documentation 4" },
  ];
  return (
    <ProjectContentTemplate
      projectName="finans"
      heroLogo={{
        src: LogoFinans,
        alt: "finans Logo",
      }}
      descriptionBlocks={descriptionBlocks}
      projectLink={{
        ctaLabel: "GitHub Repository",
        href: "https://github.com/alifdimasius/finans",
      }}
      imagesSection={
        <div className="flex gap-4 overflow-x-auto">
          {images.map((image) => (
            <Image
              key={image.alt}
              src={image.src}
              alt={image.alt}
              width={400}
              height={400}
              className="rounded-4xl"
            />
          ))}
        </div>
      }
    />
  );
}
