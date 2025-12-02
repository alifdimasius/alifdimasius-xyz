import { ProjectContentTemplate } from "@/components/project-content-template";
import LogoSiBook from "@/assets/logo_sibook.webp";

export default function SiBookPage() {
  const descriptionBlocks = [
    "Si-Book is a A web-based system prototype for researchers to connect with students and collaborate on research - prototype for BEM KM UGM Innovator Meeting 2021",
    "TECH STACK: Figma",
  ];
  return (
    <ProjectContentTemplate
      projectName="Si-Book"
      heroLogo={{
        src: LogoSiBook,
        alt: "Si-Book Logo",
      }}
      descriptionBlocks={descriptionBlocks}
      projectLink={{
        ctaLabel: "Figma Prototype",
        href: "https://www.figma.com/proto/j5V8syYVEjmMo3WX3eY6So/iMeet?type=design&node-id=1-2&t=6FB7DfOU5inrKe1v-1&scaling=min-zoom&page-id=0%3A1&mode=design",
      }}
    />
  );
}
