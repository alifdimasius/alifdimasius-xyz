import { ProjectContentTemplate } from "@/components/project-content-template";
import LogoKeythicc from "@/assets/logo_keythicc.webp";

export default function KeythiccPage() {
  const descriptionBlocks = [
    "Keythicc is an e-commerce revolving around keyboards and computer peripherals. Developed as part of the Software Engineering Coursework at UGM.",
    "TECH STACK: NEXT.JS",
  ];
  return (
    <ProjectContentTemplate
      projectName="Keythicc"
      heroLogo={{
        src: LogoKeythicc,
        alt: "Keythicc Logo",
      }}
      descriptionBlocks={descriptionBlocks}
      projectLink={{
        ctaLabel: "Live Site",
        href: "https://keythicc.vercel.app",
      }}
    />
  );
}
