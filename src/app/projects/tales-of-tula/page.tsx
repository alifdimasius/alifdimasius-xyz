import { ProjectContentTemplate } from "@/components/project-content-template";
import LogoTalesOfTula from "@/assets/logo_tula.png";
import ImageCarousel from "@/components/image-carousel";
import TalesOfTulaDoc1 from "@/assets/tula_1.webp";
import TalesOfTulaDoc2 from "@/assets/tula_2.webp";
import TalesOfTulaDoc3 from "@/assets/tula_3.webp";
import TalesOfTulaDoc4 from "@/assets/tula_4.webp";

export default function TalesOfTulaPage() {
  const descriptionBlocks = [
    "Metroidvania with lore surrounding legends and myths of Bali. Designed the boss fight and combat system of the game along with impact freeze and hit flash effects.",
    "TECH STACK: GODOT",
  ];
  const images = [
    { src: TalesOfTulaDoc1, alt: "Tales of Tula Documentation 1" },
    { src: TalesOfTulaDoc2, alt: "Tales of Tula Documentation 2" },
    { src: TalesOfTulaDoc3, alt: "Tales of Tula Documentation 3" },
    { src: TalesOfTulaDoc4, alt: "Tales of Tula Documentation 4" },
  ];
  return (
    <ProjectContentTemplate
      projectName="Tales of Tula"
      heroLogo={{
        src: LogoTalesOfTula,
        alt: "Tales of Tula Logo",
      }}
      descriptionBlocks={descriptionBlocks}
      imagesSection={<ImageCarousel images={images} />}
    />
  );
}
