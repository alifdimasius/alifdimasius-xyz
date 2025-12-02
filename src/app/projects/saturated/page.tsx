import { ProjectContentTemplate } from "@/components/project-content-template";
import LogoSaturated from "@/assets/logo_saturated.webp";
import SaturatedDoc1 from "@/assets/saturated_1.webp";
import SaturatedDoc2 from "@/assets/saturated_2.webp";
import SaturatedDoc3 from "@/assets/saturated_3.webp";
import ImageCarousel from "@/components/image-carousel";

export default function SaturatedPage() {
  const images = [
    { src: SaturatedDoc1, alt: "Saturated Documentation 1" },
    { src: SaturatedDoc2, alt: "Saturated Documentation 2" },
    { src: SaturatedDoc3, alt: "Saturated Documentation 3" },
  ];
  const descriptionBlocks = [
    "Psychological horror game on macOS developed using Unity. My role was a Technical Artist which mostly worked on VFX, UI, Environment, and World-building. Also built a Dialog System for immersive story-telling.",
    "TECH STACK: UNITY, C#, SHADERGRAPH",
  ];

  return (
    <ProjectContentTemplate
      projectName="Saturated"
      heroLogo={{
        src: LogoSaturated,
        alt: "Saturated Logo",
      }}
      descriptionBlocks={descriptionBlocks}
      projectLink={{
        ctaLabel: "Mac App Store",
        href: "https://apps.apple.com/id/app/saturated/id6755347604?mt=12",
      }}
      imagesSection={<ImageCarousel images={images} />}
    />
  );
}
