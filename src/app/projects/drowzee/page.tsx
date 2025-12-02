import { ProjectContentTemplate } from "@/components/project-content-template";
import LogoDrowzee from "@/assets/logo_drowzee.webp";
import Image from "next/image";
import DrowzeeDoc1 from "@/assets/drowzee_1.webp";
import DrowzeeDoc2 from "@/assets/drowzee_2.webp";
import DrowzeeDoc3 from "@/assets/drowzee_3.webp";
import DrowzeeDoc4 from "@/assets/drowzee_4.webp";

const descriptionBlocks = [
  "iOS app to control lights within rooms that would mimic natural lighting to improve sleep quality. This was developed as part of my Challenge Based Learning process within Apple Developer Academy.",
  "TECH STACK: SWIFTUI",
];

const images = [
  { src: DrowzeeDoc1, alt: "Drowzee Documentation 1" },
  { src: DrowzeeDoc2, alt: "Drowzee Documentation 2" },
  { src: DrowzeeDoc3, alt: "Drowzee Documentation 3" },
  { src: DrowzeeDoc4, alt: "Drowzee Documentation 4" },
];

export default function DrowzeePage() {
  return (
    <ProjectContentTemplate
      projectName="Drowzee"
      heroLogo={{
        src: LogoDrowzee,
        alt: "Drowzee Logo",
      }}
      descriptionBlocks={descriptionBlocks}
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
      // projectLink="https://drowzee.com"
    />
  );
}
