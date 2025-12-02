import { ProjectContentTemplate } from "@/components/project-content-template";
import LogoPetjam from "@/assets/logo_petjam.webp";
import Image from "next/image";
import PetjamDoc1 from "@/assets/petjam_1.webp";
import PetjamDoc2 from "@/assets/petjam_2.webp";
import PetjamDoc3 from "@/assets/petjam_3.webp";
import PetjamDoc4 from "@/assets/petjam_4.webp";

export default function PetjamPage() {
  const images = [
    { src: PetjamDoc1, alt: "PetJam Documentation 1" },
    { src: PetjamDoc2, alt: "PetJam Documentation 2" },
    { src: PetjamDoc3, alt: "PetJam Documentation 3" },
    { src: PetjamDoc4, alt: "PetJam Documentation 4" },
  ];
  const descriptionBlocks = [
    "Gamification of SwiftUI’s HealthKit on the Apple Watch to motivate users to workout by calculating their daily burned calories count to sustain their tamagotchi-like pet on the watch",
    "TECH STACK: SWIFTUI, HEALTHKIT",
  ];

  return (
    <ProjectContentTemplate
      projectName="PetJam"
      heroLogo={{
        src: LogoPetjam,
        alt: "PetJam Logo",
      }}
      descriptionBlocks={descriptionBlocks}
      projectLink={{
        ctaLabel: "GitHub Repository",
        href: "https://github.com/kenanfir/workoutegg",
      }}
      imagesSection={
        <div className="flex gap-8 overflow-x-auto">
          {images.map((image) => (
            <Image
              key={image.alt}
              src={image.src}
              alt={image.alt}
              width={200}
              height={200}
              className="rounded-4xl"
            />
          ))}
        </div>
      }
    />
  );
}
