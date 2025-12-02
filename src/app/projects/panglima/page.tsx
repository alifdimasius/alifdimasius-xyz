import { ProjectContentTemplate } from "@/components/project-content-template";
import LogoPanglima from "@/assets/logo_panglima.webp";

const descriptionBlocks = [
  "Panglima Ekspres is a pilgrimage booking platform developed for Muslim pilgrims to book their flights, hotels, and other services during their pilgrimage to Mecca.",
  "TECH STACK: CODEIGNITER, MYSQL",
];

export default function PanglimaPage() {
  return (
    <ProjectContentTemplate
      projectName="Panglima Ekspres"
      heroLogo={{
        src: LogoPanglima,
        alt: "Panglima Logo",
      }}
      descriptionBlocks={descriptionBlocks}
      projectLink={{
        ctaLabel: "Live Site",
        href: "https://panglimaekspres.com",
      }}
    />
  );
}
